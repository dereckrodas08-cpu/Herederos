// Script completo con animaciones, scroll suave y menú móvil
document.addEventListener('DOMContentLoaded', () => {

    // Año en footer
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // Menú móvil
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });
  
    // Navegación suave y animación de aparición
    document.querySelectorAll('[data-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.querySelector(btn.getAttribute('data-target'));
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
          target.classList.add('reveal');
          setTimeout(()=>target.classList.remove('reveal'), 900);
        }
      });
    });
  
    // Volver arriba
    const backBtn = document.getElementById('backBtn');
    if(backBtn){
      backBtn.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
    }
  
    // Animación de aparición al hacer scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
        }
      });
    }, {threshold:0.12});
    document.querySelectorAll('.card, .event, .photo-placeholder, .church-photo').forEach(el => observer.observe(el));
  
  });
  