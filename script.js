/* ===================================
   KINETIC TYPOGRAPHY PORTFOLIO
   Advanced Text Animations
   =================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. HERO TITLE CHARACTER ANIMATION
    // ============================================

    function splitTextToChars() {
        const heroTitle = document.querySelector('.hero-title[data-animate="kinetic"]');
        if (!heroTitle) return;

        const lines = heroTitle.querySelectorAll('.line');

        lines.forEach((line, lineIndex) => {
            const text = line.textContent;
            line.textContent = '';

            // Split text into characters
            text.split('').forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces

                // Calculate stagger delay
                const totalDelay = (lineIndex * 100) + (charIndex * 30);
                span.style.animationDelay = `${totalDelay}ms`;

                line.appendChild(span);
            });
        });
    }

    function animateHeroTitle() {
        const chars = document.querySelectorAll('.hero-title .char');

        // Trigger animation by adding class
        chars.forEach(char => {
            char.classList.add('animate');
        });

        // Animate subtitle after title completes
        const subtitle = document.querySelector('.hero-subtitle[data-animate="fade-up"]');
        if (subtitle) {
            setTimeout(() => {
                subtitle.classList.add('animated');
            }, 1200); // Delay until most of title is visible
        }
    }

    // Initialize hero animation
    splitTextToChars();
    setTimeout(animateHeroTitle, 300); // Small delay for dramatic effect


    // ============================================
    // 2. SCROLL-TRIGGERED ANIMATIONS
    // ============================================

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;

                setTimeout(() => {
                    element.classList.add('animated');
                }, parseInt(delay));

                // Unobserve after animating (animate once)
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animate="fade-in"], [data-animate="fade-up"]');
    animatedElements.forEach(el => observer.observe(el));


    // ============================================
    // 3. EMAIL GLITCH EFFECT SETUP
    // ============================================

    const emailLink = document.querySelector('.email-link[data-animate="glitch"]');
    if (emailLink) {
        const emailText = emailLink.textContent;
        emailLink.setAttribute('data-text', emailText);
    }


    // ============================================
    // 4. SMOOTH SCROLL FOR NAVIGATION
    // ============================================

    const navLinks = document.querySelectorAll('.nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ============================================
    // 5. CUSTOM CURSOR (OPTIONAL ENHANCEMENT)
    // ============================================

    // Uncomment below to add a custom cursor effect
    /*
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add cursor hover effect on links
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    */


    // ============================================
    // 6. TEXT SCRAMBLE EFFECT (OPTIONAL)
    // ============================================

    // Uncomment to add scramble effect to section titles
    /*
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += char;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;

            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Apply scramble to section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    const scrambleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fx = new TextScramble(entry.target);
                fx.setText(entry.target.textContent);
                scrambleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => scrambleObserver.observe(title));
    */


    // ============================================
    // 7. PERFORMANCE: REDUCE MOTION PREFERENCE
    // ============================================

    // Respect user's reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for accessibility
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('animated');
            el.style.animation = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });

        document.querySelectorAll('.char').forEach(char => {
            char.style.animation = 'none';
            char.style.opacity = '1';
            char.style.transform = 'none';
        });
    }


    // Console signature
    console.log('%c Vyacheslav ', 'background: #000; color: #fff; padding: 4px 8px; font-family: monospace;');
    console.log('%c AI Product Manager ', 'background: #fff; color: #000; padding: 4px 8px; font-family: monospace; border: 1px solid #000;');

});


// ============================================
// 8. PAGE LOAD COMPLETE
// ============================================

window.addEventListener('load', function() {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Optional: Add page transition
    document.body.style.opacity = '1';
});
