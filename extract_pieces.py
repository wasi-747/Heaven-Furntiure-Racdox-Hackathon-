import re
import json

with open('assets/official_pieces.js', 'r', encoding='utf-8') as f:
    text = f.read()

id_matches = list(re.finditer(r"id:\s*'([^']+)'", text))

pieces = []
for i, m in enumerate(id_matches):
    start = m.start()
    end = id_matches[i+1].start() if i+1 < len(id_matches) else text.find('];\n', start)
    block = text[start:end]
    
    p_id = m.group(1)
    
    name_m = re.search(r"name:\s*'([^']+)'", block)
    name = name_m.group(1) if name_m else p_id
    
    cat_m = re.search(r"cat:\s*'([^']+)'", block)
    cat = cat_m.group(1) if cat_m else ''
    
    tagline_m = re.search(r"tagline:\s*'([^']+)'", block)
    tagline = tagline_m.group(1) if tagline_m else ''
    
    desc_m = re.search(r"desc:\s*'([^']+)'", block)
    desc = desc_m.group(1) if desc_m else ''
    
    lead_m = re.search(r"lead:\s*'([^']+)'", block)
    lead = lead_m.group(1) if lead_m else ''
    
    price_m = re.search(r"price:\s*\{\s*min:\s*(\d+),\s*max:\s*(\d+)\s*\}", block)
    min_p = int(price_m.group(1)) if price_m else 0
    max_p = int(price_m.group(2)) if price_m else 0
    
    mat_m = re.search(r"materials:\s*\[(.*?)\]", block)
    materials = []
    if mat_m:
        materials = [x.strip().strip("'\"") for x in mat_m.group(1).split(',') if x.strip()]
        
    # Extract all dimension tuples: match each ['Label', 123, 'cm'...]
    dims_tuples = re.findall(r"\[\s*'([^']+)'\s*,\s*(\d+)\s*,\s*'([^']+)'", block)
    dims = []
    for t in dims_tuples:
        dims.append({"label": t[0], "val": int(t[1]), "unit": t[2]})
            
    var_m = re.search(r"variants:\s*\[(.*?)\]", block)
    variants = []
    if var_m:
        variants = [x.strip().strip("'\"") for x in var_m.group(1).split(',') if x.strip()]
        
    image = f"assets/{p_id}.webp"
    
    pieces.append({
        "id": p_id,
        "name": name,
        "cat": cat,
        "tagline": tagline,
        "desc": desc,
        "lead": lead,
        "price": {"min": min_p, "max": max_p},
        "materials": materials,
        "dims": dims,
        "variants": variants,
        "image": image
    })

js_out = f"// Heaven Furniture Mart Official Catalog Pieces\nwindow.HEAVEN_PIECES = {json.dumps(pieces, indent=2)};\n"
with open('products_data.js', 'w', encoding='utf-8') as f:
    f.write(js_out)
print(f"Saved {len(pieces)} pieces with complete dimensions!")
