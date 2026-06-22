#!/usr/bin/env python3
"""Generate static favicon assets in public/ for broad browser support."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

PURPLE_DEEP = (91, 33, 182)
PURPLE_MID = (124, 58, 237)
PURPLE_BRIGHT = (139, 92, 246)
PURPLE_LIGHT = (196, 181, 253)
WHITE = (255, 255, 255)


def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def rounded_mask(size: int, radius: float) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def gradient_layer(size: int) -> Image.Image:
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pixels = layer.load()

    for y in range(size):
        for x in range(size):
            t = (x / max(size - 1, 1) * 0.55) + (y / max(size - 1, 1) * 0.45)
            if t < 0.4:
                blend = t / 0.4
                color = tuple(lerp(PURPLE_DEEP[i], PURPLE_MID[i], blend) for i in range(3))
            elif t < 0.72:
                blend = (t - 0.4) / 0.32
                color = tuple(lerp(PURPLE_MID[i], PURPLE_BRIGHT[i], blend) for i in range(3))
            else:
                blend = (t - 0.72) / 0.28
                color = tuple(lerp(PURPLE_BRIGHT[i], PURPLE_LIGHT[i], blend) for i in range(3))

            shine = max(0.0, 1.0 - (y / size) * 1.15) * 0.14
            depth = max(0.0, (y / size) - 0.5) * 0.12
            rgb = tuple(max(0, min(255, int(c * (1 - depth + shine)))) for c in color)
            pixels[x, y] = (*rgb, 255)

    return layer


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/SFNSDisplay-Bold.otf",
        "/System/Library/Fonts/SFCompactDisplay-Bold.otf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_mark(size: int) -> Image.Image:
    radius = size * 0.24
    base = gradient_layer(size)
    base.putalpha(rounded_mask(size, radius))

    draw = ImageDraw.Draw(base)
    ring = max(1, round(size * 0.028))
    inset = ring * 2.5
    draw.rounded_rectangle(
        (inset, inset, size - inset, size - inset),
        radius=max(1, radius - ring),
        outline=(255, 255, 255, 55),
        width=ring,
    )

    font_size = max(9, round(size * 0.44))
    font = load_font(font_size)
    text = "SM"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1] - size * 0.015

    shadow = max(1, round(size * 0.035))
    draw.text((x, y + shadow), text, font=font, fill=(76, 29, 149, 150))
    draw.text((x, y), text, font=font, fill=WHITE)

    return base.convert("RGBA")


def save_assets() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)

    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "icon-192.png": 192,
        "icon-512.png": 512,
    }

    small_icons: list[Image.Image] = []
    for name, px in sorted(sizes.items(), key=lambda item: item[1]):
        image = draw_mark(px)
        image.save(PUBLIC / name, format="PNG", optimize=True)
        if px in (16, 32):
            small_icons.append(image)

    small_icons.sort(key=lambda img: img.size[0])
    small_icons[1].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(32, 32), (16, 16)],
        append_images=[small_icons[0]],
    )

    print("Wrote favicon assets to public/")


if __name__ == "__main__":
    save_assets()
