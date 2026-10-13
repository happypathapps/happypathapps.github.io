# Happy Path Apps website

This repository is public and every file in it is served at <https://happypathapps.co.uk>,
this one included. Put nothing private here: no facts files, no saved sources, no notes about
the business, no addresses of private pages.

Before changing anything, read `README.md` (how the site is put together, and the addresses
that must never move) and `brand/WEBSITE.md` (the rules a page is held to, by kind of page).

The rules of work are not kept here. They are in the content repository, which sits beside
this one as `../happypathapps-content`: its `CLAUDE.md`, and its `write-guide` skill for any
guide. Start a session there for a guide, or for a change to how pages look. In short:

- A page, or a change to how pages look, is designed and signed off by the owner before it
  is built. Until then it is a draft and is called one.
- A guide's facts are recorded in the content repository first, and its checker must pass.
- Every change is reviewed by an independent reviewer before it is committed. That
  repository's `CLAUDE.md` has the one exception.
- The owner pushes this repository. Give the command; do not push it yourself unless asked.
- `pump-prices/privacy.html` is made by a tool in the Pump Prices repository. Never edit it
  by hand.

If `../happypathapps-content` is not there, stop and say so. Do not work from memory of its
rules.
