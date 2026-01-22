// Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Sample product data
    const products = [
        // NPK Fertilizers
        {
            id: 1,
            name: "NPK 19:19:19",
            category: "fertilizers",
            description: "Balanced NPK fertilizer for all-round plant nutrition and optimal growth.",
            image: "assets/image/about-1.jpg",
            features: ["Balanced nutrition", "Quick absorption", "Suitable for all crops"],
            specifications: {
                "NPK Ratio": "19:19:19",
                "Form": "Granular",
                "Solubility": "Water Soluble",
                "Package": "50kg bags"
            },
            applications: ["Cereals", "Vegetables", "Fruits", "Cash crops"]
        },
        {
            id: 2,
            name: "NPK 20:20:0+13S",
            category: "fertilizers",
            description: "High-performance NPK with sulfur for enhanced protein synthesis.",
            image: "assets/image/about-2.jpg",
            features: ["Added sulfur", "Protein enhancement", "Improved quality"],
            specifications: {
                "NPK Ratio": "20:20:0",
                "Sulfur": "13%",
                "Form": "Granular",
                "Package": "50kg bags"
            },
            applications: ["Oilseeds", "Pulses", "Cotton", "Sugarcane"]
        },
        {
            id: 3,
            name: "NPK 12:32:16",
            category: "fertilizers",
            description: "Phosphorus-rich formula for root development and flowering.",
            image: "assets/image/about-3.jpg",
            features: ["High phosphorus", "Root development", "Better flowering"],
            specifications: {
                "NPK Ratio": "12:32:16",
                "Form": "Granular",
                "Solubility": "Partially soluble",
                "Package": "50kg bags"
            },
            applications: ["Flowering plants", "Fruit trees", "Root vegetables"]
        },
        
        // Micronutrients
        {
            id: 4,
            name: "Zinc Sulphate Monohydrate",
            category: "micronutrients",
            description: "Essential zinc micronutrient for enzyme activation and growth.",
            image: "assets/image/about-1.jpg",
            features: ["High zinc content", "Quick correction", "Enzyme activation"],
            specifications: {
                "Zinc": "33%",
                "Sulfur": "17%",
                "Form": "Crystalline powder",
                "Package": "25kg bags"
            },
            applications: ["Rice", "Wheat", "Maize", "Citrus fruits"]
        },
        {
            id: 5,
            name: "Ferrous Sulphate",
            category: "micronutrients",
            description: "Iron supplement for chlorophyll synthesis and green foliage.",
            image: "assets/image/about-2.jpg",
            features: ["Iron deficiency correction", "Chlorophyll synthesis", "Green foliage"],
            specifications: {
                "Iron": "19%",
                "Sulfur": "10.5%",
                "Form": "Crystalline",
                "Package": "25kg bags"
            },
            applications: ["Citrus", "Grapes", "Vegetables", "Ornamentals"]
        },
        {
            id: 6,
            name: "Chelated Micronutrient Mix",
            category: "micronutrients",
            description: "Complete micronutrient blend with EDTA chelation for better uptake.",
            image: "assets/image/about-3.jpg",
            features: ["EDTA chelated", "Complete mix", "Better uptake"],
            specifications: {
                "Fe": "3%",
                "Mn": "2%",
                "Zn": "1.5%",
                "Package": "1kg pouches"
            },
            applications: ["All crops", "Foliar spray", "Drip irrigation"]
        },
        
        // Water Soluble Fertilizers
        {
            id: 7,
            name: "WSF 19:19:19",
            category: "wsf",
            description: "Completely water-soluble NPK for fertigation and foliar application.",
            image: "assets/image/about-1.jpg",
            features: ["100% soluble", "No residue", "Quick absorption"],
            specifications: {
                "NPK": "19:19:19",
                "Solubility": "100%",
                "Form": "Crystalline",
                "Package": "25kg bags"
            },
            applications: ["Drip irrigation", "Foliar spray", "Hydroponics"]
        },
        {
            id: 8,
            name: "WSF 13:40:13",
            category: "wsf",
            description: "High phosphorus WSF for flowering and fruit development.",
            image: "assets/image/about-2.jpg",
            features: ["High phosphorus", "Flowering boost", "Fruit development"],
            specifications: {
                "NPK": "13:40:13",
                "Solubility": "100%",
                "Form": "Crystalline",
                "Package": "25kg bags"
            },
            applications: ["Flowering stage", "Fruit crops", "Vegetables"]
        },
        
        // Bio-Solutions
        {
            id: 9,
            name: "Trichoderma Viride",
            category: "bio-solutions",
            description: "Biological fungicide for soil-borne disease management.",
            image: "assets/image/about-1.jpg",
            features: ["Biological control", "Soil health", "Disease prevention"],
            specifications: {
                "CFU": "1x10^8/gm",
                "Form": "Powder",
                "Shelf life": "2 years",
                "Package": "1kg pouches"
            },
            applications: ["Seed treatment", "Soil application", "Root dip"]
        },
        {
            id: 10,
            name: "Pseudomonas Fluorescens",
            category: "bio-solutions",
            description: "Plant growth promoting rhizobacteria for root zone health.",
            image: "assets/image/about-2.jpg",
            features: ["PGPR", "Root health", "Disease suppression"],
            specifications: {
                "CFU": "1x10^8/gm",
                "Form": "Powder",
                "Shelf life": "2 years",
                "Package": "1kg pouches"
            },
            applications: ["Seed treatment", "Seedling dip", "Soil application"]
        }
    ];

    // DOM elements
    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.products-filter-btn');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));

    // Initialize page
    init();

    function init() {
        renderProducts(products);
        setupFilterButtons();
        setupCategoryCards();
        setupAnimations();
    }

    // Render products
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        
        productsToRender.forEach((product, index) => {
            const productCard = createProductCard(product, index);
            productGrid.appendChild(productCard);
        });

        // Trigger animations
        setTimeout(() => {
            const cards = productGrid.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in-up');
                }, index * 100);
            });
        }, 100);
    }

    // Create product card
    function createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        card.innerHTML = `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-category-badge">${getCategoryName(product.category)}</div>
                </div>
                <div class="product-content">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <ul class="product-features">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div class="product-actions">
                        <button class="btn btn-product-primary" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-eye me-1"></i>View Details
                        </button>
                        <button class="btn btn-product-outline" onclick="requestQuote(${product.id})">
                            <i class="fas fa-envelope me-1"></i>Quote
                        </button>
                    </div>
                </div>
            </div>
        `;
        return card;
    }

    // Get category display name
    function getCategoryName(category) {
        const categoryNames = {
            'fertilizers': 'NPK Fertilizers',
            'micronutrients': 'Micronutrients',
            'wsf': 'WSF',
            'bio-solutions': 'Bio-Solutions'
        };
        return categoryNames[category] || category;
    }

    // Setup filter buttons
    function setupFilterButtons() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                // Filter products
                const filter = this.getAttribute('data-filter');
                const filteredProducts = filter === 'all' 
                    ? products 
                    : products.filter(product => product.category === filter);
                
                renderProducts(filteredProducts);
            });
        });
    }

    // Setup category cards
    function setupCategoryCards() {
        const categoryCards = document.querySelectorAll('.products-category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update filter buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                const targetButton = document.querySelector(`[data-filter="${category}"]`);
                if (targetButton) {
                    targetButton.classList.add('active');
                }

                // Filter products
                const filteredProducts = products.filter(product => product.category === category);
                renderProducts(filteredProducts);

                // Scroll to products section
                document.getElementById('productGrid').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    // Setup animations
    function setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    // Show product details in modal
    window.showProductDetails = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Update modal content
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDescription').textContent = product.description;
        document.getElementById('modalProductImage').src = product.image;
        document.getElementById('modalProductImage').alt = product.name;

        // Update specifications table
        const specsTable = document.getElementById('modalSpecsTable');
        specsTable.innerHTML = Object.entries(product.specifications)
            .map(([key, value]) => `
                <tr>
                    <td class="fw-semibold">${key}</td>
                    <td>${value}</td>
                </tr>
            `).join('');

        // Update applications list
        const applicationsList = document.getElementById('modalApplications');
        applicationsList.innerHTML = product.applications
            .map(app => `<li><i class="fas fa-check text-success me-2"></i>${app}</li>`)
            .join('');

        // Show modal
        productModal.show();
    };

    // Request quote
    window.requestQuote = function(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Create mailto link
        const subject = `Quote Request for ${product.name}`;
        const body = `Dear Eknath Crop Science Team,

I am interested in getting a quote for the following product:

Product: ${product.name}
Category: ${getCategoryName(product.category)}

Please provide pricing and availability information.

Thank you.`;

        const mailtoLink = `mailto:eknathcropscience@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    // Smooth scrolling for anchor links
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

    // Add loading animation
    function showLoading() {
        productGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 text-muted">Loading products...</p>
            </div>
        `;
    }

    // Search functionality (if needed)
    window.searchProducts = function(query) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
        );
        renderProducts(filteredProducts);
    };

    // Add to favorites (placeholder)
    window.addToFavorites = function(productId) {
        console.log(`Added product ${productId} to favorites`);
        // Implement favorites functionality
    };

    // Download brochure (placeholder)
    window.downloadBrochure = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            console.log(`Downloading brochure for ${product.name}`);
            // Implement download functionality
            alert(`Brochure for ${product.name} will be available soon!`);
        }
    };

    // Add event listeners for modal buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn:contains("Download Brochure")')) {
            const productName = document.getElementById('modalProductName').textContent;
            alert(`Brochure for ${productName} will be available soon!`);
        }
    });

    console.log('Products page initialized successfully');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .product-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .product-card.fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate {
        animation-play-state: running !important;
    }
`;
document.head.appendChild(style);