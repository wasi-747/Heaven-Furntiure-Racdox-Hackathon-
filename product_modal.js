/**
 * HEAVEN FURNITURE MART — PRODUCT DETAIL MODAL ENGINE
 * Opens complete product specification view on card click (exact match to yourfirstsite.com)
 */

(function () {
  // Wait for DOM
  document.addEventListener('DOMContentLoaded', initProductModal);

  function initProductModal() {
    // Inject modal backdrop and container if not already present
    if (!document.getElementById('productDetailModal')) {
      const modalHTML = `
        <div id="productDetailModal" class="product-modal-backdrop" aria-hidden="true">
          <div class="product-modal-container" role="dialog" aria-modal="true">
            <button type="button" class="product-modal-close" id="closeProductModal" aria-label="Close Product Details">&times;</button>
            <div class="product-modal-grid">
              
              <!-- Left: Image Stage -->
              <div class="product-modal-visual">
                <div class="product-modal-img-wrap">
                  <img id="modalProductImg" src="" alt="Product Photograph" class="product-modal-img" />
                </div>
                <div class="product-modal-note">
                  <span class="pulse-dot"></span> 100% Solid Hardwood Handcrafted in Chattogram
                </div>
              </div>

              <!-- Right: Specifications & Inquire -->
              <div class="product-modal-info">
                <div class="product-modal-cat" id="modalProductCat">LIVING ROOM &middot; MADE TO ORDER</div>
                <h2 class="product-modal-title" id="modalProductTitle">Royal Sofa Pair</h2>
                <div class="product-modal-tagline" id="modalProductTagline">Hand-carved gilded frame, royal blue velvet, four colourways.</div>
                
                <p class="product-modal-desc" id="modalProductDesc">
                  A matched set in the classical Chattogram idiom: solid hardwood frames hand-carved and gilded in our own workshop, then upholstered in deep royal blue velvet with woven damask seat panels.
                </p>

                <!-- Dimensions Section -->
                <div class="modal-spec-block">
                  <h4 class="modal-spec-heading">DIMENSIONS</h4>
                  <div class="modal-dims-table" id="modalProductDims">
                    <!-- Dynamic Dimension Rows -->
                  </div>
                </div>

                <!-- Materials Section -->
                <div class="modal-spec-block">
                  <h4 class="modal-spec-heading">MATERIALS</h4>
                  <ul class="modal-materials-list" id="modalProductMaterials">
                    <!-- Dynamic Material Items -->
                  </ul>
                </div>

                <!-- Price & Lead Time Row -->
                <div class="modal-meta-row">
                  <div class="modal-price-box">
                    <span class="modal-price-label">INVESTMENT</span>
                    <span class="modal-price-val" id="modalProductPrice">৳120,000 &ndash; ৳180,000</span>
                  </div>
                  <div class="modal-lead-box">
                    <span class="modal-lead-label">WORKSHOP LEAD TIME</span>
                    <span class="modal-lead-val" id="modalProductLead">6&ndash;8 weeks</span>
                  </div>
                </div>

                <!-- Action Buttons: Add to Bag, Wishlist, WhatsApp -->
                <div class="modal-action-bar" style="display: flex; gap: 0.6rem; align-items: center; margin-top: 1.25rem;">
                  <button type="button" id="modalAddToCartBtn" class="btn btn-gold" style="flex: 1.4; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.8rem 1rem;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    <span>Add to Atelier Bag</span>
                  </button>
                  <button type="button" id="modalWishlistBtn" class="btn btn-outline-gold" style="width: 48px; height: 48px; padding: 0; display: flex; align-items: center; justify-content: center;" title="Save to Wishlist">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                  <a href="#" id="modalWhatsAppBtn" target="_blank" rel="noopener" class="btn btn-outline-gold modal-wa-btn" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.8rem 1rem;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.128-.536-1.745-.729-2.876-2.518-2.964-2.634-.088-.117-.714-.95-.714-1.815 0-.866.452-1.291.613-1.468.161-.177.352-.222.469-.222.117 0 .235.001.338.006.109.005.255-.042.399.303.149.356.51 1.246.554 1.335.044.089.073.193.015.309-.059.117-.088.19-.176.294-.088.104-.185.233-.264.313-.088.089-.18.186-.078.361.103.175.457.755.981 1.222.674.6 1.243.786 1.418.874.176.088.279.074.382-.045.103-.117.44-.514.558-.69.117-.176.235-.147.396-.088.161.059 1.026.484 1.202.572.176.088.293.132.338.206.044.074.044.43-.1 1.035z"/></svg>
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('productDetailModal');
    const closeBtn = document.getElementById('closeProductModal');

    // Close listeners
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // eCommerce button bindings
    let activeModalPiece = null;
    const addCartBtn = document.getElementById('modalAddToCartBtn');
    const addWishBtn = document.getElementById('modalWishlistBtn');

    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        if (window.HFM_ECOMMERCE && window.__activeModalPiece) {
          window.HFM_ECOMMERCE.addToCart(window.__activeModalPiece);
        }
      });
    }

    if (addWishBtn) {
      addWishBtn.addEventListener('click', () => {
        if (window.HFM_ECOMMERCE && window.__activeModalPiece) {
          window.HFM_ECOMMERCE.addToWishlist(window.__activeModalPiece);
        }
      });
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Attach click listener to cards
    const cards = document.querySelectorAll('.collection-card');
    cards.forEach((card) => {
      // Allow card image and title to open the modal
      const imgContainer = card.querySelector('.card-img-container');
      const title = card.querySelector('.card-title');

      if (imgContainer) {
        imgContainer.style.cursor = 'pointer';
        imgContainer.setAttribute('title', 'Click to inspect full product specifications');
        imgContainer.addEventListener('click', () => openCardDetails(card));
      }

      if (title) {
        title.style.cursor = 'pointer';
        title.setAttribute('title', 'Click to inspect full product specifications');
        title.addEventListener('click', () => openCardDetails(card));
      }
    });
  }

  window.openProductDetailModal = function (pieceId) {
    if (!window.HEAVEN_PIECES) return;
    const piece = window.HEAVEN_PIECES.find((p) => p.id === pieceId);
    if (piece) showPieceInModal(piece);
  };
  window.openProductModalById = window.openProductDetailModal;

  function openCardDetails(card) {
    // 1. Check if card image matches an official piece ID
    const imgEl = card.querySelector('.card-showcase-img');
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    let pieceId = '';

    if (imgSrc) {
      const filename = imgSrc.split('/').pop().replace(/\.[^/.]+$/, '');
      pieceId = filename;
    }

    let piece = null;
    if (window.HEAVEN_PIECES) {
      piece = window.HEAVEN_PIECES.find((p) => p.id === pieceId);
    }

    if (piece) {
      showPieceInModal(piece);
    } else {
      // Fallback: construct piece object from card DOM
      const titleEl = card.querySelector('.card-title');
      const descEl = card.querySelector('.card-desc');
      const metaEl = card.querySelector('.card-meta');
      const catTag = card.querySelector('.card-category-tag');
      const dimsTag = card.querySelector('.blueprint-dimensions-tag');
      const leadEl = card.querySelector('.craft-lead-time');
      const priceValEl = card.querySelector('.price-val');

      const fallbackPiece = {
        id: pieceId,
        name: titleEl ? titleEl.textContent.trim() : 'Bespoke Atelier Piece',
        cat: catTag ? catTag.textContent.trim() : 'BESPOKE FURNITURE',
        tagline: metaEl ? metaEl.textContent.replace(/\s+/g, ' ').trim() : 'Master Handcrafted in Chattogram',
        desc: descEl ? descEl.textContent.trim() : 'Custom handcrafted in kiln-seasoned Burmese teak with traditional mortise joinery.',
        image: imgSrc,
        lead: leadEl ? leadEl.textContent.trim() : '4–6 Weeks',
        price: {
          min: priceValEl ? priceValEl.textContent.trim() : 'Custom Quote',
          max: ''
        },
        dims: dimsTag ? [{ label: 'Dimensions', val: dimsTag.textContent.trim(), unit: '' }] : [],
        materials: ['100% Solid Kiln-Seasoned Hardwood', 'Traditional Mortise-and-Tenon Joinery', '10-Year Hardwood Warranty', 'Custom Stains & Polishes']
      };
      showPieceInModal(fallbackPiece);
    }
  }

  function showPieceInModal(piece) {
    const modal = document.getElementById('productDetailModal');
    if (!modal) return;
    window.__activeModalPiece = piece;

    // Populate Fields
    document.getElementById('modalProductImg').src = piece.image;
    document.getElementById('modalProductImg').alt = piece.name;

    document.getElementById('modalProductCat').textContent = (piece.cat || 'BESPOKE').toUpperCase() + ' \u00B7 MADE TO ORDER';
    document.getElementById('modalProductTitle').textContent = piece.name;
    document.getElementById('modalProductTagline').textContent = piece.tagline || 'Master Handcrafted in Chattogram';
    document.getElementById('modalProductDesc').textContent = piece.desc;

    // Dimensions
    const dimsContainer = document.getElementById('modalProductDims');
    dimsContainer.innerHTML = '';
    if (piece.dims && piece.dims.length) {
      piece.dims.forEach((d) => {
        const inches = Math.round(d.val / 2.54);
        const row = document.createElement('div');
        row.className = 'dims-row';
        row.innerHTML = `
          <span class="dims-label">${d.label}</span>
          <span class="dims-val">${d.val} ${d.unit} &nbsp;<small class="dims-inch">/ ${inches} in</small></span>
        `;
        dimsContainer.appendChild(row);
      });
    } else {
      dimsContainer.innerHTML = '<div class="dims-row"><span class="dims-label">Sizing</span><span class="dims-val">Custom-measured to your room</span></div>';
    }

    // Materials
    const matContainer = document.getElementById('modalProductMaterials');
    matContainer.innerHTML = '';
    if (piece.materials && piece.materials.length) {
      piece.materials.forEach((m) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="mat-bullet">&bull;</span> ${m}`;
        matContainer.appendChild(li);
      });
    } else {
      matContainer.innerHTML = '<li><span class="mat-bullet">&bull;</span> 100% Kiln-Seasoned Hardwood</li><li><span class="mat-bullet">&bull;</span> 10-Year Guarantee</li>';
    }

    // Price
    const priceEl = document.getElementById('modalProductPrice');
    if (typeof piece.price.min === 'number') {
      priceEl.textContent = `৳${piece.price.min.toLocaleString('en-IN')} \u2013 ৳${piece.price.max.toLocaleString('en-IN')}`;
    } else {
      priceEl.textContent = piece.price.min || 'Price on Inquiry';
    }

    // Lead Time
    document.getElementById('modalProductLead').textContent = piece.lead || '4–6 Weeks';

    // WhatsApp Button URL with pre-filled message
    const waPhone = '8801960481983';
    const waText = encodeURIComponent(`Hello Heaven Furniture Mart! I am inquiring about the ${piece.name} (${piece.id}). Please share more details and customized pricing for Chattogram delivery.`);
    document.getElementById('modalWhatsAppBtn').href = `https://wa.me/${waPhone}?text=${waText}`;

    // Open Modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
})();
