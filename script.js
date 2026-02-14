// ===================================
// PREMIUM INTERACTIVE FEATURES
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Systems
    ThemeManager.init();
    SoundManager.init();
    AnimationManager.init();

    // Initialize Components
    initMobileMenu();
    initContactForm();
    initSmoothScrolling();
    updateActiveNavigation();
});

// ===================================
// THEME MANAGER
// ===================================
const ThemeManager = (() => {
    const init = () => {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);

            // Interaction feedback
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => themeToggle.style.transform = '', 150);

            // Play sound if enabled
            SoundManager.play('click');
        });
    };

    return { init };
})();

// ===================================
// SOUND MANAGER
// ===================================
const SoundManager = (() => {
    let enabled = false;
    const sounds = {};

    const init = () => {
        const toggle = document.getElementById('soundToggle');
        const saved = localStorage.getItem('soundEnabled') === 'true';

        enabled = saved;
        if (toggle) {
            toggle.checked = enabled;
            toggle.addEventListener('change', (e) => {
                enabled = e.target.checked;
                localStorage.setItem('soundEnabled', enabled);
            });
        }

        // Preload subtle interface sounds
        // Using common UI sounds or placeholders
        sounds.click = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // Subtle click
        sounds.hover = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'); // Muffled blip
        sounds.success = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'); // Success chime

        Object.values(sounds).forEach(s => {
            s.volume = 0.15;
            s.preload = 'auto';
        });
    };

    const play = (name) => {
        if (!enabled || !sounds[name]) return;
        const s = sounds[name].cloneNode();
        s.volume = 0.15;
        s.play().catch(() => { }); // Catch browser autoplay restrictions
    };

    return { init, play };
})();

// ===================================
// ANIMATION MANAGER (Scroll Reveal & Ripples)
// ===================================
const AnimationManager = (() => {
    const init = () => {
        initScrollReveal();
        initRippleEffect();
    };

    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: play subtle sound on reveal
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    };

    const initRippleEffect = () => {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                const x = e.clientX - e.target.offsetLeft;
                const y = e.clientY - e.target.offsetTop;

                const ripple = document.createElement('span');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple-effect');

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);

                SoundManager.play('click');
            });
        });
    };

    return { init };
})();

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
        SoundManager.play('click');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// ===================================
// CONTACT FORM
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        // If it's the Formspree form, we let it submit but play success feedback
        SoundManager.play('success');

        // Custom feedback logic if not redirecting immediately
        if (form.getAttribute('action').includes('YOUR_FORM_ID')) {
            e.preventDefault();
            alert('Prosimo, vstavite svoj Formspree ID v contact.html!');
        }
    });
}

// ===================================
// NAVIGATION UTILS
// ===================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function updateActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        link.classList.remove('active');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}
