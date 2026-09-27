"""Draw the Happy Path Apps mark, the social profile images and the Facebook cover.

One geometry, every output, so the profile picture and the cover cannot drift apart. Run from
this directory:

    python render_brand.py

Needs Pillow. See README.md for what the mark means and which sizes go where.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent

# The same ground as the Roadworthy launcher icon, so the studio and its first app read as
# related without the studio borrowing the plate - that mark belongs to the product.
INK = (19, 24, 31)
MINT = (74, 222, 128)
OFFWHITE = (247, 246, 242)
MUTED = (150, 158, 168)

# Pillow draws no antialiasing, so everything is drawn at SS times size and resampled down.
SS = 4

FONT = "C:/Windows/Fonts/bahnschrift.ttf"

# Two lines rather than one so it survives the phone crop. The dash stays on the first line -
# breaking the sentence there without it reads as two unrelated fragments.
TAGLINE = ("We build software for everyday decisions —", "and keep you on the happy path.")


def _stroke(draw, points, colour, width):
    """A stroke with true round caps and joins: a disc at every point along the path.

    ImageDraw.line's own `joint="curve"` spikes on a dense point list, which is exactly what a
    sampled bezier is.
    """
    radius = width / 2
    for (x0, y0), (x1, y1) in zip(points, points[1:]):
        steps = max(1, int(max(abs(x1 - x0), abs(y1 - y0))))
        for k in range(steps + 1):
            t = k / steps
            x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
            draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=colour)


def _bezier(p0, p1, p2, p3, steps=160):
    points = []
    for i in range(steps + 1):
        t = i / steps
        u = 1 - t
        points.append((
            u**3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t**3 * p3[0],
            u**3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t**3 * p3[1],
        ))
    return points


def path_glyph(draw, x, y, size, colour=MINT, weight=0.085, dot=0.075, dot_x=0.78):
    """The mark: a path that rises and arrives at a point.

    Drawn in fractions of `size` from the top-left corner (x, y) so the cover and the profile
    image use one definition of the shape.
    """
    def u(f):
        return f * size

    _stroke(
        draw,
        [(x + px, y + py) for px, py in _bezier(
            (u(0.18), u(0.68)), (u(0.44), u(0.68)), (u(0.44), u(0.38)), (u(0.68), u(0.38)),
        )],
        colour,
        u(weight),
    )
    r = u(dot)
    cx, cy = x + u(dot_x), y + u(0.38)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=colour)


def mark(size=1024):
    """The square profile image. Both Facebook and Instagram crop it to a circle."""
    canvas = Image.new("RGB", (size * SS, size * SS), INK)
    path_glyph(ImageDraw.Draw(canvas), 0, 0, size * SS)
    return canvas.resize((size, size), Image.LANCZOS)


def cover(width=1640, height=856):
    """The Facebook page cover.

    The lockup is centred rather than set to one side: Facebook shows the full 1640x856 on
    desktop but a narrower centred crop on a phone, and anything against an edge is what gets
    cut.
    """
    canvas = Image.new("RGB", (width * SS, height * SS), INK)
    draw = ImageDraw.Draw(canvas)
    w, h = width * SS, height * SS

    glyph = int(h * 0.34)
    path_glyph(draw, (w - glyph) / 2, int(h * 0.08), glyph)

    name = ImageFont.truetype(FONT, int(h * 0.125))
    small = ImageFont.truetype(FONT, int(h * 0.048))
    draw.text((w / 2, h * 0.58), "Happy Path Apps", font=name, fill=OFFWHITE, anchor="mm")
    for i, line in enumerate(TAGLINE):
        draw.text((w / 2, h * 0.745 + i * h * 0.075), line, font=small, fill=MUTED, anchor="mm")

    return canvas.resize((width, height), Image.LANCZOS)


# What the glyph actually occupies, as fractions of the size passed to path_glyph: the stroke
# starts at 0.18 and is half a width thick either side, and the dot ends at 0.78 + its radius.
GLYPH_BOUNDS = (0.18 - 0.0425, 0.38 - 0.075, 0.78 + 0.075, 0.68 + 0.0425)


def favicon(size, padding=0.08):
    """Tighter framing than the profile image: at 32px the padded version is mostly ground.

    Scaled from the glyph's own bounds rather than a guessed offset - eyeballing it cropped the
    dot off, and the dot is the half of the mark that means anything.
    """
    canvas = Image.new("RGB", (size * SS, size * SS), INK)
    box = size * SS
    left, top, right, bottom = GLYPH_BOUNDS
    scale = box * (1 - 2 * padding) / max(right - left, bottom - top)
    path_glyph(
        ImageDraw.Draw(canvas),
        (box - (right - left) * scale) / 2 - left * scale,
        (box - (bottom - top) * scale) / 2 - top * scale,
        scale,
    )
    return canvas.resize((size, size), Image.LANCZOS)


def main():
    outputs = {
        # Square, no alpha. 1024 is far above what either platform needs and downscales
        # cleanly to Facebook's 180 and Instagram's 320.
        "mark-1024.png": mark(1024),
        "mark-512.png": mark(512),
        "cover-1640x856.png": cover(),
        "favicon-32.png": favicon(32),
        "favicon-180.png": favicon(180),
    }
    for name, image in outputs.items():
        image.save(HERE / name)
        print(f"wrote brand/{name}")


if __name__ == "__main__":
    main()
