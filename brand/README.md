# Happy Path Apps — brand assets

Everything here is drawn by the tool in `source/`, from one set of numbers shared by the still
images and the film. Change the drawing there and re-render; do not edit the PNGs or the videos,
or the profile picture, the cover and the film will drift apart.

```
cd source
npm install
npx playwright install chromium   # once
npm run stills                    # the PNGs in this folder, replaced in place
npm run film                      # the film, into source/out/ as a new version - never overwritten
```

## The mark: the smile road

A stretch of road, lane markings and all, that curves up into a smile. Both words of the name in
one shape: *happy*, and a *path*. It reads at a glance, holds at 16 px, and links the studio to
Roadworthy through the road without borrowing Roadworthy's icon.

**The drawing**, in a 100-unit box centred on the origin: centre line `M-36 -21 C-26 21 26 21
36 -21`, road 22 wide, lane markings 3.2 wide in 7-on, 6-off dashes. On a still mark the dash
pattern is centred on the middle of the road so both ends match. Below 40 px the markings are
dropped and the road drawn heavier (`favicon-32.png`): it is simply a smile, which is the part that
has to survive.

It replaced a rising path with a separate dot, retired on 29 September 2026 because it read as a
person bending over: a stroke with a separate dot at one end is how signage draws a figure, and
the dot becomes a head. Every direction tried is on the brand canvas, rounds one to three:
<https://claude.ai/artifact/9cv2NXQbu9JgqUXmqWC591>. The old files are archived outside this repo,
in `dev_projects/happypathapps-brand-archive/`, because most of them were never committed.

**Two things to keep it from:**

- **A smile under a name is Amazon's logo.** The mark sits above or beside the name, never under
  it. The lane markings make it plainly a road, which helps, but the placement is the rule.
- **Eyes.** In the film two street lamps light above the smile and make a face. That face belongs
  to the film. The mark is the smile road alone; adding eyes to it would be a separate decision.

A circular profile crop makes the circle read as a face around the smile. That is accepted.

## The film

`film/happy-path-film-*.mp4`, 12 seconds, 9:16 for Reels and Stories, square for the feed, each
with a `-silent` copy; `film/happy-path-film-480.gif` for anywhere that will not take video.

A man walks a grey road inside an app icon; the icon opens like an app launching; the camera lets
him go and the road bends into the smile, turning green behind him; he walks off its raised end;
two old UK street lamps light, one then the other, as its eyes; the name arrives below; the lamps
go out and it all folds back into the icon, so an Instagram loop flows instead of jumping. The
storyboard is on the canvas under "The film".

The sound is synthesised except the footsteps, a CC0 recording (`source/sfx/README.md`). What the
mix learned the hard way is written into `source/soundtrack.js` and `source/render-film.js`: the
recording is gated and its tails need easing out; echoes and a room tone were tried and rejected;
the music, not the steps, is what gets turned down, because the steps already peak near full scale.

## Colours

| | |
|---|---|
| Ink `#13181F` | ground, shared with the Roadworthy launcher icon |
| Green `#4ADE80` | the road |
| Off-white `#F7F6F2` | lane markings and the name |
| Muted `#A3AAB3` | the tagline |
| Road grey `#3E4753` | the road before it turns green, in the film |
| Lamp amber `#FFC766` | the street lamps, in the film only |

## What goes where

| File | Use |
|---|---|
| `mark-1024.png` | Facebook page and Instagram profile picture |
| `mark-512.png` | anywhere smaller that wants the square |
| `cover-1640x856.png` | Facebook page cover |
| `favicon-32.png` | site favicon |
| `favicon-180.png` | `apple-touch-icon` |
| `film/` | the film, and its GIF |

Both platforms crop the profile picture to a circle, so the mark's corners sit at 0.8 of the
radius — checked in the crop at 240, 120 and the 40 px a comment avatar gets.

The cover is a centred lockup, because Facebook shows the whole 1640×856 on a desktop and a
narrower centred crop on a phone; anything against an edge is what gets cut. The profile picture
also overlaps the cover's lower left on desktop, which centring stays clear of.

## The font

Overpass, from Google Fonts (SIL Open Font License). It is drawn from the lettering on US highway
signs, which suits a studio whose first app reads number plates, and it loads in any browser, so
the tool runs anywhere. It replaced Bahnschrift, which only ships with Windows.
