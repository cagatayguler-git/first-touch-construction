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

// ===================== Contact form =====================
// Submitted to Web3Forms over fetch so the visitor stays on the page.
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const submitBtn = form.querySelector('button[type="submit"]');

const setNote = (message, tone) => {
  note.textContent = message;
  note.style.color = tone === 'warn' ? 'var(--gold-dark)' : tone === 'error' ? '#b4342a' : '';
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  // NB: use form.elements — form.name resolves to the form's own name attribute, not the input.
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();

  if (!name || !email) {
    setNote('Please add your name and email so we can reply.', 'warn');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setNote('That email address looks incomplete — could you check it?', 'warn');
    return;
  }

  const label = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  setNote('Sending your enquiry…');

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) throw new Error(data.message || `Web3Forms responded ${res.status}`);

    setNote(`Thanks, ${name.split(' ')[0]} — your enquiry is on its way. We'll be in touch shortly.`);
    form.reset();
  } catch (err) {
    console.error('Enquiry submission failed:', err);
    setNote('Sorry, we could not send that. Please email kutay@firsttouchconstruction.co.uk or call 07743 516554.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = label;
  }
});

// ===================== Footer year =====================
document.getElementById('year').textContent = new Date().getFullYear();
