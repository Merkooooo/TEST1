document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');

    document.addEventListener('mousemove', (e) => {
        // Dot follows instantly
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';

        // Circle follows with slight delay
        cursorCircle.animate({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects for cursor
    const links = document.querySelectorAll('a, button, .status-bar-item, .bento-card, .project-row');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorCircle.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorCircle.style.borderColor = 'var(--accent-pink)';
        });
        link.addEventListener('mouseleave', () => {
            cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorCircle.style.borderColor = 'var(--accent-green)';
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Highlight active in sidebar
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            if (this.classList.contains('nav-item')) {
                this.classList.add('active');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Project Filtering ---
    const filterButtons = document.querySelectorAll('.status-bar-item');
    const projectRows = document.querySelectorAll('.project-row');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectRows.forEach(row => {
                const category = row.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    row.style.display = 'flex';
                    // Reset animation
                    row.style.animation = 'none';
                    row.offsetHeight; /* trigger reflow */
                    row.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Fade-in effect for sections
    const hiddenElements = document.querySelectorAll('.bento-card, .contact-terminal, .project-row');
    hiddenElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

});

// --- Glitch Text Effect (Random characters on hover) ---
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const glitchTexts = document.querySelectorAll('.glitch');

glitchTexts.forEach(text => {
    text.addEventListener('mouseover', event => {
        let iterations = 0;
        const originalText = event.target.dataset.text;

        const interval = setInterval(() => {
            event.target.innerText = originalText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)]
                })
                .join("");

            if (iterations >= originalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);
    });
});
