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
// 5. SCROLL PROGRESS INDICATOR
// ============================================

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// 6. NAVIGATION HIDE/SHOW ON SCROLL
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
// 7. CARD HOVER ENHANCEMENTS
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
// 8. MAGNETIC BUTTON EFFECT
// ============================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .nav-logo, .nav-links a, .footer-social a');
    const magneticStrength = 0.35; // How much the element moves (0-1)
    const magneticRadius = 80; // Pixel radius of magnetic effect

    buttons.forEach(button => {
        button.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < magneticRadius) {
                const pull = (magneticRadius - distance) / magneticRadius;
                const moveX = deltaX * magneticStrength * pull;
                const moveY = deltaY * magneticStrength * pull;

                this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            }
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Legacy alias
function initButtonSpring() {
    initMagneticButtons();
}

// ============================================
// 9. MESH GRADIENT INTERACTIVE MOVEMENT
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
// 10. ANIMATED COUNTER NUMBERS
// ============================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.metric-number');
    const duration = 2000; // 2 seconds

    const animateCounter = (counter) => {
        const target = counter.textContent.trim();

        // Handle special cases
        if (target === '∞') {
            // Animate infinity symbol with rotation
            counter.style.display = 'inline-block';
            counter.style.animation = 'infinityPulse 2s ease-in-out';
            return;
        }

        // Extract number and suffix
        const hasPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

        if (isNaN(numericValue)) return;

        const startTime = performance.now();
        const suffix = hasPlus ? '+' : '';

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * numericValue);

            counter.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target; // Ensure final value is exact
            }
        };

        requestAnimationFrame(animate);
    };

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                setTimeout(() => animateCounter(entry.target), 200);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

// ============================================
// 11. NEURAL NETWORK VISUALIZATION
// ============================================

function initNeuralNetwork() {
    const canvas = document.getElementById('neuralNetwork');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration - cleaner, less noisy
    const config = {
        nodeCount: 30,
        connectionDistance: 220,
        mouseInfluence: 180,
        nodeSpeed: 0.5,
        minNodeSize: 2,
        maxNodeSize: 4,
        connectionOpacity: 0.15,
        particleCount: 8
    };

    let mouse = { x: null, y: null, radius: config.mouseInfluence };
    let nodes = [];
    let particles = [];
    let time = 0;

    // Node class with pulsing animation
    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.nodeSpeed;
            this.vy = (Math.random() - 0.5) * config.nodeSpeed;
            this.baseRadius = config.minNodeSize + Math.random() * (config.maxNodeSize - config.minNodeSize);
            this.radius = this.baseRadius;
            this.pulseOffset = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.02 + Math.random() * 0.02;
            this.brightness = 0.5 + Math.random() * 0.5;
        }

        update() {
            // Bounce off walls with energy
            if (this.x < 0 || this.x > width) {
                this.vx *= -1;
                this.x = Math.max(0, Math.min(width, this.x));
            }
            if (this.y < 0 || this.y > height) {
                this.vy *= -1;
                this.y = Math.max(0, Math.min(height, this.y));
            }

            // Mouse interaction - stronger repulsion
            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.vx -= Math.cos(angle) * force * 0.3;
                    this.vy -= Math.sin(angle) * force * 0.3;
                }
            }

            // Apply velocity with less damping for more movement
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.98;
            this.vy *= 0.98;

            // Add some random jitter for organic movement
            this.vx += (Math.random() - 0.5) * 0.02;
            this.vy += (Math.random() - 0.5) * 0.02;

            // Limit velocity
            const maxSpeed = 2;
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }

            // Pulsing animation
            this.radius = this.baseRadius + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.5;
        }

        draw() {
            // Main node - cleaner, less glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 102, 255, ${this.brightness * 0.8})`;
            ctx.fill();

            // Single subtle glow
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius * 3
            );
            gradient.addColorStop(0, `rgba(0, 102, 255, ${0.3 * this.brightness})`);
            gradient.addColorStop(0.7, `rgba(0, 102, 255, ${0.1 * this.brightness})`);
            gradient.addColorStop(1, 'rgba(0, 102, 255, 0)');

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    // Data particle that flows along connections
    class DataParticle {
        constructor() {
            this.reset();
        }

        reset() {
            if (nodes.length > 1) {
                this.startNode = nodes[Math.floor(Math.random() * nodes.length)];
                this.endNode = nodes[Math.floor(Math.random() * nodes.length)];
                this.progress = 0;
                this.speed = 0.005 + Math.random() * 0.01;
                this.size = 1 + Math.random() * 2;
                this.brightness = 0.5 + Math.random() * 0.5;
            }
        }

        update() {
            this.progress += this.speed;
            if (this.progress >= 1) {
                this.reset();
            }
        }

        draw() {
            if (!this.startNode || !this.endNode) return;

            const x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
            const y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;

            // Particle with trail effect
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${this.brightness})`;
            ctx.fill();

            // Glow
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.size * 3);
            gradient.addColorStop(0, `rgba(0, 255, 255, ${0.6 * this.brightness})`);
            gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
            ctx.beginPath();
            ctx.arc(x, y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    // Initialize nodes and particles
    function initNodes() {
        nodes = [];
        for (let i = 0; i < config.nodeCount; i++) {
            nodes.push(new Node());
        }

        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new DataParticle());
        }
    }

    // Draw enhanced connections with animation
    function drawConnections() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    const opacity = (1 - distance / config.connectionDistance) * config.connectionOpacity;

                    // Animated pulse effect on connections
                    const pulseOpacity = opacity * (1 + Math.sin(time * 0.002 + i * 0.1) * 0.3);

                    // Draw connection line
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0, 102, 255, ${pulseOpacity})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    // Draw subtle glow on connections
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(0, 153, 255, ${pulseOpacity * 0.3})`;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop with time tracking
    function animate() {
        time++;
        ctx.clearRect(0, 0, width, height);

        // Draw connections first (background layer)
        drawConnections();

        // Update and draw data particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Update and draw nodes (foreground layer)
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        requestAnimationFrame(animate);
    }

    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Handle resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initNodes();
    });

    // Start
    initNodes();
    animate();
}

// ============================================
// 12. LAZY LOAD OPTIMIZATION
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
// 13. FLOATING SECTION NAVIGATION
// ============================================

function initSectionNavigation() {
    const sectionNav = document.querySelector('.section-nav');
    const navDots = document.querySelectorAll('.section-nav-dot');
    const sections = document.querySelectorAll('.hero, .section');

    if (!sectionNav || navDots.length === 0) return;

    // Show navigation after scrolling past hero
    function updateNavVisibility() {
        const scrollY = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrollY > heroHeight * 0.3) {
            sectionNav.classList.add('visible');
        } else {
            sectionNav.classList.remove('visible');
        }
    }

    // Update active dot based on scroll position
    function updateActiveSection() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if section is in viewport
            if (scrollY >= sectionTop - windowHeight / 3 &&
                scrollY < sectionTop + sectionHeight - windowHeight / 3) {
                currentSection = sectionId;
            }
        });

        // Update active state
        navDots.forEach(dot => {
            const dotSection = dot.getAttribute('data-section');
            if (dotSection === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Smooth scroll to section on click
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetId === '#hero' ? 0 : targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Throttled scroll handler for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            updateNavVisibility();
            updateActiveSection();
        });
    });

    // Initial update
    updateNavVisibility();
    updateActiveSection();
}

// ============================================
// 14. INITIALIZE ALL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Initialize all animations and interactions
        initPageLoadAnimations();
        initCurtainReveal();
        initParallax();
        initScrollProgress();
        initNavBehavior();
        initCardEnhancements();
        initButtonSpring();
        initMeshInteraction();
        initCounterAnimation();
        initNeuralNetwork();
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
    initSectionNavigation();

    // Console signature
    console.log('%c VP ', 'background: #000; color: #fff; padding: 12px 20px; font-family: monospace; font-size: 20px; font-weight: bold;');
    console.log('%c Vyacheslav Plotnikov — AI Product Manager ', 'background: #fff; color: #000; padding: 8px 16px; font-family: monospace; border: 1px solid #000;');
});

// ============================================
// 14. PERFORMANCE MONITORING
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
