// Initialize GSAP & Plugins
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Scroll-Aware Navbar
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Page Loader Hiding
    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");
        setTimeout(() => {
            loader.classList.add("hidden");
            triggerHeroAnimations();
        }, 1200);
    });

    // 3. Custom Cursor Logic
    const cursorOuter = document.querySelector(".cursor-outer");
    const cursorInner = document.querySelector(".cursor-inner");

    if (cursorOuter && cursorInner) {
        document.addEventListener("mousemove", (e) => {
            gsap.to(cursorOuter, {
                x: e.clientX - 22,
                y: e.clientY - 22,
                duration: 0.5,
                ease: "power2.out"
            });
            gsap.to(cursorInner, {
                x: e.clientX - 3,
                y: e.clientY - 3,
                duration: 0.1
            });
        });

        const interactables = document.querySelectorAll("a, button, .project-card, .skill-card, .stat-card, .social-btn, .contact-tile");
        interactables.forEach(item => {
            item.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
            item.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
        });
    }

    // 4. Hero Staggered Reveal
    function triggerHeroAnimations() {
        gsap.from(".hero-text h1, .hero-text p, .hero-text .cta-buttons", {
            y: 50,
            opacity: 0,
            duration: 1.4,
            stagger: 0.2,
            ease: "power4.out"
        });
        gsap.from(".badge", {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        });
    }

    // 5. Magnetic Effect for Interactive Elements
    const magneticElements = document.querySelectorAll(".btn, .logo, .nav-links a, .social-btn");
    magneticElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        el.addEventListener("mouseleave", () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    // 6. 3D Tilt Effect for Project Cards
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.4)"
            });
        });
    });

    // 7. Scroll Reveal Animations
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // 8. Mobile Menu Logic (Simple fallback for floating nav)
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }
});
