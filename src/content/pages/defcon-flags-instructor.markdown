---
layout: page
title: DEF CON Linux Kiosk Lab Instructor Guide
description: Quick reference for the Linux kiosk escape and airport flag lab.
permalink: /defcon-flags-instructor/
---

# DEF CON Linux Kiosk Lab

Instructor reference for three or more Ubuntu kiosks running the [Initial Escape Tactics playbook][playbook] and the airport flags installed by [`defcon-flags.sh`](/defcon-flags.sh).

The kiosks are intentionally breakable. The `kiosk` user has sudo access so the lab can be changed, reset, and redeployed.

## Quick Reference

| Need | Value or command |
| :--- | :--- |
| Login | `kiosk` / `NotLimuEmu` |
| WiFi | `☕ demo` / `demodemo` |
| Participant clue | `hint` |
| Instructor terminal | `Ctrl+Alt+Shift+O` |
| Return to kiosk | `sudo reboot` |
| Reset kiosk | `kiosk reset --reboot` |
| Repair flags | [Redeploy airport flags](#flags) |

## Start and Check

Power on the device. No setup is needed. GDM logs in as `kiosk`, GNOME autostart runs `~/Public/start-kiosk.sh`, and the kiosk app should open full screen after about five seconds.

On Firefox 147 or newer, verify that `Ctrl+W`, `Ctrl+Shift+W`, and `Ctrl+Q` do nothing. Confirm that kiosk links can still open tabs or popups and that the email link launches Thunderbird.

For a device configured with `--touchscreen`, press and hold a folder in Nautilus and confirm **Open > Open in Console** launches GNOME Console.

## Main Demonstration

1. Find and click an email (`mailto:`) link in the kiosk.
2. The link opens Thunderbird, which is installed and registered as the mail handler on the lab image.
3. In Thunderbird, open **Help > Troubleshooting Information**.
4. Next to **Profile Folder**, select **Open Folder** or **Open Directory**.
5. The host file manager opens. Use it to reach a directory and open a terminal.
6. In the terminal, run `hint` and begin finding the airport flags.

On the lab image, this Thunderbird path opens the host file manager outside Firefox's Snap sandbox. Ubuntu's default Firefox runs as a Snap, so its own file picker does not provide the same path to the host file manager and **Open in Terminal**.

This is the easiest path to demonstrate, not the only escape. Let participants explore other protocol handlers, applications, shortcuts, and system interactions. The [live playbook][playbook] and [pinned workshop version][pinned-playbook] contain the supporting material.

## Recovery

Rebooting should automatically log in as `kiosk` and return to the full-screen kiosk.

For a normal reset, press `Ctrl+Alt+Shift+O`, then run:

```bash
kiosk reset --reboot
```

The reset restores the kiosk files and autostart configuration, reapplies GDM login and lockdown, and reboots. Run only one reset at a time per device.

If the kiosk is damaged beyond a normal reset, run these commands from the Initial Escape Tactics directory:

```bash
kiosk remove
./prepare-kiosk.sh --level 2 --browser firefox --user kiosk --reboot
```

## Switching Kiosk Apps

Two kiosk apps are available and both should work. If one is misbehaving, switch between them with `--app`:

- Omit it to use `airline_kiosk.html`.
- Pass a local HTML filename beside `prepare-kiosk.sh`, such as `--app airport-coffee-kiosk_touchscreen.html`.
- Available local apps: `airline_kiosk.html` and `airport-coffee-kiosk_touchscreen.html`.
- You can also pass an `http://` or `https://` URL, but local files are preferred when the workshop must work without network access.
- The selection is saved during initial setup and reused by `kiosk reset`.

```bash
kiosk remove
./prepare-kiosk.sh --level 2 --browser firefox --user kiosk --app airport-coffee-kiosk_touchscreen.html --reboot
```

`kiosk reset` reuses the saved app and browser. To change either one, remove the saved kiosk configuration and run setup again:

```bash
kiosk remove
./prepare-kiosk.sh --app airport-coffee-kiosk_touchscreen.html --browser chrome --user kiosk --reboot
```

After the kiosk is restored, redeploy the flags:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh | sudo bash
```

## Update the Kiosk Page

From the cloned Initial Escape Tactics directory:

```bash
git pull
./prepare-kiosk.sh reset --reboot
```

`kiosk reset --reboot` alone uses the already-installed app. URL apps load their remote content directly.

## Touchscreen Console Access

Add `--touchscreen` during setup to install GNOME Console for Nautilus's **Open > Open in Console** touch path. To enable it on an existing device from the updated repository:

```bash
./prepare-kiosk.sh reset --touchscreen --reboot
```

## Hide Activities and Settings

`--disable-gnome-clickable` is optional. It hides the clickable Activities button and Settings gear if a participant reaches the desktop; it is not required for the standard kiosk.

For initial setup:

```bash
./prepare-kiosk.sh --level 2 --browser firefox --user kiosk \
  --disable-gnome-clickable --reboot
```

To toggle it during a reset:

```bash
kiosk reset --disable-gnome-clickable --reboot
kiosk reset --no-disable-gnome-clickable --reboot
```

## Flags

Participants can run `hint` repeatedly for random clues. The command never prints an answer.

The flag deployment is idempotent, so rerunning it repairs missing or changed lab artifacts. Verify without making changes:

```bash
curl -fsSL https://christiant.io/defcon-flags.sh \
  | sudo bash -s -- --verify-only
```

<details markdown="1">
<summary><strong>Flag answer key</strong></summary>

| Exercise | Quick solution | Default flag |
| :--- | :--- | :--- |
| Crew backup | `cat /etc/airport-lab/crew_credentials.bak` | `FLAG{crew_credentials_found}` |
| Boarding log | `grep 'FLAG{' /var/log/airport-lab/boarding.log` | `FLAG{boarding_log_anomaly}` |
| Baggage database | `sqlite3 /var/lib/airport-lab/baggage.db 'SELECT notes FROM baggage;'` | `FLAG{unclaimed_baggage_record}` |
| Radio message | `base64 -d /opt/airport-lab/radio/last_transmission.b64` | `FLAG{radio_message_decoded}` |
| Lost luggage | `cat /opt/airport-lab/lost-luggage` | `FLAG{lost_luggage_recovered}` |
| Black box | `tar -xOzf /opt/airport-lab/archives/black-box.tar.gz flight-AZ815/maintenance-note.txt` | `FLAG{black_box_opened}` |
| Flight recorder | `strings /opt/airport-lab/flight-recorder.dat` | `FLAG{flight_recorder_strings}` |
| Airport command | `airport-status` | `FLAG{departure_board_online}` |
| Beacon process | `pgrep -af airport-beacon` | `FLAG{beacon_visible_in_process_list}` |

</details>

## Workshop Sources

- [Initial Escape Tactics: current branch][playbook]
- [Initial Escape Tactics: pinned workshop version][pinned-playbook]
- [Protocol-handler escape walkthrough][protocol-handler]
- [Next steps: persistence and enumeration][next-steps]
- [Internal discovery and recon][internal-discovery]
- [Post-exploitation][post-exploitation]
- [Defensive recommendations][defensive-recommendations]
- [`defcon-flags.sh`](/defcon-flags.sh)

[playbook]: https://github.com/christian-taillon/CTRL-ESC-HOST/tree/main/2%20-%20Kiosk%20Playbook/4%20-%20Linux%20Kiosks/1%20-%20Initial%20Escape%20Tactics
[pinned-playbook]: https://github.com/christian-taillon/CTRL-ESC-HOST/tree/01816693c7add6dbcaad0aed507a591d64db156d/2%20-%20Kiosk%20Playbook/4%20-%20Linux%20Kiosks/1%20-%20Initial%20Escape%20Tactics
[protocol-handler]: https://github.com/christian-taillon/CTRL-ESC-HOST/tree/main/2%20-%20Kiosk%20Playbook/4%20-%20Linux%20Kiosks/1%20-%20Initial%20Escape%20Tactics/Protocol-Handler-Escape
[next-steps]: https://github.com/christian-taillon/CTRL-ESC-HOST/tree/main/2%20-%20Kiosk%20Playbook/4%20-%20Linux%20Kiosks/2%20-%20Next%20Steps
[internal-discovery]: https://github.com/christian-taillon/CTRL-ESC-HOST/tree/main/2%20-%20Kiosk%20Playbook/4%20-%20Linux%20Kiosks/3%20-%20Internal%20Discovery%20and%20Recon
[post-exploitation]: https://github.com/christian-taillon/CTRL-ESC-HOST/tree/main/2%20-%20Kiosk%20Playbook/4%20-%20Linux%20Kiosks/4%20-%20Post-Exploitation%20-%20Moving%20from%20Kiosk%20to%20Domain%20and-or%20Network
[defensive-recommendations]: https://github.com/christian-taillon/CTRL-ESC-HOST/tree/main/2%20-%20Kiosk%20Playbook/5%20-%20Defensive%20Recommendations
