with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

dual_mode_and_modal_css = """
/* ==========================================================================
   DUAL THEME ENGINE: ATELIER DARK (DEFAULT) & GALLERY LIGHT
   ========================================================================== */

/* Dark Mode Tokens (Atelier Original - Default) */
:root,
[data-theme="dark"] {
  --bg-primary: #0A1214;       /* Deep Charcoal-Teal */
  --bg-surface: #111D20;       /* Rich Charcoal Card Surface */
  --bg-surface-elevated: #16262A;
  --bg-surface-glass: rgba(18, 30, 33, 0.88);

  --color-gold: #D4AF37;       /* Muted Brushed Brass / Gold */
  --color-gold-hover: #E2C264;
  --color-gold-light: rgba(212, 175, 55, 0.12);
  --color-gold-glow: rgba(212, 175, 55, 0.32);

  --text-white: #FFFFFF;
  --text-primary: #FFFFFF;
  --text-muted: #9BA7AC;
  --text-faint: #67757B;
  --text-dark: #121617;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-gold: rgba(212, 175, 55, 0.3);
  --border-card: rgba(255, 255, 255, 0.08);

  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.4);
  --shadow-card-hover: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.12);

  --card-img-bg: #0E1719;
  --modal-bg: #111D20;
  --modal-dims-bg: #0A1214;
}

/* Light Mode Tokens (Paper Gallery - High Contrast) */
[data-theme="light"] {
  --bg-primary: #F8F7F4;       /* Warm Editorial Gallery Paper */
  --bg-surface: #FFFFFF;       /* Crisp White Card Surface */
  --bg-surface-elevated: #F2EFEA;
  --bg-surface-glass: rgba(248, 247, 244, 0.96);

  --color-gold: #9E7A38;       /* Deep Antique Brass */
  --color-gold-hover: #7E5F26;
  --color-gold-light: rgba(158, 122, 56, 0.08);
  --color-gold-glow: rgba(158, 122, 56, 0.18);

  --text-white: #1A1918;
  --text-primary: #1A1918;
  --text-muted: #57534E;
  --text-faint: #858079;
  --text-dark: #121617;

  --border-subtle: #E8E4DE;
  --border-gold: rgba(158, 122, 56, 0.35);
  --border-card: #E8E4DE;

  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 16px 36px rgba(0, 0, 0, 0.09);

  --card-img-bg: #F5F3EE;
  --modal-bg: #FFFFFF;
  --modal-dims-bg: #F8F7F4;
}

/* Global Theme Transitions */
body, .site-header, .collection-card, .product-modal-container {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* ==========================================================================
   THEME TOGGLE BUTTON IN HEADER
   ========================================================================== */
.theme-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-gold);
  color: var(--text-white);
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  backdrop-filter: blur(8px);
}

.theme-toggle-btn:hover {
  background: var(--color-gold-light);
  border-color: var(--color-gold);
  transform: translateY(-1px);
}

/* ==========================================================================
   CRITICAL: FURNITURE CUT-OFF FIX (OBJECT-FIT CONTAIN)
   ========================================================================== */
.card-img-container {
  height: 310px !important;
  background: var(--card-img-bg) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 1.4rem !important; /* Generous breathing room: zero cut-off! */
  position: relative !important;
  overflow: hidden !important;
}

.card-showcase-img {
  max-width: 100% !important;
  max-height: 100% !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important; /* PREVENT ANY CROPPING OF FURNITURE! */
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.15)) !important;
  transition: transform 0.4s ease !important;
}

.collection-card:hover .card-showcase-img {
  transform: scale(1.05) !important;
}

/* Card General Styling in Dual Theme */
.collection-card {
  background: var(--bg-surface) !important;
  border: 1px solid var(--border-card) !important;
  color: var(--text-white) !important;
}

.card-title {
  color: var(--text-white) !important;
}

.card-desc {
  color: var(--text-muted) !important;
}

.price-val {
  color: var(--text-white) !important;
}

/* ==========================================================================
   PRODUCT DETAIL MODAL (Matching yourfirstsite.com exact layout)
   ========================================================================== */
.product-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.product-modal-backdrop.open {
  opacity: 1;
  visibility: visible;
}

.product-modal-container {
  position: relative;
  width: 100%;
  max-width: 1060px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--modal-bg);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-xl);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  transform: scale(0.95);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-modal-backdrop.open .product-modal-container {
  transform: scale(1);
}

.product-modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--border-subtle);
  color: var(--text-white);
  font-size: 1.75rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: var(--transition-fast);
}

.product-modal-close:hover {
  background: var(--color-gold);
  color: #0A1214;
}

.product-modal-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 2.5rem;
  padding: 3rem 2.5rem;
}

@media (max-width: 860px) {
  .product-modal-grid {
    grid-template-columns: 1fr;
    gap: 1.8rem;
    padding: 2.5rem 1.5rem;
  }
}

/* Modal Visual Column */
.product-modal-visual {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.product-modal-img-wrap {
  width: 100%;
  height: 420px;
  background: var(--card-img-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
}

.product-modal-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 14px 28px rgba(0, 0, 0, 0.2));
}

.product-modal-note {
  margin-top: 1rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Modal Info Column */
.product-modal-info {
  display: flex;
  flex-direction: column;
}

.product-modal-cat {
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--color-gold);
  margin-bottom: 0.4rem;
}

.product-modal-title {
  font-family: var(--font-serif);
  font-size: 2.3rem;
  font-weight: 600;
  color: var(--text-white);
  line-height: 1.15;
  margin-bottom: 0.4rem;
}

.product-modal-tagline {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
  font-weight: 500;
}

.product-modal-desc {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

/* Spec Block: Dimensions */
.modal-spec-block {
  margin-bottom: 1.3rem;
}

.modal-spec-heading {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--text-faint);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.modal-dims-table {
  background: var(--modal-dims-bg);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 0.5rem 1rem;
}

.dims-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.45rem 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.88rem;
}

.dims-row:last-child {
  border-bottom: none;
}

.dims-label {
  color: var(--text-muted);
  font-weight: 500;
}

.dims-val {
  color: var(--text-white);
  font-weight: 600;
}

.dims-inch {
  color: var(--text-faint);
  font-size: 0.8rem;
}

/* Spec Block: Materials */
.modal-materials-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem 1rem;
}

.modal-materials-list li {
  font-size: 0.86rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.mat-bullet {
  color: var(--color-gold);
  font-size: 1.2rem;
  line-height: 0;
}

/* Price & Lead */
.modal-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  margin: 1rem 0 1.4rem;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.modal-price-label, .modal-lead-label {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 0.25rem;
  font-weight: 700;
}

.modal-price-val {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-gold);
}

.modal-lead-val {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-white);
}

.modal-action-bar {
  margin-top: 0.5rem;
}

.modal-wa-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  font-size: 1rem;
  padding: 1rem 1.5rem;
}
"""

css += "\n" + dual_mode_and_modal_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Dual theme and Product Modal CSS installed successfully!")
