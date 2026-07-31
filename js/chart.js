/* ============================================================
   FUNDING BARS

   The list in index.html is the content: every project, its funder,
   role, years and amount are in the markup and readable without JS.
   This file adds the one thing markup can't — the visual comparison.

   Rows are authored chronologically (latest first), so bar ORDER does
   not encode size. Magnitude is carried by bar length and by a single
   navy ramp (darker = larger), which is why the ramp matters here more
   than it would in a sorted chart.
   ============================================================ */
(function () {
  'use strict';

  var list = document.getElementById('fundingList');
  if (!list) return;

  var rows = Array.prototype.slice.call(list.querySelectorAll('.funding-row[data-amount]'));
  if (!rows.length) return;

  var amounts = rows.map(function (row) {
    return parseInt(row.dataset.amount, 10) || 0;
  });
  var max = Math.max.apply(null, amounts);
  if (!max) return;

  // Sequential ramp: five steps, snapped by share of the largest grant.
  function step(amount) {
    var share = amount / max;
    if (share >= 0.8) return 5;
    if (share >= 0.6) return 4;
    if (share >= 0.4) return 3;
    if (share >= 0.2) return 2;
    return 1;
  }

  var bars = [];
  rows.forEach(function (row, i) {
    var bar = row.querySelector('.funding-bar');
    if (!bar) return;
    bar.style.setProperty('--bar', 'var(--viz-' + step(amounts[i]) + ')');
    bar.dataset.width = ((amounts[i] / max) * 100).toFixed(1) + '%';
    bars.push(bar);
  });

  // Keep the summary line honest if a project is added and the hard-coded
  // total in the markup is not updated to match.
  var totalEl = document.getElementById('fundingTotal');
  if (totalEl) {
    var sum = amounts.reduce(function (a, b) {
      return a + b;
    }, 0);
    var years = [];
    rows.forEach(function (row) {
      var span = row.querySelector('.funding-years');
      if (!span) return;
      span.textContent.split(/[–-]/).forEach(function (y) {
        var n = parseInt(y, 10);
        if (n) years.push(n);
      });
    });
    if (years.length) {
      totalEl.innerHTML =
        rows.length +
        ' funded projects · <strong>RM ' +
        sum.toLocaleString('en-US') +
        '</strong> total · ' +
        Math.min.apply(null, years) +
        '–' +
        Math.max.apply(null, years);
    }
  }

  /* ---- grow the bars when the list comes into view ---- */
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
      { threshold: 0.15 }
    );
    observer.observe(list);
  }
})();
