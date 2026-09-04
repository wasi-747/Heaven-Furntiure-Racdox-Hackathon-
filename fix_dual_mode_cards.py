with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace hardcoded background: #FFFFFF !important on card-body and collection-card
css = css.replace('.collection-card {\n  background: #FFFFFF !important;',
                  '.collection-card {\n  background: var(--bg-surface) !important;')

css = css.replace('.card-body {\n  padding: 1.5rem !important;\n  background: #FFFFFF !important;\n}',
                  '.card-body {\n  padding: 1.5rem !important;\n  background: transparent !important;\n}')

css = css.replace('.btn-card-inquire {\n  width: 100% !important;\n  background: #1A1918 !important;\n  color: #FFFFFF !important;',
                  '.btn-card-inquire {\n  width: 100% !important;\n  background: var(--color-gold) !important;\n  color: #0A1214 !important;\n  font-weight: 700 !important;')

# Theme specific button and card polish
theme_polish = """
/* Dual Mode Card & Theme Cohesion */
:root,
[data-theme="dark"] {
  --bg-primary: #0A1214 !important;
  --bg-surface: #111D20 !important;
  --text-white: #FFFFFF !important;
  --text-muted: #9BA7AC !important;
  --card-img-bg: #0C1618 !important;
  --card-border: rgba(255, 255, 255, 0.09) !important;
}

[data-theme="dark"] .page-hero {
  background: #080F11 !important;
}

[data-theme="dark"] .page-hero-title {
  color: #FFFFFF !important;
}

[data-theme="dark"] .page-hero-desc {
  color: #9BA7AC !important;
}

[data-theme="dark"] .cat-pill {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #BAC6CB !important;
}

[data-theme="dark"] .cat-pill.active {
  background: #D4AF37 !important;
  color: #0A1214 !important;
  border-color: #D4AF37 !important;
}

[data-theme="dark"] .btn-card-inquire {
  background: #D4AF37 !important;
  color: #0A1214 !important;
  border-color: #D4AF37 !important;
}

[data-theme="dark"] .btn-card-inquire:hover {
  background: #E5C358 !important;
}

[data-theme="dark"] .angle-switcher-bar {
  background: #0D171A !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

[data-theme="dark"] .angle-pill {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
  color: #BAC6CB !important;
}

[data-theme="dark"] .angle-pill.active {
  background: #D4AF37 !important;
  color: #0A1214 !important;
}

[data-theme="light"] {
  --bg-primary: #F8F7F4 !important;
  --bg-surface: #FFFFFF !important;
  --text-white: #1A1918 !important;
  --text-muted: #57534E !important;
  --card-img-bg: #F5F3EE !important;
  --card-border: #E8E4DE !important;
}

[data-theme="light"] .page-hero {
  background: #F4F1EC !important;
}

[data-theme="light"] .page-hero-title {
  color: #1A1918 !important;
}

[data-theme="light"] .page-hero-desc {
  color: #57534E !important;
}

[data-theme="light"] .btn-card-inquire {
  background: #1A1918 !important;
  color: #FFFFFF !important;
  border-color: #1A1918 !important;
}

[data-theme="light"] .btn-card-inquire:hover {
  background: #9E7A38 !important;
}
"""

css += "\n" + theme_polish

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Dual mode styles unified successfully!")
