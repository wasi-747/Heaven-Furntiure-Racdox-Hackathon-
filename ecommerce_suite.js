/**
 * HEAVEN FURNITURE MART — ATELIER E-COMMERCE SUITE
 * Complete Frontend eCommerce Engine:
 * - Hatil-Inspired Split Login/Sign-up VIP Modal
 * - Instant Live Search Command Palette (Ctrl+K)
 * - Slide-Over Cart & Atelier Bag Drawer with WhatsApp Checkout
 * - Slide-Over Wishlist / Saved Blueprints Drawer
 * - LocalStorage State & Real-time Header Badge Sync
 */

(function () {
  'use strict';

  // VIP Client Default Profile for instant demo
  const VIP_DEMO_CLIENT = {
    name: 'Dr. Tariqul Islam',
    email: 'tariqul.islam@chattogram.com',
    phone: '+880 1711-234567',
    vipStatus: 'Gold Atelier Patron',
    orders: [
      {
        id: 'HFM-2026-8819',
        piece: 'Custom 10-Seater Live-Edge Teak Dining Suite',
        status: 'Mortise & Tenon Joinery in Progress',
        estDelivery: 'March 28, 2026'
      }
    ]
  };

  // Sample seed piece if cart is empty and user wants a quick demo
  const SAMPLE_CART_ITEM = {
    id: 'royal_blue_gold_luxury_sofa_pair',
    name: 'Royal Sofa Pair',
    price: 150000,
    timber: 'Seasoned Burmese Teak & Gilded Mahogany',
    image: 'assets/royal_blue_gold_luxury_sofa_pair.webp',
    qty: 1
  };

  const SAMPLE_WISHLIST_ITEM = {
    id: 'luxury_cream_marble_dining_table_set',
    name: 'Imperial Marble Dining Suite',
    price: 210000,
    timber: 'Italian Carrara Marble & Chittagong Gamari',
    image: 'assets/luxury_cream_marble_dining_table_set.webp'
  };

  // State
  let cart = [];
  let wishlist = [];
  let currentUser = null;
  let isSignupMode = false;

  // Initialize
  document.addEventListener('DOMContentLoaded', initEcommerceSuite);

  function initEcommerceSuite() {
    loadPersistedState();
    injectModalsAndDrawers();
    bindHeaderActions();
    bindAuthModal();
    bindCartDrawer();
    bindWishlistDrawer();
    bindSearchModal();
    updateHeaderUI();
    exposeGlobalEcommerceAPI();
  }

  /* --------------------------------------------------------------------------
     1. STATE MANAGEMENT (LocalStorage)
     -------------------------------------------------------------------------- */
  function loadPersistedState() {
    try {
      const storedCart = localStorage.getItem('hfm_cart');
      if (storedCart) cart = JSON.parse(storedCart);

      const storedWishlist = localStorage.getItem('hfm_wishlist');
      if (storedWishlist) wishlist = JSON.parse(storedWishlist);

      const storedUser = localStorage.getItem('hfm_user');
      if (storedUser) currentUser = JSON.parse(storedUser);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function saveCart() {
    try {
      localStorage.setItem('hfm_cart', JSON.stringify(cart));
    } catch (e) {}
    updateHeaderUI();
    renderCartItems();
  }

  function saveWishlist() {
    try {
      localStorage.setItem('hfm_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
    updateHeaderUI();
    renderWishlistItems();
  }

  function saveUser(user) {
    currentUser = user;
    try {
      if (user) {
        localStorage.setItem('hfm_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('hfm_user');
      }
    } catch (e) {}
    updateHeaderUI();
  }

  /* --------------------------------------------------------------------------
     2. DYNAMIC MODALS & DRAWERS INJECTION
     -------------------------------------------------------------------------- */
  function injectModalsAndDrawers() {
    // 1. Hatil-Inspired Split Auth Modal
    if (!document.getElementById('authModal')) {
      const authDiv = document.createElement('div');
      authDiv.id = 'authModal';
      authDiv.className = 'auth-modal-backdrop';
      authDiv.setAttribute('role', 'dialog');
      authDiv.setAttribute('aria-modal', 'true');
      authDiv.innerHTML = `
        <div class="auth-modal-card">
          <button type="button" class="auth-modal-close" id="authModalClose" aria-label="Close Authentication Modal">&times;</button>
          
          <!-- LEFT PANEL: The Atelier Invitation (Inspired by Hatil) -->
          <div class="auth-left-panel">
            <div class="auth-panel-glow"></div>
            <div class="auth-brand-emblem">
              <img src="assets/heaven_official_badge.svg" alt="Heaven Furniture Mart Official Emblem" class="auth-logo-badge">
            </div>
            <div>
              <h3 class="auth-panel-title">Welcome to The Atelier</h3>
              <p class="auth-panel-subtitle">
                Heaven Furniture Mart is Chattogram’s premier bespoke architectural atelier. Log in to track your custom carpentry, save itemized room blueprints, and download your signed 10-Year Guarantee.
              </p>

              <div class="auth-panel-perks">
                <div class="auth-perk-item">
                  <span class="perk-dot">●</span>
                  <span>Direct VIP WhatsApp Concierge</span>
                </div>
                <div class="auth-perk-item">
                  <span class="perk-dot">●</span>
                  <span>Real-time Teak Seasoning Tracker</span>
                </div>
                <div class="auth-perk-item">
                  <span class="perk-dot">●</span>
                  <span>Itemized Architectural Blueprints</span>
                </div>
              </div>
            </div>

            <div class="auth-panel-switch">
              <span class="switch-label" id="authSwitchPrompt">Don't have an account yet?</span>
              <button type="button" class="auth-switch-btn" id="authToggleModeBtn">Create Atelier Account</button>
            </div>
          </div>

          <!-- RIGHT PANEL: Credentials & VIP Demo Access -->
          <div class="auth-right-panel">
            <!-- Fast Track Demo Button for Hackathon Judges -->
            <div class="auth-quick-demo-banner">
              <button type="button" class="vip-demo-login-btn" id="quickVipDemoBtn">
                <span class="vip-sparkle">✨</span>
                <div class="vip-text">
                  <strong>One-Click VIP Demo Access</strong>
                  <small>Instant sign-in as Dr. Tariqul Islam (Active Commission)</small>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <div class="auth-divider-text"><span>or enter client credentials</span></div>
            </div>

            <!-- FORM -->
            <form class="auth-form" id="atelierAuthForm">
              <h4 class="auth-form-title" id="authFormTitle">Log in to HEAVEN</h4>

              <!-- Name (Sign-up only) -->
              <div class="form-group signup-only-field" id="authNameGroup" style="display: none; margin-bottom: 1rem;">
                <label for="authFullName" style="display:block; font-size: 0.82rem; font-weight:600; margin-bottom: 4px;">Full Name *</label>
                <div class="auth-input-wrapper">
                  <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input type="text" id="authFullName" placeholder="e.g. Engr. Shafiqur Rahman">
                </div>
              </div>

              <!-- Phone / WhatsApp (Sign-up only) -->
              <div class="form-group signup-only-field" id="authPhoneGroup" style="display: none; margin-bottom: 1rem;">
                <label for="authPhone" style="display:block; font-size: 0.82rem; font-weight:600; margin-bottom: 4px;">WhatsApp / Mobile *</label>
                <div class="auth-input-wrapper">
                  <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <input type="tel" id="authPhone" placeholder="+880 18XX-XXXXXX">
                </div>
              </div>

              <!-- Email -->
              <div class="form-group" style="margin-bottom: 1rem;">
                <label for="authEmail" style="display:block; font-size: 0.82rem; font-weight:600; margin-bottom: 4px;">Email Address *</label>
                <div class="auth-input-wrapper">
                  <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input type="email" id="authEmail" required placeholder="client@residence.com">
                </div>
              </div>

              <!-- Password -->
              <div class="form-group" style="margin-bottom: 0.8rem;">
                <div class="label-row">
                  <label for="authPassword" style="font-size: 0.82rem; font-weight:600;">Password *</label>
                  <a href="#" class="forgot-pwd-link" id="forgotPwdLink">Forgot Password?</a>
                </div>
                <div class="auth-input-wrapper">
                  <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input type="password" id="authPassword" required placeholder="••••••••">
                  <button type="button" class="pwd-toggle-btn" id="pwdToggleBtn" aria-label="Toggle password visibility">👁️</button>
                </div>
              </div>

              <div class="auth-meta-row">
                <label class="remember-label">
                  <input type="checkbox" id="authRemember" checked>
                  <span>Keep me logged in on this browser</span>
                </label>
              </div>

              <button type="submit" class="auth-submit-btn" id="authSubmitBtn">
                <span>Log In to Atelier</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(authDiv);
    }

    // 2. Slide-Over Cart / Atelier Bag Drawer
    if (!document.getElementById('cartDrawer')) {
      const cartDiv = document.createElement('div');
      cartDiv.id = 'cartDrawer';
      cartDiv.className = 'atelier-drawer';
      cartDiv.innerHTML = `
        <div class="drawer-header-row">
          <div class="drawer-title-group">
            <h3 class="drawer-heading">Atelier Bag</h3>
            <span class="client-vip-badge" id="cartDrawerBadge">0 Items</span>
          </div>
          <button type="button" class="drawer-close-btn" id="cartDrawerClose" aria-label="Close Bag">&times;</button>
        </div>

        <div class="drawer-content-scroll" id="cartDrawerItems">
          <!-- Populated by JS -->
        </div>

        <div class="drawer-footer-box" id="cartDrawerFooter">
          <div class="drawer-subtotal-row">
            <span>Estimated Total:</span>
            <strong class="drawer-total-amount" id="cartDrawerTotal">৳0</strong>
          </div>
          <div class="drawer-advance-hint">
            50% Production Advance: <strong id="cartDrawerAdvance">৳0</strong> · Balance upon delivery & assembly.
          </div>
          <a href="#" class="drawer-whatsapp-btn" id="cartCheckoutWaBtn" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.128-.536-1.745-.729-2.876-2.518-2.964-2.634-.088-.117-.714-.95-.714-1.815 0-.866.452-1.291.613-1.468.161-.177.352-.222.469-.222.117 0 .235.001.338.006.109.005.255-.042.399.303.149.356.51 1.246.554 1.335.044.089.073.193.015.309-.059.117-.088.19-.176.294-.088.104-.185.233-.264.313-.088.089-.18.186-.078.361.103.175.457.755.981 1.222.674.6 1.243.786 1.418.874.176.088.279.074.382-.045.103-.117.44-.514.558-.69.117-.176.235-.147.396-.088.161.059 1.026.484 1.202.572.176.088.293.132.338.206.044.074.044.43-.1 1.035z"/></svg>
            <span>Confirm Blueprint with Concierge</span>
          </a>
        </div>
      `;
      document.body.appendChild(cartDiv);
    }

    // 3. Slide-Over Wishlist Drawer
    if (!document.getElementById('wishlistDrawer')) {
      const wishDiv = document.createElement('div');
      wishDiv.id = 'wishlistDrawer';
      wishDiv.className = 'atelier-drawer';
      wishDiv.innerHTML = `
        <div class="drawer-header-row">
          <div class="drawer-title-group">
            <h3 class="drawer-heading">Saved Blueprints</h3>
            <span class="client-vip-badge" id="wishlistDrawerBadge">0 Pieces</span>
          </div>
          <button type="button" class="drawer-close-btn" id="wishlistDrawerClose" aria-label="Close Wishlist">&times;</button>
        </div>

        <div class="drawer-content-scroll" id="wishlistDrawerItems">
          <!-- Populated by JS -->
        </div>
      `;
      document.body.appendChild(wishDiv);
    }

    // Backdrop for Drawers
    if (!document.getElementById('atelierDrawerBackdrop')) {
      const backdrop = document.createElement('div');
      backdrop.id = 'atelierDrawerBackdrop';
      backdrop.className = 'atelier-drawer-backdrop';
      document.body.appendChild(backdrop);
    }

    // 4. Instant Search Command Palette Modal (Ctrl+K)
    if (!document.getElementById('searchModal')) {
      const searchDiv = document.createElement('div');
      searchDiv.id = 'searchModal';
      searchDiv.className = 'search-modal-backdrop';
      searchDiv.setAttribute('role', 'dialog');
      searchDiv.setAttribute('aria-modal', 'true');
      searchDiv.innerHTML = `
        <div class="search-modal-card">
          <div class="search-input-header">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="liveSearchInput" placeholder="Search custom sofas, teak beds, dining tables, gamari desks..." autocomplete="off">
            <button type="button" class="search-modal-close" id="searchModalClose" aria-label="Close Search">&times;</button>
          </div>
          
          <div class="search-chips-row">
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); margin-right: 4px;">Suggestions:</span>
            <button type="button" class="search-chip" data-query="Burmese Teak">🪵 Burmese Teak</button>
            <button type="button" class="search-chip" data-query="Sofa">🛋️ Royal Sofa</button>
            <button type="button" class="search-chip" data-query="Dining">🍽️ Marble Dining</button>
            <button type="button" class="search-chip" data-query="Bed">🛏️ Velvet Bed</button>
            <button type="button" class="search-chip" data-query="Desk">💼 Executive Desk</button>
          </div>

          <div class="search-results-list" id="searchResultsContainer">
            <!-- Results rendered on keyup -->
          </div>
        </div>
      `;
      document.body.appendChild(searchDiv);
    }

    // 5. Toast Notification Container
    if (!document.getElementById('atelierToast')) {
      const toast = document.createElement('div');
      toast.id = 'atelierToast';
      toast.className = 'atelier-toast';
      toast.innerHTML = `
        <span class="toast-icon">✨</span>
        <span class="toast-msg" id="atelierToastMsg">Item updated</span>
      `;
      document.body.appendChild(toast);
    }
  }

  /* --------------------------------------------------------------------------
     3. HEADER ACTIONS BINDINGS
     -------------------------------------------------------------------------- */
  function bindHeaderActions() {
    // Search Button
    const searchBtn = document.getElementById('headerSearchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', openSearchModal);
    }

    // Cart Button
    const cartBtn = document.getElementById('headerCartBtn');
    if (cartBtn) {
      cartBtn.addEventListener('click', openCartDrawer);
    }

    // Wishlist Button
    const wishBtn = document.getElementById('headerWishlistBtn');
    if (wishBtn) {
      wishBtn.addEventListener('click', openWishlistDrawer);
    }

    // Compare Button (Regal Inspiration)
    const compareBtn = document.getElementById('headerCompareBtn');
    if (compareBtn) {
      compareBtn.addEventListener('click', () => {
        showToast('⚖️ Spec Comparator: Select any 2 pieces to compare timber density & joinery side-by-side.');
      });
    }

    // Profile Trigger Button
    const profileBtn = document.getElementById('headerProfileBtn');
    const clientMenu = document.getElementById('clientDropdownMenu');

    if (profileBtn) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentUser) {
          // Toggle dropdown menu
          if (clientMenu) clientMenu.classList.toggle('active');
        } else {
          // Open Hatil-style split Auth modal
          openAuthModal(false);
        }
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (clientMenu && clientMenu.classList.contains('active')) {
        if (!e.target.closest('#profileDropdownWrapper')) {
          clientMenu.classList.remove('active');
        }
      }
    });

    // Logout
    const logoutBtn = document.getElementById('clientLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        saveUser(null);
        if (clientMenu) clientMenu.classList.remove('active');
        showToast('Signed out of Atelier session.');
      });
    }

    // Dropdown internal quick links
    const savedLink = document.getElementById('openSavedBlueprintsLink');
    if (savedLink) {
      savedLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (clientMenu) clientMenu.classList.remove('active');
        openWishlistDrawer();
      });
    }

    const commLink = document.getElementById('viewCommissionsLink');
    if (commLink) {
      commLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (clientMenu) clientMenu.classList.remove('active');
        showToast('📋 Order #HFM-2026-8819: Teak dining suite undergoing 2nd wax coat at Agrabad atelier.');
      });
    }

    const warrLink = document.getElementById('viewWarrantyLink');
    if (warrLink) {
      warrLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (clientMenu) clientMenu.classList.remove('active');
        const proofs = document.getElementById('proofs');
        if (proofs) proofs.scrollIntoView({ behavior: 'smooth' });
        showToast('📜 10-Year Certificate Bond verified for Dr. Tariqul Islam.');
      });
    }

    // Keyboard shortcut for search: Ctrl+K or Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeAllModalsAndDrawers();
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. HATIL-STYLE SPLIT AUTH MODAL CONTROLLER
     -------------------------------------------------------------------------- */
  function bindAuthModal() {
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('authModalClose');
    const toggleModeBtn = document.getElementById('authToggleModeBtn');
    const quickVipBtn = document.getElementById('quickVipDemoBtn');
    const form = document.getElementById('atelierAuthForm');
    const pwdToggleBtn = document.getElementById('pwdToggleBtn');
    const pwdInput = document.getElementById('authPassword');
    const forgotLink = document.getElementById('forgotPwdLink');

    if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeAuthModal();
      });
    }

    // Toggle Sign In vs Sign Up mode
    if (toggleModeBtn) {
      toggleModeBtn.addEventListener('click', () => {
        isSignupMode = !isSignupMode;
        renderAuthMode();
      });
    }

    // Password visibility toggle
    if (pwdToggleBtn && pwdInput) {
      pwdToggleBtn.addEventListener('click', () => {
        const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwdInput.setAttribute('type', type);
        pwdToggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
      });
    }

    // Forgot password simulation
    if (forgotLink) {
      forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('🔑 Verification PIN dispatched to your email & WhatsApp.');
      });
    }

    // Instant VIP Demo Access Button (One-Click!)
    if (quickVipBtn) {
      quickVipBtn.addEventListener('click', () => {
        saveUser(VIP_DEMO_CLIENT);
        // Seed 1 cart item and 1 wishlist item so the judge sees full platform depth
        if (cart.length === 0) {
          cart.push(SAMPLE_CART_ITEM);
          saveCart();
        }
        if (wishlist.length === 0) {
          wishlist.push(SAMPLE_WISHLIST_ITEM);
          saveWishlist();
        }
        closeAuthModal();
        showToast(`✨ Welcome back, ${VIP_DEMO_CLIENT.name}! VIP Atelier portal active.`);
      });
    }

    // Form submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('authEmail').value.trim();
        const fullName = document.getElementById('authFullName') ? document.getElementById('authFullName').value.trim() : '';

        const nameToUse = fullName || (email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())) || 'Valued Client';

        const userObj = {
          name: nameToUse,
          email: email,
          vipStatus: isSignupMode ? 'New Patron' : 'Atelier Member',
          orders: []
        };

        saveUser(userObj);
        closeAuthModal();
        showToast(`Welcome, ${nameToUse}! Profile logged in successfully.`);
      });
    }
  }

  function renderAuthMode() {
    const title = document.getElementById('authFormTitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const switchPrompt = document.getElementById('authSwitchPrompt');
    const toggleBtn = document.getElementById('authToggleModeBtn');
    const nameGroup = document.getElementById('authNameGroup');
    const phoneGroup = document.getElementById('authPhoneGroup');

    if (isSignupMode) {
      if (title) title.textContent = 'Create Atelier Account';
      if (submitBtn) submitBtn.querySelector('span').textContent = 'Join Heaven Atelier';
      if (switchPrompt) switchPrompt.textContent = 'Already have an account?';
      if (toggleBtn) toggleBtn.textContent = 'Log In Instead';
      if (nameGroup) nameGroup.style.display = 'block';
      if (phoneGroup) phoneGroup.style.display = 'block';
    } else {
      if (title) title.textContent = 'Log in to HEAVEN';
      if (submitBtn) submitBtn.querySelector('span').textContent = 'Log In to Atelier';
      if (switchPrompt) switchPrompt.textContent = "Don't have an account yet?";
      if (toggleBtn) toggleBtn.textContent = 'Create Atelier Account';
      if (nameGroup) nameGroup.style.display = 'none';
      if (phoneGroup) phoneGroup.style.display = 'none';
    }
  }

  function openAuthModal(signup = false) {
    isSignupMode = signup;
    renderAuthMode();
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     5. CART & ATELIER BAG DRAWER
     -------------------------------------------------------------------------- */
  function bindCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const closeBtn = document.getElementById('cartDrawerClose');
    const backdrop = document.getElementById('atelierDrawerBackdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
    if (backdrop) backdrop.addEventListener('click', closeAllModalsAndDrawers);
  }

  function openCartDrawer() {
    closeAllModalsAndDrawers();
    renderCartItems();
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('atelierDrawerBackdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('atelierDrawerBackdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderCartItems() {
    const container = document.getElementById('cartDrawerItems');
    const footer = document.getElementById('cartDrawerFooter');
    const badge = document.getElementById('cartDrawerBadge');
    const totalEl = document.getElementById('cartDrawerTotal');
    const advanceEl = document.getElementById('cartDrawerAdvance');
    const waBtn = document.getElementById('cartCheckoutWaBtn');

    if (!container) return;

    if (badge) badge.textContent = `${cart.length} ${cart.length === 1 ? 'Item' : 'Items'}`;

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="drawer-empty-view">
          <div class="empty-drawer-icon">🛍️</div>
          <h4 class="empty-drawer-title">Your Atelier Bag is Empty</h4>
          <p class="empty-drawer-desc">You haven't commissioned or added any bespoke furniture pieces yet.</p>
          <button type="button" class="btn btn-gold" id="seedDemoCartBtn" style="font-size: 0.82rem; padding: 0.7rem 1.3rem;">
            <span>⚡ Add Royal Sofa Pair (Demo)</span>
          </button>
        </div>
      `;
      if (footer) footer.style.display = 'none';

      const seedBtn = document.getElementById('seedDemoCartBtn');
      if (seedBtn) {
        seedBtn.addEventListener('click', () => {
          cart.push(SAMPLE_CART_ITEM);
          saveCart();
          showToast('Added Royal Sofa Pair to Atelier Bag!');
        });
      }
      return;
    }

    if (footer) footer.style.display = 'block';

    let total = 0;
    let html = '';

    cart.forEach((item, index) => {
      const itemSubtotal = item.price * (item.qty || 1);
      total += itemSubtotal;

      html += `
        <div class="drawer-item-card" data-index="${index}">
          <img src="${item.image || 'assets/hero_poster.webp'}" alt="${item.name}" class="drawer-item-thumb">
          <div class="drawer-item-info">
            <strong>${item.name}</strong>
            <span class="drawer-item-price">৳${item.price.toLocaleString('en-IN')}</span>
            <div class="drawer-qty-controls">
              <button type="button" class="qty-btn cart-qty-minus" data-index="${index}">-</button>
              <span class="qty-val">${item.qty || 1}</span>
              <button type="button" class="qty-btn cart-qty-plus" data-index="${index}">+</button>
            </div>
          </div>
          <button type="button" class="drawer-item-remove cart-item-del" data-index="${index}" title="Remove piece">&times;</button>
        </div>
      `;
    });

    container.innerHTML = html;

    if (totalEl) totalEl.textContent = `৳${total.toLocaleString('en-IN')}`;
    if (advanceEl) advanceEl.textContent = `৳${Math.round(total * 0.5).toLocaleString('en-IN')}`;

    // WhatsApp Message payload
    if (waBtn) {
      const summaryList = cart.map(i => `• ${i.name} (Qty: ${i.qty || 1}) - ৳${(i.price * (i.qty || 1)).toLocaleString('en-IN')}`).join('%0A');
      const waText = `Hi Heaven Furniture Mart,%0A%0AI would like to commission the following bespoke furniture order:%0A${summaryList}%0A%0AEstimated Total: ৳${total.toLocaleString('en-IN')}%0AClient: ${currentUser ? currentUser.name : 'Guest Client'}%0APlease confirm blueprint schedule.`;
      waBtn.href = `https://wa.me/8801960481983?text=${waText}`;
    }

    // Attach qty & delete handlers
    container.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        cart[idx].qty = (cart[idx].qty || 1) + 1;
        saveCart();
      });
    });

    container.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (cart[idx].qty > 1) {
          cart[idx].qty -= 1;
        } else {
          cart.splice(idx, 1);
        }
        saveCart();
      });
    });

    container.querySelectorAll('.cart-item-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const removed = cart.splice(idx, 1);
        saveCart();
        showToast(`Removed ${removed[0]?.name || 'item'} from bag.`);
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. WISHLIST / SAVED BLUEPRINTS DRAWER
     -------------------------------------------------------------------------- */
  function bindWishlistDrawer() {
    const drawer = document.getElementById('wishlistDrawer');
    const closeBtn = document.getElementById('wishlistDrawerClose');
    if (closeBtn) closeBtn.addEventListener('click', closeWishlistDrawer);
  }

  function openWishlistDrawer() {
    closeAllModalsAndDrawers();
    renderWishlistItems();
    const drawer = document.getElementById('wishlistDrawer');
    const backdrop = document.getElementById('atelierDrawerBackdrop');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlistDrawer() {
    const drawer = document.getElementById('wishlistDrawer');
    const backdrop = document.getElementById('atelierDrawerBackdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderWishlistItems() {
    const container = document.getElementById('wishlistDrawerItems');
    const badge = document.getElementById('wishlistDrawerBadge');
    if (!container) return;

    if (badge) badge.textContent = `${wishlist.length} ${wishlist.length === 1 ? 'Piece' : 'Pieces'}`;

    if (wishlist.length === 0) {
      container.innerHTML = `
        <div class="drawer-empty-view">
          <div class="empty-drawer-icon">❤️</div>
          <h4 class="empty-drawer-title">No Saved Blueprints</h4>
          <p class="empty-drawer-desc">Click the heart icon on any sofa, bed or dining set to save it to your bespoke shortlist.</p>
          <button type="button" class="btn btn-gold" id="seedDemoWishBtn" style="font-size: 0.82rem; padding: 0.7rem 1.3rem;">
            <span>⚡ Save Imperial Marble Table (Demo)</span>
          </button>
        </div>
      `;

      const seedBtn = document.getElementById('seedDemoWishBtn');
      if (seedBtn) {
        seedBtn.addEventListener('click', () => {
          wishlist.push(SAMPLE_WISHLIST_ITEM);
          saveWishlist();
          showToast('Added Imperial Marble Suite to Wishlist!');
        });
      }
      return;
    }

    let html = '';
    wishlist.forEach((item, index) => {
      html += `
        <div class="drawer-item-card" data-index="${index}">
          <img src="${item.image || 'assets/hero_poster.webp'}" alt="${item.name}" class="drawer-item-thumb">
          <div class="drawer-item-info">
            <strong>${item.name}</strong>
            <span class="drawer-item-price">৳${item.price.toLocaleString('en-IN')}</span>
            <div style="margin-top: 6px;">
              <button type="button" class="btn btn-gold wish-move-to-cart" data-index="${index}" style="font-size: 0.72rem; padding: 4px 10px;">
                <span>+ Move to Bag</span>
              </button>
            </div>
          </div>
          <button type="button" class="drawer-item-remove wish-item-del" data-index="${index}" title="Remove">&times;</button>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.wish-move-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const item = wishlist.splice(idx, 1)[0];
        cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: 1
        });
        saveWishlist();
        saveCart();
        showToast(`Moved ${item.name} to your Atelier Bag!`);
      });
    });

    container.querySelectorAll('.wish-item-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const removed = wishlist.splice(idx, 1);
        saveWishlist();
        showToast(`Removed ${removed[0]?.name} from saved blueprints.`);
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. INSTANT SEARCH COMMAND MODAL (Ctrl+K)
     -------------------------------------------------------------------------- */
  function bindSearchModal() {
    const modal = document.getElementById('searchModal');
    const closeBtn = document.getElementById('searchModalClose');
    const input = document.getElementById('liveSearchInput');
    const chips = document.querySelectorAll('.search-chip');

    if (closeBtn) closeBtn.addEventListener('click', closeSearchModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSearchModal();
      });
    }

    if (input) {
      input.addEventListener('input', () => {
        performSearch(input.value.trim());
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-query');
        if (input) {
          input.value = q;
          input.focus();
          performSearch(q);
        }
      });
    });
  }

  function openSearchModal() {
    closeAllModalsAndDrawers();
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('liveSearchInput');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
      performSearch('');
    }
  }

  function closeSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function performSearch(query) {
    const container = document.getElementById('searchResultsContainer');
    if (!container) return;

    // Use window.HEAVEN_PIECES if available, else built-in fallback
    const pieces = window.HEAVEN_PIECES || [
      { id: 'royal_blue_gold_luxury_sofa_pair', name: 'Royal Sofa Pair', cat: 'Living Room', price: { min: 120000, max: 180000 }, image: 'assets/royal_blue_gold_luxury_sofa_pair.webp', materials: ['Burmese Teak', 'Gold Leaf'] },
      { id: 'minimalist_cream_modular_sectional_sofa', name: 'Modular Bouclé Sectional', cat: 'Living Room', price: { min: 85000, max: 130000 }, image: 'assets/minimalist_cream_modular_sectional_sofa.webp', materials: ['Kiln-dried Pine'] },
      { id: 'luxury_wooden_bed_teal_velvet_headboard', name: 'Teal Velvet Carved Bed', cat: 'Bedroom', price: { min: 95000, max: 160000 }, image: 'assets/luxury_wooden_bed_teal_velvet_headboard.webp', materials: ['Burmese Teak', 'Velvet'] },
      { id: 'luxury_cream_marble_dining_table_set', name: 'Imperial Marble Dining Suite', cat: 'Dining', price: { min: 140000, max: 210000 }, image: 'assets/luxury_cream_marble_dining_table_set.webp', materials: ['Carrara Marble', 'Chittagong Gamari'] },
      { id: 'executive_black_leather_tufted_chair', name: 'Director Tufted Highback Desk', cat: 'Office', price: { min: 45000, max: 75000 }, image: 'assets/executive_black_leather_tufted_chair.webp', materials: ['Top Grain Leather', 'Mahogany'] },
      { id: 'carved_wooden_glass_display_showcase', name: 'Curved Glass Heirloom Showcase', cat: 'Dining', price: { min: 75000, max: 110000 }, image: 'assets/carved_wooden_glass_display_showcase.webp', materials: ['Burmese Teak'] }
    ];

    const q = query.toLowerCase();
    const filtered = pieces.filter(p => {
      if (!q) return true;
      const matchName = p.name && p.name.toLowerCase().includes(q);
      const matchCat = p.cat && p.cat.toLowerCase().includes(q);
      const matchMat = p.materials && p.materials.some(m => m.toLowerCase().includes(q));
      return matchName || matchCat || matchMat;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <p style="font-size: 1.1rem; margin-bottom: 4px;">No architectural suites found for "${query}"</p>
          <span style="font-size: 0.85rem;">Try searching for "Teak", "Sofa", "Marble", or "Bed".</span>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.slice(0, 8).forEach(p => {
      const priceStr = p.price ? (p.price.min ? `৳${p.price.min.toLocaleString('en-IN')}+` : `৳${p.price.toLocaleString('en-IN')}`) : 'Custom Quote';
      const catName = (p.cat || 'Bespoke').replace('-', ' ');
      html += `
        <a href="${getPiecePageLink(p.cat, p.id)}" class="search-result-item" data-id="${p.id}">
          <img src="${p.image || 'assets/hero_poster.webp'}" alt="${p.name}" class="search-result-thumb">
          <div>
            <div class="search-result-title">${p.name}</div>
            <span class="search-result-cat">${catName}</span>
          </div>
          <span class="search-result-price">${priceStr}</span>
        </a>
      `;
    });

    container.innerHTML = html;

    // Direct click open product modal if on page
    container.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.getAttribute('data-id');
        if (window.openProductDetailModal && typeof window.openProductDetailModal === 'function') {
          e.preventDefault();
          closeSearchModal();
          window.openProductDetailModal(id);
        }
      });
    });
  }

  function getPiecePageLink(cat, id) {
    if (!cat) return `index.html#allPieces`;
    const c = cat.toLowerCase();
    if (c.includes('living')) return `living.html#${id}`;
    if (c.includes('bed')) return `bedroom.html#${id}`;
    if (c.includes('dining')) return `dining.html#${id}`;
    if (c.includes('office')) return `office.html#${id}`;
    return `index.html#${id}`;
  }

  /* --------------------------------------------------------------------------
     8. UI BADGE & HEADER SYNC
     -------------------------------------------------------------------------- */
  function updateHeaderUI() {
    // Badges
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
      const totalQty = cart.reduce((acc, i) => acc + (i.qty || 1), 0);
      cartCountEl.textContent = totalQty;
      cartCountEl.classList.add('badge-bounce');
      setTimeout(() => cartCountEl.classList.remove('badge-bounce'), 400);
    }

    const wishCountEl = document.getElementById('wishlistCount');
    if (wishCountEl) {
      wishCountEl.textContent = wishlist.length;
      wishCountEl.classList.add('badge-bounce');
      setTimeout(() => wishCountEl.classList.remove('badge-bounce'), 400);
    }

    // Profile Avatar
    const avatarEl = document.getElementById('profileAvatarIcon');
    const menuName = document.getElementById('clientMenuName');
    const menuEmail = document.getElementById('clientMenuEmail');

    if (currentUser) {
      const initials = currentUser.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
      if (avatarEl) {
        avatarEl.innerHTML = `<span class="profile-avatar-pill">${initials}</span>`;
      }
      if (menuName) menuName.textContent = currentUser.name;
      if (menuEmail) menuEmail.textContent = currentUser.email || 'VIP Patron';
    } else {
      if (avatarEl) {
        avatarEl.innerHTML = `
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        `;
      }
    }
  }

  function closeAllModalsAndDrawers() {
    closeAuthModal();
    closeCartDrawer();
    closeWishlistDrawer();
    closeSearchModal();
  }

  /* --------------------------------------------------------------------------
     9. TOAST NOTIFICATION UTILITY
     -------------------------------------------------------------------------- */
  function showToast(msg) {
    const toast = document.getElementById('atelierToast');
    const toastMsg = document.getElementById('atelierToastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     10. GLOBAL EXPORT
     -------------------------------------------------------------------------- */
  function exposeGlobalEcommerceAPI() {
    window.HFM_ECOMMERCE = {
      addToCart: (piece) => {
        const existing = cart.find(i => i.id === piece.id);
        if (existing) {
          existing.qty = (existing.qty || 1) + 1;
        } else {
          cart.push({
            id: piece.id,
            name: piece.name,
            price: typeof piece.price === 'object' ? piece.price.min : piece.price,
            image: piece.image,
            qty: 1
          });
        }
        saveCart();
        showToast(`Added ${piece.name} to Atelier Bag!`);
        openCartDrawer();
      },
      addToWishlist: (piece) => {
        const existingIdx = wishlist.findIndex(i => i.id === piece.id);
        if (existingIdx > -1) {
          wishlist.splice(existingIdx, 1);
          saveWishlist();
          showToast(`Removed ${piece.name} from Wishlist.`);
        } else {
          wishlist.push({
            id: piece.id,
            name: piece.name,
            price: typeof piece.price === 'object' ? piece.price.min : piece.price,
            image: piece.image
          });
          saveWishlist();
          showToast(`Saved ${piece.name} to Blueprints & Wishlist!`);
        }
      },
      openAuthModal,
      openCartDrawer,
      openWishlistDrawer,
      openSearchModal,
      showToast
    };
  }
})();
