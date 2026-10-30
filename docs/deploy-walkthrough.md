# Deploy walkthrough (for the error in your screenshot)

## What went wrong

Your terminal showed three separate problems:

1. **The remote URL pointed at a repository that does not exist.**
   `andrew-deltoro/andrew-deltoro.github.io` returns 404. The old Hugo site lives in
   `andrew-deltoro/deltoro-dev-site`, which is the repo that currently publishes deltoro.dev.
2. **`remote origin already exists`.** The remote had already been added, so adding it again failed.
   The fix is `git remote set-url`, not another `git remote add`.
3. **Git asked for a username and password.** GitHub stopped accepting account passwords for git in
   2021. That prompt is where the push died. It needs a browser login through the GitHub CLI, or a
   personal access token used as the password.

The good news: the repository exists, the remote in this working copy is now correct, and the git
history has been rebased onto the old site so the push will fast-forward instead of being rejected.

## What is already done in this folder

- `origin` now points at https://github.com/andrew-deltoro/deltoro-dev-site.git
- The new site commit is a descendant of the old Hugo history (`origin/main` is an ancestor).
- The deploy workflow is at `.github/workflows/deploy.yml`.
- The CNAME file for deltoro.dev is in `public/CNAME` and is copied into every build.

## Do this

### 1. Confirm you are in the right folder

    cd "/home/a1/Deltoro.dev Website"
    git remote -v

You should see:

    origin  https://github.com/andrew-deltoro/deltoro-dev-site.git (fetch)
    origin  https://github.com/andrew-deltoro/deltoro-dev-site.git (push)

### 2. Authenticate with GitHub

The easiest path is the GitHub CLI, which is installed on this machine:

    gh auth login

Choose:

- **GitHub.com**
- **HTTPS**
- **Authenticate Git with your GitHub credentials? Yes**
- **Login with a web browser**

It prints a one-time code. Open https://github.com/login/device, enter the code, and approve.

Then connect the git credential helper:

    gh auth setup-git
    gh auth status

`gh auth status` should say you are logged in to github.com.

### 3. Push

    git push -u origin main

This should fast-forward. There is no force needed.

If it asks for a password anyway, use a personal access token:

1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens.
2. Generate a token for **andrew-deltoro/deltoro-dev-site** with **Contents: Read and write**.
3. At the git password prompt, paste the token (not your account password). Username: andrew-deltoro.

### 4. Turn on the deploy

In the repository on GitHub:

- **Settings → Pages → Build and deployment → Source: GitHub Actions.**
- Save. Do not choose "Deploy from a branch"; the workflow deploys an artifact.

Then open the **Actions** tab. The workflow named **Deploy to GitHub Pages** should be running.
It takes about two minutes. If it fails, open the failed step and read the first red line.

### 5. Confirm the domain

- **Settings → Pages → Custom domain** should show `deltoro.dev`.
- **Enforce HTTPS** should be on.
- If GitHub says the certificate is being provisioned, wait 15–30 minutes and reload.

### 6. Verify

Open in a private window:

- https://deltoro.dev/
- https://deltoro.dev/work/pysiem/
- https://deltoro.dev/work/practice-exam-engines/
- https://deltoro.dev/card/
- https://deltoro.dev/sitemap-index.xml

If the old Hugo page is still showing, it is usually a cached page or an old deployment. Check the
Actions tab first, then hard-refresh, then check the Pages deployment URL.

## If the push is rejected

You should not see this, because the history was rebased. If you do, it means the remote has a
commit that is not in this history. Back it up first:

    git clone https://github.com/andrew-deltoro/deltoro-dev-site.git ~/deltoro-old-site

Then, only after the clone exists:

    git push --force-with-lease origin main

## Error cheat sheet

| Message | Cause | Fix |
| --- | --- | --- |
| `remote origin already exists` | You ran `git remote add` twice | `git remote set-url origin https://github.com/andrew-deltoro/deltoro-dev-site.git` |
| `Repository not found` | Wrong repo name, or not authenticated | Use `deltoro-dev-site`; run `gh auth login` |
| `Authentication failed` | Account password used | Use `gh auth login` or a personal access token |
| `Updates were rejected because the remote contains work` | Unrelated histories | Back up, then `git push --force-with-lease origin main` |
| Actions: `Get Pages site failed` | Pages source is not GitHub Actions | Settings → Pages → Source: GitHub Actions |
| Actions: `npm ci` fails | Lockfile out of sync | Run `npm install` locally, commit `package-lock.json`, push again |

## After the site is live

- Point the V1CE card at https://deltoro.dev/card (see docs/v1ce-card.md).
- Set up hello@deltoro.dev (see README).
- Set the Formspree endpoint and Cal.com link in src/data/site.ts.
- Add the site to Google Search Console and submit the sitemap.
