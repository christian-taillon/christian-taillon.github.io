---
layout: page
title: DEF CON Airport Lab Instructor Guide
description: Instructor reference for the DEF CON Airport Lab Linux discovery exercises.
permalink: /defcon-flags-instructor/
---

# DEF CON Airport Lab: Instructor Flag Guide

This guide documents the airport-themed Linux easter eggs installed by `defcon-flags.sh`. It is intended for instructors and lab assistants who need to provide hints, confirm solutions, or repair a participant system.

The exercises are discovery-only. Participants can find every flag using read-only Linux commands. They do not need to edit files, change permissions, stop services, or modify the operating system.

## Deployment and Recovery

Deploy or fully repair all default flags:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh | sudo bash
```

Verify the deployment without changing it:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh \
  | sudo bash -s -- --verify-only
```

Deploy without the process-list flag:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh \
  | sudo bash -s -- --no-process-egg
```

The deployment is idempotent. Running it again recreates missing files, replaces damaged content, restores permissions, rebuilds the SQLite database and archive, repairs the symlink, and restarts the optional systemd service.

The script manages only these locations:

```text
/etc/airport-lab/
/etc/systemd/system/airport-beacon.service
/opt/airport-lab/
/var/lib/airport-lab/
/var/log/airport-lab/
/usr/local/bin/airport-status
```

## General Participant Starting Point

The lab includes a basic clue file:

```bash
cat /opt/airport-lab/README.txt
```

It suggests these read-only tools:

```text
find, grep, cat, readlink, base64, strings, tar, sqlite3, ps
```

A broad search for default-format flags will find several, but not all, of the exercises:

```bash
grep -R 'FLAG{' /etc/airport-lab /opt/airport-lab \
  /var/lib/airport-lab /var/log/airport-lab 2>/dev/null
```

Binary, encoded, archived, database, command, and process-list flags require the appropriate tools.

---

## Flag 1: Crew Credential Backup

**Concept:** A plaintext backup file in an administrative configuration directory.

**Location:**

```text
/etc/airport-lab/crew_credentials.bak
```

**Default flag:**

```text
FLAG{crew_credentials_found}
```

**Participant solution:**

```bash
cat /etc/airport-lab/crew_credentials.bak
```

Possible discovery commands:

```bash
find /etc -type f \( -iname '*credential*' -o -iname '*.bak' \) 2>/dev/null
find /etc/airport-lab -type f -ls
```

**Graduated hints:**

1. Configuration directories sometimes contain forgotten backup files.
2. Look under `/etc` for airport-related files or files ending in `.bak`.
3. Read `/etc/airport-lab/crew_credentials.bak`.

**Instructor note:** The username and password are training data only. They are not connected to a Linux account or authentication service.

---

## Flag 2: Boarding Log Anomaly

**Concept:** Searching operational logs for an anomalous event or embedded note.

**Location:**

```text
/var/log/airport-lab/boarding.log
```

**Default flag:**

```text
FLAG{boarding_log_anomaly}
```

**Participant solution:**

```bash
grep 'FLAG{' /var/log/airport-lab/boarding.log
```

Other useful approaches:

```bash
cat /var/log/airport-lab/boarding.log
grep -R 'FLAG{' /var/log/airport-lab 2>/dev/null
grep -E 'WARN|denied|granted|note=' /var/log/airport-lab/boarding.log
```

**Graduated hints:**

1. Airport operations generate logs.
2. Look under `/var/log` for a lab-specific log directory.
3. Search `boarding.log` for an unusual access event or a flag marker.

---

## Flag 3: Unclaimed Baggage Database

**Concept:** Inspecting the schema and records of a local SQLite database.

**Location:**

```text
/var/lib/airport-lab/baggage.db
```

**Default flag:**

```text
FLAG{unclaimed_baggage_record}
```

**Participant solution with SQLite:**

```bash
sqlite3 /var/lib/airport-lab/baggage.db '.tables'
sqlite3 /var/lib/airport-lab/baggage.db '.schema baggage'
sqlite3 -header -column /var/lib/airport-lab/baggage.db \
  'SELECT tag, passenger, flight_no, status, notes FROM baggage;'
```

A more focused query is:

```bash
sqlite3 /var/lib/airport-lab/baggage.db \
  "SELECT notes FROM baggage WHERE tag='BAG-0815';"
```

**Fallback when the `sqlite3` CLI is unavailable:**

```bash
python3 - <<'PY'
import sqlite3

path = "/var/lib/airport-lab/baggage.db"
with sqlite3.connect(path) as conn:
    for row in conn.execute("SELECT * FROM baggage"):
        print(row)
PY
```

**Graduated hints:**

1. Airports track baggage in structured records.
2. Search `/var/lib` for a database associated with the airport lab.
3. Use SQLite to inspect the `baggage` table and the quarantined bag.

**Instructor note:** The deployment script uses Python's built-in SQLite support, so installation succeeds even if the standalone `sqlite3` command is not installed. Install the CLI ahead of the workshop when participants are expected to use it directly.

---

## Flag 4: Encoded Radio Transmission

**Concept:** Recognizing and decoding Base64 text.

**Location:**

```text
/opt/airport-lab/radio/last_transmission.b64
```

**Default flag:**

```text
FLAG{radio_message_decoded}
```

**Participant solution:**

```bash
base64 -d /opt/airport-lab/radio/last_transmission.b64
```

Useful discovery commands:

```bash
find /opt/airport-lab -type f -ls
file /opt/airport-lab/radio/last_transmission.b64
cat /opt/airport-lab/radio/last_transmission.b64
```

**Graduated hints:**

1. A recorded radio message is present, but it is not plain English.
2. The file extension identifies a common encoding.
3. Decode `last_transmission.b64` with `base64 -d`.

---

## Flag 5: Lost Luggage Symlink

**Concept:** Recognizing a symbolic link and following it to a hidden directory.

**Visible link:**

```text
/opt/airport-lab/lost-luggage
```

**Actual file:**

```text
/opt/airport-lab/.lost-and-found/gate-42.txt
```

**Default flag:**

```text
FLAG{lost_luggage_recovered}
```

**Participant solution:**

```bash
ls -la /opt/airport-lab
readlink -f /opt/airport-lab/lost-luggage
cat /opt/airport-lab/lost-luggage
```

The target can also be read directly:

```bash
cat /opt/airport-lab/.lost-and-found/gate-42.txt
```

**Graduated hints:**

1. Lost luggage may point somewhere unexpected.
2. Use `ls -la` and inspect symbolic links in `/opt/airport-lab`.
3. Follow or read `/opt/airport-lab/lost-luggage`.

---

## Flag 6: Black-Box Archive

**Concept:** Listing and reading a compressed tar archive without extracting files to disk.

**Location:**

```text
/opt/airport-lab/archives/black-box.tar.gz
```

**Archived file:**

```text
flight-AZ815/maintenance-note.txt
```

**Default flag:**

```text
FLAG{black_box_opened}
```

**Participant solution:**

```bash
tar -tzf /opt/airport-lab/archives/black-box.tar.gz
tar -xOzf /opt/airport-lab/archives/black-box.tar.gz \
  flight-AZ815/maintenance-note.txt
```

The capital `O` in `-xOzf` writes the archived file to standard output instead of creating a file.

**Graduated hints:**

1. The aircraft's recovered black box is packaged as an archive.
2. Use `tar` to list its contents before opening the relevant file.
3. Read `flight-AZ815/maintenance-note.txt` from the archive with `tar -xOzf`.

---

## Flag 7: Flight Recorder Strings

**Concept:** Extracting readable strings from a binary-like data file.

**Location:**

```text
/opt/airport-lab/flight-recorder.dat
```

**Default flag:**

```text
FLAG{flight_recorder_strings}
```

**Participant solution:**

```bash
strings /opt/airport-lab/flight-recorder.dat
```

A focused search is:

```bash
strings /opt/airport-lab/flight-recorder.dat | grep 'FLAG{'
```

Useful discovery command:

```bash
file /opt/airport-lab/flight-recorder.dat
```

**Graduated hints:**

1. Not every useful file is plain text.
2. The flight recorder contains human-readable fragments among binary bytes.
3. Run `strings` against `flight-recorder.dat`.

---

## Flag 8: Departure Board Command

**Concept:** Discovering and running an executable available through the shell's command path.

**Command:**

```text
airport-status
```

**Installed location:**

```text
/usr/local/bin/airport-status
```

**Default flag:**

```text
FLAG{departure_board_online}
```

**Participant solution:**

```bash
airport-status
```

Useful discovery commands:

```bash
command -v airport-status
which airport-status
type airport-status
ls -la /usr/local/bin/airport-status
```

**Graduated hints:**

1. The system may have a custom command for checking airport operations.
2. Custom administrator commands are commonly installed in `/usr/local/bin`.
3. Run `airport-status`.

**Instructor note:** This is a normal shell script with mode `0755`. It is not SUID and does not grant privileges.

---

## Flag 9: Airport Beacon Process

**Concept:** Inspecting process arguments to find information exposed in the process list.

**Systemd unit:**

```text
/etc/systemd/system/airport-beacon.service
```

**Default flag:**

```text
FLAG{beacon_visible_in_process_list}
```

**Participant solution:**

```bash
ps auxww | grep '[a]irport-beacon'
```

Other approaches:

```bash
pgrep -af airport-beacon
systemctl status airport-beacon.service --no-pager
cat /etc/systemd/system/airport-beacon.service
```

**Graduated hints:**

1. Some secrets are exposed through running command-line arguments.
2. Search the full process list for an airport-related beacon.
3. Run `ps auxww | grep '[a]irport-beacon'`.

**Instructor notes:**

- This egg is enabled by default.
- It requires a systemd-based environment to appear as a running process.
- In a container, chroot, WSL instance, or non-systemd distribution, the unit file may be installed without being active.
- The flag remains visible in the unit file even when the service cannot run.
- The service uses `DynamicUser`, `NoNewPrivileges`, a private temporary directory, and a read-only system view.
- Deploy with `--no-process-egg` when systemd is unavailable or the process exercise is not desired.

Check its state as an instructor:

```bash
systemctl is-active airport-beacon.service
systemctl status airport-beacon.service --no-pager
journalctl -u airport-beacon.service --no-pager -n 20
```

Repair it with the normal deployment command:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh | sudo bash
```

---

## Default Flag Answer Key

```text
FLAG{crew_credentials_found}
FLAG{boarding_log_anomaly}
FLAG{unclaimed_baggage_record}
FLAG{radio_message_decoded}
FLAG{lost_luggage_recovered}
FLAG{black_box_opened}
FLAG{flight_recorder_strings}
FLAG{departure_board_online}
FLAG{beacon_visible_in_process_list}
```

## Fast Instructor Validation

Run the installer's built-in validation:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh \
  | sudo bash -s -- --verify-only
```

Or check all solutions manually:

```bash
cat /etc/airport-lab/crew_credentials.bak
grep 'FLAG{' /var/log/airport-lab/boarding.log
sqlite3 /var/lib/airport-lab/baggage.db \
  'SELECT tag, status, notes FROM baggage;'
base64 -d /opt/airport-lab/radio/last_transmission.b64
cat /opt/airport-lab/lost-luggage
tar -xOzf /opt/airport-lab/archives/black-box.tar.gz \
  flight-AZ815/maintenance-note.txt
strings /opt/airport-lab/flight-recorder.dat
airport-status
ps auxww | grep '[a]irport-beacon'
```

## Common Questions and Troubleshooting

### A participant deleted or changed a flag

Run the deployment again:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh | sudo bash
```

This repairs the managed artifacts without requiring a separate cleanup step.

### Verification reports that a custom flag is wrong

When custom environment variables were used during deployment, use the same values for `--verify-only`. Otherwise, the verifier expects the default flags.

Example:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh \
  | sudo env FLAG_DB='FLAG{phx_unclaimed_baggage}' \
      bash -s -- --verify-only
```

### The `sqlite3` command is missing

The database itself is still valid. Use the Python fallback shown in the database section, or install the distribution's SQLite command-line package before the workshop.

### The beacon process is missing

Check whether the system uses systemd:

```bash
ps -p 1 -o comm=
test -d /run/systemd/system && echo 'systemd runtime detected'
```

Then inspect the service:

```bash
systemctl status airport-beacon.service --no-pager
```

Repair it by rerunning the deployment. On a non-systemd system, treat the installed unit file as the fallback discovery location or omit this egg.

### `curl | bash` returns a root-access error

The installer writes to system directories and must run as root:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh | sudo bash
```

### A participant asks whether exploitation is required

No. The flags demonstrate Linux discovery techniques after shell access is obtained. All intended solutions are read-only.

## Optional Custom Flags

Each flag can be replaced at deployment time with an environment variable:

```text
FLAG_CREW
FLAG_DB
FLAG_LOG
FLAG_RADIO
FLAG_HIDDEN
FLAG_ARCHIVE
FLAG_STRINGS
FLAG_COMMAND
FLAG_PROCESS
```

Example:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh \
  | sudo env \
      FLAG_DB='FLAG{phx_unclaimed_baggage}' \
      FLAG_RADIO='FLAG{contact_ground_control}' \
      bash
```

Record any customized values in the instructor answer key. Repeated deployments should use the same environment values, or the defaults will replace them.

## Suggested Difficulty Progression

A natural progression from easiest to more specialized is:

1. Crew credential backup: `find`, `cat`
2. Boarding log: `grep`
3. Departure board command: command discovery and execution
4. Lost luggage: hidden files and symbolic links
5. Radio transmission: Base64 decoding
6. Black box: archive inspection
7. Flight recorder: `strings`
8. Baggage database: SQLite inspection
9. Airport beacon: process-list inspection

The flags can be used independently, so participants do not need to complete them in this order.
