// ==================== SMOOTH SCROLL ANIMATIONS ==================== 

/**
 * Intersection Observer API - Triggers animations when elements come into view
 * This creates the fade-in effects as users scroll down the page
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class to trigger animation
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate(0, 0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right');
    fadeElements.forEach(el => observer.observe(el));
    
    console.log('[v0] Fade-in observer initialized for', fadeElements.length, 'elements');
});

// ==================== NAVBAR ACTIVE LINK ==================== 

/**
 * Updates the active nav link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== 

/**
 * Smooth scroll to section when clicking navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal links
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new window.bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Smooth scroll to target
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log('[v0] Scrolling to section:', href);
            }
        }
    });
});

// ==================== PARALLAX SCROLL EFFECT ==================== 

/**
 * Creates a subtle parallax effect on the hero section
 */
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && scrollY < window.innerHeight) {
        heroSection.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
    }
});

// ==================== BUTTON HOVER EFFECTS ==================== 

/**
 * Enhanced button interactions with ripple effect on mobile
 */
document.querySelectorAll('.btn-custom').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
            this.style.transform = 'translateY(-3px)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== SCROLL INDICATOR FADE OUT ==================== 

/**
 * Hides the scroll indicator when user starts scrolling
 */
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        }
    } else {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// ==================== CARD TILT EFFECT ==================== 

/**
 * Enhanced 3D tilt effect on highlight cards when mouse moves
 */
document.querySelectorAll('.highlight-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ==================== CONTACT CARD GLOW EFFECT ==================== 

/**
 * Glow effect that follows mouse on contact cards
 */
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            
            const beforeEl = this.querySelector('::before') || this;
            this.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))`;
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// ==================== BUTTON RIPPLE EFFECT ==================== 

/**
 * Ripple effect on button click
 */
document.querySelectorAll('.btn-custom').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        const left = e.clientX - rect.left;
        const top = e.clientY - rect.top;
        
        ripple.style.left = left + 'px';
        ripple.style.top = top + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        const btnText = this.textContent.trim();
        console.log('[v0] Button clicked:', btnText);
    });
});

// Add ripple animation to stylesheet dynamically
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== TEXT LETTER ANIMATION ==================== 

/**
 * Animate text letters on scroll
 */
function animateTextOnScroll() {
    const textElements = document.querySelectorAll('.hero-title, .section-title');
    
    textElements.forEach(el => {
        if (el.style.animation && el.style.animation.includes('letter')) return;
        
        const text = el.textContent;
        el.innerHTML = '';
        
        Array.from(text).forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.animation = `letterFade 0.05s ease-out ${i * 0.05}s forwards`;
            span.style.opacity = '0';
            el.appendChild(span);
        });
    });
}

// Add letter animation to stylesheet dynamically
if (!document.querySelector('style[data-letter]')) {
    const style = document.createElement('style');
    style.setAttribute('data-letter', 'true');
    style.textContent = `
        @keyframes letterFade {
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== LAZY LOAD IMAGES ==================== 

/**
 * Lazy load images for better performance
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== RESIZE HANDLING ==================== 

/**
 * Handle responsive behavior on window resize
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('[v0] Window resized - Responsive layout adjusted');
    }, 250);
});

// ==================== PERFORMANCE OPTIMIZATION ==================== 

/**
 * Reduce animation on devices with reduced motion preference
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
    
    console.log('[v0] Reduced motion preference detected - Animations disabled');
}

// ==================== STAGGER ANIMATION FOR ELEMENTS ==================== 

/**
 * Add staggered animation to lists of elements
 */
function staggerElements(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * delay}ms`;
    });
}

// ==================== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==================== 

/**
 * Enhanced Intersection Observer for more complex animations
 */
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add count up effect for stat-like elements
            const numbers = entry.target.querySelectorAll('[data-count]');
            numbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-count'));
                animateCounter(num, target);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 30;
    const duration = 1000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        current = Math.floor(target * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    update();
}

// ==================== ACHIEVEMENT COUNTER ANIMATION ==================== 

/**
 * Animated counter for achievement numbers
 */
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16); // 60fps
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        current = Math.floor(target * easeOutQuart);
        
        element.textContent = current;
        element.classList.add('counting');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
            element.classList.remove('counting');
        }
    }
    
    update();
}

/**
 * Initialize achievement counters when they come into view
 */
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElements = entry.target.querySelectorAll('[data-count]');
            
            numberElements.forEach(element => {
                const target = parseInt(element.getAttribute('data-count'));
                const duration = target > 100 ? 2500 : target > 50 ? 2000 : 1500;
                
                // Add staggered delay for multiple counters
                const delay = Array.from(numberElements).indexOf(element) * 200;
                
                setTimeout(() => {
                    animateCounter(element, target, duration);
                }, delay);
            });
            
            // Only animate once
            achievementObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// Observe achievement section
document.addEventListener('DOMContentLoaded', () => {
    const achievementSection = document.querySelector('.achievements-section');
    if (achievementSection) {
        achievementObserver.observe(achievementSection);
    }
});

// ==================== ENHANCED CARD INTERACTIONS ==================== 

/**
 * Enhanced hover effects for achievement cards
 */
document.addEventListener('DOMContentLoaded', () => {
    const achievementCards = document.querySelectorAll('.achievement-card, .mini-achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                // Add glow effect
                const glow = this.querySelector('.achievement-glow');
                if (glow) {
                    glow.style.opacity = '1';
                }
                
                // Enhance icon animation
                const icon = this.querySelector('.achievement-icon, .mini-achievement-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset glow effect
            const glow = this.querySelector('.achievement-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
            
            // Reset icon animation
            const icon = this.querySelector('.achievement-icon, .mini-achievement-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(92, 184, 92, 0.3)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '10';
            
            const left = e.clientX - rect.left;
            const top = e.clientY - rect.top;
            
            ripple.style.left = left + 'px';
            ripple.style.top = top + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation to stylesheet dynamically
if (!document.querySelector('style[data-achievement-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-achievement-ripple', 'true');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALIZATION ==================== 

/**
 * Initialize all scripts when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('[v0] Eknath Crop Science website initialized with enhanced animations');
    
    // Initialize staggered animations
    staggerElements('.highlight-card', 150);
    staggerElements('.contact-card', 150);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.section-title, .highlight-card, .contact-card, .mission-box').forEach(el => {
        scrollAnimationObserver.observe(el);
    });
});

// ==================== ERROR HANDLING ==================== 

/**
 * Global error handler for debugging
 */
window.addEventListener('error', (event) => {
    console.error('[v0] Error occurred:', event.error.message);
});

// ==================== CONSOLE FEEDBACK ==================== 

/**
 * Welcome message in console
 */
console.log('%c 🌾 Welcome to Eknath Crop Science 🌾 ', 'color: #2d5016; font-size: 16px; font-weight: bold;');
console.log('%c Modern Fertilizer Solutions for Sustainable Agriculture ', 'color: #5cb85c; font-size: 12px;');
console.log('%c Website optimized for performance and accessibility ', 'color: #4caf50; font-size: 11px;');

// ==================== NAVBAR TRANSPARENT ON HERO ====================

const navbar = document.getElementById("mainNavbar");
const heroSection = document.getElementById("home");

function handleNavbarScroll() {
    const heroHeight = heroSection.offsetHeight - 120; // Adjusted for larger navbar
    
    if (window.scrollY < heroHeight) {
        navbar.classList.add("navbar-transparent");
        navbar.classList.remove("navbar-scrolled");
    } else {
        navbar.classList.add("navbar-scrolled");
        navbar.classList.remove("navbar-transparent");
    }
}

// Enhanced smooth scroll for navigation links with navbar height adjustment
function smoothScrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        // Calculate navbar height dynamically
        const navbarHeight = navbar.classList.contains('navbar-scrolled') ? 85 : 95;
        const targetPosition = target.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update navbar state after scroll
        setTimeout(() => {
            handleNavbarScroll();
        }, 100);
    }
}

// Enhanced navigation link click handler
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new window.bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
            
            // Smooth scroll to target
            smoothScrollToSection(href);
            
            // Update active link
            document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            console.log('[Enhanced] Scrolling to section:', href);
        }
    });
});

// Enhanced navbar brand click handler
document.querySelector('.navbar-brand').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Scroll to top and ensure transparent navbar
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Update active link to home
    document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
        navLink.classList.remove('active');
    });
    document.querySelector('.navbar-nav .nav-link[href="#home"]').classList.add('active');
    
    // Force transparent navbar
    setTimeout(() => {
        navbar.classList.add("navbar-transparent");
        navbar.classList.remove("navbar-scrolled");
    }, 100);
});

// Run on scroll & load with improved performance
let scrollTimeout;
window.addEventListener("scroll", () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleNavbarScroll, 10);
});

window.addEventListener("load", handleNavbarScroll);

// Handle window resize to recalculate navbar behavior
window.addEventListener("resize", () => {
    setTimeout(handleNavbarScroll, 100);
});
// ==================== CONTACT PAGE FUNCTIONALITY ==================== 

/**
 * Contact Form Handling with validation and submission
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return; // Only run on contact page
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.contact-submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.loading-spinner');
        const successMessage = this.querySelector('.success-message');
        
        // Show loading state
        spinner.style.display = 'inline-block';
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Hide loading state
            spinner.style.display = 'none';
            btnText.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            console.log('Contact form submitted successfully');
        }, 2000);
    });
}

/**
 * FAQ Accordion functionality
 */
function initializeFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

/**
 * Form field animations and interactions
 */
function initializeFormAnimations() {
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', function() {
            if (this.parentElement.classList.contains('form-floating')) {
                this.parentElement.style.transform = 'translateY(-2px)';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.parentElement.classList.contains('form-floating')) {
                this.parentElement.style.transform = 'translateY(0)';
            }
        });
    });
}

/**
 * Contact info card interactions
 */
function initializeContactInfoCards() {
    document.querySelectorAll('.contact-info-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                const icon = this.querySelector('.contact-info-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-info-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

/**
 * Enhanced navbar scroll behavior for contact page
 */
function initializeContactNavbar() {
    const navbar = document.getElementById("mainNavbar");
    if (!navbar) return;
    
    function handleContactNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
            navbar.classList.remove("navbar-transparent");
        } else {
            navbar.classList.remove("navbar-scrolled");
            navbar.classList.remove("navbar-transparent");
        }
    }
    
    // Only add if not already added by main script
    if (!window.navbarScrollInitialized) {
        window.addEventListener("scroll", handleContactNavbarScroll);
        window.addEventListener("load", handleContactNavbarScroll);
        window.navbarScrollInitialized = true;
    }
}

/**
 * Enhanced smooth scroll for contact page anchors
 */
function initializeContactSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Check if this anchor already has a listener to avoid duplicates
        if (anchor.dataset.scrollInitialized) return;
        anchor.dataset.scrollInitialized = 'true';
        
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#map') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbar = document.getElementById("mainNavbar");
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else if (href === '#map') {
                e.preventDefault();
                const mapSection = document.getElementById('map');
                if (mapSection) {
                    const navbar = document.getElementById("mainNavbar");
                    const navHeight = navbar ? navbar.offsetHeight : 80;
                    const targetPosition = mapSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Form validation functionality
 */
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    function validateContactForm() {
        const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                input.style.borderColor = '#28a745';
            }
        });
        
        // Email validation
        const email = document.getElementById('email');
        if (email && email.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.style.borderColor = '#dc3545';
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Real-time validation
    contactForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', validateContactForm);
    });
}

/**
 * Initialize all contact page functionality
 */
function initializeContactPage() {
    // Check if we're on the contact page
    const isContactPage = document.getElementById('contactForm') || 
                         document.querySelector('.contact-hero') || 
                         document.querySelector('.faq-section');
    
    if (isContactPage) {
        initializeContactForm();
        initializeFAQAccordion();
        initializeFormAnimations();
        initializeContactInfoCards();
        initializeContactNavbar();
        initializeContactSmoothScroll();
        initializeFormValidation();
        
        console.log('Contact page functionality initialized');
    }
}

// Initialize contact page functionality when DOM is ready
document.addEventListener('DOMContentLoaded', initializeContactPage);

// Also initialize if script loads after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContactPage);
} else {
    initializeContactPage();
}