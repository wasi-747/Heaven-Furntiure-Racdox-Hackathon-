import re

with open('assets/official_pieces.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Match piece objects
matches = re.finditer(r"id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*cat:\s*'([^']+)',\s*tagline:\s*'([^']+)'", text)

print("--- OFFICIAL HEAVEN FURNITURE MART PIECES ---")
count = 0
for m in matches:
    count += 1
    pid, name, cat, tagline = m.groups()
    print(f"{count}. [{cat.upper()}] {name} (ID: {pid}) — {tagline}")

# Also look for image filenames or image references in pieces.js
img_matches = re.findall(r"['\"]([^'\"]+\.(?:webp|jpg|png))['\"]", text)
print(f"\nUnique images referenced: {len(set(img_matches))}")
for img in sorted(set(img_matches)):
    print(f" - {img}")
