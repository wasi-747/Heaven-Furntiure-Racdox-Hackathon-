with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix heading colors from white to charcoal
css = css.replace('.page-hero-title {\n  font-size: clamp(2.8rem, 5vw, 4.4rem);\n  color: #FFFFFF;',
                  '.page-hero-title {\n  font-size: clamp(2.8rem, 5vw, 4.4rem);\n  color: #1A1918;')

css = css.replace('.brand-name {\n  font-family: var(--font-serif);\n  font-size: 1.35rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  color: #FFFFFF;',
                  '.brand-name {\n  font-family: var(--font-serif);\n  font-size: 1.35rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  color: #1A1918;')

css = css.replace('.hero-title {\n  font-size: clamp(2.5rem, 5.5vw, 4.2rem);\n  color: #FFFFFF;',
                  '.hero-title {\n  font-size: clamp(2.5rem, 5.5vw, 4.2rem);\n  color: #1A1918;')

css = css.replace('.gateway-title {\n  font-size: 1.5rem;\n  color: #FFFFFF;',
                  '.gateway-title {\n  font-size: 1.5rem;\n  color: #1A1918;')

# Make angle switcher bar clean, subtle and non-distracting
css = css.replace('.angle-switcher-bar {\n  background: #FAF9F6;',
                  '.angle-switcher-bar {\n  background: #FAF8F5;\n  border-top: 1px solid #ECE8E1;\n  border-bottom: 1px solid #ECE8E1;')

# Streamline angle caption to be gentle and clean
css = css.replace('.angle-caption-text {\n  font-size: 0.75rem;\n  color: #6E6962;\n  font-style: italic;\n  padding: 0.5rem 1.25rem 0.2rem;\n  background: #FAF8F5;',
                  '.angle-caption-text {\n  font-size: 0.8rem;\n  color: #6E6962;\n  padding: 0.4rem 1.25rem;\n  background: #FAF8F5;\n  border-bottom: 1px solid #ECE8E1;')

# Enhance card body typography for maximum legibility (40-60 age demographic)
card_body_patch = """
/* Enhanced Product Card Typography (Clean, Airy, High Contrast) */
.collection-card {
  background: #FFFFFF !important;
  border: 1px solid #E6E1D8 !important;
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
}

.collection-card:hover {
  transform: translateY(-6px) !important;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.09) !important;
  border-color: #9E7A38 !important;
}

.card-img-container {
  height: 320px !important;
  background: #F5F3EE !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
}

.card-showcase-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.card-category-tag {
  background: rgba(255, 255, 255, 0.94) !important;
  color: #7A5F26 !important;
  border: 1px solid #E2DCD4 !important;
  font-size: 0.78rem !important;
  font-weight: 700 !important;
  padding: 0.4rem 0.85rem !important;
  border-radius: 999px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
}

.blueprint-dimensions-tag {
  background: rgba(255, 255, 255, 0.94) !important;
  color: #383531 !important;
  border: 1px solid #E2DCD4 !important;
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  padding: 0.35rem 0.75rem !important;
  border-radius: 6px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
}

.card-body {
  padding: 1.5rem !important;
  background: #FFFFFF !important;
}

.card-meta {
  font-size: 0.92rem !important;
  font-weight: 600 !important;
  color: #8C6A28 !important;
  margin-bottom: 0.5rem !important;
}

.card-title {
  font-size: 1.35rem !important;
  font-weight: 700 !important;
  color: #1A1918 !important;
  line-height: 1.3 !important;
  margin-bottom: 0.6rem !important;
  letter-spacing: -0.01em !important;
}

.card-desc {
  font-size: 0.95rem !important;
  color: #57534E !important;
  line-height: 1.6 !important;
  margin-bottom: 1.2rem !important;
}

.card-footer {
  margin-top: auto !important;
  padding-top: 1rem !important;
  border-top: 1px solid #EFECE6 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.85rem !important;
}

.craft-lead-time {
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  color: #1A1918 !important;
}

.btn-card-inquire {
  width: 100% !important;
  background: #1A1918 !important;
  color: #FFFFFF !important;
  border: 1px solid #1A1918 !important;
  padding: 0.85rem 1.25rem !important;
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  border-radius: 999px !important;
  cursor: pointer !important;
  transition: all 0.25s ease !important;
  text-align: center !important;
}

.btn-card-inquire:hover {
  background: #9E7A38 !important;
  border-color: #9E7A38 !important;
  transform: translateY(-2px) !important;
}
"""

css += "\n" + card_body_patch

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Card typography and contrast enhanced successfully!")
