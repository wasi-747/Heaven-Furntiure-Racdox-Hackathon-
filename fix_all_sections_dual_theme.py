with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

all_sections_dual_theme_css = """
/* ==========================================================================
   COMPREHENSIVE DUAL-THEME SECTION BACKGROUNDS & TYPOGRAPHY
   ========================================================================== */

/* DARK ATELIER THEME (DEFAULT) */
:root,
[data-theme="dark"] {
  --bg-primary: #0A1214 !important;
  --bg-surface: #111D20 !important;
  --bg-section-alt: #0D171A !important;
  --bg-section-card: #142226 !important;
}

[data-theme="dark"] .spaces-gateways-section,
[data-theme="dark"] .flagship-section,
[data-theme="dark"] .timber-science-section,
[data-theme="dark"] .bespoke-consultation-section,
[data-theme="dark"] .heritage-section,
[data-theme="dark"] .showroom-section,
[data-theme="dark"] .faq-section {
  background: #0A1214 !important;
  color: #CBD5D9 !important;
}

[data-theme="dark"] .timber-science-section,
[data-theme="dark"] .heritage-section {
  background: #0D171A !important;
}

[data-theme="dark"] .section-title {
  color: #FFFFFF !important;
}

[data-theme="dark"] .section-desc,
[data-theme="dark"] .heritage-text,
[data-theme="dark"] .showroom-text {
  color: #BAC6CB !important;
}

[data-theme="dark"] .founder-quote-box {
  background: #111D20 !important;
  border-color: rgba(212, 175, 55, 0.25) !important;
  color: #E6EDF0 !important;
}

[data-theme="dark"] .quote-body {
  color: #E6EDF0 !important;
}

[data-theme="dark"] .author-name {
  color: #FFFFFF !important;
}

[data-theme="dark"] .proof-card {
  background: #111D20 !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  color: #CBD5D9 !important;
}

[data-theme="dark"] .google-title,
[data-theme="dark"] .warranty-title {
  color: #FFFFFF !important;
}

[data-theme="dark"] .info-item strong {
  color: #FFFFFF !important;
}

[data-theme="dark"] .info-item p {
  color: #BAC6CB !important;
}

[data-theme="dark"] .timeline-step .t-year {
  color: #D4AF37 !important;
}

[data-theme="dark"] .timeline-step .t-title {
  color: #FFFFFF !important;
}

[data-theme="dark"] .timeline-step .t-desc {
  color: #8C999E !important;
}

/* LIGHT PAPER GALLERY THEME */
[data-theme="light"] {
  --bg-primary: #F8F7F4 !important;
  --bg-surface: #FFFFFF !important;
  --bg-section-alt: #F3EFE9 !important;
  --bg-section-card: #FFFFFF !important;
}

[data-theme="light"] .spaces-gateways-section,
[data-theme="light"] .flagship-section,
[data-theme="light"] .bespoke-consultation-section,
[data-theme="light"] .showroom-section,
[data-theme="light"] .faq-section {
  background: #F8F7F4 !important;
  color: #44403C !important;
}

[data-theme="light"] .timber-science-section,
[data-theme="light"] .heritage-section {
  background: #F2ECE4 !important;
  color: #44403C !important;
}

[data-theme="light"] .section-title {
  color: #1A1918 !important;
}

[data-theme="light"] .section-desc,
[data-theme="light"] .heritage-text,
[data-theme="light"] .showroom-text {
  color: #44403C !important;
}

[data-theme="light"] .founder-quote-box {
  background: #FFFFFF !important;
  border-color: rgba(158, 122, 56, 0.3) !important;
  color: #292524 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

[data-theme="light"] .quote-body {
  color: #292524 !important;
}

[data-theme="light"] .author-name {
  color: #1A1918 !important;
}

[data-theme="light"] .proof-card {
  background: #FFFFFF !important;
  border: 1px solid #E2DCD4 !important;
  color: #44403C !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}

[data-theme="light"] .google-title,
[data-theme="light"] .warranty-title {
  color: #1A1918 !important;
}

[data-theme="light"] .info-item strong {
  color: #1A1918 !important;
}

[data-theme="light"] .info-item p {
  color: #57534E !important;
}

[data-theme="light"] .timeline-step .t-year {
  color: #9E7A38 !important;
}

[data-theme="light"] .timeline-step .t-title {
  color: #1A1918 !important;
}

[data-theme="light"] .timeline-step .t-desc {
  color: #78716C !important;
}
"""

css += "\n" + all_sections_dual_theme_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Dual theme section rules successfully added!")
