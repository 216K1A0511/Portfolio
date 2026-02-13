/**
 * Portfolio Interactive Logic
 * Features: Mobile Menu, Scroll Reveal, Navbar Blur, Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');

        // Toggle hamburger span animations (optional enhancement)
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(s => s.style.transform = 'none');
            spans[1].style.opacity = '1';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('open');
            hamburger.querySelectorAll('span').forEach(s => {
                s.style.transform = 'none';
                s.style.opacity = '1';
            });
        });
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Navbar Sticky Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. Form Submission Handling (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            // Visual feedback
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                btn.style.background = '#10b981'; // Success color
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // 5. Active Link Highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-link'); // You can add custom style for this in CSS
            } else {
                link.classList.remove('active-link');
            }
        });
    });
});
