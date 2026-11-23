/**
 * Bratty Barbie — Variation 2 Core JavaScript
 * $90,000 Haute Minimalist Luxury Editorial Experience
 */
(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // UTILITIES
  // --------------------------------------------------------------------------
  const getEl = (sel, ctx = document) => ctx.querySelector(sel);
  const getEls = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, type, handler, opts) => el && el.addEventListener(type, handler, opts);

  // --------------------------------------------------------------------------
  // 1. AGE GATE (18+ Strict Verification)
  // --------------------------------------------------------------------------
  const initAgeGate = () => {
    const gate = getEl('#age-gate');
    if (!gate) return;

    const TTL_DAYS = 30;
    const enterBtn = getEl('[data-age-enter]', gate);
    const exitBtn = getEl('[data-age-exit]', gate);
    const gatePanel = getEl('.age-gate__panel', gate);
    const gateImage = 'age-gate.jpg';
    if (gatePanel) {
      gatePanel.style.setProperty('--age-gate-image', `url("../img/${gateImage}")`);
      gatePanel.style.backgroundImage = `linear-gradient(180deg, rgba(10, 10, 11, 0.12) 0%, rgba(10, 10, 11, 0.48) 40%, rgba(10, 10, 11, 0.92) 70%, rgba(10, 10, 11, 0.98) 100%), url("assets/img/${gateImage}")`;
    }

    const isVerified = () => {
      try {
        const stored = localStorage.getItem('barbie_age_verified_v1') || localStorage.getItem('barbie_age_verified_v1') || localStorage.getItem('venia_age_verified_v1_backup');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Date.now() < parsed.expiry) return true;
          localStorage.removeItem('barbie_age_verified_v1');
          localStorage.removeItem('barbie_age_verified_v1');
          localStorage.removeItem('venia_age_verified_v1_backup');
        }
      } catch (e) {}
      return document.cookie.indexOf('barbie_age_verified_v1=1') !== -1 || document.cookie.indexOf('barbie_age_verified_v1=1') !== -1 || document.cookie.indexOf('venia_age_verified_v1_backup=1') !== -1;
    };

    if (isVerified()) {
      document.documentElement.classList.add('age-verified');
      gate.hidden = true;
      return;
    }

    on(enterBtn, 'click', () => {
      const expiry = Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000;
      try {
        localStorage.setItem('barbie_age_verified_v1', JSON.stringify({ verified: true, expiry }));
      } catch (e) {}
      document.cookie = `barbie_age_verified_v1=1; max-age=${TTL_DAYS * 86400}; path=/; SameSite=Lax`;
      document.documentElement.classList.add('age-verified');
      gate.hidden = true;
    });

    on(exitBtn, 'click', () => {
      window.location.href = 'https://www.google.com';
    });
  };

  // --------------------------------------------------------------------------
  // 2. NAVIGATION & SCROLLSPY
  // --------------------------------------------------------------------------
  const initNav = () => {
    const drawer = getEl('#nav-drawer');
    const openBtn = getEl('[data-nav-open]');
    const closeBtn = getEl('[data-nav-close]');
    const drawerLinks = getEls('.nav-drawer__nav a');
    const navLinks = getEls('.desktop-nav a');

    // Mobile drawer toggle
    const toggleDrawer = (open) => {
      if (open) {
        drawer?.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      } else {
        drawer?.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    };

    on(openBtn, 'click', () => toggleDrawer(true));
    on(closeBtn, 'click', () => toggleDrawer(false));
    drawerLinks.forEach((link) => on(link, 'click', () => toggleDrawer(false)));

    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && drawer?.classList.contains('is-open')) {
        toggleDrawer(false);
      }
    });

    // Scrollspy
    const sections = getEls('section[id]');
    const handleScrollSpy = () => {
      const scrollY = window.scrollY + 140;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    };

    on(window, 'scroll', handleScrollSpy, { passive: true });
  };

  // --------------------------------------------------------------------------
  // 3. TOAST NOTIFICATION & ONE-CLICK CLIPBOARD COPIER
  // --------------------------------------------------------------------------
  let toastTimer;
  const showToast = (text) => {
    let toast = getEl('#toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-msg';
      toast.className = 'toast-msg';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  };

  const initTributeCopier = () => {
    const copyChips = getEls('[data-copy-tag]');
    copyChips.forEach((chip) => {
      on(chip, 'click', () => {
        const text = chip.dataset.copyTag;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied ${text} — now send it`);
        }).catch(() => {
          showToast(`Handle: ${text}`);
        });
      });
    });
  };

  // --------------------------------------------------------------------------
  // 4. BOOKING SYSTEM & X (TWITTER) DM ROUTING
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // 4. ADVANCED BOOKING SYSTEM & LIVE DEPOSIT CALCULATOR
  // --------------------------------------------------------------------------
  const initBookingSystem = () => {
    const form = getEl('#booking-form');
    const successBanner = getEl('#booking-success');
    if (!form) return;

    // Interactive Add-on Chips & Live Calculator
    const serviceSelect = getEl('#book-service', form);
    const addonCheckboxes = form.querySelectorAll('.addon-chip input[type="checkbox"]');

    const updateCalculator = () => {
      const selectedOption = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex] : null;
      const basePrice = parseInt(selectedOption?.getAttribute('data-price') || '450', 10);
      const serviceName = selectedOption ? selectedOption.text.split('(')[0].trim() : 'Standard Domination';

      let addonTotal = 0;
      const selectedAddons = [];
      addonCheckboxes.forEach((checkbox) => {
        const chip = checkbox.closest('.addon-chip');
        if (checkbox.checked) {
          chip?.classList.add('is-active');
          const price = parseInt(checkbox.getAttribute('data-addon-price') || '0', 10);
          addonTotal += price;
          selectedAddons.push(checkbox.value);
        } else {
          chip?.classList.remove('is-active');
        }
      });

      const grandTotal = basePrice + addonTotal;
      const depositDue = Math.round(grandTotal * 0.5);

      const totalDisplay = getEl('#calc-total-display', form);
      const depositDisplay = getEl('#calc-deposit-display', form);
      const summaryText = getEl('#calc-summary-text', form);

      if (totalDisplay) {
        totalDisplay.textContent = `$${grandTotal}`;
        totalDisplay.style.transform = 'scale(1.06)';
        setTimeout(() => { totalDisplay.style.transform = 'scale(1)'; }, 140);
      }
      if (depositDisplay) {
        depositDisplay.textContent = `$${depositDue}`;
        depositDisplay.style.transform = 'scale(1.06)';
        setTimeout(() => { depositDisplay.style.transform = 'scale(1)'; }, 140);
      }
      if (summaryText) {
        summaryText.textContent = selectedAddons.length > 0
          ? `${serviceName} + ${selectedAddons.length} Add-on${selectedAddons.length > 1 ? 's' : ''}`
          : serviceName;
      }

      const hiddenTotal = getEl('#calc-hidden-total', form);
      const hiddenDeposit = getEl('#calc-hidden-deposit', form);
      const hiddenAddons = getEl('#calc-hidden-addons', form);
      if (hiddenTotal) hiddenTotal.value = `$${grandTotal}`;
      if (hiddenDeposit) hiddenDeposit.value = `$${depositDue}`;
      if (hiddenAddons) hiddenAddons.value = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None';
    };

    if (serviceSelect) {
      on(serviceSelect, 'change', updateCalculator);
    }

    addonCheckboxes.forEach((checkbox) => {
      on(checkbox, 'change', updateCalculator);
    });

    // Run once on load
    updateCalculator();

    // Form Submission & Validation with Emil Kowalski Micro-Animations
    on(form, 'submit', (e) => {
      e.preventDefault();

      const requiredInputs = form.querySelectorAll('[required]');
      let firstInvalid = null;

      requiredInputs.forEach((input) => {
        input.classList.remove('form-field-invalid');
        const isCheckbox = input.type === 'checkbox';
        const isBlank = isCheckbox ? !input.checked : !input.value.trim();

        if (isBlank) {
          input.classList.add('form-field-invalid');
          setTimeout(() => input.classList.remove('form-field-invalid'), 900);
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
        showToast('Please complete all required fields and accept boundaries.');
        return;
      }

      const btn = getEl('#btn-submit-booking', form);
      if (btn) btn.classList.add('is-submitting');

      // Construct readable summary for devotion brief & email
      const formData = new FormData(form);
      const email = formData.get('email') || '';
      const telegram = formData.get('telegram') || '';
      const alias = formData.get('alias') || 'Anonymous Devotee';
      const location = formData.get('location') || '';
      const date = formData.get('preferred_date') || '';
      const time = formData.get('preferred_time') || '';
      const altTime = formData.get('alt_date_time') || 'None';
      const sessionType = formData.get('session_type') || '';
      const addons = formData.get('selected_addons') || 'None';
      const total = formData.get('estimated_total') || '';
      const deposit = formData.get('mandatory_deposit') || '';
      const paymentMethod = formData.get('deposit_payment_method') || '';
      const vision = formData.get('session_vision') || '';

      const briefText = `👑 BRATTY BARBIE — OFFICIAL SESSION REQUEST
========================================
• Devotee: ${alias}
• Email: ${email}
• Telegram: ${telegram}
• Location / City: ${location}
• Preferred Date & Time: ${date} at ${time}
• Alternative Time: ${altTime}
----------------------------------------
• Requested Session: ${sessionType}
• Selected Add-ons: ${addons}
• Estimated Total Cost: ${total}
• Mandatory 50% Deposit: ${deposit}
• Deposit Payment Channel: ${paymentMethod}
----------------------------------------
• Desires & Fetishes:
${vision}
----------------------------------------
✓ Boundaries & 50% deposit policy acknowledged.`;

      // Copy brief to devotee's clipboard automatically
      if (navigator.clipboard) {
        navigator.clipboard.writeText(briefText).catch(() => {});
      }

      // Send to FormSubmit AJAX endpoint (Delivers directly to all4barbieee@x.com)
      const payload = {
        _subject: `👑 New Session Booking: ${alias} (${location})`,
        Email: email,
        Telegram: telegram,
        Alias: alias,
        Location: location,
        Preferred_Date: date,
        Preferred_Time: time,
        Alternative_Time: altTime,
        Session_Type: sessionType,
        Selected_Addons: addons,
        Estimated_Total: total,
        Mandatory_50pct_Deposit: deposit,
        Payment_Method: paymentMethod,
        Session_Desires: vision,
        Terms_Agreed: "YES - All boundaries & 50% deposit accepted"
      };

      fetch('https://formsubmit.co/ajax/all4barbieee@x.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then((res) => res.json())
      .then(() => {
        showToast('👑 Request submitted to Bratty Barbie.');
      })
      .catch(() => {
        showToast('Request recorded & copied to clipboard.');
      })
      .finally(() => {
        if (btn) btn.classList.remove('is-submitting');
        if (successBanner) {
          successBanner.style.display = 'block';
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // 5. HERO CURATED IMAGE RANDOM SWITCHER (10s Intervals)
  // --------------------------------------------------------------------------
  const initHeroImageSwitcher = () => {
    const primaryImg = getEl('#heroPrimaryImg');
    const secondaryImg = getEl('#heroSecondaryImg');
    if (!primaryImg || !secondaryImg) return;

    // Curated priority professional set images (Set 1, 2, 3, 4)
    const images = [
      'assets/img/hero-01.jpg',
      'assets/img/hero-02.jpg'
    ];

    // Progressively prefetch hero rotation images in idle background without blocking initial paint
    const prefetchHeroImages = () => {
      let idx = 0;
      const step = () => {
        if (idx < images.length) {
          const img = new Image();
          img.decoding = 'async';
          img.src = images[idx];
          idx++;
          setTimeout(step, 800);
        }
      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setTimeout(step, 1500));
      } else {
        setTimeout(step, 2000);
      }
    };

    if (document.readyState === 'complete') {
      prefetchHeroImages();
    } else {
      window.addEventListener('load', prefetchHeroImages, { once: true });
    }

    let currentIndex = 0; // Starts at hero-01.jpg
    let isShowingPrimary = true;
    let timer = null;

    const getNextRandomIndex = () => {
      let nextIndex = currentIndex;
      while (nextIndex === currentIndex && images.length > 1) {
        nextIndex = Math.floor(Math.random() * images.length);
      }
      return nextIndex;
    };

    const switchImage = () => {
      if (document.hidden) return;

      const nextIndex = getNextRandomIndex();
      currentIndex = nextIndex;
      const nextSrc = images[nextIndex];

      const activeLayer = isShowingPrimary ? primaryImg : secondaryImg;
      const incomingLayer = isShowingPrimary ? secondaryImg : primaryImg;

      // Prepare incoming image
      incomingLayer.src = nextSrc;
      incomingLayer.classList.add('is-incoming');

      // Seamless crossfade transition
      requestAnimationFrame(() => {
        incomingLayer.classList.add('is-active');
        setTimeout(() => {
          activeLayer.classList.remove('is-active', 'is-incoming');
          incomingLayer.classList.remove('is-incoming');
          isShowingPrimary = !isShowingPrimary;
        }, 1400);
      });
    };

    // Run random switch every 10 seconds (10,000ms)
    timer = setInterval(switchImage, 10000);

    // Pause timer when tab is inactive, resume on active
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        clearInterval(timer);
        timer = setInterval(switchImage, 10000);
      }
    });
  };

  // --------------------------------------------------------------------------
  // 6. GALLERY 6-FRAME FIXED ROTATOR (Auto-shuffles every 6 seconds randomly)
  // --------------------------------------------------------------------------
  const initGalleryFrameRotator = () => {
    const grid = getEl('#gallerySixGrid');
    if (!grid) return;

    const frames = getEls('.gallery-frame', grid);
    if (frames.length !== 6) return;

    const galleryPool = [
      'assets/img/tile-01.jpg',
      'assets/img/tile-02.jpg',
      'assets/img/tile-03.jpg',
      'assets/img/tile-04.jpg',
      'assets/img/tile-05.jpg',
      'assets/img/tile-06.jpg',
      'assets/img/tile-07.jpg',
      'assets/img/tile-08.jpg',
      'assets/img/tile-09.jpg',
      'assets/img/tile-10.jpg',
      'assets/img/tile-11.jpg',
      'assets/img/tile-12.jpg',
      'assets/img/hero-01.jpg',
      'assets/img/hero-02.jpg',
      'assets/img/banner-01.jpg',
      'assets/img/session-banner.jpg',
      'assets/img/footer-01.jpg',
      'assets/img/footer-02.jpg',
      'assets/img/footer-03.jpg',
      'assets/img/footer-04.jpg',
      'assets/img/alpha-01.jpg'
    ];

    // Helper: Fisher-Yates shuffle
    const shuffleArray = (arr) => {
      const copy = arr.slice();
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    // Preload helper
    const preloaded = new Set();
    const preloadImage = (src) => {
      if (!src || preloaded.has(src)) return;
      preloaded.add(src);
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    };

    galleryPool.forEach(preloadImage);

    // Track visible photos
    let currentShown = [];

    // Initialize all 6 frames randomly on load
    const initialShuffled = shuffleArray(galleryPool);
    frames.forEach((frame, idx) => {
      const activeImg = frame.querySelector('.gallery-frame__img.is-active');
      const initialSrc = initialShuffled[idx];
      currentShown[idx] = initialSrc;
      if (activeImg) {
        activeImg.src = initialSrc;
      }
    });

    // Cross-fade a single frame
    const crossFadeFrame = (frame, newSrc) => {
      const imgs = frame.querySelectorAll('.gallery-frame__img');
      if (imgs.length < 2) return;

      const activeImg = frame.querySelector('.gallery-frame__img.is-active') || imgs[0];
      const nextImg = activeImg === imgs[0] ? imgs[1] : imgs[0];

      const temp = new Image();
      temp.onload = () => {
        nextImg.src = newSrc;
        nextImg.classList.add('is-active');
        nextImg.classList.remove('is-next');

        activeImg.classList.remove('is-active');
        activeImg.classList.add('is-next');
      };
      temp.src = newSrc;
    };

    // Auto-shuffle and rotate every 6 seconds
    const rotateGallery = () => {
      if (document.hidden) return;

      // Pick 6 distinct images from reserve pool
      const available = galleryPool.filter(src => !currentShown.includes(src));
      const poolCandidates = shuffleArray(available.length >= 6 ? available : galleryPool);
      const nextBatch = poolCandidates.slice(0, 6);

      frames.forEach((frame, idx) => {
        const newSrc = nextBatch[idx] || galleryPool[(idx * 3) % galleryPool.length];
        currentShown[idx] = newSrc;
        const staggerMs = Math.floor(Math.random() * 350);
        setTimeout(() => {
          crossFadeFrame(frame, newSrc);
        }, staggerMs);
      });
    };

    // Automatic 6-second timer, zero manual buttons
    let timer = setInterval(rotateGallery, 6000);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        clearInterval(timer);
        rotateGallery();
        timer = setInterval(rotateGallery, 6000);
      }
    });
  };

  // --------------------------------------------------------------------------
  // 7. SCROLL REVEALS (IntersectionObserver gated behind .js class)
  // --------------------------------------------------------------------------
  const initScrollReveals = () => {
    const reveals = getEls('[data-reveal]');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    reveals.forEach((el) => observer.observe(el));
  };

  // --------------------------------------------------------------------------
  // 8. FOOTER IMAGE ROTATION (Per-refresh sequence + interactive reveal)
  // --------------------------------------------------------------------------
  const initFooterImageRotation = () => {
    // Static user-specified footer image (open wide footboys)
    return;
  };

  // --------------------------------------------------------------------------
  // 9. THEME SWITCHER (5 Themes)
  // --------------------------------------------------------------------------
  const initThemeSwitcher = () => {
    // Fuchsia only — theme switching removed
    document.documentElement.setAttribute('data-theme', 'soft-pink');
    try { localStorage.setItem('barbie_theme', 'soft-pink'); } catch (e) {}
  };


  // --------------------------------------------------------------------------
  // PUBLIC DRAINING RECEIPTS ROTATOR (HANDS-FREE AUTO-SWITCHING)
  // --------------------------------------------------------------------------
  const initReceiptsRotator = () => {
    const showcase = document.getElementById('receiptsShowcase');
    if (!showcase) return;

    const receiptImages = [
      'assets/img/receipts/receipt-01.jpg',
      'assets/img/receipts/receipt-02.jpg',
      'assets/img/receipts/receipt-03.jpg',
      'assets/img/receipts/receipt-04.jpg',
      'assets/img/receipts/receipt-05.jpg',
      'assets/img/receipts/receipt-06.jpg',
      'assets/img/receipts/receipt-07.jpg',
      'assets/img/receipts/receipt-08.jpg',
      'assets/img/receipts/receipt-09.jpg',
      'assets/img/receipts/receipt-10.jpg',
      'assets/img/receipts/receipt-11.jpg',
      'assets/img/receipts/receipt-12.jpg'
    ];

    const activeImg = document.getElementById('receiptImgActive');
    const nextImg = document.getElementById('receiptImgNext');
    const backdrop = document.getElementById('receiptsBackdrop');

    let currentIndex = 0;
    let isTransitioning = false;
    let timer = null;
    const INTERVAL = 4500;

    const switchNext = () => {
      if (isTransitioning || !activeImg || !nextImg) return;
      isTransitioning = true;

      const nextIdx = (currentIndex + 1) % receiptImages.length;
      const nextSrc = receiptImages[nextIdx];

      nextImg.src = nextSrc;

      const img = new Image();
      img.src = nextSrc;
      img.onload = () => {
        nextImg.classList.add('is-active');
        nextImg.classList.remove('is-next');
        activeImg.classList.remove('is-active');
        activeImg.classList.add('is-next');

        if (backdrop) {
          backdrop.style.backgroundImage = 'url("' + nextSrc + '")';
        }

        currentIndex = nextIdx;

        setTimeout(() => {
          activeImg.src = nextSrc;
          activeImg.className = 'receipts-img is-active';
          nextImg.className = 'receipts-img is-next';
          isTransitioning = false;
        }, 600);
      };
    };

    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(switchNext, INTERVAL);
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        startTimer();
      }
    });

    startTimer();
  };

  // --------------------------------------------------------------------------
  // BOOTSTRAP
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initAgeGate();
    initThemeSwitcher();
    initNav();
    initScrollReveals();
    initTributeCopier();
    initBookingSystem();
    initHeroImageSwitcher();
    initGalleryFrameRotator();
    initFooterImageRotation();
    initReceiptsRotator();
  });
})();
