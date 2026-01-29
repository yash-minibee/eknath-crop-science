// Reviews Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize reviews page functionality
    initializeReviewsPage();
    
    function initializeReviewsPage() {
        setupVideoModal();
        setupKnowMoreButtons();
        setupReviewCardAnimations();
        setupAchievementCounters();
        console.log('Reviews page initialized successfully');
    }

    // Setup video modal functionality
    function setupVideoModal() {
        const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
        const videoFrame = document.getElementById('videoFrame');
        
        // Handle modal close to stop video
        document.getElementById('videoModal').addEventListener('hidden.bs.modal', function() {
            videoFrame.src = '';
        });
    }

    // Setup Know More buttons
    function setupKnowMoreButtons() {
        const knowMoreButtons = document.querySelectorAll('.know-more-btn');
        
        knowMoreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent any default button behavior
                
                const videoId = this.getAttribute('data-video-id');
                const reviewCard = this.closest('.review-card');
                const productName = reviewCard.querySelector('.highlight-title').textContent;
                
                // Redirect to YouTube video directly in new tab
                const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
                window.open(youtubeUrl, '_blank');
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                console.log('Redirecting to YouTube video for:', productName, '- URL:', youtubeUrl);
            });
        });
    }

    // Show video modal
    function showVideoModal(videoId, title) {
        const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
        const videoFrame = document.getElementById('videoFrame');
        const modalTitle = document.getElementById('videoModalLabel');
        
        // Update modal title
        modalTitle.textContent = title;
        
        // Set YouTube embed URL
        // Replace 'dQw4w9WgXcQ' with actual YouTube video IDs
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        videoFrame.src = embedUrl;
        
        // Show modal
        videoModal.show();
    }

    // Setup review card animations
    function setupReviewCardAnimations() {
        const reviewCards = document.querySelectorAll('.review-card');
        
        reviewCards.forEach(card => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    const image = this.querySelector('.review-image');
                    
                    if (image) {
                        image.style.transform = 'scale(1.05)';
                    }
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const image = this.querySelector('.review-image');
                
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Setup achievement counters (reuse from main script)
    function setupAchievementCounters() {
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

        // Observe achievement sections
        const achievementSections = document.querySelectorAll('.achievement-card');
        achievementSections.forEach(section => {
            achievementObserver.observe(section);
        });
    }

    // Animate counter function
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
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

    // Enhanced scroll animations for reviews page
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0, 0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in-down, .fade-in-up, .fade-in-left, .fade-in-right');
        fadeElements.forEach(el => observer.observe(el));
    }

    // Initialize scroll animations
    setupScrollAnimations();

    // Add ripple effect to review cards
    function addRippleEffect(card, event) {
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(92, 184, 92, 0.3)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '10';
        
        const left = event.clientX - rect.left;
        const top = event.clientY - rect.top;
        
        ripple.style.left = left + 'px';
        ripple.style.top = top + 'px';
        
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Add click ripple to review cards
    document.querySelectorAll('.review-card').forEach(card => {
        card.addEventListener('click', function(e) {
            addRippleEffect(this, e);
        });
    });

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
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
            }
        });
    });

    // Add loading states for video buttons
    document.querySelectorAll('.know-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.querySelector('.btn-text');
            const icon = this.querySelector('i');
            
            // Show loading state briefly
            const originalText = btnText.textContent;
            const originalIcon = icon.className;
            
            btnText.textContent = 'Loading...';
            icon.className = 'fas fa-spinner fa-spin me-2';
            
            setTimeout(() => {
                btnText.textContent = originalText;
                icon.className = originalIcon;
            }, 1000);
        });
    });

    // Console feedback
    console.log('%c 🎥 Reviews Page Loaded 🎥 ', 'color: #2d5016; font-size: 16px; font-weight: bold;');
    console.log('%c Customer testimonials and video reviews ready ', 'color: #5cb85c; font-size: 12px;');
});

// Add CSS for review-specific styles
const reviewStyles = document.createElement('style');
reviewStyles.textContent = `
    .review-image-container {
        position: relative;
        overflow: hidden;
        border-radius: 12px 12px 0 0;
        height: 200px;
    }
    
    .review-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    

    .review-category-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(45, 80, 22, 0.9);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .review-content {
        padding: 1.5rem;
    }
    
    .review-card {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .review-card:hover {
        transform: translateY(-5px);
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .products-text-gradient {
        background: linear-gradient(135deg, #5cb85c 0%, #90EE90 50%, #5cb85c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .products-hero-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2d5016 0%, #5cb85c 100%);
        z-index: 1;
    }
    
    .products-floating-element {
        position: absolute;
        border-radius: 50%;
        opacity: 0.1;
        animation: float 6s ease-in-out infinite;
    }
    
    .products-element-1 {
        width: 200px;
        height: 200px;
        background: #fff;
        top: 10%;
        right: 10%;
        animation-delay: 0s;
    }
    
    .products-element-2 {
        width: 150px;
        height: 150px;
        background: #5cb85c;
        bottom: 20%;
        left: 15%;
        animation-delay: 2s;
    }
    
    .products-element-3 {
        width: 100px;
        height: 100px;
        background: #90EE90;
        top: 60%;
        right: 20%;
        animation-delay: 4s;
    }
    
    .products-element-4 {
        width: 120px;
        height: 120px;
        background: #fff;
        top: 30%;
        left: 10%;
        animation-delay: 1s;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }
`;
document.head.appendChild(reviewStyles);