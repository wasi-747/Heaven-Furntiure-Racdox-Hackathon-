/**
 * HEAVEN FURNITURE MART — BESPOKE LUXURY ARCHITECTURAL ATELIER
 * Multi-Page Interactive Engine
 * RACDOX Hackathon Winning Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initGrandPortalIntro();
  initMobileDrawer();
  init4AngleShowcase();
  initCategoryPills();
  initDropdownFilterRouting();
  initQuickWhatsAppButtons();
  initBespokeWizard();
  initConsultationModal();
  initShowroomBookingForm();
  initFaqAccordion();
  initSmoothScroll();
  initWorkshopShorts();
  initYouTubeShortsGallery();
  initAtelier3dStudio();
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
   2. CATEGORY FILTERING & DROPDOWN ROUTING (Living, Bedroom, Dining, Office)
   ========================================================================== */
function applyCategoryFilter(filterVal) {
  if (!filterVal) return;
  // Clean filter value e.g. '#sofas', 'cat=sofas', etc.
  const cleanFilter = filterVal.replace(/^[#?]/, '').replace(/^cat=/, '').split('#')[0].split('&')[0].trim().toLowerCase();
  
  const catPills = document.querySelectorAll('.cat-pill');
  const cards = document.querySelectorAll('.collection-card');

  // Update pills active state
  let matchedAny = false;
  catPills.forEach(p => {
    const pillFilter = (p.getAttribute('data-filter') || '').toLowerCase();
    if (pillFilter === cleanFilter || (cleanFilter === 'all' && pillFilter === 'all')) {
      p.classList.add('active');
      matchedAny = true;
    } else {
      p.classList.remove('active');
    }
  });

  if (!matchedAny && (cleanFilter === 'all' || cleanFilter === '')) {
    catPills.forEach(p => {
      if ((p.getAttribute('data-filter') || '').toLowerCase() === 'all') {
        p.classList.add('active');
      }
    });
  }

  // Filter cards with smooth fade
  if (cards.length) {
    cards.forEach(card => {
      const cardCat = (card.getAttribute('data-cat') || '').toLowerCase();
      if (cleanFilter === 'all' || cleanFilter === '' || cardCat === cleanFilter) {
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
}
window.applyCategoryFilter = applyCategoryFilter;

function initCategoryPills() {
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const filterVal = pill.getAttribute('data-filter');
      applyCategoryFilter(filterVal);
      if (filterVal) {
        history.pushState(null, '', `#${filterVal}`);
      }
    });
  });
}

function initDropdownFilterRouting() {
  const handleCurrentUrlFilter = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let cat = urlParams.get('cat');

    if (!cat && window.location.hash) {
      const rawHash = window.location.hash.replace('#', '');
      cat = rawHash.replace('cat=', '').split('&')[0];
    }

    if (!cat) {
      try {
        const stored = sessionStorage.getItem('hfm_filter_cat');
        if (stored) {
          cat = stored;
          sessionStorage.removeItem('hfm_filter_cat');
        }
      } catch (e) {}
    }

    if (cat) {
      applyCategoryFilter(cat);
    }
  };

  handleCurrentUrlFilter();

  document.querySelectorAll('.dropdown-sub-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (!href) return;

      const targetUrl = href.split('#')[0];
      const hashPart = href.split('#')[1] || '';
      const [targetPage, queryPart] = targetUrl.split('?');
      let cat = '';

      if (queryPart) {
        const sp = new URLSearchParams(queryPart);
        cat = sp.get('cat') || '';
      }
      if (!cat && hashPart) {
        cat = hashPart.replace(/^cat=/, '');
      }

      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const cleanTarget = (targetPage || currentPath).replace('.html', '').toLowerCase();
      const cleanCurrent = currentPath.replace('.html', '').toLowerCase();

      if (cat) {
        try {
          sessionStorage.setItem('hfm_filter_cat', cat);
        } catch (err) {}
      }

      if (cleanTarget === cleanCurrent || (cleanTarget === '' && cleanCurrent === 'index')) {
        e.preventDefault();
        if (cat) {
          applyCategoryFilter(cat);
          history.pushState(null, '', href);
          const filterBar = document.querySelector('.category-filter-bar') || document.querySelector('.collections-section');
          if (filterBar) {
            filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  });

  window.addEventListener('popstate', handleCurrentUrlFilter);
  window.addEventListener('hashchange', handleCurrentUrlFilter);
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
   11. ATELIER WORKSHOP SHORTS CONTROLLER (Pure Craft Making Videos)
   ========================================================================== */
function initWorkshopShorts() {
  const reelCards = document.querySelectorAll('.short-reel-card');
  if (!reelCards.length) return;

  const pauseAllOthers = (currentVideo) => {
    document.querySelectorAll('.reel-video').forEach(v => {
      if (v !== currentVideo) {
        v.pause();
        v.closest('.reel-video-wrapper')?.classList.remove('playing');
      }
    });
  };

  reelCards.forEach(card => {
    const wrapper = card.querySelector('.reel-video-wrapper');
    const video = card.querySelector('.reel-video');
    const soundBadge = card.querySelector('.reel-sound-badge');
    const soundIcon = card.querySelector('.sound-icon');

    if (!video || !wrapper) return;

    // Desktop hover-to-play and leave-to-pause
    const isHoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isHoverDevice) {
      card.addEventListener('mouseenter', () => {
        pauseAllOthers(video);
        const p = video.play();
        if (p !== undefined) {
          p.then(() => wrapper.classList.add('playing')).catch(() => {});
        }
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
        wrapper.classList.remove('playing');
      });
    }

    // Touch or click toggle fallback
    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('.reel-sound-badge')) return;
      if (video.paused) {
        pauseAllOthers(video);
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

    // Auto-pause when scrolled out of viewport, auto-play on mobile when in view
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!isHoverDevice) {
            if (entry.isIntersecting && video.paused) {
              pauseAllOthers(video);
              video.play().then(() => wrapper.classList.add('playing')).catch(() => {});
            } else if (!entry.isIntersecting && !video.paused) {
              video.pause();
              wrapper.classList.remove('playing');
            }
          } else {
            if (!entry.isIntersecting && !video.paused) {
              video.pause();
              wrapper.classList.remove('playing');
            }
          }
        });
      }, { threshold: 0.5 });
      observer.observe(wrapper);
    }
  });
}

/* ==========================================================================
   12. GRAND ATELIER 3D PORTAL INTRO CONTROLLER (Plays on Every Load/Refresh)
   ========================================================================== */
function initGrandPortalIntro() {
  const introEl = document.getElementById('grandPortalIntro');
  if (!introEl) return;

  // Clear any legacy session locks
  try {
    sessionStorage.removeItem('hfm_door_intro_seen');
  } catch (e) {}

  // Ensure intro element is visible and reset on every refresh
  introEl.classList.remove('opening', 'portal-hidden');
  introEl.style.display = '';

  // Prevent scrolling during door intro
  document.body.style.overflow = 'hidden';

  let isDismissed = false;
  const dismissPortal = () => {
    if (isDismissed) return;
    isDismissed = true;
    introEl.classList.add('opening');

    // As soon as doors finish swinging open, hide portal overlay
    setTimeout(() => {
      introEl.classList.add('portal-hidden');
    }, 1600);

    setTimeout(() => {
      introEl.style.display = 'none';
      document.body.style.overflow = '';

      // If page was loaded with a deep-link hash, smoothly scroll to it now
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 2100);
  };

  // Click or keypress anywhere enters immediately without waiting
  introEl.addEventListener('click', () => {
    dismissPortal();
  });

  window.addEventListener('keydown', (e) => {
    if (!isDismissed && (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')) {
      dismissPortal();
    }
  }, { once: true });

  // Hold closed for 1100ms so the user appreciates the grand teak doors, royal H crest, and branding
  setTimeout(() => {
    dismissPortal();
  }, 1100);
}

/* ==========================================================================
   13. YOUTUBE SHORTS CONTROLLER (Inline Hover-to-Play, NO POPUP MODAL)
   ========================================================================== */
function initYouTubeShortsGallery() {
  const filterBtns = document.querySelectorAll('.reel-filter-btn');
  const shortCards = document.querySelectorAll('.yt-short-card');
  if (!shortCards.length) return;

  const isHoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Helper to stop and remove inline iframe
  const stopCardVideo = (card) => {
    const thumbWrapper = card.querySelector('.yt-short-thumb-wrapper');
    if (!thumbWrapper) return;
    const existingIframe = thumbWrapper.querySelector('.yt-inline-iframe');
    if (existingIframe) {
      existingIframe.remove();
    }
    card.classList.remove('is-playing');
  };

  const stopAllCardVideos = (currentCard) => {
    shortCards.forEach(c => {
      if (c !== currentCard) stopCardVideo(c);
    });
  };

  // Helper to play inline video on the card without any popup
  const playCardVideo = (card) => {
    const videoId = card.getAttribute('data-video-id');
    const thumbWrapper = card.querySelector('.yt-short-thumb-wrapper');
    if (!videoId || !thumbWrapper) return;

    if (card.classList.contains('is-playing')) return;

    stopAllCardVideos(card);
    card.classList.add('is-playing');

    const iframe = document.createElement('iframe');
    iframe.className = 'yt-inline-iframe';
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&modestbranding=1&rel=0`;
    iframe.title = card.getAttribute('data-title') || 'Workshop Reel';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.tabIndex = -1;

    thumbWrapper.appendChild(iframe);
  };

  // Category Filtering (on pages with filters)
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      shortCards.forEach(card => {
        stopCardVideo(card);
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
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
    });
  });

  // Attach inline hover play & mobile tap play (No popups!)
  shortCards.forEach(card => {
    if (isHoverDevice) {
      card.addEventListener('mouseenter', () => playCardVideo(card));
      card.addEventListener('mouseleave', () => stopCardVideo(card));
    }

    // Touch / click toggle inline
    card.addEventListener('click', (e) => {
      e.preventDefault();
      if (card.classList.contains('is-playing')) {
        stopCardVideo(card);
      } else {
        playCardVideo(card);
      }
    });

    // Mobile scroll auto-play when card is 60% in view
    if ('IntersectionObserver' in window && !isHoverDevice) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playCardVideo(card);
          } else {
            stopCardVideo(card);
          }
        });
      }, { threshold: 0.6 });
      observer.observe(card);
    }
  });
}

// Universal Smooth In-Page Anchor Navigation (Prevents Page Reloads & Door Re-triggering)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href) return;

  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
  let targetId = null;

  if (href.startsWith('#') && href.length > 1) {
    targetId = href.substring(1);
  } else if (isIndex && href.startsWith('index.html#')) {
    targetId = href.split('#')[1];
  }

  if (targetId) {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, null, '#' + targetId);
    }
  }
});

// Showroom 4K Tour Chapter Navigation
window.jumpShowroomTour = function(seconds) {
  const iframe = document.getElementById('showroomTourPlayer');
  if (!iframe) return;
  try {
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: 'seekTo',
      args: [seconds, true]
    }), '*');
  } catch (err) {
    iframe.src = `https://www.youtube-nocookie.com/embed/qEwoJWbXSTs?autoplay=1&start=${seconds}&rel=0&modestbranding=1`;
  }
};

/* ==========================================================================
   14. BESPOKE ATELIER CLIENT QUERY CLARIFIER (FAQ ACCORDION)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  if (!faqItems.length) return;

  faqItems.forEach((item, idx) => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');
    if (!btn || !panel) return;

    // Open first item by default for inviting discovery
    if (idx === 0) {
      item.classList.add('active');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherPanel = other.querySelector('.faq-answer-panel');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   15. ATELIER 3D DIGITAL LAB & AR INSPECTION ENGINE
   ========================================================================== */
function initAtelier3dStudio() {
  const viewer = document.getElementById('atelier3dViewer');
  if (!viewer) return;

  const switchBtns = document.querySelectorAll('.model-switcher-group .switch-btn');
  const modelTag = document.getElementById('modelTag');
  const modelTitle = document.getElementById('modelTitle');
  const modelDesc = document.getElementById('modelDesc');
  const modelWood = document.getElementById('modelWood');
  const modelFinish = document.getElementById('modelFinish');
  const modelPrice = document.getElementById('modelPrice');
  const modelLead = document.getElementById('modelLead');
  const btnWaInquire = document.getElementById('btnWa3dInquire');
  const btnAddBlueprint = document.getElementById('btnAdd3dToBlueprint');

  const btnToggleRotate = document.getElementById('btnToggleRotate');
  const rotateText = document.getElementById('rotateStateText');
  const btnResetCamera = document.getElementById('btnResetCamera');

  // Track currently active piece for Room Blueprint Cart integration
  let currentActivePiece = {
    id: '3d_damask_throne',
    name: 'Imperial Damask Sovereign Chair',
    price: 105000,
    timber: 'Seasoned Chittagong Teak',
    image: 'assets/royal_blue_gold_luxury_sofa_pair.webp'
  };

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const modelSrc = btn.getAttribute('data-model');
      const tag = btn.getAttribute('data-tag');
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const wood = btn.getAttribute('data-wood');
      const finish = btn.getAttribute('data-finish');
      const price = btn.getAttribute('data-price');
      const lead = btn.getAttribute('data-lead');
      const waText = btn.getAttribute('data-wa-text');

      if (viewer && modelSrc) {
        viewer.src = modelSrc;
        if (typeof viewer.dismissPoster === 'function') {
          viewer.dismissPoster();
        }
      }

      if (modelTag) modelTag.textContent = tag;
      if (modelTitle) modelTitle.textContent = title;
      if (modelDesc) modelDesc.textContent = desc;
      if (modelWood) modelWood.textContent = wood;
      if (modelFinish) modelFinish.textContent = finish;
      if (modelPrice) modelPrice.textContent = price;
      if (modelLead) modelLead.textContent = lead;

      if (btnWaInquire && waText) {
        btnWaInquire.href = `https://wa.me/8801960481983?text=${encodeURIComponent(waText)}`;
      }

      // Update current active piece for Blueprint Drawer
      currentActivePiece = {
        id: `3d_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        name: title,
        price: parseInt(price.replace(/[^0-9]/g, '').slice(0, 6)) || 120000,
        timber: wood,
        image: 'assets/royal_blue_gold_luxury_sofa_pair.webp'
      };
    });
  });

  // Toggle Auto Rotate
  let isRotating = true;
  if (btnToggleRotate) {
    btnToggleRotate.addEventListener('click', () => {
      isRotating = !isRotating;
      if (isRotating) {
        viewer.setAttribute('auto-rotate', '');
        if (rotateText) rotateText.textContent = 'Auto-Rotate: ON';
      } else {
        viewer.removeAttribute('auto-rotate');
        if (rotateText) rotateText.textContent = 'Auto-Rotate: OFF';
      }
    });
  }

  // Reset Camera View
  if (btnResetCamera) {
    btnResetCamera.addEventListener('click', () => {
      viewer.cameraOrbit = '0deg 75deg 105%';
      viewer.fieldOfView = 'auto';
      if (typeof viewer.jumpCameraToGoal === 'function') {
        viewer.jumpCameraToGoal();
      }
    });
  }

  // Add 3D Piece to Blueprint Drawer
  if (btnAddBlueprint) {
    btnAddBlueprint.addEventListener('click', () => {
      if (window.HFM_ECOMMERCE && currentActivePiece) {
        window.HFM_ECOMMERCE.addToCart(currentActivePiece);
      } else {
        alert(`${currentActivePiece.name} added to your Atelier Room Blueprint.`);
      }
    });
  }
}



