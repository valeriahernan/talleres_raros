// Fade-in al hacer scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); } });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// Menú que resalta la sección visible
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => { link.classList.remove('active'); if(link.getAttribute('href') === '#' + current) link.classList.add('active'); });
});

// Formulario suscripción (solo efecto visual)
const form = document.getElementById('subscribe-form');
const successMsg = document.getElementById('success-msg');
form.addEventListener('submit', e => { e.preventDefault(); successMsg.style.display = 'block'; form.reset(); });

// Toggle menú móvil
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => { nav.querySelector('ul').classList.toggle('show'); });