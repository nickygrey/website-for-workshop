/* ===================================
   MODERN PORTFOLIO
   Subtle Motion & Interactions
   =================================== */

// ============================================
// 1. PAGE LOAD STAGGERED ANIMATIONS
// ============================================

function initPageLoadAnimations() {
    // Trigger animations after brief delay for impact
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.animate-on-load');
        animatedElements.forEach(element => {
            element.classList.add('loaded');
        });
    }, 100);
}

// ============================================
// 2. CURTAIN LIFT SCROLL REVEALS
// ============================================

function initCurtainReveal() {
    const revealElements = document.querySelectorAll('.reveal-curtain');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Slight stagger for multiple elements in same section
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);

                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ============================================
// 3. PARALLAX SCROLL EFFECTS
// ============================================

function initParallax() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleParallax() {
    const scrolled = window.pageYOffset;

    // Parallax on hero
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const heroRect = hero.getBoundingClientRect();
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            const heroOffset = scrolled * 0.3;
            hero.style.transform = `translateY(${heroOffset}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }

    // Subtle parallax on sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
            const offset = (scrollPercent - 0.5) * 20;
            section.style.transform = `translateY(${-offset}px)`;
        }
    });
}

// ============================================
// 4. SMOOTH SCROLL NAVIGATION
// ============================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#hero' || targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 5. NAVIGATION HIDE/SHOW ON SCROLL
// ============================================

function initNavBehavior() {
    let lastScroll = 0;
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// 6. CARD HOVER ENHANCEMENTS
// ============================================

function initCardEnhancements() {
    const cards = document.querySelectorAll('.project-card, .content-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;

            // Subtle tilt on hover
            const tiltX = percentY * 2;
            const tiltY = percentX * -2;

            this.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// ============================================
// 7. BUTTON SPRING ANIMATION
// ============================================

function initButtonSpring() {
    const buttons = document.querySelectorAll('.cta-button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
        });
    });
}

// ============================================
// 8. MESH GRADIENT INTERACTIVE MOVEMENT
// ============================================

function initMeshInteraction() {
    const mesh = document.querySelector('.mesh-gradient');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });

    function updateMesh() {
        if (mesh) {
            const offsetX = mouseX * 0.1;
            const offsetY = mouseY * 0.1;
            mesh.style.backgroundPosition = `${offsetX}% ${offsetY}%`;
        }
        requestAnimationFrame(updateMesh);
    }

    updateMesh();
}

// ============================================
// 9. LAZY LOAD OPTIMIZATION
// ============================================

function initLazyLoad() {
    // Prepare for images when added
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 10. INITIALIZE ALL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Initialize all animations and interactions
        initPageLoadAnimations();
        initCurtainReveal();
        initParallax();
        initNavBehavior();
        initCardEnhancements();
        initButtonSpring();
        initMeshInteraction();
    } else {
        // For users who prefer reduced motion, still show content
        const animatedElements = document.querySelectorAll('.animate-on-load, .reveal-curtain');
        animatedElements.forEach(element => {
            element.classList.add('loaded', 'revealed');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }

    // Initialize smooth scroll (works regardless of motion preference)
    initSmoothScroll();
    initLazyLoad();

    // Console signature
    console.log('%c VP ', 'background: #000; color: #fff; padding: 12px 20px; font-family: monospace; font-size: 20px; font-weight: bold;');
    console.log('%c Vyacheslav Plotnikov — AI Product Manager ', 'background: #fff; color: #000; padding: 8px 16px; font-family: monospace; border: 1px solid #000;');
});

// ============================================
// 11. PERFORMANCE MONITORING
// ============================================

// Pause animations when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any position-dependent elements
        handleParallax();
    }, 250);
});
