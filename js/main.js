// ===================== Header scroll state =====================
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===================== Mobile nav =====================
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const closeNav = () => {
  nav.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
};
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.classList.toggle('active', open);
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));

// ===================== Scroll reveal =====================
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // subtle stagger for grouped items
          entry.target.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// ===================== Contact form (front-end demo) =====================
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  if (!name || !email) {
    note.style.color = '#a9871c';
    note.textContent = 'Please add your name and email so we can reply.';
    return;
  }
  note.style.color = '';
  note.textContent = `Thanks, ${name.split(' ')[0]} — your enquiry has been noted. We'll be in touch shortly.`;
  form.reset();
});

// ===================== Footer year =====================
document.getElementById('year').textContent = new Date().getFullYear();
