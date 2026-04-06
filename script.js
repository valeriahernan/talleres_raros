// =========================
// SELECTORES BASE
// =========================
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");
const form = document.getElementById("subscribe-form");
const successMsg = document.getElementById("success-msg");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navList = nav ? nav.querySelector("ul") : null;
const galleryImages = document.querySelectorAll(".gallery-item");

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
const cursorText = document.querySelector(".cursor-text");

// =========================
// FADE-IN AL HACER SCROLL
// =========================
if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.12 });

    sections.forEach((section) => observer.observe(section));
}

// =========================
// MENÚ: SECCIÓN ACTIVA
// =========================
function updateActiveSection() {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveSection);
window.addEventListener("load", updateActiveSection);

// =========================
// FORMULARIO SUSCRIPCIÓN
// =========================
if (form && successMsg) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        successMsg.style.display = "block";
        form.reset();

        clearTimeout(window.successMsgTimeout);
        window.successMsgTimeout = setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);
    });
}

// =========================
// TOGGLE MENÚ MÓVIL
// =========================
if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("show");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navList.classList.remove("show");
        });
    });

    document.addEventListener("click", (e) => {
        const clickedInsideNav = nav.contains(e.target);
        const clickedMenuButton = menuToggle.contains(e.target);

        if (!clickedInsideNav && !clickedMenuButton) {
            navList.classList.remove("show");
        }
    });
}

// =========================
// PARALLAX SUAVE GALERÍA
// sin romper rotaciones del CSS
// =========================
if (galleryImages.length) {
    galleryImages.forEach((img) => {
        const computedTransform = window.getComputedStyle(img).transform;

        if (computedTransform && computedTransform !== "none") {
            img.dataset.baseTransform = computedTransform;
        } else {
            img.dataset.baseTransform = "";
        }
    });

    function updateGalleryParallax() {
        const scrollTop = window.scrollY;

        galleryImages.forEach((img, i) => {
            const speed = 0.008 + (i * 0.0015);
            const y = scrollTop * speed;
            const base = img.dataset.baseTransform || "";

            if (base) {
                img.style.transform = `${base} translateY(${y}px)`;
            } else {
                img.style.transform = `translateY(${y}px)`;
            }
        });
    }

    window.addEventListener("scroll", updateGalleryParallax);
    window.addEventListener("load", updateGalleryParallax);
}

// =========================
// CURSOR ANIMADO
// =========================
if (window.matchMedia("(pointer: fine)").matches && cursor && follower) {
    document.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;

        follower.style.left = `${x}px`;
        follower.style.top = `${y}px`;
    });

    // Hover general en links y botones
    document.querySelectorAll("a, button, #menu-toggle").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            follower.classList.add("hover");
        });

        el.addEventListener("mouseleave", () => {
            follower.classList.remove("hover");
        });
    });

    // Hero mode
    const hero = document.querySelector(".hero");

    if (hero) {
        hero.addEventListener("mouseenter", () => {
            cursor.classList.add("hero-mode");
            follower.classList.add("hero-mode");
        });

        hero.addEventListener("mouseleave", () => {
            cursor.classList.remove("hero-mode");
            follower.classList.remove("hero-mode");
        });
    }

    // Galería + VIEW
    document.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
            follower.classList.add("gallery-mode");
            if (cursorText) cursorText.textContent = "VIEW";
        });

        item.addEventListener("mouseleave", () => {
            follower.classList.remove("gallery-mode");
            if (cursorText) cursorText.textContent = "";
        });
    });

    // Efecto magnético más suave
    const magneticItems = document.querySelectorAll("a, button, .instagram-btn, #menu-toggle");

    magneticItems.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - itemCenterX) * 0.08;
            const deltaY = (e.clientY - itemCenterY) * 0.08;

            item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            follower.classList.add("magnetic");
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = "";
            follower.classList.remove("magnetic");
        });
    });

    // Ocultar cursor al salir de la ventana
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        follower.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
        follower.style.opacity = "1";
    });
}

    // Hover general en links y botones
    document.querySelectorAll("a, button, #menu-toggle").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            follower.classList.add("hover");
        });

        el.addEventListener("mouseleave", () => {
            follower.classList.remove("hover");
        });
    });

    // Hero mode
    const hero = document.querySelector(".hero");

    if (hero) {
        hero.addEventListener("mouseenter", () => {
            cursor.classList.add("hero-mode");
            follower.classList.add("hero-mode");
        });

        hero.addEventListener("mouseleave", () => {
            cursor.classList.remove("hero-mode");
            follower.classList.remove("hero-mode");
        });
    }

    // Galería + VIEW
    document.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
            follower.classList.add("gallery-mode");
            if (cursorText) cursorText.textContent = "VIEW";
            triggerGlitch();
        });

        item.addEventListener("mouseleave", () => {
            follower.classList.remove("gallery-mode");
            if (cursorText) cursorText.textContent = "";
        });
    });

    // Efecto magnético
    const magneticItems = document.querySelectorAll("a, button, .instagram-btn, #menu-toggle");

    magneticItems.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - itemCenterX) * 0.12;
            const deltaY = (e.clientY - itemCenterY) * 0.12;

            item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            follower.classList.add("magnetic");
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = "";
            follower.classList.remove("magnetic");
        });
    });

    // Glitch
    function triggerGlitch() {
        follower.classList.remove("glitch");
        void follower.offsetWidth;
        follower.classList.add("glitch");
    }

    document.querySelectorAll(".gallery-item, .hero h1, .logo").forEach((el) => {
        el.addEventListener("mouseenter", triggerGlitch);
    });

    // Ocultar cursor al salir de la ventana
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        follower.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
        follower.style.opacity = "1";
    });


    //resortes
    
    const floats = document.querySelectorAll(".float-img");

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    floats.forEach((el, i) => {
        const speed = (i + 1) * 0.3;
        el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});