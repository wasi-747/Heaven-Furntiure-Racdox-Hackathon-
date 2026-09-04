with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix hero title, italic, lead and trust bar
css = css.replace('.hero-title {\n  font-size: clamp(2.8rem, 4.8vw, 4.5rem);\n  font-weight: 600;\n  line-height: 1.08;\n  letter-spacing: -0.025em;\n  margin-bottom: 1.4rem;\n  color: #FFFFFF;',
                  '.hero-title {\n  font-size: clamp(2.8rem, 4.8vw, 4.5rem);\n  font-weight: 600;\n  line-height: 1.08;\n  letter-spacing: -0.025em;\n  margin-bottom: 1.4rem;\n  color: #1A1918;')

css = css.replace('.hero-title-italic {\n  font-style: italic;\n  font-weight: 400;\n  background: linear-gradient(135deg, #FFFFFF 0%, #D4AF37 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}',
                  '.hero-title-italic {\n  font-style: italic;\n  font-weight: 400;\n  color: #9E7A38;\n}')

css = css.replace('.hero-lead {\n  font-size: clamp(1.05rem, 1.2vw, 1.25rem);\n  color: #A9B5B9;',
                  '.hero-lead {\n  font-size: clamp(1.05rem, 1.2vw, 1.25rem);\n  color: #57534E;')

css = css.replace('.trust-text {\n  font-size: 0.82rem;\n  color: #C3CDD1;\n}',
                  '.trust-text {\n  font-size: 0.88rem;\n  color: #57534E;\n}')

css = css.replace('.trust-text strong {\n  color: #FFFFFF;\n}',
                  '.trust-text strong {\n  color: #1A1918;\n}')

css = css.replace('.hero-pill-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.45rem 1rem;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid var(--border-gold);\n  border-radius: var(--radius-full);\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: #1A1918;',
                  '.hero-pill-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.45rem 1rem;\n  background: #FFFFFF;\n  border: 1px solid #DFD8CD;\n  border-radius: var(--radius-full);\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: #7A5F26;')

css = css.replace('.btn-outline-gold {\n  background: rgba(212, 175, 55, 0.04);\n  border-color: rgba(212, 175, 55, 0.4);\n  color: #F3E5C8;\n}',
                  '.btn-outline-gold {\n  background: #FFFFFF;\n  border: 1px solid #9E7A38;\n  color: #1A1918;\n  font-weight: 600;\n}\n.btn-outline-gold:hover {\n  background: #F6F3EE;\n  color: #1A1918;\n}')

# Floating hero badges
css = css.replace('background: rgba(10, 18, 20, 0.9);', 'background: rgba(255, 255, 255, 0.96);')
css = css.replace('color: #BAC6CB;', 'color: #57534E;')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Homepage hero typography updated successfully!")
