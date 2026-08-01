#!/usr/bin/env bash
# You found the ultimate hint: the answers.
#
# You're welcome to read through this flag generation script, but that takes
# the fun out of the hack. Enjoy the simple simulated flag generator script,
# or go back to your Linux device and run 'hint' in the terminal.
#
# Airport-themed DEF CON workshop easter eggs.
#
# Streamed deployment:
#   curl -fsSL https://christiant.io/defcon-flags.sh | sudo bash
#
# Safe to run repeatedly. The script only replaces artifacts in its own
# airport-lab namespace and restarts its optional systemd service.

set -Eeuo pipefail
umask 022

readonly SCRIPT_NAME="defcon-flags.sh"
readonly SOURCE_URL="https://christiant.io/defcon-flags.sh"

ROOT_DIR="${ROOT_DIR:-}"
ROOT_DIR="${ROOT_DIR%/}"
ENABLE_PROCESS_EGG="${ENABLE_PROCESS_EGG:-1}"

FLAG_CREW="${FLAG_CREW:-FLAG{crew_credentials_found}}"
FLAG_DB="${FLAG_DB:-FLAG{unclaimed_baggage_record}}"
FLAG_LOG="${FLAG_LOG:-FLAG{boarding_log_anomaly}}"
FLAG_RADIO="${FLAG_RADIO:-FLAG{radio_message_decoded}}"
FLAG_HIDDEN="${FLAG_HIDDEN:-FLAG{lost_luggage_recovered}}"
FLAG_ARCHIVE="${FLAG_ARCHIVE:-FLAG{black_box_opened}}"
FLAG_STRINGS="${FLAG_STRINGS:-FLAG{flight_recorder_strings}}"
FLAG_COMMAND="${FLAG_COMMAND:-FLAG{departure_board_online}}"
FLAG_PROCESS="${FLAG_PROCESS:-FLAG{beacon_visible_in_process_list}}"

VERIFY_ONLY=0
TEMP_PATHS=()

log()  { printf '[airport-lab] %s\n' "$*"; }
warn() { printf '[airport-lab] WARNING: %s\n' "$*" >&2; }
die()  { printf '[airport-lab] ERROR: %s\n' "$*" >&2; exit 1; }

usage() {
    cat <<EOF
Usage: sudo bash [options]

Deploy or repair the airport-themed workshop flags.

Options:
  --verify-only       Verify the current deployment without replacing files.
  --root DIR          Build into an alternate root filesystem.
  --no-process-egg    Do not install or start the systemd process-list egg.
  -h, --help          Show this help.

Typical streamed deployment:
  curl -fsSL $SOURCE_URL | sudo bash

Streamed deployment with options:
  curl -fsSL $SOURCE_URL | sudo bash -s -- --no-process-egg
EOF
}

while (($#)); do
    case "$1" in
        --verify-only)
            VERIFY_ONLY=1
            shift
            ;;
        --root)
            (($# >= 2)) || die "--root requires a directory."
            ROOT_DIR="${2%/}"
            shift 2
            ;;
        --no-process-egg)
            ENABLE_PROCESS_EGG=0
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            die "Unknown option: $1. Use --help for usage."
            ;;
    esac
done

path() {
    printf '%s%s' "$ROOT_DIR" "$1"
}

cleanup() {
    local item
    for item in "${TEMP_PATHS[@]}"; do
        [[ -n "$item" ]] && rm -rf -- "$item"
    done
    return 0
}
trap cleanup EXIT
trap 'die "Deployment interrupted."' INT TERM HUP

track_temp() {
    TEMP_PATHS+=("$1")
}

forget_temp() {
    local target="$1" item
    local remaining=()
    for item in "${TEMP_PATHS[@]}"; do
        [[ "$item" == "$target" ]] || remaining+=("$item")
    done
    TEMP_PATHS=("${remaining[@]}")
}

require_command() {
    command -v "$1" >/dev/null 2>&1 || die "$1 is required."
}

write_file() {
    local rel="$1" mode="$2" target dir tmp
    target="$(path "$rel")"
    dir="$(dirname "$target")"
    install -d -m 0755 "$dir"

    tmp="$(mktemp "$dir/.airport-lab.XXXXXX")"
    track_temp "$tmp"
    cat > "$tmp"
    chmod "$mode" "$tmp"
    mv -f -- "$tmp" "$target"
    forget_temp "$tmp"
}

append_bashrc_hint_message() {
    local target marker
    target="$(path /etc/bash.bashrc)"
    marker="# BEGIN airport-lab hint message"

    if [[ -e "$target" ]]; then
        [[ -f "$target" ]] || die "/etc/bash.bashrc is not a regular file."
        if ! grep -Fq -- "$marker" "$target"; then
            cat >> "$target" <<'BASHRC'

# BEGIN airport-lab hint message
if [[ $- == *i* ]]; then
    printf '\nAirport Operations Lab: type "hint" for a randomly selected investigation clue.\n\n'
fi
# END airport-lab hint message
BASHRC
        fi
        return 0
    fi

    write_file /etc/bash.bashrc 0644 <<'BASHRC'
# BEGIN airport-lab hint message
if [[ $- == *i* ]]; then
    printf '\nAirport Operations Lab: type "hint" for a randomly selected investigation clue.\n\n'
fi
# END airport-lab hint message
BASHRC
}

verify_file_contains() {
    local rel="$1" expected="$2"
    grep -Fq -- "$expected" "$(path "$rel")" \
        || die "Verification failed for $rel."
}

verify_deployment() {
    local db archive recorder command_path hint_path profile_fragment bashrc_file

    log "Verifying airport-lab deployment"

    verify_file_contains /etc/airport-lab/crew_credentials.bak "$FLAG_CREW"
    verify_file_contains /var/log/airport-lab/boarding.log "$FLAG_LOG"

    [[ -L "$(path /opt/airport-lab/lost-luggage)" ]] \
        || die "Verification failed for the lost-luggage symlink."
    verify_file_contains /opt/airport-lab/lost-luggage "$FLAG_HIDDEN"

    base64 -d "$(path /opt/airport-lab/radio/last_transmission.b64)" 2>/dev/null \
        | grep -Fq -- "$FLAG_RADIO" \
        || die "Verification failed for the radio transmission."

    db="$(path /var/lib/airport-lab/baggage.db)"
    python3 - "$db" "$FLAG_DB" <<'PY'
import sqlite3
import sys

path, expected = sys.argv[1], sys.argv[2]
with sqlite3.connect(path) as conn:
    row = conn.execute(
        "SELECT notes FROM baggage WHERE tag = ?", ("BAG-0815",)
    ).fetchone()
if row is None or row[0] != expected:
    raise SystemExit("baggage database verification failed")
PY

    archive="$(path /opt/airport-lab/archives/black-box.tar.gz)"
    tar -xOzf "$archive" flight-AZ815/maintenance-note.txt 2>/dev/null \
        | grep -Fq -- "$FLAG_ARCHIVE" \
        || die "Verification failed for the black-box archive."

    recorder="$(path /opt/airport-lab/flight-recorder.dat)"
    python3 - "$recorder" "$FLAG_STRINGS" <<'PY'
import sys

path, expected = sys.argv[1], sys.argv[2]
with open(path, "rb") as handle:
    data = handle.read()
if expected.encode("ascii") not in data:
    raise SystemExit("flight recorder verification failed")
PY

    command_path="$(path /usr/local/bin/airport-status)"
    [[ -x "$command_path" ]] || die "airport-status is not executable."
    "$command_path" | grep -Fq -- "$FLAG_COMMAND" \
        || die "Verification failed for airport-status."

    hint_path="$(path /usr/local/bin/hint)"
    [[ -x "$hint_path" ]] || die "hint is not executable."
    "$hint_path" | grep -Fq -- "[Airport Operations Hint]" \
        || die "Verification failed for hint."

    profile_fragment="$(path /etc/profile.d/airport-lab-hints.sh)"
    grep -Fq -- "hint()" "$profile_fragment" \
        || die "Verification failed for airport-lab-hints.sh."

    bashrc_file="$(path /etc/bash.bashrc)"
    grep -Fq -- "# BEGIN airport-lab hint message" "$bashrc_file" \
        || die "Verification failed for /etc/bash.bashrc."
    grep -Fq -- 'type "hint" for a randomly selected investigation clue.' "$bashrc_file" \
        || die "Verification failed for the bashrc hint message."

    if [[ "$ENABLE_PROCESS_EGG" == "1" ]]; then
        verify_file_contains /etc/systemd/system/airport-beacon.service "$FLAG_PROCESS"

        if [[ -z "$ROOT_DIR" ]] \
            && command -v systemctl >/dev/null 2>&1 \
            && [[ -d /run/systemd/system ]]; then
            systemctl is-active --quiet airport-beacon.service \
                || warn "airport-beacon.service is installed but is not active."
        fi
    fi

    log "Verification passed"
}

if [[ -z "$ROOT_DIR" ]]; then
    if ((EUID != 0)); then
        die "Root access is required. Run: curl -fsSL $SOURCE_URL | sudo bash"
    fi
else
    [[ "$ROOT_DIR" == /* ]] || die "ROOT_DIR must be an absolute path."
    install -d -m 0755 "$ROOT_DIR"
fi

require_command install
require_command mktemp
require_command grep
require_command python3
require_command tar
require_command base64

if ((VERIFY_ONLY)); then
    verify_deployment
    exit 0
fi

log "Deploying airport-themed workshop flags"

install -d -m 0755 \
    "$(path /etc/airport-lab)" \
    "$(path /etc/profile.d)" \
    "$(path /etc/systemd/system)" \
    "$(path /opt/airport-lab)" \
    "$(path /opt/airport-lab/.lost-and-found)" \
    "$(path /opt/airport-lab/radio)" \
    "$(path /opt/airport-lab/archives)" \
    "$(path /var/lib/airport-lab)" \
    "$(path /var/log/airport-lab)" \
    "$(path /usr/local/bin)"

write_file /opt/airport-lab/README.txt 0644 <<'TXT'
AIRPORT OPERATIONS LAB

Training artifacts are scattered through ordinary Linux locations.
Everything can be discovered with read-only commands.

Useful tools may include:
  find, grep, cat, readlink, base64, strings, tar, sqlite3, ps

Need a clue?
  hint
TXT

write_file /etc/airport-lab/crew_credentials.bak 0644 <<EOF_CREW
# TRAINING DATA ONLY - not used by Linux authentication
[gate-agent]
username=gate-agent
password=runway-lights-27
clearance=$FLAG_CREW
EOF_CREW

write_file /var/log/airport-lab/boarding.log 0644 <<EOF_LOG
2026-08-08T20:01:12Z INFO  gate=A04 flight=AZ104 status=boarding
2026-08-08T20:02:08Z INFO  gate=B17 flight=AZ220 status=final-call
2026-08-08T20:03:41Z WARN  gate=C12 badge=TEMP-771 access=denied
2026-08-08T20:04:03Z INFO  gate=C12 badge=OPS-042 access=granted note=$FLAG_LOG
2026-08-08T20:05:19Z INFO  gate=A04 flight=AZ104 status=closed
EOF_LOG

radio_payload="MAYDAY MAYDAY. Ground control confirms: $FLAG_RADIO"
radio_encoded="$(printf '%s\n' "$radio_payload" | base64 | tr -d '\n')"
write_file /opt/airport-lab/radio/last_transmission.b64 0644 <<EOF_RADIO
$radio_encoded
EOF_RADIO

write_file /opt/airport-lab/.lost-and-found/gate-42.txt 0644 <<EOF_HIDDEN
Property tag: LUG-0042
Owner: UNKNOWN
Contents: $FLAG_HIDDEN
EOF_HIDDEN

lost_link="$(path /opt/airport-lab/lost-luggage)"
rm -rf -- "$lost_link"
ln -s .lost-and-found/gate-42.txt "$lost_link"

log "Creating baggage SQLite database"
db_target="$(path /var/lib/airport-lab/baggage.db)"
db_tmp="$(mktemp "$(dirname "$db_target")/.baggage.XXXXXX")"
track_temp "$db_tmp"
python3 - "$db_tmp" "$FLAG_DB" <<'PY'
import sqlite3
import sys

path, flag = sys.argv[1], sys.argv[2]
with sqlite3.connect(path) as conn:
    conn.executescript(
        """
        CREATE TABLE flights (
            flight_no TEXT PRIMARY KEY,
            destination TEXT NOT NULL,
            gate TEXT NOT NULL,
            status TEXT NOT NULL
        );
        CREATE TABLE baggage (
            tag TEXT PRIMARY KEY,
            passenger TEXT NOT NULL,
            flight_no TEXT NOT NULL,
            status TEXT NOT NULL,
            notes TEXT NOT NULL
        );
        """
    )
    conn.executemany(
        "INSERT INTO flights VALUES (?, ?, ?, ?)",
        [
            ("AZ104", "Las Vegas", "A04", "BOARDING"),
            ("AZ220", "Seattle", "B17", "FINAL CALL"),
            ("AZ815", "Unknown", "C12", "DELAYED"),
        ],
    )
    conn.executemany(
        "INSERT INTO baggage VALUES (?, ?, ?, ?, ?)",
        [
            ("BAG-1001", "A. Earhart", "AZ104", "LOADED", "Routine transfer"),
            ("BAG-1002", "D. Cooper", "AZ220", "MISSING", "No matching claim ticket"),
            ("BAG-0815", "UNKNOWN", "AZ815", "QUARANTINED", flag),
        ],
    )
PY
chmod 0644 "$db_tmp"
mv -f -- "$db_tmp" "$db_target"
forget_temp "$db_tmp"

log "Creating black-box archive"
archive_tmp="$(mktemp "$(path /opt/airport-lab/archives)/.black-box.XXXXXX")"
track_temp "$archive_tmp"
python3 - "$archive_tmp" "$FLAG_ARCHIVE" <<'PY'
import gzip
import io
import sys
import tarfile

path, flag = sys.argv[1], sys.argv[2]
content = (
    "Aircraft: AZ815\n"
    "Inspection result: recorder recovered\n"
    f"Recovery code: {flag}\n"
).encode("utf-8")

with open(path, "wb") as raw:
    with gzip.GzipFile(filename="", mode="wb", fileobj=raw, mtime=0) as compressed:
        with tarfile.open(
            fileobj=compressed, mode="w", format=tarfile.USTAR_FORMAT
        ) as archive:
            directory = tarfile.TarInfo("flight-AZ815")
            directory.type = tarfile.DIRTYPE
            directory.mode = 0o755
            directory.mtime = 0
            directory.uid = directory.gid = 0
            directory.uname = directory.gname = "root"
            archive.addfile(directory)

            note = tarfile.TarInfo("flight-AZ815/maintenance-note.txt")
            note.size = len(content)
            note.mode = 0o644
            note.mtime = 0
            note.uid = note.gid = 0
            note.uname = note.gname = "root"
            archive.addfile(note, io.BytesIO(content))
PY
chmod 0644 "$archive_tmp"
mv -f -- "$archive_tmp" "$(path /opt/airport-lab/archives/black-box.tar.gz)"
forget_temp "$archive_tmp"

log "Creating flight-recorder data"
recorder_target="$(path /opt/airport-lab/flight-recorder.dat)"
recorder_tmp="$(mktemp "$(dirname "$recorder_target")/.recorder.XXXXXX")"
track_temp "$recorder_tmp"
python3 - "$recorder_tmp" "$FLAG_STRINGS" <<'PY'
import sys

path, flag = sys.argv[1], sys.argv[2]
payload = (
    b"\x00\x01\x02\x00FLIGHT RECORDER AZ815\x00"
    b"ALT=12000\x00HDG=270\x00"
    + flag.encode("ascii")
    + b"\x00END OF RECORDER\x00\xff\xfe\x00"
)
with open(path, "wb") as handle:
    handle.write(payload)
PY
chmod 0644 "$recorder_tmp"
mv -f -- "$recorder_tmp" "$recorder_target"
forget_temp "$recorder_tmp"

log "Installing airport-status command"
write_file /usr/local/bin/airport-status 0755 <<EOF_COMMAND
#!/usr/bin/env sh
printf '%s\n' 'PHX DEPARTURE CONTROL'
printf '%s\n' 'Runway: OPEN'
printf '%s\n' 'Gate C12: MANUAL REVIEW'
printf '%s\n' '$FLAG_COMMAND'
EOF_COMMAND

log "Installing hint command"
write_file /usr/local/bin/hint 0755 <<'HINT'
#!/usr/bin/env bash
set -Eeuo pipefail

if (($# != 0)); then
    printf 'Usage: hint\n' >&2
    exit 2
fi

hints=(
    "Start with the operations README under /opt/airport-lab. It lists the tools the ground crew expects you to use."
    "Backups can outlive the secrets they were meant to protect. Search /etc for files ending in .bak."
    "Logs are a timeline. Search airport-related logs for warnings, access decisions, and unusual notes."
    "A radio message may be encoded rather than encrypted. Base64-shaped text is meant to be decoded."
    "Use ls -la around airport-lab directories. Lost items are sometimes hidden from an ordinary directory listing."
    "A path may be a signpost rather than the real file. Try readlink or readlink -f on suspicious symbolic links."
    "Baggage manifests are structured records. Use file first, then inspect any SQLite tables and interesting rows."
    "Do not unpack a black box blindly. Use tar -tzf to list its contents and tar -xOzf to read a file directly."
    "Binary-looking recorder data can still contain readable text. The strings command may recover it."
    "Not every clue is stored in a file. Look through /usr/local/bin for airport-related commands that are safe to run."
    "A process name and its full command line can reveal different information. Try ps auxww."
    "Search for flight AZ815 across /opt, /etc, and /var. The same flight appears in more than one airport system."
    "Recursive grep can find plaintext, but it will not automatically decode data, open archives, query databases, or inspect processes."
    "Try searching filenames for words such as airport, baggage, radio, recorder, beacon, or black-box."
    "When you do not recognize a file, identify its type before choosing a tool. Start with: file PATH"
    "CTF flags often have a recognizable prefix. Grep can find visible ones, but some flags are deliberately stored in other formats."
)

index=$((RANDOM % ${#hints[@]}))

printf '\n[Airport Operations Hint]\n%s\n\n' "${hints[$index]}"
HINT

write_file /etc/profile.d/airport-lab-hints.sh 0644 <<'PROFILE'
# Airport Operations Lab
# Type "hint" for a randomly selected investigation clue.

hint() {
    /usr/local/bin/hint "$@"
}
PROFILE

append_bashrc_hint_message

if [[ "$ENABLE_PROCESS_EGG" == "1" ]]; then
    log "Installing optional process-list egg"
    write_file /etc/systemd/system/airport-beacon.service 0644 <<EOF_SERVICE
[Unit]
Description=Airport Lab Beacon
After=local-fs.target

[Service]
Type=simple
DynamicUser=yes
ExecStart=/bin/bash -c 'exec -a "airport-beacon $FLAG_PROCESS" /bin/sleep infinity'
Restart=always
RestartSec=2
NoNewPrivileges=yes
PrivateTmp=yes
ProtectSystem=strict
ProtectHome=yes

[Install]
WantedBy=multi-user.target
EOF_SERVICE

    if [[ -z "$ROOT_DIR" ]] \
        && command -v systemctl >/dev/null 2>&1 \
        && [[ -d /run/systemd/system ]]; then
        if systemctl daemon-reload \
            && systemctl enable airport-beacon.service >/dev/null \
            && systemctl restart airport-beacon.service; then
            log "airport-beacon.service is running"
        else
            warn "Could not start airport-beacon.service; file-based eggs were still installed."
        fi
    else
        log "Systemd is not active in this root; the unit was installed but not started."
    fi
else
    log "Skipping the process-list egg"
    if [[ -z "$ROOT_DIR" ]] \
        && command -v systemctl >/dev/null 2>&1 \
        && [[ -d /run/systemd/system ]]; then
        systemctl disable --now airport-beacon.service >/dev/null 2>&1 || true
        systemctl daemon-reload || true
    fi
    rm -f -- "$(path /etc/systemd/system/airport-beacon.service)"
fi

verify_deployment

log "Deployment complete. Re-run the same curl command to repair or restore all managed flags."
log "Managed locations: /etc/airport-lab, /opt/airport-lab, /var/lib/airport-lab, /var/log/airport-lab"
