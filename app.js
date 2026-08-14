(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* reveal an element's payload (bars / meters / races / counts) immediately */
  function fire(el) {
    el.classList.add('in');
    if (el.classList.contains('bars')) {
      el.querySelectorAll('.bar__fill').forEach(function (b) { b.style.height = b.dataset.h; });
    }
    if (el.classList.contains('meter') || el.classList.contains('race')) {
      el.querySelectorAll('[data-w]').forEach(function (f) { f.style.width = f.dataset.w; });
    }
    if (el.hasAttribute('data-count')) countUp(el);
    el.querySelectorAll('[data-count]').forEach(function (c) { if (!c._done) { c._done = 1; countUp(c); } });
  }

  /* hard fallback: make everything visible & final, no animation */
  function revealAll() {
    document.querySelectorAll('.fade, .bars, .meter, .race, .rings, [data-count]').forEach(function (el) {
      el.classList.add('in');
      el.querySelectorAll('.bar__fill').forEach(function (b) { b.style.height = b.dataset.h; });
      el.querySelectorAll('[data-w]').forEach(function (f) { f.style.width = f.dataset.w; });
    });
    document.querySelectorAll('[data-count]').forEach(function (c) { if (!c._done) { c._done = 1; countUp(c); } });
  }

  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '', prefix = el.dataset.prefix || '';
    var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
    if (reduce || isNaN(target)) { el.textContent = prefix + (isNaN(target) ? el.textContent : target.toFixed(decimals)) + suffix; return; }
    var dur = 1400, start = null, done = false;
    function finish() { if (done) return; done = true; el.textContent = prefix + target.toFixed(decimals) + suffix; }
    function step(ts) {
      if (done) return;
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else finish();
    }
    requestAnimationFrame(step);
    /* backstop: rAF is paused in background tabs — guarantee the final value regardless */
    setTimeout(finish, dur + 400);
  }

  try {
    /* ---------- mobile nav ---------- */
    document.addEventListener('click', function (e) {
      var links = document.querySelector('.nav__links');
      if (e.target.closest('.nav__toggle')) { links.classList.toggle('open'); return; }
      if (e.target.closest('.nav__links a')) { links.classList.remove('open'); }
    });

    /* ---------- scroll progress + nav elevation + back-to-top ---------- */
    var progress = document.querySelector('.progress');
    var nav = document.querySelector('.nav');
    var totop = document.querySelector('.totop');
    function onScroll() {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = 'scaleX(' + (h > 0 ? st / h : 0) + ')';
      if (nav) nav.classList.toggle('scrolled', st > 8);
      if (totop) totop.classList.toggle('show', st > 640);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    if (totop) totop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    /* ---------- auto-stagger children of .stagger ---------- */
    document.querySelectorAll('.stagger').forEach(function (group) {
      group.querySelectorAll('.fade').forEach(function (el, i) { el.style.setProperty('--d', (i * 90) + 'ms'); });
    });

    /* ---------- reveal on scroll ---------- */
    var targets = document.querySelectorAll('.fade, .bars, .meter, .race, .rings, [data-count]');
    if (!('IntersectionObserver' in window)) {
      revealAll();
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { fire(en.target); io.unobserve(en.target); } });
      }, { threshold: 0.18 });
      targets.forEach(function (el) {
        if (el.classList.contains('bars')) el.querySelectorAll('.bar__fill').forEach(function (b) { b.style.height = '0'; });
        io.observe(el);
      });
      /* safety net: reveal anything already in view shortly after load (covers IO timing / restored-tab cases) */
      window.addEventListener('load', function () {
        setTimeout(function () {
          document.querySelectorAll('.fade:not(.in), .bars:not(.in), .meter:not(.in), .race:not(.in), .rings:not(.in)').forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.95) fire(el);
          });
        }, 1000);
      });
    }

    /* ---------- cursor spotlight on cards ---------- */
    if (!reduce && window.matchMedia('(pointer:fine)').matches) {
      document.querySelectorAll('.card').forEach(function (card) {
        card.addEventListener('pointermove', function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
          card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
      });
    }
  } catch (err) {
    /* never leave content invisible if anything above throws */
    revealAll();
  }
})();
