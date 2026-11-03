// =========================================
// ORDER MURATINA DRINK — app.js (used by every page)
// =========================================

// Your WhatsApp number (0710953452) in international form: 254 + number without the 0
const WHATSAPP_LINK = 'https://wa.me/254710953452';

// =========================================
// OPEN WHATSAPP WITH A READY MESSAGE
// =========================================
function orderNow(msg) {
  window.open(WHATSAPP_LINK + '?text=' + encodeURIComponent(msg), '_blank');
}

// =========================================
// SLIDESHOW (Home page only — changes every 3 seconds)
// =========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

if (slides.length > 1) {
  setInterval(() => goToSlide((currentSlide + 1) % slides.length), 3000);
}

// =========================================
// HAMBURGER MENU
// =========================================
(function menu() {
  const btn = document.getElementById('menuBtn');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerClose');
  if (!btn || !drawer || !overlay) return;

  function setOpen(open) {
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('no-scroll', open);
    if (open && closeBtn) closeBtn.focus();
  }

  btn.addEventListener('click', () => setOpen(true));
  if (closeBtn) closeBtn.addEventListener('click', () => { setOpen(false); btn.focus(); });
  overlay.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) { setOpen(false); btn.focus(); }
  });

  // the menu closes as soon as any menu link is tapped (also the link of the page you are on)
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  // coming back with the Back button must never show the menu open
  window.addEventListener('pageshow', () => setOpen(false));

  // highlight the page you are on (works with index.html, products.html, or the same pages without .html)
  const seg = location.pathname.split('/').pop().toLowerCase().replace(/\.html$/, '');
  const here = (seg === '' || seg === 'index') ? 'index' : seg;
  drawer.querySelectorAll('a[data-page]').forEach((a) => {
    const on = a.getAttribute('data-page').toLowerCase().replace(/\.html$/, '') === here;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
})();
