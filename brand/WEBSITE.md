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
| The home page | `app.css`, `<body class="home">` | 1040px | none | `/` |
| An app's page | `app.css` | 1040px, a phone screenshot beside the words | none yet | `/roadworthy/` |
| A guide | `app.css`, `<body class="guide">` | 1040px, the words fill it | `_template/guide/` | three, under `/roadworthy/guides/` |
| An app's list of guides | `app.css`, `<body class="guide guide-list">` | 1040px, two cards across | none yet | `/roadworthy/guides/` |
| A privacy policy | `style.css` | 1040px, the words fill it | `_template/privacy.html` | Roadworthy's, Pump Prices' |
| Not found; a page that only sends the reader on | `app.css` | 1040px | none | `/404.html`, `/roadworthy/buying-a-used-car.html` |

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
- An app's own colours (Roadworthy's number plate) appear only in that app's mark.
- Text and its ground differ by at least 4.5 to 1.
- Overpass, served from this site. No other typeface for words, with three exceptions, each
  a thing shown as it is and not prose: a web address set in `code` and a boxed serial number
  are in the system's monospace, and Roadworthy's plate keeps a number plate's lettering.
- The gutter at each side is `clamp(20px, 5vw, 56px)`, except the home page's top, which has
  a fixed 20px.
- A button is at least 44px tall, and fully rounded.
- British English. No em dashes or en dashes. No exclamation marks.
- At most one h1.

## 3. Rules for pages styled by `app.css`

These are the app page, the guides and the list of guides. The home page, the not-found page
and the page that only sends the reader on use `app.css` too, but are not held to this
section. The home page shows every app and not one, and the other two have no app to show;
none has a top or foot of this kind. They do keep "One frame" and the breakpoints. The home
page's own parts (the lockup at its top, an ink button, a light "soon" chip) are in the home
page's section of `app.css`.

- The studio bar is first: the mark and "Happy Path Apps", linking home.
- Then the top, in ink: the app's icon, the h1, one opening line. (The app page's top also
  holds its button, a line of small print and a phone screenshot.)
- The foot is ink: the app's links, and the app's own disclaimer, copied from that app's page.
- **One frame.** Every page is one width: 1040px less its gutters (`.wrap` in `app.css`,
  `main` in `style.css`). The bar, the top, the body and
  the foot share the same left and right edges, and those edges are the same on every page,
  so nothing moves as a reader goes from one page to another. No page, and no kind of page,
  sets a width of its own. The owner's choice of 14 October 2026 ("One frame, version 2" on
  the design canvas), after the guides and policies had been built 720px wide beside pages
  1040px wide.
- The foot's links are the same on every page of an app, in this order: Happy Path Apps, the
  app, Guides, Privacy policy, the email address. They are spread across the frame. An app
  with no page of its own yet, or no guides yet, leaves that link out: Pump Prices' policy
  has three.
- Two breakpoints. At 860px and below the list of guides is one column of cards. At 640px
  and below everything is one column.
- Type, as the stylesheet sets it:

| | Size | Weight |
|---|---|---|
| Page heading (h1) | 36 to 56px, by window width | 800 |
| Section heading (h2) in a row | 24 to 30px (22px in the list of guides) | 800 |
| Heading in a panel | 24px (18px for Sources) | 800 |
| Opening line under the h1 | 17 to 20px | 400 |
| Body text, and the items of a tick or flag list | 17px, line height 1.6 | 400 |
| Text in the cards list, a table, the detail grid, the app's card, and under a title in the list of guides | 16px | 400 |
| Label above a heading | 13px, capitals, spaced 0.08em | 800 |
| Small print, sources | 14 to 15px | 400 |
| The studio bar's name | 17px | 800 |

- Panels have a corner radius of 22px; lists and cards 16 to 18px; a table 14px.

## 4. Rules for a guide

- The words, rows, cards and panels fill the frame (see "One frame" above). On a wide screen a
  full line of body text runs to about 115 characters, and up to about 130: the owner chose one width for every page
  over a shorter line, on 14 October 2026.
- The h1's lines are balanced, so no word is left by itself on the last one.
- A guide is made of the parts in `_template/guide/` and nothing else. Each has a comment
  there saying when to use it:
  - a row: a label, an h2 and text, with or without a phone screenshot beside it;
  - a list of ticks, of flags, or of cards: each list is one white card with a thin rule round
    it and a line between its items;
  - the app's card, once: a grey ground, the app's icon, one sentence, the small print, the
    button;
  - a numbered checklist, with an aside for a line that is not a step;
  - a table;
  - one dark panel for the one thing to take away;
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
- Its parts: the top in ink (the studio bar, the app's mark if it has one, "Privacy policy",
  who it is for and when it was last updated); the short version in a grey panel; a section to
  each kind of data; a lawful basis, usually in a pill; a quotation with a green rule beside
  it; the foot in ink.
- Long web addresses wrap, so nothing runs off a phone's screen. It prints dark on white.
- Pump Prices' policy is made by its tool, which writes the studio bar and the foot. A change
  to either is made in the tool, not in the page.

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
2. A guide or a privacy policy is built from its skeleton. An app page or a list of guides has
   no skeleton yet: it follows its signed-off design and the page that already exists.
3. It is looked at, at phone, tablet and desktop width, before it is reviewed.
4. It is reviewed by an independent reviewer before it is committed.
5. After it is pushed, the owner looks at it on a real phone. Until that is done, nobody says
   it has been.
