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
CNAME                The custom domain, happypathapps.co.uk. GitHub wrote it; leave it alone.
robots.txt           Points search engines at the sitemap. Blocks nothing.
sitemap.xml          The pages meant to be found by search. Add each new content page here;
                     the privacy policies are left out on purpose.
app.css              The app pages, in the studio brand like the hub.
style.css            The older look, still used by the privacy pages.
index.html           Hub, in the studio brand (brand/README.md). Its styles are inline.
_template/           Skeleton for the next app's privacy policy. Start here, not from
                     Roadworthy's — see below.
brand/fonts/         Overpass, self-hosted so a visit tells Google nothing (OFL.txt).
roadworthy/
  index.html         App page (app.css)
  buying-a-used-car.html   Buyer's guide (app.css), written for a Roadworthy user part-way
                           through buying a car. Every fact traces to data/sources/. Partner
                           links go in its "Is a paid check worth it?" panel.
  shots/             Its store screenshots, 420 wide
  icon.png, screenshot.jpg   Shown on the hub
  privacy.html       THE privacy policy URL. Do not move it.
pump-prices/
  icon.png, screenshot.jpg   Shown on the hub
  privacy.html       Pump Prices' privacy policy URL. Do not move it. (No app page yet.)
data/sources/        Verified facts behind the content pages: each with its source, the
                     wording checked, and the date. Change a fact here first, then the page.
```

## One repo, but one policy per app

Both halves of that matter.

**One repo**, because `app-ads.txt` is per *publisher account*, not per app: one file, one line
carrying the AdMob publisher ID, authorising every app under it. It has to sit at the root of the
developer website, so something must own the root. A user site does; a project page at
`/somename/` does not, because the crawler looks at the domain root regardless of the path.

**One policy per app**, because a privacy policy is a factual statement about what a specific app
does. Roadworthy's says photographs never leave the device and MOT history passes through a
small server; Pump Prices' says its server is asked for a map square, never your position.
Each describes one app's data flows and neither describes the other's, and Google check the
policy against that app's Data Safety declaration, which is filled in per app.

The failure mode is drift: ship a third app, widen the shared policy to cover its location
tracking, and Roadworthy's published policy now describes collection Roadworthy does not do. Every
app's policy becomes wrong whenever any one app changes.

So copy `_template/`, never another app's page. The template marks which sections are shared
boilerplate about the business and which are per-app facts that have to be written by reading that
app's code.

## The URLs that must never move

<https://happypathapps.co.uk/roadworthy/privacy.html>
<https://happypathapps.co.uk/pump-prices/privacy.html>

The same paths on `happypathapps.github.io` are what the shipped apps, the Play listings and
AdMob were given. They redirect to the addresses above, so they must keep working too: that
means keeping this repository's name and the custom domain as they are.

Each is referenced from three places that are painful to change once live:

1. The Google Play listing
2. The AdMob account
3. Inside the app, as `privacy_policy_url` in `strings.xml` — so changing it needs a release

Change the contents freely; never the filename. Adding a new app never touches an existing one's
path, which is the whole reason for the per-app subdirectories.

The site moved to its own domain on 13 October 2026 (see "The domain" below). The `github.io`
addresses redirect to it, so links inside already-shipped APKs keep working, which is the only
reason a custom domain was safe to add after launch at all.

**Source of truth for each policy is `docs/privacy-policy.md` in that app's repo.** Pump
Prices' page is generated from it, not copied by hand. Edit
there first, mirror here, and update the date in both. A stale "last updated" against changed data
flows is worse than no date at all.

## The domain

The site is served at `happypathapps.co.uk` since 13 October 2026, as a GitHub Pages custom
domain. The `github.io` addresses redirect to it.

- The domain is registered at Namecheap. Its DNS has four A records to GitHub Pages and `www` as
  a CNAME to `happypathapps.github.io`.
- It is verified for the `happypathapps` **organisation** (Settings, Pages), which stops anyone
  else attaching it to their own site. Verifying it for a personal account does not count:
  the repository belongs to the organisation.
- GitHub issues and renews the certificate. "Enforce HTTPS" is on.
- Every page's canonical address and preview image name the `.co.uk` domain. A new page should
  too, and should be added to `sitemap.xml` if it is meant to be found by search.
- Pump Prices' policy page is generated (see above), and its generator writes the canonical
  address. Until `tools/privacy-page/build.js` in that repository is changed to the `.co.uk`
  domain, regenerating the page will put the old address back.

## `app-ads.txt`

Declares that Google AdMob is authorised to sell ad inventory for these apps, which is what stops
someone else spoofing them. AdMob's crawler looks for it at the root of the **developer website
URL from the Play Console listing** (Store settings → Store listing contact details), so that
field should point at `https://happypathapps.co.uk`. While it still says
`https://happypathapps.github.io`, the file is reached only through the redirect, and whether
AdMob's crawler follows that has not been checked. When this was written (13 October 2026) the
field had not yet been changed.

The line here follows the documented format. AdMob's console generates a personalised snippet
under **Apps → app-ads.txt**; if it differs from this file, the console wins.

Verify with **Apps → app-ads.txt → Check for updates** in AdMob. It reports `Found` or `Not
found`, and can take a day or two to crawl after publishing.

## Publishing

Push to `master`. No build step — `.nojekyll` disables Jekyll, so files are served exactly as
committed (and `_template/` is left alone rather than treated as Jekyll internals).
