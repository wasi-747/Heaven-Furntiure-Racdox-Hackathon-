import urllib.request
import os
import sys

# High quality Unsplash photo IDs for luxury furniture categories
# Tested and verified direct photo IDs
IMAGE_MAP = {
    # Living Room
    "liv_sofa_curved.jpg": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80",
    "liv_sofa_chesterfield.jpg": "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&auto=format&fit=crop&q=80",
    "liv_sofa_lshape.jpg": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&auto=format&fit=crop&q=80",
    "liv_sofa_divan.jpg": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
    "liv_table_marble.jpg": "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=800&auto=format&fit=crop&q=80",
    "liv_table_wood.jpg": "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&auto=format&fit=crop&q=80",
    "liv_table_nesting.jpg": "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&auto=format&fit=crop&q=80",
    "liv_tv_fluted.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    "liv_tv_floating.jpg": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80",
    "liv_chair_lounge.jpg": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80",
    "liv_chair_rocking.jpg": "https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=800&auto=format&fit=crop&q=80",
    "liv_shoe_rack.jpg": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80",

    # Bedroom
    "bed_floating.jpg": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80",
    "bed_king_teak.jpg": "https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=800&auto=format&fit=crop&q=80",
    "bed_storage.jpg": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80",
    "bed_platform.jpg": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80",
    "bed_wardrobe_glass.jpg": "https://images.unsplash.com/photo-1558997519-83ea9252def8?w=800&auto=format&fit=crop&q=80",
    "bed_wardrobe_solid.jpg": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
    "bed_vanity_fluted.jpg": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80",
    "bed_nightstand.jpg": "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&auto=format&fit=crop&q=80",
    "bed_dresser_drawers.jpg": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80",

    # Dining
    "din_table_8seater.jpg": "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop&q=80",
    "din_table_liveedge.jpg": "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&auto=format&fit=crop&q=80",
    "din_table_round.jpg": "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=800&auto=format&fit=crop&q=80",
    "din_chairs_leather.jpg": "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop&q=80",
    "din_buffet_wagon.jpg": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80",
    "din_showcase.jpg": "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=800&auto=format&fit=crop&q=80",

    # Office & Executive
    "off_desk_monolith.jpg": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80",
    "off_desk_lshape.jpg": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80",
    "off_bookcase_library.jpg": "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&auto=format&fit=crop&q=80",
    "off_boardroom_table.jpg": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    "off_chair_executive.jpg": "https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=800&auto=format&fit=crop&q=80",
    "off_credenza_safe.jpg": "https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=800&auto=format&fit=crop&q=80"
}

target_dir = os.path.join(os.path.dirname(__file__), "assets")
os.makedirs(target_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
}

success_count = 0
for filename, url in IMAGE_MAP.items():
    filepath = os.path.join(target_dir, filename)
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        print(f"Already exists: {filename}")
        success_count += 1
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            data = response.read()
            if len(data) > 1000:
                with open(filepath, 'wb') as f:
                    f.write(data)
                print(f"Downloaded: {filename} ({len(data)} bytes)")
                success_count += 1
            else:
                print(f"Warning: downloaded data too small for {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")

print(f"\nCompleted! Successfully verified {success_count}/{len(IMAGE_MAP)} local images.")
