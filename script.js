// ===========================
// ĐẠT MOBILE – script.js
// ===========================

// ----- DATA -----
const pinStandard = [
  ["6G", 133], ["6S", 133], ["6P", 156], ["6SP", 156],
  ["7G", 140], ["7P", 159], ["8G", 140], ["8P", 159],
  ["X", 190], ["XR", 174], ["XS", 206], ["XS Max", 209],
  ["11", 188], ["11 Pro", 232], ["11 Pro Max", 250],
  ["SE2", 165], ["12 Mini", 181], ["12 / 12 Pro", 188],
  ["12 Pro Max", 244], ["13", 193], ["13 Pro", 244],
  ["13 Pro Max", 275], ["14", 244], ["14 Plus", 269],
  ["14 Pro", 310], ["14 Pro Max", 338],
  ["15", 244], ["15 Plus", 269], ["15 Pro", 315], ["15 Pro Max", 359]
];

const pinCao = [
  ["11 Pro Max", 300], ["12 / 12 Pro", 270], ["12 Pro Max", 320],
  ["13 Pro Max", 350], ["14 Pro Max", 395]
];

const pinChanDoan = [
  ["12 / 12 Pro", 280], ["12 Pro Max", 350],
  ["13", 290], ["13 Pro", 355], ["13 Pro Max", 380],
  ["14 Pro", 375], ["14 Pro Max", 395]
];

const manDat = [
  ["X Incell GX", 323], ["XS Incell GX", 324], ["XS Max Incell GX", 356],
  ["11 GX (dời IC)", 327], ["11 Pro Incell HL", 353], ["11 Pro Max", 370],
  ["12 / 12 Pro Incell GX", 382], ["12 Pro Max Incell HL", 393],
  ["13 Pro Incell GX", 425], ["13 Pro Max Incell HL", 509],
  ["15 Plus Incell GX", 450], ["15 Pro Incell GX", 450],
  ["16 Incell GX", 460], ["6S Plus HD+", 239],
  ["7 Plus HD+", 239], ["8 Plus HD+", 239]
];

const manTiger = [
  ["XS Max HD+", 350], ["11 Pro HD+", 355], ["11 Pro Max HD+", 375],
  ["12 / 12 Pro HD+", 380], ["13 HD+", 405], ["13 Pro HD+", null],
  ["13 Pro Max HD+", 430], ["14", null], ["14 Pro HD+ 120Hz", 480],
  ["14 Pro Max HD+ 120Hz", 520], ["14 Plus HD+", 470]
];

// ----- RENDER TABLE -----
function renderTable(bodyId, data) {
  const tbody = document.getElementById(bodyId);
  if (!tbody) return;
  tbody.innerHTML = data.map(([name, price]) => `
    <tr>
      <td><strong style="color:var(--white)">${name}</strong></td>
      <td>${price ? `<span class="price-badge">${price}K</span>` : '<span style="color:var(--text-muted)">Liên hệ</span>'}</td>
      <td><a href="tel:0933424434" class="contact-quick-btn"><i class="fas fa-phone-alt"></i> Hỏi giá</a></td>
    </tr>
  `).join('');
}

function initTables() {
  renderTable('pinStandardBody', pinStandard);
  renderTable('pinCaoBody', pinCao);
  renderTable('pinChanDoanBody', pinChanDoan);
  renderTable('manDatBody', manDat);
  renderTable('manTigerBody', manTiger);
}

// ----- TABS -----
function showTab(id) {
  // Find all tab-content siblings in same section
  const target = document.getElementById(id);
  if (!target) return;
  const section = target.closest('.price-section, .bg-alt, .section');
  const allContents = section ? section.querySelectorAll('.tab-content') : document.querySelectorAll('.tab-content');
  const allBtns = section ? section.querySelectorAll('.tab-btn') : document.querySelectorAll('.tab-btn');

  allContents.forEach(c => c.classList.remove('active'));
  allBtns.forEach(b => {
    const onclick = b.getAttribute('onclick') || '';
    if (onclick.includes(id)) b.classList.add('active');
    else b.classList.remove('active');
  });
  target.classList.add('active');
}

// ----- STICKY HEADER -----
function initStickyHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ----- BACK TO TOP -----
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ----- MOBILE NAV -----
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.className = nav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
  });
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.querySelector('i').className = 'fas fa-bars';
    });
  });
}

// ----- ACTIVE NAV ON SCROLL -----
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }, { passive: true });
}

// ----- SMOOTH CARD REVEAL -----
function initReveal() {
  const cards = document.querySelectorAll('.service-card, .acc-card, .contact-card, .why-item, .gallery-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(card);
  });
}

// ----- NUMBER COUNTER ANIMATION -----
function animateCounter(el, target) {
  let start = 0;
  const duration = 1500;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + (el.dataset.suffix || '');
    if (start >= target) clearInterval(timer);
  }, 16);
}

function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        if (!isNaN(num) && num > 1) {
          el.dataset.suffix = text.replace(/\d/g, '').replace('+', '') ? text.replace(/^\d+/, '') : '+';
          animateCounter(el, num);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => observer.observe(s));
}

// ----- INIT -----
document.addEventListener('DOMContentLoaded', () => {
  initTables();
  initStickyHeader();
  initBackToTop();
  initMobileNav();
  initNavHighlight();
  initReveal();
  initCounters();
  console.log('🍎 Đạt Mobile Website – Ready!');
});
