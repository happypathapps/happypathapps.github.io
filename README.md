# happypathapps.github.io

The public face of Happy Path Apps: landing pages, privacy policies, and `app-ads.txt`.
Static HTML served by GitHub Pages.

**App source lives in separate private repos. Nothing in here is code.** That is what makes the
public/private question a non-issue rather than a compromise — everything committed here is
meant to be read.

## Why an organisation and not a personal account

GitHub Pages user sites are named after the account, so `happypathapps.github.io` requires a
GitHub organisation called `happypathapps`. Organisations are free.

It is not decoration. `app-ads.txt` is an ownership claim, and it is worth much less if the
domain, the AdMob publisher and the Play developer do not obviously belong to the same person.
The contact address `happypathapps@gmail.com` is already baked into every app's privacy policy
and outbound User-Agent, so the site should agree with it.

Source repos may live under a personal account or the org — it makes no difference here, which is
the point. The published URLs must never depend on where the code happens to sit.

## Layout

```
app-ads.txt          AdMob crawls this. Must stay at the ROOT.
style.css            Shared, so every app's pages read as one family.
index.html           Hub.
_template/           Skeleton for the next app's privacy policy. Start here, not from
                     Roadworthy's — see below.
roadworthy/
  index.html         App page
  privacy.html       THE privacy policy URL. Do not move it.
```

## One repo, but one policy per app

Both halves of that matter.

**One repo**, because `app-ads.txt` is per *publisher account*, not per app: one file, one line
carrying the AdMob publisher ID, authorising every app under it. It has to sit at the root of the
developer website, so something must own the root. A user site does; a project page at
`/somename/` does not, because the crawler looks at the domain root regardless of the path.

**One policy per app**, because a privacy policy is a factual statement about what a specific app
does. Roadworthy's says photographs never leave the device and there is no server. That will not
be true of the next app, and Google check the policy against that app's Data Safety declaration,
which is filled in per app.

The failure mode is drift: ship a third app, widen the shared policy to cover its location
tracking, and Roadworthy's published policy now describes collection Roadworthy does not do. Every
app's policy becomes wrong whenever any one app changes.

So copy `_template/`, never another app's page. The template marks which sections are shared
boilerplate about the business and which are per-app facts that have to be written by reading that
app's code.

## The URLs that must never move

<https://happypathapps.github.io/roadworthy/privacy.html>

Referenced from three places that are painful to change once live:

1. The Google Play listing
2. The AdMob account
3. Inside the app, as `privacy_policy_url` in `strings.xml` — so changing it needs a release

Change the contents freely; never the filename. Adding a new app never touches an existing one's
path, which is the whole reason for the per-app subdirectories.

If a real domain is ever bought, point it here as a GitHub Pages custom domain. The `github.io`
addresses then redirect to it, so links inside already-shipped APKs keep working — which is the
only reason a custom domain is safe to add later at all.

**Source of truth for Roadworthy's policy is `docs/privacy-policy.md` in the app repo.** Edit
there first, mirror here, and update the date in both. A stale "last updated" against changed data
flows is worse than no date at all.

## `app-ads.txt`

Declares that Google AdMob is authorised to sell ad inventory for these apps, which is what stops
someone else spoofing them. AdMob's crawler looks for it at the root of the **developer website
URL from the Play Console listing** (Store settings → Store listing contact details), so that
field must point at `https://happypathapps.github.io` or the file is never found.

The line here follows the documented format. AdMob's console generates a personalised snippet
under **Apps → app-ads.txt**; if it differs from this file, the console wins.

Verify with **Apps → app-ads.txt → Check for updates** in AdMob. It reports `Found` or `Not
found`, and can take a day or two to crawl after publishing.

## Publishing

Push to `master`. No build step — `.nojekyll` disables Jekyll, so files are served exactly as
committed (and `_template/` is left alone rather than treated as Jekyll internals).
