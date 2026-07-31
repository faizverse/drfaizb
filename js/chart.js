/* ============================================================
   FUNDING CHART

   Reads its data from the data-* attributes on the project cards,
   so the markup stays the single source of truth and the chart can
   never drift from the list below it.

   Form:   magnitude comparison -> horizontal bars, sorted desc.
   Colour: one navy hue, sequential (darker = larger). One series,
           so there is nothing for a legend to disambiguate.
   Labels: every bar is directly labelled, which is why the chart
           carries no axis or gridlines -- they would only restate
           what the labels already say.
   ============================================================ */
(function () {
  'use strict';

  var mount = document.getElementById('fundingChart');
  if (!mount) return;

  var cards = Array.prototype.slice.call(document.querySelectorAll('.project-card[data-amount]'));
  if (!cards.length) return;

  var projects = cards
    .map(function (card) {
      var titleEl = card.querySelector('h4');
      return {
        name: card.dataset.short || (titleEl ? titleEl.textContent.trim() : ''),
        amount: parseInt(card.dataset.amount, 10) || 0,
        start: parseInt(card.dataset.start, 10) || 0,
        end: parseInt(card.dataset.end, 10) || 0,
        role: card.dataset.role || ''
      };
    })
    .filter(function (p) {
      return p.amount > 0;
    })
    .sort(function (a, b) {
      return b.amount - a.amount;
    });

  if (!projects.length) return;

  var max = projects[0].amount;
  var total = projects.reduce(function (sum, p) {
    return sum + p.amount;
  }, 0);
  var firstYear = Math.min.apply(
    null,
    projects.map(function (p) {
      return p.start;
    })
  );
  var lastYear = Math.max.apply(
    null,
    projects.map(function (p) {
      return p.end;
    })
  );

  function money(n) {
    return 'RM ' + n.toLocaleString('en-US');
  }

  // Sequential ramp: five steps, snapped by share of the largest grant.
  function step(amount) {
    var share = amount / max;
    if (share >= 0.8) return 5;
    if (share >= 0.6) return 4;
    if (share >= 0.4) return 3;
    if (share >= 0.2) return 2;
    return 1;
  }

  var list = document.createElement('ol');
  list.className = 'chart-list';
  // Every value here is repeated in the project cards directly below,
  // which are the accessible view of this data. Announcing both would
  // just make a screen reader read the same ten grants twice.
  list.setAttribute('aria-hidden', 'true');

  projects.forEach(function (p) {
    var row = document.createElement('li');
    row.className = 'chart-row';

    var label = document.createElement('div');
    label.className = 'chart-label';
    var name = document.createElement('div');
    name.className = 'chart-name';
    name.textContent = p.name;
    var years = document.createElement('div');
    years.className = 'chart-years';
    years.textContent = p.start + '–' + p.end + (p.role ? ' · ' + p.role : '');
    label.appendChild(name);
    label.appendChild(years);

    var track = document.createElement('div');
    track.className = 'chart-track';
    var bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.setProperty('--bar', 'var(--viz-' + step(p.amount) + ')');
    bar.dataset.width = ((p.amount / max) * 100).toFixed(1) + '%';
    track.appendChild(bar);

    var value = document.createElement('div');
    value.className = 'chart-value';
    value.textContent = money(p.amount);

    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(value);
    list.appendChild(row);
  });

  var caption = document.createElement('p');
  caption.className = 'chart-caption';
  caption.innerHTML =
    projects.length +
    ' funded projects · <strong>' +
    money(total) +
    '</strong> total · ' +
    firstYear +
    '–' +
    lastYear;

  mount.appendChild(list);
  mount.appendChild(caption);
  mount.hidden = false;

  /* ---- grow the bars when the chart comes into view ---- */
  var bars = list.querySelectorAll('.chart-bar');

  function draw() {
    bars.forEach(function (bar) {
      bar.style.width = bar.dataset.width;
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw();
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          draw();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(mount);
  }
})();
