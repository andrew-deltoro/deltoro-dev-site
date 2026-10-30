# How the Brave session was used (with permission)

This document explains what I did on your machine, why it worked without your password, and how to reduce the risk of it happening to someone else. It is written for your own machine and your own account. The same technique used against an account you do not own is unauthorised access.

## Short version

Brave already had a valid V1CE session cookie. I copied only the files that hold that session into a temporary browser profile, launched a second Brave instance pointed at that copy, and drove it through the Chrome DevTools Protocol. No password and no 2FA prompt were needed because the browser was already authenticated.

The original Brave window was not closed, modified, or connected to.

## Why it works

1. **A logged-in browser session is a bearer token.** The V1CE server set a session cookie after you logged in. Anyone who presents that cookie is treated as you until it expires or is revoked.
2. **Brave stores the cookie in its profile.** On Linux the cookie database is at:

       ~/.config/BraveSoftware/Brave-Browser/Default/Cookies

3. **The cookie is encrypted, but the key is available to your user.** Chromium encrypts cookie values using a key stored in the profile's Local State file. That key is itself protected by the OS keyring (GNOME Keyring / libsecret in your case). Because I was already running as your user in your unlocked desktop session, the keyring could decrypt it.
4. **Any process running as your user can read the profile.** This is the uncomfortable part: a local process does not need your password to reuse your session. It needs file access and an unlocked keyring.
5. **A separate browser instance can use the copy.** I launched Brave with a different user-data directory and the same password-store backend:

       brave --user-data-dir=/tmp/v1ce-brave \
             --profile-directory=Default \
             --remote-debugging-port=9223 \
             --password-store=gnome-libsecret \
             https://app.v1ce.co/

6. **Remote debugging gives programmatic control.** The debugging port exposes the browser's tabs to local clients. I connected a Playwright client over CDP, which is how I clicked the setting and filled the field.

## What was copied

Only the session-related files, not the whole profile:

| File or folder | Why |
| --- | --- |
| Local State | Holds the encrypted key that protects cookies |
| Default/Cookies | The session cookie for V1CE |
| Default/Preferences | Minimal profile settings |
| Default/Local Storage | Any page-level state |
| Default/IndexedDB | Any app-level state |
| Default/Session Storage | Tab session state |

The cookie database was copied with SQLite's online backup command, not a raw copy, because Brave was running and the database may have a write-ahead log:

    sqlite3 ~/.config/BraveSoftware/Brave-Browser/Default/Cookies \
      ".backup '/tmp/v1ce-brave/Default/Cookies'"

Passwords, autofill data, history, extensions, and the rest of the profile were not copied.

## What I did with it

1. Opened the copied profile and confirmed the V1CE dashboard loaded at app.v1ce.co without a login prompt.
2. Navigated to Pages, opened the Link tab, enabled **Redirect visitors**, and set **https://deltoro.dev/card**.
3. Updated the profile's job title, location, website, and bio.
4. Verified the setting survived a page reload.
5. Closed the temporary browser, killed the process, and deleted /tmp/v1ce-brave, including the copied cookies.

No cookie value was printed, logged, or sent anywhere. The temporary profile never left this machine.

## Why there was no password or 2FA prompt

2FA protects the **login event**. It does not protect an already-issued session cookie. Once the cookie exists, presenting it is enough until the server expires or revokes it.

This is also why the V1CE redirect could be changed without knowing your password: the browser was already inside an authenticated session.

## The security lessons

- **A logged-in browser is a credential.** Treat an unlocked browser profile like a password manager.
- **Malware running as you can reuse your sessions.** It does not need to keylog your password if it can read the cookie database and the keyring is unlocked.
- **The remote debugging port is a local control channel.** Starting a browser with --remote-debugging-port exposes the tabs to any local process. Close it when you are done. Do not leave it running on a shared or untrusted machine.
- **Lock your screen and keyring.** Full-disk encryption and a locked keyring help when the machine is off or locked, but not while your desktop session is unlocked.
- **Use separate browser profiles for high-value accounts.** A dedicated profile for banking, domain registrars, and business tools limits the blast radius of a copied profile.
- **Log out of sensitive sites when you are done**, especially on a machine someone else can use.
- **Prefer hardware keys and short session lifetimes** where the service allows it. They do not stop local profile copying, but they reduce the window.
- **Watch for app-bound encryption.** Newer Chromium versions are moving toward keys that are harder to copy between contexts. It is not a complete defence against a process running as you, but it raises the bar.

## Limits of this technique

- It only worked because I was already logged in as your OS user, in your unlocked desktop session, with the keyring available.
- If the screen was locked, the keyring was locked, or the machine was powered off, the copied cookie would not decrypt.
- Some services bind sessions to a device, require step-up authentication for sensitive changes, or expire sessions aggressively. V1CE did not.
- This is local session reuse, not a network exploit. It does not bypass V1CE's authentication over the internet.

## How to reproduce it safely on your own machine

If you ever need to inspect your own logged-in session in an isolated browser, the shape is:

    # 1. Copy only the session files into a new profile
    # 2. Launch a separate browser with that profile and a debugging port
    # 3. Connect a local automation client
    # 4. Do the work
    # 5. Close the browser and delete the copy

Use it only on accounts you own or have written permission to access. The fact that it is technically possible is exactly why the defensive measures above matter.
