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
404.html             What GitHub Pages serves for an address that does not exist.
app.css              The app pages and guides, in the studio brand like the hub.
style.css            The privacy pages' stylesheet, in the brand. It styles their plain markup.
index.html           Hub, in the studio brand (brand/README.md). Its styles are inline.
brand/fonts/         Overpass, self-hosted so a visit tells Google nothing (OFL.txt).
brand/WEBSITE.md     The rules a page is held to, by kind of page: widths, type, parts, words.
_template/
  privacy.html       Skeleton for the next app's privacy policy. Start here, not from
                     Roadworthy's — see below.
  guide/index.html   Skeleton for a guide, with the steps for writing one at its top.
roadworthy/
  index.html         App page (app.css)
  privacy.html       THE privacy policy URL. Do not move it.
  guides/
    index.html       The list of Roadworthy's guides. A row for each, newest first.
    buying-a-used-car/
      index.html     Buyer's guide, for someone about to buy a used car, whether they come
                     from the app or from a search. Partner links go in its "Is a paid check worth it?" panel, each
                     with a line saying we may earn a commission, and a matching section in
                     privacy.html added at the same time.
    checking-a-log-book/
      index.html     How to check a log book (V5C): what to look for on it and on the car.
  buying-a-used-car.html   Where the buyer's guide used to be. Now only redirects to it.
  shots/             Roadworthy's store screenshots, 420 wide
  icon.png, screenshot.jpg   Shown on the hub
pump-prices/
  icon.png, screenshot.jpg   Shown on the hub
  privacy.html       Pump Prices' privacy policy URL. Do not move it. (No app page yet.)
```

## How the site is put together

Plain files, no build step and no framework. That is a choice, not a stopgap: there is nothing
to install, nothing to go out of date, and what is committed is exactly what is served. The
price is that shared parts (the studio bar, the footer) are repeated in each page, so a change
to one of them is made in every page, and the templates in `_template/` are where a new page
gets them from.

**Each app has its own directory**, holding its app page, its privacy policy, its screenshots
and its guides. Nothing belonging to one app lives in another's directory.

**A guide is a directory with an `index.html`**, so its address has no file name in it:
`/roadworthy/guides/buying-a-used-car/`. Guides are listed in that app's `guides/index.html`.

**Pages below an app's top level use paths from the root** (`/app.css`, `/roadworthy/icon.png`),
so a page keeps working if it moves and `404.html` works at any depth. The older pages (the hub,
the app page, the privacy policies) use relative paths and have been left as they are. Root
paths need a server to preview: `python -m http.server` in this directory, then open
`http://localhost:8000/`. Opening a guide's file directly from disk shows it unstyled.

**Stylesheets, fonts and images have not been gathered into an `assets/` directory.** Doing so
would touch every page, the Pump Prices policy generator and preview images already shared,
for no visible gain. Left alone on purpose, 13 October 2026.

**GitHub Pages cannot redirect on the server.** When a page moves, its old address keeps a
small page that sends the reader on (`roadworthy/buying-a-used-car.html` is the example) for as
long as anything links to it.

## Writing a guide

The steps are at the top of `_template/guide/index.html`. In short: record the facts first,
each with its source and the source's own words; write the page from that record; add the
guide to the app's guides list and to `sitemap.xml`; run the checker; have every fact, link
and layout reviewed before it is committed. A sentence that states a fact and has no record
is cut or sourced, never left.

**The facts are not in this repository.** They were, briefly, under `data/sources/`, and were
moved out on 13 October 2026: everything here is served to anyone who asks, and a tidy file of
sourced facts is worth more to a scraper than to a reader. They are kept in a separate private
repository, with saved copies of each source and the checker that compares a guide's record
with its page (footnotes, source links, dates, the words themselves). A guide is not committed
here until that checker passes.

**Structured data.** Guides and the Roadworthy page carry a small `application/ld+json` block
in the head that tells search engines what the page is. It must say nothing the page does not
show. A guide's block repeats its heading and the two dates printed in its Sources panel, so
when a guide is edited, "Last updated" and `dateModified` change together. The app block says
free, Android and where to install, and carries no ratings or category because the page
shows none.

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

So copy `_template/privacy.html`, never another app's page. The template marks which sections are shared
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
field should point at `https://happypathapps.co.uk`. The owner changed it to that address on
13 October 2026. AdMob showed both apps as "found and verified" that day, but from a crawl of
the old `https://happypathapps.github.io/app-ads.txt` address made before the site moved, so it
shows neither that the new address is being read nor that the crawler follows the redirect.
Look again in a few days: AdMob should then list the `.co.uk` address. If it still lists
`github.io`, check the Play Console field.

The line here follows the documented format. AdMob's console generates a personalised snippet
under **Apps → app-ads.txt**; if it differs from this file, the console wins.

Verify with **Apps → app-ads.txt → Check for updates** in AdMob. It reports `Found` or `Not
found`, and can take a day or two to crawl after publishing.

## Publishing

Push to `master`. No build step — `.nojekyll` disables Jekyll, so files are served exactly as
committed (and `_template/` is left alone rather than treated as Jekyll internals).
