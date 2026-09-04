import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update root tokens
old_root = re.search(r':root\s*\{.*?\n\}', css, re.DOTALL)
if old_root:
    new_root = """:root {
  /* Warm Architectural Ivory / Paper Luxury Color Tokens */
  --bg-primary: #F8F7F4;       /* Warm editorial gallery ground */
  --bg-surface: #FFFFFF;       /* Crisp white surface */
  --bg-surface-elevated: #F2EFEA;
  --bg-surface-glass: rgba(248, 247, 244, 0.94);
  
  --bg-ivory: #F8F7F4;
  --bg-ivory-card: #FFFFFF;

  --color-gold: #9E7A38;       /* Deep warm architectural antique gold */
  --color-gold-hover: #7E5F26;
  --color-gold-light: rgba(158, 122, 56, 0.08);
  --color-gold-glow: rgba(158, 122, 56, 0.18);

  --color-walnut: #2E1D16;     /* Deep Grounding Timber */
  --color-wood-tan: #8C6207;   /* Burmese Teak Amber */
  --color-gamari: #D2B48C;
  --color-smoked: #3D281E;

  --text-white: #1A1918;       /* Re-mapped to high-contrast dark charcoal for 100% legibility */
  --text-muted: #57534E;       /* Warm legible charcoal slate - perfect for 40-60 year old eyes */
  --text-faint: #858079;       /* Soft warm gray */
  --text-dark: #121617;

  --border-subtle: #E8E4DE;    /* Warm crisp hairline border */
  --border-gold: rgba(158, 122, 56, 0.35);
  --border-gold-strong: rgba(158, 122, 56, 0.85);

  --font-serif: 'Cormorant Garamond', Garamond, Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --shadow-subtle: 0 4px 20px rgba(0, 0, 0, 0.04);
  --shadow-gold: 0 8px 24px rgba(158, 122, 56, 0.15);
  --shadow-card: 0 4px 18px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03);
  --shadow-card-hover: 0 16px 36px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);

  --transition-smooth: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: all 0.2s ease-out;
}"""
    css = css.replace(old_root.group(0), new_root, 1)

# 2. Specific component replacements for light luxury theme

replacements = [
    # Top announcement bar
    ("background: #060B0C;", "background: #EFECE6;"),
    ("color: #EAEFF1;", "color: #1A1918;"),
    
    # Header
    ("background: rgba(10, 18, 20, 0.92);", "background: rgba(248, 247, 244, 0.96);"),
    ("background: linear-gradient(135deg, #1C2D31 0%, #101B1D 100%);", "background: #1A1918;"),
    ("color: #BAC6CB;", "color: #4A4742;"),
    ("color: #E1E8EB;", "color: #1A1918;"),
    
    # Page Hero
    ("background: radial-gradient(circle at 70% 30%, rgba(26, 47, 53, 0.45) 0%, transparent 70%),\n              radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),\n              #070E10;", "background: #F4F1EC;"),
    ("color: #A3B2B7;", "color: #57534E;"),
    ("background: rgba(255, 255, 255, 0.04);", "background: #FFFFFF;"),
    
    # Hero Homepage
    ("background: #070E10;", "background: #F4F1EC;"),
    ("background: #080F11;", "background: #F8F7F4;"),
    ("background: #0A1214;", "background: #F8F7F4;"),
    ("background: #0E181B;", "background: #FAF8F5;"),
    ("background: #0B1417;", "background: #FAF9F6;"),
    
    # Cards
    ("background: #060B0C;", "background: #F6F4EF;"),
    ("color: #E2E8EA;", "color: #7A5F26;"),
    ("color: #EAF0F2;", "color: #4A4742;"),
    ("color: #BAC7CC;", "color: #4A4742;"),
    ("color: #92A3A9;", "color: #6E6962;"),
    
    # Buttons
    ("background: linear-gradient(135deg, #D4AF37 0%, #C29928 100%);", "background: #1A1918; color: #FFFFFF;"),
    ("color: #0D1416;", "color: #FFFFFF;"),
    ("color: #0A1214;", "color: #FFFFFF;"),
    
    # Card shadow
    ("box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(212, 175, 55, 0.08);", "box-shadow: var(--shadow-card-hover); border-color: var(--color-gold);"),
    ("box-shadow: var(--shadow-card);", "box-shadow: var(--shadow-card); border: 1px solid #E8E4DE;")
]

for old, new in replacements:
    css = css.replace(old, new)

# Write updated css
with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Applied light luxury design system to style.css successfully!")
