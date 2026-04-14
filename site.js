/* ============================================================
   site.js
   Da'anong Gyang — Cinematographer Portfolio
   Shared JS. Included on every page.
   ============================================================ */

(function () {
  'use strict';


  /* ----------------------------------------------------------
     1. PAGE ENTER TRANSITION
     Fades the page in on load.
  ---------------------------------------------------------- */

  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 500ms ease';

  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });


  /* ----------------------------------------------------------
     2. PAGE EXIT TRANSITION
     Fades out before navigating to internal links.
  ---------------------------------------------------------- */

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');

    // Skip: anchors, external links, mailto, tel, new tab
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      link.target === '_blank'
    ) return;

    e.preventDefault();
    document.body.style.opacity = '0';

    setTimeout(function () {
      window.location = href;
    }, 500);
  });


  /* ----------------------------------------------------------
     3. NAVIGATION
     Open / close full-screen nav overlay.
  ---------------------------------------------------------- */

  var trigger    = document.querySelector('.nav-trigger');
  var navOverlay = document.querySelector('.nav-overlay');
  var navClose   = document.querySelector('.nav-close');

  if (trigger && navOverlay) {

    function openNav() {
      navOverlay.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (navClose) navClose.focus();
    }

    function closeNav() {
      navOverlay.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      trigger.focus();
    }

    trigger.addEventListener('click', openNav);

    if (navClose) {
      navClose.addEventListener('click', closeNav);
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navOverlay.classList.contains('is-open')) {
        closeNav();
      }
    });

    // Close when a nav link is clicked
    navOverlay.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeNav();
      });
    });

    // Trap focus inside overlay when open
    navOverlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = navOverlay.querySelectorAll(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }


  /* ----------------------------------------------------------
     4. HEADER SCROLL STATE
     Adds `.is-scrolled` to header when user scrolls past 40px.
  ---------------------------------------------------------- */

  var header = document.querySelector('.site-header');

  if (header) {
    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ----------------------------------------------------------
     5. SCROLL REVEAL
     Observes `.reveal` and `.reveal-stagger` elements.
     Adds `.is-visible` when they enter the viewport.
     Fires once only per element.
  ---------------------------------------------------------- */

  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }


  /* ----------------------------------------------------------
     6. TABS
     Handles tab switching on project pages.
     Only runs if `.tabs` exists on the page.
  ---------------------------------------------------------- */

  var tabBtns   = document.querySelectorAll('.tabs__btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('aria-controls');

        // Update buttons
        tabBtns.forEach(function (b) {
          b.setAttribute('aria-selected', 'false');
        });
        btn.setAttribute('aria-selected', 'true');

        // Update panels
        tabPanels.forEach(function (panel) {
          panel.classList.remove('is-active');
          panel.hidden = true;
        });

        var activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add('is-active');
          activePanel.hidden = false;
        }
      });
    });
  }


  /* ----------------------------------------------------------
     7. COPYRIGHT YEAR
     Auto-fills current year in any #year element.
  ---------------------------------------------------------- */

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ----------------------------------------------------------
     8. CARD SCROLL REVEAL
     Shows .card__overlay when a card is ≥ 40% in the viewport.
     Hides it again when the card scrolls out.
     Cinematic "image only → title appears" on scroll/touch-scroll.
  ---------------------------------------------------------- */

  var cards = document.querySelectorAll('.card');

  if (cards.length && 'IntersectionObserver' in window) {
    var cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
        } else {
          entry.target.classList.remove('is-in-view');
        }
      });
    }, { threshold: 0.4 });

    cards.forEach(function (card) {
      cardObserver.observe(card);
    });
  }


})();
