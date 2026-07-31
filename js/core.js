/* ============================================================
   CORE — theme, navigation, reveal, counters, scroll affordances

   Everything here is an enhancement. Without JS the page is still
   complete: content is visible (see .no-js in base.css) and the
   stat numbers already carry their final values in the markup.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------
     THEME TOGGLE
     The <head> script has already applied any stored preference;
     this only wires the button and keeps the label truthful.
     ------------------------------------------------------------ */
  var themeToggle = document.getElementById('themeToggle');

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncToggle() {
    if (!themeToggle) return;
    var dark = currentTheme() === 'dark';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute(
      'aria-label',
      dark ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* private mode — the theme still applies for this page view */
      }
      syncToggle();
    });
    syncToggle();

    // Follow the OS if the visitor has never chosen explicitly.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (!root.getAttribute('data-theme')) syncToggle();
    });
  }

  /* ------------------------------------------------------------
     ACTIVE SECTION
     An IntersectionObserver replaces the old scroll handler, which
     read offsetTop for every section on every scroll event.
     ------------------------------------------------------------ */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a, .mobile-menu a');
  var navHeight = parseInt(getComputedStyle(root).getPropertyValue('--nav-h'), 10) || 56;

  function setActive(id) {
    navAnchors.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  if (sections.length) {
    // Track which sections are in the band rather than reacting to
    // whichever entry happens to arrive last — during a jump scroll
    // several fire at once and callback order is not document order.
    var inBand = Object.create(null);
    var order = Array.prototype.map.call(sections, function (s) {
      return s.id;
    });

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          inBand[entry.target.id] = entry.isIntersecting;
        });
        // Walk backwards: at a boundary two sections share the band,
        // and the one being entered is the later of the two.
        for (var i = order.length - 1; i >= 0; i--) {
          if (inBand[order[i]]) {
            setActive(order[i]);
            return;
          }
        }
      },
      { rootMargin: '-' + (navHeight + 8) + 'px 0px -65% 0px', threshold: 0 }
    );
    sections.forEach(function (s) {
      sectionObserver.observe(s);
    });
  }

  /* ------------------------------------------------------------
     NAVBAR SHADOW + BACK TO TOP
     Both driven by a sentinel, so neither costs a scroll handler.
     ------------------------------------------------------------ */
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('back-to-top');

  var sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:400px;left:0;width:1px;height:1px;pointer-events:none;';
  document.body.appendChild(sentinel);

  new IntersectionObserver(function (entries) {
    var passed = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
    if (navbar) navbar.classList.toggle('scrolled', passed);
    if (backToTop) backToTop.classList.toggle('visible', passed);
  }).observe(sentinel);

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------
     SCROLL PROGRESS
     CSS drives this via animation-timeline where supported. This
     is only the fallback for browsers that lack it.
     ------------------------------------------------------------ */
  var progress = document.getElementById('scroll-progress');
  var hasScrollTimeline =
    window.CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()');

  if (progress && !hasScrollTimeline) {
    var ticking = false;
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, pct)) + ')';
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateProgress);
        }
      },
      { passive: true }
    );
    updateProgress();
  }

  /* ------------------------------------------------------------
     MOBILE MENU
     ------------------------------------------------------------ */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMenu(returnFocus) {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    if (returnFocus) hamburger.focus();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu(true);
    });

    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu(false);
      }
    });
  }

  /* ------------------------------------------------------------
     REVEAL ON SCROLL
     ------------------------------------------------------------ */
  var fadeEls = document.querySelectorAll('.fade-in');

  if (reduceMotion.matches) {
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  } else {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------
     STAT COUNTERS
     The markup already holds the final values, so this animates
     from zero and lands exactly where the HTML started.
     ------------------------------------------------------------ */
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  var statsGrid = document.querySelector('.hero-stats-grid');

  function format(el, value) {
    return (el.dataset.prefix || '') + value + (el.dataset.suffix || '');
  }

  var countersFinal = false;

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var duration = 1800;
    var start = performance.now();

    function tick(now) {
      if (countersFinal) return;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(el, Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Printing mid-animation would otherwise put half-counted numbers on
  // paper — on a CV that is a wrong figure, not just a cosmetic glitch.
  function finalizeCounters() {
    countersFinal = true;
    statNumbers.forEach(function (el) {
      el.textContent = format(el, parseInt(el.dataset.target, 10));
    });
  }

  window.addEventListener('beforeprint', finalizeCounters);
  if (window.matchMedia) {
    var printQuery = window.matchMedia('print');
    if (printQuery.addEventListener) {
      printQuery.addEventListener('change', function (e) {
        if (e.matches) finalizeCounters();
      });
    }
  }

  if (statsGrid && statNumbers.length && !reduceMotion.matches) {
    var started = false;
    var statsObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting && !started) {
          started = true;
          statNumbers.forEach(function (el) {
            el.textContent = format(el, 0);
            animateCounter(el);
          });
          statsObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsGrid);
  }

  /* ------------------------------------------------------------
     FOOTER YEAR
     ------------------------------------------------------------ */
  var footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());
})();
