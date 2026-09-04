/**
 * HEAVEN FURNITURE MART — BESPOKE LUXURY ARCHITECTURAL ATELIER
 * Multi-Page Interactive Engine
 * RACDOX Hackathon Winning Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileDrawer();
  init4AngleShowcase();
  initCategoryPills();
  initQuickWhatsAppButtons();
  initBespokeWizard();
  initConsultationModal();
  initShowroomBookingForm();
  initFaqAccordion();
  initSmoothScroll();
  initWorkshopShorts();
  updateShowingCount();
});

/* ==========================================================================
   1. 4-ANGLE PRODUCT SHOWCASE SWITCHER (Winning Differentiator)
   ========================================================================== */
function init4AngleShowcase() {
  const anglePills = document.querySelectorAll('.angle-pill');

  anglePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const parentCard = pill.closest('.collection-card');
      if (!parentCard) return;

      // Deactivate siblings in this card
      const siblings = parentCard.querySelectorAll('.angle-pill');
      siblings.forEach(sib => sib.classList.remove('active'));
      pill.classList.add('active');

      const targetImgId = pill.getAttribute('data-target');
      const newSrc = pill.getAttribute('data-src');
      const captionText = pill.getAttribute('data-caption');
      const targetImg = document.getElementById(targetImgId);
      const captionEl = parentCard.querySelector('.angle-caption-text');

      if (targetImg && newSrc) {
        targetImg.style.opacity = '0.3';
        targetImg.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
          targetImg.src = newSrc;
          targetImg.style.opacity = '1';
          targetImg.style.transform = 'scale(1)';
        }, 180);
      }

      if (captionEl && captionText) {
        captionEl.style.opacity = '0';
        setTimeout(() => {
          captionEl.textContent = captionText;
          captionEl.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   2. CATEGORY PILL FILTERING (Living, Bedroom, Dining, Office)
   ========================================================================== */
function initCategoryPills() {
  const catPills = document.querySelectorAll('.cat-pill');
  const cards = document.querySelectorAll('.collection-card');

  if (!catPills.length || !cards.length) return;

  function applyFilter(filterVal) {
    catPills.forEach(p => {
      if (p.getAttribute('data-filter') === filterVal) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-cat');
      if (filterVal === 'all' || cardCat === filterVal) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 20);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
    setTimeout(updateShowingCount, 220);
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const filterVal = pill.getAttribute('data-filter');
      applyFilter(filterVal);
    });
  });

  // Multi-Strategy Category Parameter Extraction (URL query, Hash, or SessionStorage)
  const urlParams = new URLSearchParams(window.location.search);
  let initialCat = urlParams.get('cat');

  if (!initialCat && window.location.hash) {
    const rawHash = window.location.hash.replace('#', '');
    if (rawHash.startsWith('cat=')) {
      initialCat = rawHash.replace('cat=', '');
    } else if (rawHash) {
      initialCat = rawHash;
    }
  }

  if (!initialCat) {
    try {
      const stored = sessionStorage.getItem('hfm_filter_cat');
      if (stored) {
        initialCat = stored;
        sessionStorage.removeItem('hfm_filter_cat');
      }
    } catch (e) {}
  }

  if (initialCat) {
    applyFilter(initialCat);
  }

  // Handle dropdown menu sub-links
  document.querySelectorAll('.dropdown-sub-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      const [linkPage, linkQuery] = href.split('?');
      let cat = '';
      if (linkQuery) {
        const sp = new URLSearchParams(linkQuery);
        cat = sp.get('cat') || '';
      }

      if (cat) {
        try {
          sessionStorage.setItem('hfm_filter_cat', cat);
        } catch (err) {}
      }

      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const cleanLinkPage = linkPage.replace('.html', '');
      const cleanCurrentPage = currentPage.replace('.html', '');

      if (cleanLinkPage === cleanCurrentPage || (cleanLinkPage === '' && cleanCurrentPage === 'index')) {
        e.preventDefault();
        if (cat) {
          applyFilter(cat);
          history.pushState(null, '', href);
          const filterBar = document.querySelector('.category-filter-bar');
          if (filterBar) filterBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
}

/* ==========================================================================
   3. DIRECT WHATSAPP PRODUCT INQUIRY DISPATCHER
   ========================================================================== */
function initQuickWhatsAppButtons() {
  const directPhone = '8801960481983';

  document.querySelectorAll('.quick-wa-product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || 'Custom Furniture Piece';
      const dims = btn.getAttribute('data-dims') || 'Custom Sizing';
      const wood = btn.getAttribute('data-wood') || 'Burmese Teak';

      const waMsg =
`*HEAVEN FURNITURE MART — BESPOKE INQUIRY*
━━━━━━━━━━━━━━━━━━━━
🛋️ *Selected Design:* ${product}
📐 *Dimensions:* ${dims}
🪵 *Preferred Timber:* ${wood}
🏛️ *Showroom:* Agrabad Access Road, Chattogram
━━━━━━━━━━━━━━━━━━━━
*Hello! I am inspecting this piece on your website and would like to discuss custom room sizing and book a showroom viewing.*`;

      const targetUrl = `https://wa.me/${directPhone}?text=${encodeURIComponent(waMsg)}`;
      showToast(`Opening VIP WhatsApp inquiry for ${product}...`);

      setTimeout(() => {
        window.open(targetUrl, '_blank');
      }, 400);
    });
  });
}

/* ==========================================================================
   4. BESPOKE INTERACTIVE ESTIMATOR WIZARD (Grand Foyer / index.html)
   ========================================================================== */
function initBespokeWizard() {
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const step1Pane = document.getElementById('wizardStep1');
  const step2Pane = document.getElementById('wizardStep2');
  const step3Pane = document.getElementById('wizardStep3');
  const wizardPanes = [step1Pane, step2Pane, step3Pane].filter(Boolean);

  if (!stepIndicators.length || !wizardPanes.length) return;

  const wizardState = {
    room: 'Living Room & Lounge',
    wood: 'Grade-A Burmese Teak (Segun)',
    name: '',
    phone: '',
    location: '',
    notes: ''
  };

  function goToStep(stepNum) {
    stepIndicators.forEach(ind => {
      const indStep = parseInt(ind.getAttribute('data-step'), 10);
      ind.classList.remove('active', 'completed');
      if (indStep === stepNum) {
        ind.classList.add('active');
      } else if (indStep < stepNum) {
        ind.classList.add('completed');
      }
    });

    wizardPanes.forEach((pane, idx) => {
      if (idx + 1 === stepNum) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    updateSummary();
  }

  // Room selections
  document.querySelectorAll('input[name="roomType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      wizardState.room = e.target.value;
      updateSummary();
    });
  });

  // Wood selections
  document.querySelectorAll('input[name="woodType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      wizardState.wood = e.target.value;
      updateSummary();
    });
  });

  function updateSummary() {
    const sumRoom = document.getElementById('sumRoom');
    const sumWood = document.getElementById('sumWood');
    if (sumRoom) sumRoom.textContent = wizardState.room;
    if (sumWood) sumWood.textContent = wizardState.wood;
  }

  // Stepper Navigation Buttons
  const nextToStep2 = document.getElementById('nextToStep2');
  const backToStep1 = document.getElementById('backToStep1');
  const nextToStep3 = document.getElementById('nextToStep3');
  const backToStep2 = document.getElementById('backToStep2');
  const wizardForm = document.getElementById('bespokeWizardForm');

  if (nextToStep2) nextToStep2.addEventListener('click', () => goToStep(2));
  if (backToStep1) backToStep1.addEventListener('click', () => goToStep(1));
  if (nextToStep3) nextToStep3.addEventListener('click', () => goToStep(3));
  if (backToStep2) backToStep2.addEventListener('click', () => goToStep(2));

  // Step 3 Form Submission -> Direct WhatsApp Concierge
  if (wizardForm) {
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('wizardName')?.value || 'Valued Homeowner';
      const phone = document.getElementById('wizardPhone')?.value || '';
      const location = document.getElementById('wizardLocation')?.value || 'Chattogram';
      const notes = document.getElementById('wizardNotes')?.value || 'Interested in bespoke styling';

      const phoneDirect = '8801960481983';
      const waMessage =
`*HEAVEN FURNITURE MART — PROJECT SPECIFICATION*
━━━━━━━━━━━━━━━━━━━━
🛋️ *Space:* ${wizardState.room}
🪵 *Hardwood:* ${wizardState.wood}
👤 *Client Name:* ${name}
📞 *Contact Number:* ${phone}
📍 *Location in CTG:* ${location}
📝 *Client Notes:* ${notes}
━━━━━━━━━━━━━━━━━━━━
*Sent via Heaven Furniture Studio Custom Estimator*`;

      const waUrl = `https://wa.me/${phoneDirect}?text=${encodeURIComponent(waMessage)}`;

      showToast(`Generating specification card for ${name}...`);
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 500);
    });
  }
}

/* ==========================================================================
   5. SHOWROOM BOOKING FORM (showroom.html)
   ========================================================================== */
function initShowroomBookingForm() {
  const form = document.getElementById('showroomBookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('srName')?.value || 'Valued Client';
    const phone = document.getElementById('srPhone')?.value || '';
    const date = document.getElementById('srDate')?.value || 'Upcoming date';
    const time = document.getElementById('srTime')?.value || 'Afternoon';
    const space = document.getElementById('srSpace')?.value || 'Living Room';
    const notes = document.getElementById('srNotes')?.value || 'General consultation';

    const directPhone = '8801960481983';
    const waText =
`*SHOWROOM PRIVATE VISIT APPOINTMENT*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📅 *Preferred Date:* ${date}
⏰ *Time Slot:* ${time}
🛋️ *Focus Space:* ${space}
📝 *Notes:* ${notes}
🏛️ *Showroom:* Opposite RAK Ceramics, Agrabad Access Road
━━━━━━━━━━━━━━━━━━━━
*Looking forward to our scheduled studio appointment.*`;

    const targetUrl = `https://wa.me/${directPhone}?text=${encodeURIComponent(waText)}`;
    showToast(`Booking appointment for ${name}...`);

    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 500);
  });
}

/* ==========================================================================
   6. CONSULTATION BOOKING MODAL (All pages)
   ========================================================================== */
function initConsultationModal() {
  let modal = document.getElementById('consultationModal');

  // Universal Dynamic Injection: If modal is not in DOM, inject it!
  if (!modal) {
    const modalMarkup = `
  <div class="modal-backdrop" id="consultationModal" aria-hidden="true">
    <div class="modal-dialog">
      <button type="button" class="modal-close-btn" id="modalCloseBtn" aria-label="Close modal">&times;</button>
      <div class="modal-header">
        <span class="modal-kicker">HEAVEN BESPOKE STUDIO</span>
        <h3 class="modal-title">Book A Free Design Consultation</h3>
        <p class="modal-sub">Meet with our senior interior and furniture specialist at our Agrabad showroom or request an in-home measurement visit.</p>
      </div>
      <form id="modalConsultationForm" class="modal-form">
        <div class="form-row">
          <div class="form-group">
            <label for="modalFullName">Your Name *</label>
            <input type="text" id="modalFullName" class="form-input" placeholder="e.g. Abul Hasnat" required>
          </div>
          <div class="form-group">
            <label for="modalPhone">Phone / WhatsApp *</label>
            <input type="tel" id="modalPhone" class="form-input" placeholder="017XXXXXXXX" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="modalMeetingType">Consultation Type</label>
            <select id="modalMeetingType" class="form-select">
              <option value="Agrabad Showroom Visit">Agrabad Showroom Visit</option>
              <option value="In-Home Measurement Visit (Chattogram)">In-Home Measurement Visit (Chattogram)</option>
            </select>
          </div>
          <div class="form-group">
            <label for="modalPreferredDate">Preferred Date</label>
            <input type="date" id="modalPreferredDate" class="form-input">
          </div>
        </div>
        <div class="form-group">
          <label for="modalInterest">Space of Interest</label>
          <select id="modalInterest" class="form-select">
            <option value="Living Room (Sofas, Center Tables, Consoles)">Living Room (Sofas, Tables, Consoles)</option>
            <option value="Bedroom (Beds, Wardrobes, Vanities)">Bedroom (Beds, Wardrobes, Vanities)</option>
            <option value="Dining (Dining Tables, Chairs, Buffets)">Dining (Dining Tables, Chairs, Buffets)</option>
            <option value="Office (Director Desks, Libraries)">Office (Director Desks, Libraries)</option>
            <option value="Complete Residence / Duplex Interior Fitout">Complete Residence / Duplex Interior Fitout</option>
          </select>
        </div>
        <div class="form-group">
          <label for="modalNotes">Room Dimensions or Notes</label>
          <textarea id="modalNotes" class="form-textarea" rows="2" placeholder="Tell us about your room size, style preferences..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-gold btn-block">Confirm & Launch WhatsApp Concierge</button>
        </div>
      </form>
    </div>
  </div>`;
    document.body.insertAdjacentHTML('beforeend', modalMarkup);
    modal = document.getElementById('consultationModal');
  }

  const closeBtn = document.getElementById('modalCloseBtn');
  const modalForm = document.getElementById('modalConsultationForm');

  const triggerSelectors = [
    '#openConsultationModalBtn',
    '#heroPrimaryCta',
    '#drawerConsultBtn',
    '#mobileBookBtn',
    '.open-consult-btn'
  ];

  triggerSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  });

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('modalFullName')?.value || 'Valued Client';
      const phone = document.getElementById('modalPhone')?.value || '';
      const meetingType = document.getElementById('modalMeetingType')?.value || 'Agrabad Showroom Visit';
      const date = document.getElementById('modalPreferredDate')?.value || 'Earliest Available';
      const interest = document.getElementById('modalInterest')?.value || 'Bespoke Furniture Suite';
      const notes = document.getElementById('modalNotes')?.value || 'Looking forward to consultation';

      const waText =
`*NEW VIP STUDIO CONSULTATION REQUEST*
━━━━━━━━━━━━━━━━━━━━
👤 *Client:* ${fullName}
📞 *Contact:* ${phone}
🏛️ *Type:* ${meetingType}
📅 *Preferred Date:* ${date}
🛋️ *Space of Interest:* ${interest}
📝 *Room Notes:* ${notes}
━━━━━━━━━━━━━━━━━━━━
*Sent via Heaven Furniture Mart Concierge Portal*`;

      const directPhone = '8801960481983';
      const targetUrl = `https://wa.me/${directPhone}?text=${encodeURIComponent(waText)}`;

      closeModal();
      showToast(`Thank you, ${fullName}! Launching VIP WhatsApp line...`);

      setTimeout(() => {
        window.open(targetUrl, '_blank');
      }, 700);
    });
  }
}

/* ==========================================================================
   7. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!menuToggle || !mobileDrawer) return;

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const accordion = document.getElementById('faqAccordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.faq-item');
  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(otherItem => otherItem.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   9. SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  let msgSpan = document.getElementById('toastMessage');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-inner">
        <span class="toast-icon">✓</span>
        <span class="toast-message" id="toastMessage">${message}</span>
      </div>
    `;
    document.body.appendChild(toast);
  } else if (msgSpan) {
    msgSpan.textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   11. DUAL THEME ENGINE (Atelier Dark ↔ Gallery Light)
   ========================================================================== */
function initThemeToggle() {
  const savedTheme = localStorage.getItem('hfm-theme') || 'light';
  applyTheme(savedTheme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('hfm-theme', newTheme);
      showToast(newTheme === 'dark' ? 'Dark Mode Activated' : 'Light Mode Activated');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    const icon = btn.querySelector('.theme-icon') || btn;
    const label = btn.querySelector('.theme-label');
    if (theme === 'dark') {
      if (icon.tagName === 'SPAN' && icon.classList.contains('theme-icon')) icon.textContent = '☀️';
      if (label) label.textContent = 'Light Mode';
    } else {
      if (icon.tagName === 'SPAN' && icon.classList.contains('theme-icon')) icon.textContent = '🌙';
      if (label) label.textContent = 'Dark Mode';
    }
  });
}


/* Dynamic Catalog Count Updater (Image 3 compliance) */
function updateShowingCount() {
  const countBars = document.querySelectorAll('.catalog-count-bar');
  countBars.forEach(bar => {
    const parentSection = bar.closest('section') || document;
    const allCards = parentSection.querySelectorAll('.collection-card');
    let visibleCount = 0;
    allCards.forEach(card => {
      if (window.getComputedStyle(card).display !== 'none' && card.style.display !== 'none') {
        visibleCount++;
      }
    });
    const visEl = bar.querySelector('.visible-count');
    const totEl = bar.querySelector('.total-count');
    if (visEl) visEl.textContent = visibleCount;
    if (totEl) totEl.textContent = allCards.length;
  });
}


/* ==========================================================================
   11. ATELIER WORKSHOP SHORTS CONTROLLER
   ========================================================================== */
function initWorkshopShorts() {
  const reelWrappers = document.querySelectorAll('.reel-video-wrapper');
  reelWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('.reel-video');
    const playOverlay = wrapper.querySelector('.reel-play-overlay');
    const soundBadge = wrapper.querySelector('.reel-sound-badge');
    const soundIcon = wrapper.querySelector('.sound-icon');

    if (!video) return;

    // Click on video / wrapper to toggle play/pause
    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('.reel-sound-badge')) return;
      
      if (video.paused) {
        // Pause all other videos first
        document.querySelectorAll('.reel-video').forEach(v => {
          if (v !== video) {
            v.pause();
            v.closest('.reel-video-wrapper')?.classList.remove('playing');
          }
        });
        video.play().then(() => {
          wrapper.classList.add('playing');
        }).catch(() => {});
      } else {
        video.pause();
        wrapper.classList.remove('playing');
      }
    });

    // Sound toggle
    if (soundBadge) {
      soundBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (soundIcon) {
          soundIcon.textContent = video.muted ? '🔇' : '🔊';
        }
      });
    }

    // Auto-pause when out of viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
            wrapper.classList.remove('playing');
          }
        });
      }, { threshold: 0.25 });
      observer.observe(wrapper);
    }
  });
}
