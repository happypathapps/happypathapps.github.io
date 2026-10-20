# Happy Path Apps: website guidelines

Draft. The owner agreed a summary of these rules, and gave the two decisions marked below, on
13 October 2026; the owner has not yet read this text. Until that sign-off it is a draft.

It writes down what the site does today. Where the kinds of page differ, it says which kind a
rule is for: a rule for guides is not a reason to change a privacy policy or the home page.
The mark, the film and the colour values are in `README.md` beside this. The designs each
kind of page follows are on the studio's design canvas.

## 1. The kinds of page

| Kind of page | Stylesheet | Width | Skeleton | Today |
|---|---|---|---|---|
| The home page | `app.css`, `<body class="home">` | 1200px | none | `/` |
| An app's page | `app.css` | 1200px, a phone screenshot beside the words | `_template/app/` | `/roadworthy/` |
| A guide | `app.css`, `<body class="guide">` | 1200px; the words in the reading column (at most 678px), "On this page" beside it | `_template/guide/` | five, under `/roadworthy/guides/` |
| An app's list of guides | `app.css`, `<body class="guide guide-list">` | 1200px, three cards across (two from 641 to 960px, one on a phone), each with its guide's picture, label and date | none yet | `/roadworthy/guides/` |
| A privacy policy | `style.css` | 1200px; the words in the reading column, "On this page" beside it (Pump Prices': the column only, until its tool writes the contents) | `_template/privacy.html` | Roadworthy's, Pump Prices' |
| The list of partner links | `style.css`, a privacy policy's parts | 1200px; laid out as a privacy policy, "On this page" beside the words | none | `/partner-links/` |
| Company details | `style.css`, a privacy policy's parts | 1200px; the details a plain list with rules, the width of a policy's contents and words (962px) | none | `/company/` |
| Not found; a page that only sends the reader on | `app.css` | 1200px; the title at the frame's edge, the panel across the frame | none | `/404.html`, `/roadworthy/buying-a-used-car.html` |

- Pump Prices' privacy policy is made by a tool in that app's own repository. It is never
  edited by hand, here or anywhere: what it should look like is changed in that tool.
- The files under `brand/source/` are drawing tools, not pages of the site.

## 2. Rules for every page

- No page carries styles of its own: no `<style>` block and no `style="..."`. There is no
  exception: the home page's are in `app.css`, in a section of its own.
- Only the colours in `README.md`, "Website colours". A new one is added there, with what it
  is for, before it is used. No amber: things to watch for are marked in green. (The home page
  has a light pair for its "soon" chip, which that section lists.)
- Green `#4ADE80` is for buttons, for links and figures on ink, and for the rule beside a
  quotation. It is too pale for text on a light ground: links, labels and footnote numbers
  there use green-text `#1E7A47`.
- An app's own colours appear only in its icon and its screenshots. Google's badge carries
  Google's colours, unaltered, inside Google's file.
- Text and its ground differ by at least 4.5 to 1.
- Overpass, served from this site. No other typeface for words, with two exceptions, each
  a thing shown as it is and not prose: a web address set in `code` and a boxed serial number
  are in the system's monospace.
- The gutter at each side is `clamp(20px, 5vw, 56px)`, except the home page's top, which has
  a fixed 20px.
- A button is at least 44px tall, and fully rounded.
- British English. No em dashes or en dashes. No exclamation marks.
- At most one h1.

## 3. Rules for pages styled by `app.css`

These are the app page, the guides and the list of guides. The home page, the not-found page
and the page that only sends the reader on use `app.css` too, but are not held to this
section. The home page shows every app and not one, and the other two have no app to show;
none has a top of this kind. The home page and the not-found page carry the site's foot (below),
with no small print except, on the home page, the trade mark line that goes with Google's badge;
the page that only sends the reader on has no foot. They do keep "One frame" and the breakpoints. The home
page's own parts (the lockup at its top, a light "Coming soon" button for an app not yet on Play, a light "soon" chip) are in the home
page's section of `app.css`.

- The studio bar is first: the mark and "Happy Path Apps", linking home.
- On a page that belongs to an app, the app's bar is next, a band of `#2A333D`: the app's icon
  and name, linking to its page, then Guides and Privacy policy on the right, the current one
  underlined in green. On a phone it is one row of tabs from the left, and below 360px the icon
  goes so the row fits on one line (with large text the links may wrap to a second). The same on the app's page, its guides and its privacy
  policy (version B, phones B2, signed off 19 October 2026). The home page and the studio's own
  pages (company details, partner links, not found) have no app's bar.
- Then the top, in ink: the app's icon, the h1, one opening line. (The app page's top also
  holds Google's "Get it on Google Play" badge, a line of small print and a phone screenshot.)
- Where an app is offered for download (its page's top, its row on the home page) the link is
  Google's own badge, not a button: Google's file, unaltered, in `brand/google-play/`, 52px tall,
  with a quarter of its height clear on every side. A page that shows it adds Google's line to
  the small print in its foot: "Google Play and the Google Play logo are trademarks of Google
  LLC." Google's badge rules ask for that line where there is room. A guide's app card keeps its
  own button (version A, signed off 19 October 2026).
- The foot is ink, and its links are the same on every page (below). Under them, a page that
  belongs to an app carries that app's own disclaimer, copied from that app's page.
- **One frame.** Every page is one width: 1200px less its gutters (`.wrap` in `app.css`,
  `main` in `style.css`). The bar, the top, the body and
  the foot share the same left and right edges, and those edges are the same on every page,
  so nothing moves as a reader goes from one page to another. No page, and no kind of page,
  sets a width of its own. The owner's choice of 14 October 2026 ("One frame, version 2" on
  the design canvas), after the guides and policies had been built 720px wide beside pages
  1040px wide; widened from 1040 to 1200px by the frame plan, signed off 20 October 2026
  ("H · Frame plan" on the canvas, after two reviews by the ux-reviewer agent).
- **The reading column.** Inside the frame, a guide's words and a policy's words sit in one
  column at most 678px wide (narrower on a smaller window; about 80 to 95 characters a line of
  17px Overpass at full width), with "On this page" beside it
  on a wide screen: `.guide-layout` in `app.css`, `.policy-layout` in `style.css`. The column is in
  pixels, not `ch`, because `ch` follows the font size and gave the two kinds of page different
  widths. "On this page" is every h2, word for word and in order, each linked by its id; on a
  phone and a tablet it is a white box with a thin rule above the words, in two columns from
  about 360px wide. It stays in view while the page scrolls from a 600px-tall window on a guide
  (every guide's contents fit there today) and from 640px on a policy (Roadworthy's contents
  are 603px tall); a longer list scrolls
  inside itself. No link in it is marked as the
  current section: that needs a script, and the site has none. Every page keeps one left edge,
  from the studio's bar through the title and the words to the foot; nothing is centred in the
  frame but the home page's opening: its mark, name and line under them (board N, signed off
  20 October 2026, after centring was tried on board K and the column
  alone at the left edge was turned down). The partner links are laid out as a policy, with
  their contents. Pump Prices' policy has no contents until its own tool writes them; until then
  its words sit in the column at the frame's left edge with nothing beside them, which is an
  interim, not the design. The company details are a plain list with rules, the width of a
  policy's contents and words (962px), each value starting where those words start; on a phone
  each label sits above its value (board N4a, signed off 20 October 2026). The not-found page
  keeps its title at the frame's edge and its panel across the frame, as the app page's panels
  are. In a guide, a row with a screenshot
  puts it in a picture panel under the words: a light panel the column's width, the phone centred
  in it (`.shot-panel`; option 2, signed off 20 October 2026, boards K and L). This replaced, on
  20 October 2026, the owner's rule of 14 October that a guide's words fill the frame.
- The foot is the same on every page of the site (version A3, the owner's sign-off of
  16 October 2026, after a single row of links stretched across the frame was found hard to
  read and cluttered on a phone). Two columns across the frame:
  - the studio's: a small heading "Happy Path Apps", then Home, Company details, Partner links
    and the email address;
  - the apps': a column for each app, under its name: The app, Guides, Privacy policy. An app
    with no page or no guides yet leaves that link out (Pump Prices has only its policy).
  Below them, under a thin line, the page's own small print: its app's disclaimer, or nothing
  on a page that belongs to no app; and, on a page that shows Google's badge, Google's trade
  mark line after it. Pump Prices has no app page to copy its disclaimer from, so
  its policy's small print is written by its tool, from the policy and the app. On a phone the studio's column is above the apps', which
  stay two to a row. A new app adds its column on every page and in every template.
  One exception: the page that only sends the reader on has no foot.
- Breakpoints. At 640px and below everything is one column, the list of guides included. At
  960px and below the list of guides is two across. At 860px and below "On this page" is a box
  above the words. Below 360px the app's bar drops its icon.
- A guide's date: under the words in its top, its last_updated written in full
  (`<p class="meta"><time datetime="2026-10-13">13 October 2026</time></p>`), and on its card in
  the list of guides, opposite its label (`.card-meta`). The date alone, no "Updated" (the owner,
  20 October 2026). It moves only when the guide's facts or advice change or its sources are
  checked again, never for a picture or the layout. The content checker holds the date in the
  guide's top to the data; the date on the card is not checked by any program, so change both
  together.
- A guide has a picture (signed off 20 October 2026, the daylight house style): beside its
  words in the dark top (`<header class="top solo pictured">`, with `.top-pic`), and on its
  card in the list of guides (`.card-pic`). Each guide's folder holds `picture-1200.webp`,
  `picture-600.webp` and `share.jpg`, 1200 x 630, which is its `og:image` and its structured
  data's image. The picture is decorative: its alt is empty, so the content checker reads no
  text from it. How the pictures are made and checked is kept with the business records, not
  here.
- Type, as the stylesheet sets it:

| | Size | Weight |
|---|---|---|
| Page heading (h1) | 36 to 56px, by window width | 800 |
| Section heading (h2) in a row | 24 to 30px (22px in the list of guides) | 800 |
| Heading in a panel | 24px (18px for Sources) | 800 |
| Opening line under the h1 | 17 to 20px | 400 |
| A live figure in an app page's "Right now" | 28 to 36px, by window width | 800 |
| Body text, the items of a tick or flag list, and the text under a title in the list of guides | 17px, line height 1.6 | 400 |
| Text in the cards list, a table, the detail grid and the app's card | 16px | 400 |
| Label above a heading | 13px, capitals, spaced 0.08em | 800 |
| Column name above an answer, in a stacked table on a phone | 12px, capitals, spaced 0.08em, green-text | 800 |
| Small print, sources | 14 to 15px | 400 |
| The studio bar's name | 17px | 800 |

- Panels have a corner radius of 22px; lists and cards 16 to 18px; a table 14px.

## 4. Rules for a guide

- The words, rows, cards and panels fill the reading column (see "The reading column" above):
  about 80 to 95 characters a line of body text on a wide screen. Before 20 October 2026 they filled
  the frame, at about 115 characters a line.
- The h1's lines are balanced, so no word is left by itself on the last one.
- A guide is made of the parts in `_template/guide/` and nothing else. Each has a comment
  there saying when to use it:
  - a row: a label, an h2 and text, with or without a phone screenshot under it, in a picture
    panel (`.shot-panel`);
  - a list of ticks, of flags, or of cards: each list is one white card with a thin rule round
    it and a line between its items;
  - the app's card, once: a grey ground, the app's icon, one sentence, the small print, the
    button. In a row it has a grey ground of its own; in a panel (after a checklist) the panel's
    grey is its ground, and its button keeps ink text;
  - a numbered checklist, with an aside for a line that is not a step;
  - a table. One of three or more columns is marked "stack": on a phone each row becomes a
    block, the row's heading first and each answer under its column's name (the owner's
    decision of 14 October 2026, after the write-off guide's tables ran off a phone's screen);
  - one dark panel for the one thing to take away;
  - a partner block, for a paid link, at the end of a grey panel: the label "Partner · Ad",
    then "We're paid a commission if you book." (never "may earn"), then the link as an
    outlined button (`btn partner`), never the green one, so an advert does not look like the
    site's own button. It sits beside the free way to do the same thing. The owner's decisions
    of 14 October 2026, following the ASA's guidance on affiliate links. After the sentence,
    "How partner links work" links /partner-links/, and the link is listed there in the same
    change (the owner's decision of 14 October 2026). A partner link inside an app also needs a
    "Partner links" section in that app's privacy policy. The block is one white card
    (`partner-card`) with a thin rule round it: the label and the sentence on the left, the
    button on the right, and on a phone the button under them at full width. It is the same
    part for every partner, and only the button's words and link change (the owner's sign-off
    of version A on 16 October 2026, after the four loose lines it replaces);
  - a grey panel of prose (the skeleton names it in a comment), and a "detail" grid;
  - the sources, with no ground and a rule above;
  - inside text: a link, a footnote number that leads to its source, a boxed reference such
    as a serial number, a pair of them on a line of its own, and a figure picked out in the
    dark panel.
- A new part is designed, shown to the owner and signed off before it is used, and is added
  to the skeleton and the stylesheet in the same change.
- Marks: a tick means yes, a cross means no, an exclamation mark means watch for this. A mark
  is used only where the words beside it, or the heading above, already say the same.
- Words:
  - Plain words, short sentences. The opening line says what the reader will know by the end.
  - What to do comes before what the law says.
  - No fact without a record of where it comes from. Official sources only, unless the owner
    says otherwise for a page. Advice is worded as advice, and a dated source is dated in the
    sentence.
  - No price unless it was checked in the week the sentence was written or last changed.
  - The app is offered once, in its card, in the owner's words. Elsewhere it is only named or
    shown: in the page's title, its icon in the top, a screenshot, and the foot.
  - Tone (the owner's decision, 13 October 2026): speak to the reader as "you". Contractions
    are fine ("doesn't", "it's"). No jokes. A guide informs; it does not sell.

## 5. A privacy policy

- It is written from that app's code, never copied from another app's, and its address never
  moves (the site's `README.md` says why).
- Its parts: the top in ink (the studio bar, the app's bar, "Privacy policy",
  who it is for and when it was last updated); the short version in a grey panel; a section to
  each kind of data; a lawful basis, usually in a pill; a quotation with a green rule beside
  it; the foot in ink.
- Long web addresses wrap, so nothing runs off a phone's screen. It prints dark on white.
- Pump Prices' policy is made by its tool, which writes the studio bar and the foot. A change
  to either is made in the tool, not in the page. It has no app's bar yet: that comes with the
  app's own page, from its tool.

## 6. An app on the studio's site

- The studio's brand is the frame: bar, top, foot, colours, type. An app brings its icon, its
  screenshots, its name and its disclaimer.
- The owner's decision, 13 October 2026: every app is to have, at the least, an app page and a
  privacy policy. Guides, and the list of them, are added when there is something to write.
- The privacy policy comes first. The app page is made before the app is released to
  production, not while it is still in testing: it needs the app's real screenshots and its
  store link. Releasing an app without its page is a step missed. Pump Prices is in testing
  and has no app page yet.

## 7. How a page is made

1. It is designed on the design canvas and signed off by the owner before it is built. Until
   then it is a draft and is called one.
2. A guide, an app's page or a privacy policy is built from its skeleton. A list of guides has
   no skeleton yet: it follows its signed-off design and the page that already exists.
3. It is looked at, at phone, tablet and desktop width, before it is reviewed.
4. It is reviewed by an independent reviewer before it is committed.
5. After it is pushed, the owner looks at it on a real phone. Until that is done, nobody says
   it has been.
