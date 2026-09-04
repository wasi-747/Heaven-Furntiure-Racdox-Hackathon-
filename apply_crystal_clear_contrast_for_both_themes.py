with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

contrast_rules = """
/* ==========================================================================
   PERFECT CONTRAST & LEGIBILITY ENGINE (ZERO TEXT WASHED OUT IN ANY THEME)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DARK ATELIER THEME (DEFAULT) — 100% CONTRAST ON DARK
   -------------------------------------------------------------------------- */
:root,
[data-theme="dark"] {
  --bg-primary: #0A1214 !important;
  --bg-surface: #111D20 !important;
  --text-white: #FFFFFF !important;
  --text-primary: #FFFFFF !important;
  --text-muted: #CBD5D9 !important;
  --text-faint: #829298 !important;
  --border-subtle: rgba(255, 255, 255, 0.08) !important;
}

[data-theme="dark"] body {
  background-color: #0A1214 !important;
  color: #CBD5D9 !important;
}

/* Top Bar (Dark) */
[data-theme="dark"] .top-announcement {
  background: #070D0E !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07) !important;
  color: #9BA7AC !important;
}
[data-theme="dark"] .live-status-pill {
  color: #FFFFFF !important;
}
[data-theme="dark"] .top-contact-link {
  color: #BAC6CB !important;
}
[data-theme="dark"] .top-contact-link:hover {
  color: #D4AF37 !important;
}

/* Site Header & Navigation (Dark) */
[data-theme="dark"] .site-header {
  background: rgba(10, 18, 20, 0.96) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}
[data-theme="dark"] .brand-name {
  color: #FFFFFF !important;
}
[data-theme="dark"] .brand-tagline {
  color: #8C999E !important;
}
[data-theme="dark"] .brand-emblem {
  background: #111D20 !important;
  border-color: #D4AF37 !important;
}
[data-theme="dark"] .nav-link {
  color: #BAC6CB !important;
}
[data-theme="dark"] .nav-link:hover,
[data-theme="dark"] .nav-link.active {
  color: #FFFFFF !important;
}
[data-theme="dark"] .theme-toggle-btn {
  background: rgba(255, 255, 255, 0.07) !important;
  border: 1px solid rgba(212, 175, 55, 0.4) !important;
  color: #FFFFFF !important;
}

/* Hero Section (Dark) - FIX DARK TEXT ON DARK BG */
[data-theme="dark"] .hero-section {
  background: #0A1214 !important;
}
[data-theme="dark"] .hero-title {
  color: #FFFFFF !important;
}
[data-theme="dark"] .hero-title-italic {
  color: #D4AF37 !important;
}
[data-theme="dark"] .hero-lead {
  color: #CBD5D9 !important;
}
[data-theme="dark"] .hero-pill-badge {
  background: rgba(212, 175, 55, 0.1) !important;
  border: 1px solid rgba(212, 175, 55, 0.35) !important;
  color: #E2C264 !important;
}
[data-theme="dark"] .hero-trust-bar {
  border-top-color: rgba(255, 255, 255, 0.08) !important;
}
[data-theme="dark"] .hero-trust-bar .trust-text {
  color: #BAC6CB !important;
}
[data-theme="dark"] .hero-trust-bar .trust-text strong {
  color: #FFFFFF !important;
}
[data-theme="dark"] .btn-glass {
  background: rgba(255, 255, 255, 0.07) !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  color: #FFFFFF !important;
}
[data-theme="dark"] .btn-glass:hover {
  background: rgba(255, 255, 255, 0.14) !important;
  border-color: #D4AF37 !important;
  color: #FFFFFF !important;
}

/* Product Cards & Sections (Dark) */
[data-theme="dark"] .collection-card {
  background: #111D20 !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
}
[data-theme="dark"] .card-img-container {
  background: #0B1416 !important;
}
[data-theme="dark"] .card-title {
  color: #FFFFFF !important;
}
[data-theme="dark"] .card-desc {
  color: #9BA7AC !important;
}
[data-theme="dark"] .price-val {
  color: #FFFFFF !important;
}
[data-theme="dark"] .price-from {
  color: #8C999E !important;
}
[data-theme="dark"] .craft-lead-time {
  color: #BAC6CB !important;
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
[data-theme="dark"] .spaces-gateways-section {
  background: #0A1214 !important;
}

/* Footer (Dark) */
[data-theme="dark"] .site-footer {
  background: #070D0E !important;
  border-top: 1px solid rgba(255, 255, 255, 0.07) !important;
  color: #8C999E !important;
}
[data-theme="dark"] .footer-brand-name {
  color: #FFFFFF !important;
}
[data-theme="dark"] .footer-heading {
  color: #FFFFFF !important;
}
[data-theme="dark"] .footer-nav li a,
[data-theme="dark"] .footer-credentials li,
[data-theme="dark"] .footer-address p {
  color: #9BA7AC !important;
}
[data-theme="dark"] .footer-nav li a:hover {
  color: #D4AF37 !important;
}
[data-theme="dark"] .footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
}
[data-theme="dark"] .footer-bottom-inner {
  color: #6C7A7F !important;
}


/* --------------------------------------------------------------------------
   2. LIGHT PAPER GALLERY THEME — 100% CONTRAST ON LIGHT (NO WHITE TEXT!)
   -------------------------------------------------------------------------- */
[data-theme="light"] {
  --bg-primary: #F8F7F4 !important;
  --bg-surface: #FFFFFF !important;
  --text-white: #1A1918 !important;
  --text-primary: #1A1918 !important;
  --text-muted: #44403C !important;
  --text-faint: #78716C !important;
  --border-subtle: #E8E4DE !important;
}

[data-theme="light"] body {
  background-color: #F8F7F4 !important;
  color: #44403C !important;
}

/* Top Bar (Light) - FIX WHITE TEXT ON LIGHT BG */
[data-theme="light"] .top-announcement {
  background: #ECE7DE !important;
  border-bottom: 1px solid #DDD7CC !important;
  color: #383531 !important;
}
[data-theme="light"] .live-status-pill {
  color: #1A1918 !important;
  font-weight: 700 !important;
}
[data-theme="light"] .top-contact-link {
  color: #292524 !important;
  font-weight: 600 !important;
}
[data-theme="light"] .top-contact-link:hover {
  color: #9E7A38 !important;
}

/* Site Header & Navigation (Light) - FIX WHITE ACTIVE LINK & BUTTON */
[data-theme="light"] .site-header {
  background: rgba(248, 247, 244, 0.98) !important;
  border-bottom: 1px solid #E2DCD4 !important;
}
[data-theme="light"] .brand-name {
  color: #1A1918 !important;
}
[data-theme="light"] .brand-tagline {
  color: #78716C !important;
}
[data-theme="light"] .brand-emblem {
  background: #1A1918 !important;
  border-color: #9E7A38 !important;
}
[data-theme="light"] .brand-emblem span {
  color: #D4AF37 !important;
}
[data-theme="light"] .nav-link {
  color: #44403C !important;
  font-weight: 600 !important;
}
[data-theme="light"] .nav-link:hover,
[data-theme="light"] .nav-link.active {
  color: #1A1918 !important;
  font-weight: 800 !important;
}
[data-theme="light"] .nav-link.active::after {
  background: #9E7A38 !important;
  height: 3px !important;
}
[data-theme="light"] .theme-toggle-btn {
  background: #FFFFFF !important;
  border: 1.5px solid #9E7A38 !important;
  color: #1A1918 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
}

/* Hero Section (Light) */
[data-theme="light"] .hero-section {
  background: #F8F7F4 !important;
}
[data-theme="light"] .hero-title {
  color: #1A1918 !important;
}
[data-theme="light"] .hero-title-italic {
  color: #9E7A38 !important;
}
[data-theme="light"] .hero-lead {
  color: #44403C !important;
}
[data-theme="light"] .hero-pill-badge {
  background: #FFFFFF !important;
  border: 1px solid #DDD7CC !important;
  color: #7A5F26 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
}
[data-theme="light"] .hero-trust-bar {
  border-top-color: #E2DCD4 !important;
}
[data-theme="light"] .hero-trust-bar .trust-text {
  color: #44403C !important;
}
[data-theme="light"] .hero-trust-bar .trust-text strong {
  color: #1A1918 !important;
}
[data-theme="light"] .btn-glass {
  background: #FFFFFF !important;
  border: 1px solid #D8D2C7 !important;
  color: #1A1918 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
}
[data-theme="light"] .btn-glass:hover {
  background: #F4F0E8 !important;
  border-color: #9E7A38 !important;
  color: #1A1918 !important;
}

/* Product Cards & Sections (Light) */
[data-theme="light"] .collection-card {
  background: #FFFFFF !important;
  border: 1px solid #E2DCD4 !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
}
[data-theme="light"] .card-img-container {
  background: #F4F1EA !important;
}
[data-theme="light"] .card-title {
  color: #1A1918 !important;
}
[data-theme="light"] .card-desc {
  color: #57534E !important;
}
[data-theme="light"] .price-val {
  color: #1A1918 !important;
}
[data-theme="light"] .price-from {
  color: #78716C !important;
}
[data-theme="light"] .craft-lead-time {
  color: #1A1918 !important;
  font-weight: 700 !important;
}
[data-theme="light"] .btn-card-inquire {
  background: #1A1918 !important;
  color: #FFFFFF !important;
  border-color: #1A1918 !important;
}
[data-theme="light"] .btn-card-inquire:hover {
  background: #9E7A38 !important;
}
[data-theme="light"] .page-hero {
  background: #F2EFE9 !important;
}
[data-theme="light"] .page-hero-title {
  color: #1A1918 !important;
}
[data-theme="light"] .page-hero-desc {
  color: #57534E !important;
}
[data-theme="light"] .spaces-gateways-section {
  background: #F8F7F4 !important;
}

/* Footer (Light) - FIX WHITE HEADINGS ON IVORY BG */
[data-theme="light"] .site-footer {
  background: #ECE7DE !important;
  border-top: 1px solid #DDD7CC !important;
  color: #44403C !important;
}
[data-theme="light"] .footer-brand-name {
  color: #1A1918 !important;
}
[data-theme="light"] .footer-heading {
  color: #1A1918 !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
}
[data-theme="light"] .footer-nav li a,
[data-theme="light"] .footer-credentials li,
[data-theme="light"] .footer-address p {
  color: #292524 !important;
  font-weight: 600 !important;
}
[data-theme="light"] .footer-nav li a:hover {
  color: #9E7A38 !important;
}
[data-theme="light"] .footer-bottom {
  border-top: 1px solid #DDD7CC !important;
}
[data-theme="light"] .footer-bottom-inner {
  color: #57534E !important;
}
"""

css += "\n" + contrast_rules

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Crystal clear contrast rules successfully appended to style.css!")
