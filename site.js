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
     9. VIMEO LAZY LOAD
     Hero: injects src after page is idle (avoids blocking render).
     Project pages: click-to-load facade → replaced with iframe.
  ---------------------------------------------------------- */

  // All facades (Vimeo + YouTube) — click swaps facade for live iframe
  document.querySelectorAll('.vimeo-facade[data-src], .youtube-facade[data-src]').forEach(function (facade) {
    facade.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = facade.getAttribute('data-src');
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('title', facade.getAttribute('data-title') || 'Project video');
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
      facade.parentNode.replaceChild(iframe, facade);
    });
  });


  /* ----------------------------------------------------------
     8. HERO VIDEO MUTE TOGGLE
     Starts muted (required for autoplay). Explicitly set muted
     and call play() because some browsers ignore the HTML attribute.
     Button at bottom-right of hero toggles muted state.
  ---------------------------------------------------------- */

  var heroVideo   = document.querySelector('.hero__video');
  var heroMuteBtn = document.querySelector('.hero__mute-btn');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(function () {});
  }

  if (heroVideo && heroMuteBtn) {
    heroMuteBtn.addEventListener('click', function () {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        heroMuteBtn.classList.remove('is-unmuted');
        heroMuteBtn.setAttribute('aria-label', 'Unmute video');
      } else {
        heroMuteBtn.classList.add('is-unmuted');
        heroMuteBtn.setAttribute('aria-label', 'Mute video');
      }
    });
  }


  /* ----------------------------------------------------------
     9. CARD TAP REVEAL (touch devices)
     On hover-capable devices CSS handles the overlay.
     On touch (iPhone etc.): first tap shows overlay, second
     tap follows the link. Tapping outside dismisses.
     Runs in capture phase so it fires before the page-exit
     transition handler in Section 2.
  ---------------------------------------------------------- */

  if (window.matchMedia('(hover: none)').matches) {
    var allCards = document.querySelectorAll('.card');

    document.addEventListener('click', function (e) {
      var card = e.target.closest('.card');

      if (!card) {
        // Tapped outside a card — dismiss any open overlay
        allCards.forEach(function (c) { c.classList.remove('is-in-view'); });
        return;
      }

      if (!card.classList.contains('is-in-view')) {
        // First tap — show overlay, block navigation and page-exit fade
        e.preventDefault();
        e.stopImmediatePropagation();
        allCards.forEach(function (c) { c.classList.remove('is-in-view'); });
        card.classList.add('is-in-view');
      }
      // Second tap — is-in-view already set, let Section 2 navigate normally
    }, true); // capture phase
  }


})();
