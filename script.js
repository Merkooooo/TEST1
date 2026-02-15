/* ===================================
   PREMIUM WEBSITE INTERACTIVITY
   Features: Page Transitions, Scroll Reveal, Navbar, Mobile Menu, Filtering, Search
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Page Transition */
    const transitionOverlay = document.getElementById('page-transition');
    const internalLinks = document.querySelectorAll('a[href$=".html"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !link.target) {
                // Ignore if it's the same page
                const currentPath = window.location.pathname.split('/').pop() || 'index.html';
                if (href === currentPath) return;

                e.preventDefault();
                if (transitionOverlay) {
                    transitionOverlay.classList.add('active');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 400);
                }
            }
        });
    });

    /* 2. Scroll Reveal Animation */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* 3. Sticky Navbar */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* 4. Mobile Menu Toggle */
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');

            // Animate hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('open')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    /* 5. Smooth Scroll for Anchor Links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* 6. Product Filtering (rekuperacija.html) */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0 && document.getElementById('productGrid')) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* 7. Blog Search & Filtering (prispevki.html) */
    const blogSearch = document.getElementById('blogSearch');
    const blogCards = document.querySelectorAll('.blog-card');
    const blogFilterBtns = document.querySelectorAll('.blog-controls .filter-btn');

    if (blogCards.length > 0) {
        const updateBlogItems = () => {
            const searchTerm = blogSearch ? blogSearch.value.toLowerCase() : '';
            const activeFilter = document.querySelector('.blog-controls .filter-btn.active')?.getAttribute('data-category') || 'all';

            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const text = card.querySelector('p').textContent.toLowerCase();
                const category = card.getAttribute('data-category');

                const matchesSearch = title.includes(searchTerm) || text.includes(searchTerm);
                const matchesFilter = activeFilter === 'all' || activeFilter === category;

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        if (blogSearch) {
            blogSearch.addEventListener('input', updateBlogItems);
        }

        if (blogFilterBtns.length > 0) {
            blogFilterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    blogFilterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    updateBlogItems();
                });
            });
        }
    }

    // --- ACCORDION FUNCTIONALITY ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const icon = header.querySelector('.accordion-toggle i');

            // Toggle active class on item
            const isActive = item.classList.toggle('active');

            // Toggle icon
            if (icon) {
                icon.className = isActive ? 'fas fa-minus' : 'fas fa-plus';
            }

            // Optional: Close other accordions
            document.querySelectorAll('.accordion-item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherIcon = other.querySelector('.accordion-toggle i');
                    if (otherIcon) otherIcon.className = 'fas fa-plus';
                }
            });
        });
    });
});

