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

                <!-- Action Button -->
                <div class="modal-action-bar">
                  <a href="#" id="modalWhatsAppBtn" target="_blank" rel="noopener" class="btn btn-gold btn-block modal-wa-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                    <span>Ask a question on WhatsApp</span>
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

  window.openProductModalById = function (pieceId) {
    if (!window.HEAVEN_PIECES) return;
    const piece = window.HEAVEN_PIECES.find((p) => p.id === pieceId);
    if (piece) showPieceInModal(piece);
  };

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
