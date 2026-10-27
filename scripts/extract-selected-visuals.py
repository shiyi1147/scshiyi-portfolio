"""Extract original artwork from proposal PDFs; never run during normal builds.

Requires pypdf and Pillow. Only transparent padding is removed. The full PDF,
reader pages, artwork pixels, and printed artwork content remain unchanged.
Re-check the selected image indexes visually when replacing a source PDF.
"""
import hashlib
import json
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public/assets/selected-visuals"
SELECTIONS = {
    "sanfu": [
        ("fufu", 27, 6),
        ("fufu-flight", 27, 7),
        ("fufu-everyday", 27, 8),
        ("fufu-travel", 27, 9),
        ("fufu-forest", 27, 10),
        ("comic", 13, 6),
        ("poster-travel", 28, 9),
        ("poster-forest", 28, 11),
        ("pack-flat", 28, 12),
        ("pack-travel", 28, 13),
        ("pack-forest", 28, 14),
    ],
    "yunnan": [
        ("character-blue", 13, 1),
        ("character-pink", 13, 2),
        ("character-green", 13, 3),
        ("key-visual", 25, 5),
        ("poster-blue", 25, 1),
        ("theme-scene", 25, 4),
        ("gift-box", 20, 4),
        ("cards", 20, 5),
        ("mouse-pad", 26, 1),
        ("cosmetic-bag", 26, 9),
        ("mug", 26, 12),
    ],
}


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {}
    for project, selections in SELECTIONS.items():
        pdf = ROOT / f"public/assets/documents/{project}-brand-plan.pdf"
        reader = PdfReader(pdf)
        assets = {}
        for name, page, index in selections:
            images = reader.pages[page - 1].images
            image = images[index].image.copy()
            original_size = list(image.size)
            crop = None
            if image.mode == "RGBA":
                bounds = image.getchannel("A").getbbox()
                if bounds:
                    crop = [max(0, bounds[0] - 2), max(0, bounds[1] - 2),
                            min(image.width, bounds[2] + 2), min(image.height, bounds[3] + 2)]
                    image = image.crop(crop)
            filename = f"{project}-{name}.webp"
            target = OUTPUT / filename
            image.save(target, "WEBP", lossless=True, method=5)
            thumb_name = f"{project}-{name}-thumb.webp"
            thumb = image.copy()
            thumb.thumbnail((240, 180))
            thumb.save(OUTPUT / thumb_name, "WEBP", quality=88, method=5)
            assets[name] = {
                "src": f"assets/selected-visuals/{filename}",
                "thumb": f"assets/selected-visuals/{thumb_name}",
                "width": image.width, "height": image.height,
                "sourcePage": page, "sourceImageIndex": index,
                "sourceImageKey": images.keys()[index],
                "originalSize": original_size, "alphaCrop": crop,
                "sha256": hashlib.sha256(target.read_bytes()).hexdigest(),
            }
        manifest[project] = {
            "sourceSHA256": hashlib.sha256(pdf.read_bytes()).hexdigest(),
            "assets": assets,
        }
        print(f"{project}: {len(assets)} original artworks extracted")
    (ROOT / "src/selectedVisualAssets.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
