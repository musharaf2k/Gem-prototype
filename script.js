// GEMSHIRE E-commerce Website JavaScript

// Global Variables
let currentSlide = 0;
let selectedCountry = 'canada';
let cartItems = 0;
let selectedGemstone = null;

// Country Data
const countries = {
    canada: {
        name: 'Canada',
        flag: '🇨🇦',
        currency: 'CAD',
        language: 'English',
        phone: '+1-800-GEMSHIRE',
        address: 'Toronto, Ontario',
        titles: {
            contact: 'Contact',
            location: 'Location',
            currency: 'Currency',
            featured: 'Featured Gemstones'
        }
    },
    australia: {
        name: 'Australia',
        flag: '🇦🇺',
        currency: 'AUD',
        language: 'English',
        phone: '+61-1800-GEMS',
        address: 'Sydney, NSW',
        titles: {
            contact: 'Contact',
            location: 'Location',
            currency: 'Currency',
            featured: 'Featured Gemstones'
        }
    },
    netherlands: {
        name: 'Netherlands',
        flag: '🇳🇱',
        currency: 'EUR',
        language: 'Nederlands',
        phone: '+31-800-EDELST',
        address: 'Amsterdam',
        titles: {
            contact: 'Contact',
            location: 'Locatie',
            currency: 'Valuta',
            featured: 'Uitgelichte Edelstenen'
        }
    },
    germany: {
        name: 'Germany',
        flag: '🇩🇪',
        currency: 'EUR',
        language: 'Deutsch',
        phone: '+49-800-EDELSTEIN',
        address: 'Munich, Bavaria',
        titles: {
            contact: 'Kontakt',
            location: 'Standort',
            currency: 'Währung',
            featured: 'Ausgewählte Edelsteine'
        }
    }
};

// Featured Products Data
const featuredProducts = [
    {
        id: 1,
        name: 'Ceylon Blue Sapphire',
        price: 12500,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
        carat: 3.2,
        origin: 'Sri Lanka',
        story: 'This magnificent Ceylon Blue Sapphire was discovered in the legendary mines of Ratnapura, known as the "City of Gems." Its cornflower blue hue represents wisdom and nobility, making it a treasured centerpiece for any collection.',
        certification: 'GIA Certified'
    },
    {
        id: 2,
        name: 'Burmese Ruby',
        price: 18750,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
        carat: 2.8,
        origin: 'Myanmar',
        story: 'From the famed Mogok Valley, this Burmese Ruby exhibits the coveted "pigeon blood" red color. Ancient Burmese warriors believed rubies made them invincible in battle, embedding them in their flesh.',
        certification: 'Gübelin Certified'
    },
    {
        id: 3,
        name: 'Colombian Emerald',
        price: 15200,
        image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop',
        carat: 4.1,
        origin: 'Colombia',
        story: 'Mined from the legendary Muzo mines, this Colombian Emerald displays the finest green color nature can produce. The ancient Incas believed emeralds were sacred to the goddess of love and beauty.',
        certification: 'SSEF Certified'
    },
    {
        id: 4,
        name: 'Padparadscha Sapphire',
        price: 22000,
        image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop',
        carat: 2.5,
        origin: 'Sri Lanka',
        story: 'Named after the lotus blossom, this rare Padparadscha Sapphire exhibits a delicate pink-orange hue. Found only in select locations, it represents the perfect balance between passion and tranquility.',
        certification: 'GIA Certified'
    }
];

// DOM Elements
const elements = {
    // Shared elements
    countrySelector: document.getElementById('country-selector'),
    countryDropdown: document.getElementById('country-dropdown'),
    currentCountryFlag: document.getElementById('current-country-flag'),
    currentCountryName: document.getElementById('current-country-name'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    mobileMenuClose: document.getElementById('mobile-menu-close'),
    cartBtn: document.getElementById('cart-btn'),
    cartCount: document.getElementById('cart-count'),
    productCarousel: document.getElementById('product-carousel'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    carouselDots: document.getElementById('carousel-dots'),
    gemstoneModal: document.getElementById('gemstone-modal'),
    modalClose: document.getElementById('modal-close'),
    addToCart: document.getElementById('add-to-cart'),
    addToWishlist: document.getElementById('add-to-wishlist'),
    mainContent: document.getElementById('main-content'),
    countryPage: document.getElementById('country-page'),
    backToMain: document.getElementById('back-to-main'),

    // Mobile-specific elements
    mobileCountrySelector: document.getElementById('mobile-country-selector'),
    mobileCountryDropdown: document.getElementById('mobile-country-dropdown'),
    mobileCurrentFlag: null,
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Dynamically get the mobile flag element
    const mobileSelector = elements.mobileCountrySelector;
    if (mobileSelector) {
        elements.mobileCurrentFlag = mobileSelector.querySelector('.flag');
    }

    initializeEventListeners();
    initializeCarousel();
    updateCartDisplay();
    updateCountrySelector();
    initSlideText();
});

// Event Listeners
function initializeEventListeners() {
    // Country selector for both desktop and mobile
    if (elements.countrySelector) {
        elements.countrySelector.addEventListener('click', toggleCountryDropdown);
    }
    if (elements.mobileCountrySelector) {
        elements.mobileCountrySelector.addEventListener('click', toggleMobileCountryDropdown);
    }
    document.addEventListener('click', handleOutsideClick);

    // Country options
    document.querySelectorAll('.country-option').forEach(option => {
        option.addEventListener('click', handleCountrySelection);
    });

    // Mobile menu
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    if (elements.mobileMenuClose) {
        elements.mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Carousel controls
    if (elements.prevBtn) {
        elements.prevBtn.addEventListener('click', previousSlide);
    }
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', nextSlide);
    }

    // Modal controls
    if (elements.modalClose) {
        elements.modalClose.addEventListener('click', closeModal);
    }
    if (elements.addToCart) {
        elements.addToCart.addEventListener('click', addToCart);
    }
    if (elements.addToWishlist) {
        elements.addToWishlist.addEventListener('click', addToWishlist);
    }

    // Country page navigation
    if (elements.backToMain) {
        elements.backToMain.addEventListener('click', showMainContent);
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Close modal on background click
    if (elements.gemstoneModal) {
        elements.gemstoneModal.addEventListener('click', function(e) {
            if (e.target === elements.gemstoneModal) {
                closeModal();
            }
        });
    }

    // Auto-play carousel
    setInterval(nextSlide, 5000);

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', handleKeyDown);

    // Smooth scrolling for anchor links
    document.addEventListener('click', handleAnchorLinks);

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.collection-card, .feature-card, .testimonial-card');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        animatedElements.forEach(el => observer.observe(el));
    }
}

// Country Selector Functions
function toggleCountryDropdown(e) {
    e.stopPropagation();
    elements.countryDropdown.classList.toggle('active');
    elements.countrySelector.classList.toggle('active');
    elements.mobileCountryDropdown?.classList.remove('active');
    elements.mobileCountrySelector?.classList.remove('active');
}

function toggleMobileCountryDropdown(e) {
    e.stopPropagation();
    elements.mobileCountryDropdown.classList.toggle('active');
    elements.mobileCountrySelector.classList.toggle('active');
    elements.countryDropdown?.classList.remove('active');
    elements.countrySelector?.classList.remove('active');
}

function handleOutsideClick(e) {
    const isClickInsideDesktopSelector = elements.countrySelector?.contains(e.target) || elements.countryDropdown?.contains(e.target);
    const isClickInsideMobileSelector = elements.mobileCountrySelector?.contains(e.target) || elements.mobileCountryDropdown?.contains(e.target);

    if (!isClickInsideDesktopSelector) {
        elements.countryDropdown?.classList.remove('active');
        elements.countrySelector?.classList.remove('active');
    }
    if (!isClickInsideMobileSelector) {
        elements.mobileCountryDropdown?.classList.remove('active');
        elements.mobileCountrySelector?.classList.remove('active');
    }
}

function handleCountrySelection(e) {
    const countryCode = e.currentTarget.getAttribute('data-country');

    if (countryCode && countryCode !== selectedCountry) {
        selectedCountry = countryCode;
        updateCountrySelector();

        if (countryCode === 'canada') {
            showMainContent();
        } else {
            showCountryPage(countryCode);
        }
    }

    // Close dropdowns
    elements.countryDropdown?.classList.remove('active');
    elements.countrySelector?.classList.remove('active');
    elements.mobileCountryDropdown?.classList.remove('active');
    elements.mobileCountrySelector?.classList.remove('active');
}

function updateCountrySelector() {
    const country = countries[selectedCountry];
    if (elements.currentCountryFlag) {
        elements.currentCountryFlag.textContent = country.flag;
    }
    if (elements.currentCountryName) {
        elements.currentCountryName.textContent = country.name;
    }
    if (elements.mobileCurrentFlag) {
        elements.mobileCurrentFlag.textContent = country.flag;
    }
}

// Page Navigation Functions
function showMainContent() {
    selectedCountry = 'canada';
    updateCountrySelector();
    elements.mainContent.style.display = 'block';
    elements.countryPage.style.display = 'none';
    window.scrollTo(0, 0);
}

function showCountryPage(countryCode) {
    const country = countries[countryCode];

    // Update country page content
    document.getElementById('country-flag-large').textContent = country.flag;
    document.getElementById('country-title').textContent = `GEMSHIRE ${country.name}`;
    const subtitle = document.getElementById('country-subtitle');
    if (countryCode === 'germany') {
        subtitle.textContent = 'Luxuriöse Edelsteine für anspruchsvolle Sammler';
    } else if (countryCode === 'netherlands') {
        subtitle.textContent = 'Luxe edelstenen voor veeleisende verzamelaars';
    } else {
        subtitle.textContent = 'Luxury Gemstones for Discerning Collectors';
    }
    document.getElementById('contact-title').textContent = country.titles.contact;
    document.getElementById('location-title').textContent = country.titles.location;
    document.getElementById('currency-title').textContent = country.titles.currency;
    document.getElementById('country-phone').textContent = country.phone;
    document.getElementById('country-address').textContent = country.address;
    document.getElementById('country-currency').textContent = country.currency;
    document.getElementById('featured-title').textContent = country.titles.featured;

    // Update products grid
    updateCountryProducts(countryCode);

    // Show country page
    elements.mainContent.style.display = 'none';
    elements.countryPage.style.display = 'block';
    window.scrollTo(0, 0);
}

function updateCountryProducts(countryCode) {
    const country = countries[countryCode];
    const productsGrid = document.getElementById('country-products-grid');

    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.addEventListener('click', () => openGemstoneModal(product));
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${country.currency} $${product.price.toLocaleString()}</p>
                <p class="product-details">${product.carat} ct • ${product.origin}</p>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Mobile Menu Functions
function openMobileMenu() {
    elements.mobileMenu.classList.add('active');
}

function closeMobileMenu() {
    elements.mobileMenu.classList.remove('active');
}

// Carousel Functions
function initializeCarousel() {
    if (!elements.productCarousel) return;
    elements.productCarousel.innerHTML = '';
    elements.carouselDots.innerHTML = '';

    // Create carousel slides and dots
    featuredProducts.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <div class="slide-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="slide-content">
                <h3>${product.name}</h3>
                <p>${product.story}</p>
                <div class="slide-specs">
                    <div class="spec">
                        <span class="spec-label">Carat Weight</span>
                        <span class="spec-value">${product.carat} ct</span>
                    </div>
                    <div class="spec">
                        <span class="spec-label">Origin</span>
                        <span class="spec-value">${product.origin}</span>
                    </div>
                </div>
                <div class="slide-footer">
                    <span class="slide-price">${countries[selectedCountry].currency} $${product.price.toLocaleString()}</span>
                    <button class="btn-primary" onclick="window.openGemstoneModal(featuredProducts[${index}])">View Details</button>
                </div>
            </div>
        `;
        elements.productCarousel.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        elements.carouselDots.appendChild(dot);
    });

    updateCarousel();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % featuredProducts.length;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + featuredProducts.length) % featuredProducts.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    if (!elements.productCarousel) return;

    const translateX = -currentSlide * 100;
    elements.productCarousel.style.transform = `translateX(${translateX}%)`;

    // Update dots
    const dots = elements.carouselDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Update prices in slides based on selected country
    const slides = elements.productCarousel.querySelectorAll('.slide-price');
    slides.forEach((priceElement, index) => {
        const product = featuredProducts[index];
        priceElement.textContent = `${countries[selectedCountry].currency} $${product.price.toLocaleString()}`;
    });
}

// Modal Functions
function openGemstoneModal(product) {
    selectedGemstone = product;
    if (!elements.gemstoneModal) return;

    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-image').alt = product.name;
    document.getElementById('modal-story').textContent = product.story;
    document.getElementById('modal-carat').textContent = `${product.carat} ct`;
    document.getElementById('modal-origin').textContent = product.origin;
    document.getElementById('modal-price').textContent = `${countries[selectedCountry].currency} $${product.price.toLocaleString()}`;
    document.getElementById('modal-certification').textContent = product.certification;

    elements.gemstoneModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!elements.gemstoneModal) return;
    elements.gemstoneModal.classList.remove('active');
    document.body.style.overflow = '';
    selectedGemstone = null;
}

// Cart Functions
function addToCart() {
    if (selectedGemstone) {
        cartItems++;
        updateCartDisplay();
        showNotification(`${selectedGemstone.name} added to cart!`);
        closeModal();
    }
}

function addToWishlist() {
    if (selectedGemstone) {
        showNotification(`${selectedGemstone.name} added to wishlist!`);
        closeModal();
    }
}

function updateCartDisplay() {
    if (elements.cartCount) {
        elements.cartCount.textContent = cartItems;
        elements.cartCount.classList.toggle('visible', cartItems > 0);
    }
}

// Newsletter Functions
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!');
        e.target.reset();
    }
}

// Utility Functions
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #4CAF50;
        color: white; padding: 16px 24px; border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 3000;
        font-weight: 500; transform: translateX(100%); transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.parentNode?.removeChild(notification), 300);
    }, 3000);
}

// Global functions for event handlers
window.openGemstoneModal = openGemstoneModal;
window.featuredProducts = featuredProducts;

// Mobile top bar sliding text animation
function initSlideText() {
    if (window.innerWidth > 768) return;
    const slideTexts = document.querySelectorAll('.slide-text');
    if (slideTexts.length === 0) return;

    slideTexts.forEach(text => text.classList.remove('active'));
    slideTexts[0].classList.add('active');
    let currentIndex = 0;

    function showNextText() {
        slideTexts[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slideTexts.length;
        slideTexts[currentIndex].classList.add('active');
    }

    setInterval(showNextText, 2000);
}

// General Event Handlers
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeMobileMenu();
        elements.countryDropdown?.classList.remove('active');
        elements.countrySelector?.classList.remove('active');
        elements.mobileCountryDropdown?.classList.remove('active');
        elements.mobileCountrySelector?.classList.remove('active');
    } else if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
}

function handleAnchorLinks(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}