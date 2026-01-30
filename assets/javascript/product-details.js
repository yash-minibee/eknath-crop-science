// Product Details Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Product data (same as products.js for consistency)
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

    // Get product ID from URL parameter
    function getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')) || 1; // Default to product ID 1 if no ID provided
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

    // Load product details dynamically
    function loadProductDetails() {
        const productId = getProductIdFromURL();
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found, using default product');
            // Use first product as fallback
            const fallbackProduct = products[0];
            loadProductData(fallbackProduct);
            return;
        }

        console.log('Loading product:', product.name, 'with ID:', productId);
        loadProductData(product);
    }

    // Load product data into the page
    function loadProductData(product) {
        // Update page title
        document.title = `${product.name} - Product Details | Eknath Crop Science`;

        // Update breadcrumb
        const breadcrumbActive = document.querySelector('.breadcrumb .active');
        if (breadcrumbActive) {
            breadcrumbActive.textContent = product.name;
        }

        // Update product image
        const productImage = document.querySelector('.products-product-image-container img');
        if (productImage) {
            productImage.src = product.image;
            productImage.alt = product.name;
        }

        // Update product name
        const productNameElement = document.querySelector('.col-md-6 h4');
        if (productNameElement) {
            productNameElement.textContent = product.name;
        }

        // Update product description
        const productDescElement = document.querySelector('.col-md-6 p.text-muted');
        if (productDescElement) {
            productDescElement.textContent = product.description;
        }

        // Update specifications table
        const specsTable = document.querySelector('.table tbody');
        if (specsTable) {
            specsTable.innerHTML = Object.entries(product.specifications)
                .map(([key, value]) => `
                    <tr>
                        <td class="fw-semibold">${key}</td>
                        <td>${value}</td>
                    </tr>
                `).join('');
        }

        // Update applications list
        const applicationsList = document.querySelector('.list-unstyled');
        if (applicationsList) {
            applicationsList.innerHTML = product.applications
                .map(app => `<li class="mb-2"><i class="fas fa-check text-success me-2"></i>${app}</li>`)
                .join('');
        }

        // Update benefits section heading
        const benefitsHeading = document.querySelector('.section-title');
        if (benefitsHeading && benefitsHeading.textContent.includes('Why Choose')) {
            benefitsHeading.textContent = `Why Choose ${product.name}?`;
        }

        // Update benefits section description
        const benefitsDescriptions = document.querySelectorAll('.section-text');
        if (benefitsDescriptions.length >= 2) {
            benefitsDescriptions[0].innerHTML = `
                Our premium ${product.name} is scientifically formulated to provide ${product.description.toLowerCase()}. 
                This high-quality fertilizer ensures comprehensive plant nutrition throughout the growing season.
            `;
            benefitsDescriptions[1].innerHTML = `
                Trusted by thousands of farmers across the country, this fertilizer delivers consistent results 
                and helps achieve significant improvements in crop yield while enhancing the overall quality of produce. 
                Key features include: ${product.features.join(', ').toLowerCase()}.
            `;
        }

        // Update benefits section image
        const benefitsImage = document.querySelector('.bg-light .col-lg-6 img');
        if (benefitsImage) {
            benefitsImage.src = product.image;
            benefitsImage.alt = `${product.name} Benefits`;
        }

        console.log('Product details loaded successfully for:', product.name);
    }

    // Initialize page
    loadProductDetails();

    // Simple form submission handler (no backend logic)
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('reviewerName').value;
            const rating = document.getElementById('productRating').value;
            const message = document.getElementById('reviewMessage').value;
            
            // Simple validation
            if (name && rating && message) {
                alert('Thank you for your review! Your feedback has been submitted.');
                this.reset(); // Clear the form
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

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

    console.log('Product details page initialized successfully');
});