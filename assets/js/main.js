/* =========================================================
   VEXTA · main.js
   ========================================================= */

(function () {
  'use strict';

  // ---------- Sticky header shadow on scroll ----------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile menu ----------
  const menuBtn = document.querySelector('.btn-menu');
  const mobileNav = document.querySelector('.nav-mobile');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---------- Fade-up on scroll (IntersectionObserver) ----------
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
  }

  // ---------- Form: AJAX submit via FormSubmit + local redirect ----------
  const form = document.querySelector('form[data-vexta-form]');
  if (form) {
    const showError = (group, msg) => {
      group.classList.add('error');
      const err = group.querySelector('.form-error');
      if (err && msg) err.textContent = msg;
    };
    const clearError = (group) => group.classList.remove('error');

    form.querySelectorAll('.form-input, .form-textarea').forEach((input) => {
      input.addEventListener('input', () => clearError(input.closest('.form-group')));
    });

    // Feedback slot for the "sending / error" line
    let feedback = form.querySelector('.form-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'form-feedback';
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');
      form.appendChild(feedback);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate
      let valid = true;
      form.querySelectorAll('[required]').forEach((field) => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          showError(group); valid = false;
        } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
          showError(group); valid = false;
        }
      });
      // Honeypot
      const honey = form.querySelector('[name="_honey"]');
      if (honey && honey.value) return;
      if (!valid) return;

      const submitBtn = form.querySelector('.form-submit');
      const originalHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add('is-loading'); }
      feedback.textContent = '';
      feedback.classList.remove('is-error');

      const thankYouUrl = form.dataset.thankYou || '/thank-you.html';
      const isUA = document.documentElement.lang === 'uk';

      try {
        // FormSubmit AJAX expects JSON
        const data = {};
        new FormData(form).forEach((v, k) => {
          if (!k.startsWith('_') || k === '_subject' || k === '_template') data[k] = v;
        });

        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          window.location.href = thankYouUrl;
        } else {
          throw new Error('submit-failed');
        }
      } catch (err) {
        feedback.textContent = isUA
          ? 'Щось пішло не так. Напишіть, будь ласка, у Telegram або email.'
          : 'Something went wrong. Please reach out via Telegram or email instead.';
        feedback.classList.add('is-error');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove('is-loading'); submitBtn.innerHTML = originalHTML; }
      }
    });
  }

  // ---------- Smooth-scroll for in-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
          }
        }
      }
    });
  });

  // ---------- Auto-close mobile menu on resize to desktop ----------
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
    }
  });

  // ---------- Current year in footer ----------
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Subtle mouse-parallax on hero chart ----------
  const heroChart = document.querySelector('.hero-chart');
  const heroSection = document.querySelector('.hero');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroChart && heroSection && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    let raf = null;
    heroSection.addEventListener('mousemove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroChart.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
        raf = null;
      });
    });
    heroSection.addEventListener('mouseleave', () => {
      heroChart.style.transform = '';
    });
  }
})();
