/* ===================================
   PREMIUM WEBSITE INTERACTIVITY
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. SCROLL REVEAL ANIMATION (Intersection Observer) */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* 2. STICKY NAVBAR BACKGROUND */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    /* 3. MOBILE MENU TOGGLE (If applicable) */
    // Placeholder for mobile menu logic if HTML structure supports it
    // const menuBtn = document.querySelector('.mobile-menu-btn');
    // const navLinks = document.querySelector('.nav-links');
    // if(menuBtn) {
    //     menuBtn.addEventListener('click', () => {
    //         navLinks.classList.toggle('active');
    //     });
    // }


    /* 4. SMOOTH SCROLL FOR ANCHOR LINKS */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
