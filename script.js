// script.js completo: menú, año, scroll suave, observer y carrusel
document.addEventListener('DOMContentLoaded', () => {
    // Año
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // Menú móvil
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
    }
  
    // Scroll suave para botones con data-target
    document.querySelectorAll('[data-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sel = btn.getAttribute('data-target');
        const target = document.querySelector(sel);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  
    // Back to top
    const backBtn = document.getElementById('backBtn');
    if (backBtn) backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  
    // Intersection observer para animar elementos al entrar en pantalla
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.12 });
  
    document.querySelectorAll('.card, .event-slot, .photo-placeholder, .church-photo').forEach(el => observer.observe(el));
  
    // --- Carrusel funcional (muestra 1 slide por vista) ---
    const track = document.querySelector('.carousel-track');
    if (track) {
      const slides = Array.from(track.children);
      const prevBtn = document.querySelector('.carousel-btn.prev');
      const nextBtn = document.querySelector('.carousel-btn.next');
      let index = 0;
      // gap (en px) debe coincidir con CSS gap (16px)
      const GAP = 16;
  
      function updateCarousel() {
        if (!slides.length) return;
        // ancho del primer slide (incluye padding / border); como gap está fuera del slide, lo sumamos
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * (slideWidth + GAP)}px)`;
      }
  
      // handlers seguros (si botones existen)
      if (nextBtn) nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateCarousel();
      });
      if (prevBtn) prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
      });
  
      // autoplay (opcional)
      let autoplay = setInterval(() => {
        index = (index + 1) % slides.length;
        updateCarousel();
      }, 5000);
  
      // pause on hover
      const container = track.closest('.carousel-container');
      if (container) {
        container.addEventListener('mouseenter', () => clearInterval(autoplay));
        container.addEventListener('mouseleave', () => {
          autoplay = setInterval(() => {
            index = (index + 1) % slides.length;
            updateCarousel();
          }, 5000);
        });
      }
  
      // responsive recalc
      window.addEventListener('resize', updateCarousel);
      // inicial
      setTimeout(updateCarousel, 100);
    }
  });
  
