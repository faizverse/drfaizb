/* ============================================================
   MEDIA — YouTube facades, gallery lightbox, copy-to-clipboard
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     YOUTUBE FACADE
     The markup ships a button over a local thumbnail. The player
     is injected only on click, so loading the page makes zero
     requests to youtube.com.
     ------------------------------------------------------------ */
  document.querySelectorAll('.yt-lite').forEach(function (facade) {
    facade.addEventListener(
      'click',
      function () {
        var id = facade.dataset.ytId;
        if (!id) return;

        var title = facade.querySelector('.yt-title');
        var iframe = document.createElement('iframe');
        iframe.src =
          'https://www.youtube-nocookie.com/embed/' +
          encodeURIComponent(id) +
          '?autoplay=1&rel=0';
        iframe.title = title ? title.textContent : 'YouTube video player';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;

        // Swap the button for a plain wrapper — a <button> must not
        // contain an interactive iframe.
        var wrap = document.createElement('div');
        wrap.className = 'yt-lite';
        wrap.appendChild(iframe);
        facade.replaceWith(wrap);
      },
      { once: true }
    );
  });

  /* ------------------------------------------------------------
     LIGHTBOX
     A native <dialog>, so focus trapping, Esc-to-close and the
     backdrop come from the platform rather than from us.
     ------------------------------------------------------------ */
  var gallery = document.getElementById('crystalGallery');
  var dialog = document.getElementById('lightbox');

  if (gallery && dialog && typeof dialog.showModal === 'function') {
    var triggers = Array.prototype.slice.call(gallery.querySelectorAll('button[data-full]'));
    var imgEl = document.getElementById('lightboxImg');
    var captionEl = document.getElementById('lightboxCaption');
    var countEl = document.getElementById('lightboxCount');
    var prevBtn = dialog.querySelector('.lightbox-prev');
    var nextBtn = dialog.querySelector('.lightbox-next');
    var closeBtn = dialog.querySelector('.lightbox-close');
    var current = 0;
    var opener = null;

    function show(index) {
      current = (index + triggers.length) % triggers.length;
      var trigger = triggers[current];
      imgEl.src = trigger.dataset.full;
      imgEl.alt = trigger.dataset.caption || '';
      captionEl.textContent = trigger.dataset.caption || '';
      countEl.textContent = ' (' + (current + 1) + ' of ' + triggers.length + ')';
    }

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener('click', function () {
        opener = trigger;
        show(index);
        dialog.showModal();
      });
    });

    prevBtn.addEventListener('click', function () {
      show(current - 1);
    });
    nextBtn.addEventListener('click', function () {
      show(current + 1);
    });
    closeBtn.addEventListener('click', function () {
      dialog.close();
    });

    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        show(current - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        show(current + 1);
      }
    });

    // Click on the backdrop (i.e. outside the figure) closes.
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      imgEl.removeAttribute('src');
      if (opener) {
        opener.focus();
        opener = null;
      }
    });
  } else if (gallery) {
    // No <dialog> support: let the thumbnails open the full image directly.
    gallery.querySelectorAll('button[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.open(btn.dataset.full, '_blank', 'noopener');
      });
    });
  }

  /* ------------------------------------------------------------
     COPY EMAIL
     ------------------------------------------------------------ */
  var copyBtn = document.getElementById('copyEmail');
  var emailLink = document.getElementById('emailLink');

  if (copyBtn && emailLink) {
    var resetTimer;

    copyBtn.addEventListener('click', function () {
      var email = emailLink.textContent.trim();

      var done = function () {
        copyBtn.classList.add('copied');
        copyBtn.setAttribute('aria-label', 'Email address copied');
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          copyBtn.classList.remove('copied');
          copyBtn.setAttribute('aria-label', 'Copy email address');
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:absolute;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          done();
        } catch (e) {
          /* clipboard unavailable — the address is still on screen */
        }
        document.body.removeChild(ta);
      }
    });
  }
})();
