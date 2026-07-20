/*==================================================
TALLERES RAROS
script.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    MENU MÓVIL
    =========================================*/

    const menuBtn = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".sidebar");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");
            menuBtn.classList.toggle("active");

        });

        document.querySelectorAll(".sidebar a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuBtn.classList.remove("active");

            });

        });

    }

    /*=========================================
    SCROLL SUAVE
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

    /*=========================================
    GSAP
    =========================================*/

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
        ignoreMobileResize: true
    });

    /*=========================================
    REVEAL GENERAL
    =========================================*/

    gsap.utils.toArray(".reveal").forEach(el => {

        gsap.from(el, {

            opacity: 0,
            y: 60,
            duration: 1.1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }

        });

    });

    /*=========================================
    HERO
    =========================================*/

    const heroTitle = document.querySelector(".hero h1");

    if (heroTitle) {

        gsap.from(heroTitle, {

            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: "power3.out"

        });

    }

    const heroText = document.querySelector(".hero p");

    if (heroText) {

        gsap.from(heroText, {

            opacity: 0,
            y: 40,
            delay: .25,
            duration: 1,
            ease: "power3.out"

        });

    }

        /*=========================================
    PANEL SCROLL (Desktop)
    =========================================*/

    const panels = gsap.utils.toArray(".panel");

    if (panels.length > 1 && window.innerWidth > 991) {

        panels.forEach((panel, index) => {

            gsap.set(panel, {
                zIndex: panels.length - index
            });

            if (index < panels.length - 1) {

                ScrollTrigger.create({

                    trigger: panel,

                    start: "top top",

                    end: "bottom top",

                    pin: true,

                    pinSpacing: false,

                    scrub: true,

                    invalidateOnRefresh: true

                });

            }

        });

    }

    /*=========================================
    PARALLAX IMÁGENES
    =========================================*/

    gsap.utils.toArray(".panel img").forEach(img => {

        gsap.fromTo(

            img,

            {
                y: -60,
                scale: 1.08
            },

            {
                y: 60,
                scale: 1,

                ease: "none",

                scrollTrigger: {

                    trigger: img,

                    start: "top bottom",

                    end: "bottom top",

                    scrub: true

                }

            }

        );

    });

    /*=========================================
    TEXTO PANEL
    =========================================*/

    gsap.utils.toArray(".panel-content").forEach(content => {

        gsap.from(content, {

            opacity: 0,

            y: 80,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: content,

                start: "top 80%",

                toggleActions: "play none none reverse"

            }

        });

    });

    /*=========================================
    BOTONES
    =========================================*/

    gsap.utils.toArray(".btn").forEach(btn => {

        btn.addEventListener("mouseenter", () => {

            gsap.to(btn, {

                scale: 1.05,

                duration: .25,

                ease: "power2.out"

            });

        });

        btn.addEventListener("mouseleave", () => {

            gsap.to(btn, {

                scale: 1,

                duration: .25,

                ease: "power2.out"

            });

        });

    });

        /*=========================================
    MODELO 3D
    =========================================*/

    const modelViewer = document.querySelector("model-viewer");

    if (modelViewer) {

        modelViewer.addEventListener("load", () => {

            gsap.from(modelViewer, {

                opacity: 0,
                scale: .9,
                duration: 1.4,
                ease: "power3.out"

            });

        });

    }

    /*=========================================
    CURSOR LUMINOSO (opcional)
    =========================================*/

    const cursor = document.querySelector(".cursor-glow");

    if (cursor) {

        window.addEventListener("mousemove", (e) => {

            gsap.to(cursor, {

                x: e.clientX,
                y: e.clientY,
                duration: .25,
                ease: "power2.out"

            });

        });

    }

    /*=========================================
    REFRESH GSAP
    =========================================*/

    window.addEventListener("load", () => {

        ScrollTrigger.refresh();

    });

    window.addEventListener("resize", () => {

        ScrollTrigger.refresh();

    });

});

