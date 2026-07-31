/* ============================================================
   PUBLICATIONS — search, type filter, sort, year grouping

   Without JS the list renders exactly as authored: every entry
   visible, newest first. This layer only adds ways to narrow it.
   ============================================================ */
(function () {
  'use strict';

  var list = document.getElementById('pubList');
  if (!list) return;

  var searchInput = document.getElementById('pubSearch');
  var sortSelect = document.getElementById('pubSort');
  var countEl = document.getElementById('pubCount');
  var emptyEl = document.getElementById('pubEmpty');
  var filterBtns = document.querySelectorAll('.filter-btn');

  var cards = Array.prototype.slice.call(list.querySelectorAll('.pub-card'));
  if (!cards.length) return;

  // Snapshot the searchable text and the highlightable fields once,
  // so repeated searches never read back marked-up HTML.
  var entries = cards.map(function (card, index) {
    var fields = ['h4', '.pub-authors', '.pub-venue'].map(function (sel) {
      var el = card.querySelector(sel);
      return el ? { el: el, text: el.textContent } : null;
    }).filter(Boolean);

    return {
      card: card,
      index: index,
      year: parseInt(card.dataset.year, 10) || 0,
      type: card.dataset.type || '',
      haystack: card.textContent.toLowerCase().replace(/\s+/g, ' '),
      fields: fields
    };
  });

  var state = { term: '', type: 'all', dir: 'desc' };

  function escapeHTML(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Rewrites a field from its stored plain text, wrapping matches.
  // Both the text and the user's term are escaped before insertion.
  function highlight(field, term) {
    if (!term) {
      field.el.textContent = field.text;
      return;
    }
    var re = new RegExp(escapeRegExp(term), 'gi');
    var out = '';
    var last = 0;
    var m;
    while ((m = re.exec(field.text)) !== null) {
      out += escapeHTML(field.text.slice(last, m.index));
      out += '<mark>' + escapeHTML(m[0]) + '</mark>';
      last = m.index + m[0].length;
      if (m[0] === '') re.lastIndex++; // guard against a zero-length match
    }
    out += escapeHTML(field.text.slice(last));
    field.el.innerHTML = out;
  }

  function matches(entry) {
    if (state.type !== 'all' && entry.type !== state.type) return false;
    if (state.term && entry.haystack.indexOf(state.term) === -1) return false;
    return true;
  }

  function render() {
    var visible = entries.filter(matches);

    visible.sort(function (a, b) {
      if (a.year !== b.year) {
        return state.dir === 'desc' ? b.year - a.year : a.year - b.year;
      }
      return a.index - b.index; // stable within a year
    });

    // Rebuild in one pass off-document.
    var frag = document.createDocumentFragment();
    var lastYear = null;

    visible.forEach(function (entry) {
      if (entry.year !== lastYear) {
        var heading = document.createElement('h3');
        heading.className = 'pub-year-heading';
        heading.textContent = String(entry.year);
        frag.appendChild(heading);
        lastYear = entry.year;
      }
      entry.card.classList.remove('hidden');
      entry.fields.forEach(function (f) {
        highlight(f, state.term);
      });
      frag.appendChild(entry.card);
    });

    // Park filtered-out cards so they stay in the DOM (and in print).
    entries.forEach(function (entry) {
      if (visible.indexOf(entry) === -1) {
        entry.card.classList.add('hidden');
        entry.fields.forEach(function (f) {
          f.el.textContent = f.text;
        });
        frag.appendChild(entry.card);
      }
    });

    list.querySelectorAll('.pub-year-heading').forEach(function (h) {
      h.remove();
    });
    list.appendChild(frag);
    list.classList.add('grouped');

    if (countEl) {
      countEl.textContent =
        visible.length === entries.length
          ? entries.length + ' publications'
          : 'Showing ' + visible.length + ' of ' + entries.length;
    }
    if (emptyEl) emptyEl.hidden = visible.length !== 0;
  }

  /* ---- wiring ---- */
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.type = btn.dataset.filter;
      filterBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      state.term = searchInput.value.trim().toLowerCase();
      render();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      state.dir = sortSelect.value;
      render();
    });
  }

  render();
})();
