// Place this file in your project's root and link it in each HTML page
let lastScrollY = window.pageYOffset;
const nav = document.querySelector('nav');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  const currentScrollY = window.pageYOffset;
  if (currentScrollY > lastScrollY && currentScrollY > 100) nav.classList.add('nav-hidden');
  else nav.classList.remove('nav-hidden');
  if (currentScrollY > 200) scrollTopBtn.classList.add('show');
  else scrollTopBtn.classList.remove('show');
  lastScrollY = currentScrollY;
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));