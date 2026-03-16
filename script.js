/* =========================================
   Phase 3: Backend & Functional Features
   ========================================= */

// --- 1. Global Variables & State ---
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyC22lONP3wKib71S8r9iU3HqR3Y5I-yD1sN8-nZ5uLqJqT6F/exec'; // Example Mock URL, User needs to replace

let cart = JSON.parse(localStorage.getItem('mountnutra_cart')) || [];

// --- 3. Shopping Cart Logic ---

// Save to LocalStorage
function saveCart() {
    localStorage.setItem('mountnutra_cart', JSON.stringify(cart));
    // Dispatch event so other parts of the app know cart updated
    window.dispatchEvent(new Event('cartUpdated'));
}

// Add Item to Cart
window.addToCart = function(title, price, img) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, img, quantity: 1 });
    }
    
    // Visual feedback
    window.showCart && window.showCart();
    saveCart();
};

// Remove Item
window.removeFromCart = function(title) {
    cart = cart.filter(item => item.title !== title);
    saveCart();
};

// Update Quantity
window.updateQuantity = function(title, newQuantity) {
    const item = cart.find(item => item.title === title);
    if (item) {
        item.quantity = Math.max(1, parseInt(newQuantity) || 1); // Prevent 0 or NaN
        saveCart();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if(mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);
    
    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Testimonial Slider
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (slider && prevBtn && nextBtn) {
        const slideAmount = 350; // Approximate width of a card + gap

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: slideAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -slideAmount, behavior: 'smooth' });
        });
    }

    // --- 3D & GSAP Animations ---
    
    // Initialize Vanilla-Tilt for 3D Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".product-card, .goal-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        const heroTl = gsap.timeline();
        heroTl.from(".hero-title", { y: 50, opacity: 0, duration: 1, ease: "power4.out" })
              .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
              .from(".hero-cta-group .btn", { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)" }, "-=0.4")
              .from(".hero-image-card", { x: 50, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=1");

        // Floating elements in background
        gsap.to(".shape-1", {
            y: "30px",
            x: "20px",
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        gsap.to(".shape-2", {
            y: "-40px",
            x: "-10px",
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Reveal animations for sections
        const revealSections = document.querySelectorAll('.section-header, .product-card, .goal-card, .feature-item, .trust-item');
        
        revealSections.forEach((el) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    // --- Phase 3 DOM Elements & Init ---
    const cartIconElements = document.querySelectorAll('.cart-icon');
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPriceEl = document.getElementById('cartTotalPrice');
    const mainCheckoutBtn = document.getElementById('checkoutBtn');

    const checkoutOverlay = document.getElementById('checkoutOverlay');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const checkoutTotalPriceEl = document.getElementById('checkoutTotalPrice');
    const checkoutForm = document.getElementById('checkoutForm');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    const checkoutSuccessMsg = document.getElementById('checkoutSuccessMessage');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    const successOrderId = document.getElementById('successOrderId');

    const searchInputs = document.querySelectorAll('.search-bar input, .mobile-search input');
    const productCards = document.querySelectorAll('.product-card');

    // Update Cart Count Badge
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(badge => {
            badge.textContent = count;
        });
    }

    // Render Cart UI
    function renderCart() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is currently empty. Add some products!</div>';
            if(mainCheckoutBtn) mainCheckoutBtn.disabled = true;
        } else {
            if(mainCheckoutBtn) mainCheckoutBtn.disabled = false;
            cart.forEach(item => {
                total += item.price * item.quantity;
                
                const cartItemDiv = document.createElement('div');
                cartItemDiv.className = 'cart-item';
                cartItemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="cart-item-actions">
                            <div class="qty-controls">
                                <button type="button" class="qty-btn" onclick="updateQuantity('${item.title}', ${item.quantity - 1})">-</button>
                                <input type="number" class="qty-input" value="${item.quantity}" onchange="updateQuantity('${item.title}', this.value)">
                                <button type="button" class="qty-btn" onclick="updateQuantity('${item.title}', ${item.quantity + 1})">+</button>
                            </div>
                            <button type="button" class="remove-item-btn" onclick="removeFromCart('${item.title}')">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }

        if (cartTotalPriceEl) cartTotalPriceEl.textContent = `₹${total}`;
        if (checkoutTotalPriceEl) checkoutTotalPriceEl.textContent = `₹${total}`;
    }

    // Bind Cart Events to window so global functions can trigger them
    window.addEventListener('cartUpdated', () => {
        updateCartCount();
        renderCart();
    });

    // Cart UI Toggles
    window.showCart = function() {
        if (cartSidebar) {
            cartOverlay.classList.add('active');
            cartSidebar.classList.add('active');
        }
    };

    function hideCart() {
        if (cartSidebar) {
            cartOverlay.classList.remove('active');
            cartSidebar.classList.remove('active');
        }
    }

    // Attach Cart Listeners
    cartIconElements.forEach(icon => {
        icon.addEventListener('click', (e) => { 
            e.preventDefault(); 
            window.showCart(); 
            if(mobileMenu.classList.contains('active')) toggleMenu(); 
        });
    });
    if(closeCartBtn) closeCartBtn.addEventListener('click', hideCart);
    if(cartOverlay) cartOverlay.addEventListener('click', hideCart);

    // Attach Global click logic for "Add to Cart" buttons
    document.body.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.quick-add-btn');
        if (addBtn) {
            e.preventDefault(); // prevent jumping to top
            const card = addBtn.closest('.product-card');
            const title = card.querySelector('.product-title').textContent.trim();
            const priceStr = card.querySelector('.price').textContent.replace('₹', '').trim();
            const price = parseInt(priceStr);
            const img = card.querySelector('img').src;
            
            window.addToCart(title, price, img);
        }
    });

    // --- Checkout Logic ---
    function showCheckout() {
        hideCart();
        if (checkoutOverlay) {
            checkoutOverlay.classList.add('active');
            checkoutModal.classList.add('active');
            checkoutForm.style.display = 'block';
            checkoutSuccessMsg.style.display = 'none';
        }
    }

    function hideCheckout() {
        if (checkoutOverlay) {
            checkoutOverlay.classList.remove('active');
            checkoutModal.classList.remove('active');
        }
    }

    if (mainCheckoutBtn) mainCheckoutBtn.addEventListener('click', showCheckout);
    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', hideCheckout);
    if (checkoutOverlay) checkoutOverlay.addEventListener('click', hideCheckout);

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btnText = confirmOrderBtn.querySelector('.btn-text') || confirmOrderBtn;
            const spinner = confirmOrderBtn.querySelector('.spinner');
            confirmOrderBtn.disabled = true;
            if (btnText.style) btnText.style.opacity = '0.5';
            if (spinner) spinner.style.display = 'inline-block';

            const orderData = {
                customer: {
                    name: document.getElementById('c_name').value,
                    email: document.getElementById('c_email').value,
                    phone: document.getElementById('c_phone').value,
                    address: document.getElementById('c_address').value,
                    street: document.getElementById('c_street').value,
                    pincode: document.getElementById('c_pincode').value,
                    city: document.getElementById('c_city').value,
                    state: document.getElementById('c_state').value,
                    country: "India",
                    paymentMethod: document.querySelector('input[name="payment_method"]:checked').value
                },
                cart: cart,
                total: cart.reduce((t, i) => t + (i.price * i.quantity), 0)
            };

            try {
                // Using no-cors mode for basic Google Apps Script integration
                fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });
                
                // Simulate processing time since no-cors doesn't return readable response
                await new Promise(resolve => setTimeout(resolve, 1500));

                cart = []; 
                saveCart(); 
                successOrderId.textContent = "ORD-" + Math.floor(100000 + Math.random() * 900000);
                
                checkoutForm.style.display = 'none';
                checkoutSuccessMsg.style.display = 'block';

            } catch (error) {
                console.error("Order Failed", error);
            } finally {
                confirmOrderBtn.disabled = false;
                if (btnText.style) btnText.style.opacity = '1';
                if (spinner) spinner.style.display = 'none';
            }
        });

        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => {
                hideCheckout();
                window.location.href = 'collections.html';
            });
        }
    }

    // --- Search Logic ---
    const searchBtns = document.querySelectorAll('.search-bar button, .mobile-search button');

    function executeSearch(val, isSubmit) {
        val = val.toLowerCase().trim();
        
        const isCollectionsPage = window.location.pathname.includes('collections.html');

        // If not on collections page, ONLY redirect if it's a submit action
        if (!isCollectionsPage) {
            if (isSubmit && val) {
                window.location.href = `collections.html?search=${encodeURIComponent(val)}`;
            }
            return;
        }

        // If on collections page, filter live
        if (productCards) {
            let visibleCount = 0;
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                if (title.includes(val)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            const countLabel = document.querySelector('.product-count');
            if (countLabel) {
                const total = productCards.length;
                countLabel.textContent = `Showing ${visibleCount === 0 ? 0 : 1}-${visibleCount} of ${total} results`;
            }
        }
    }

    searchInputs.forEach(input => {
        // Live filter for collections page
        input.addEventListener('input', (e) => executeSearch(e.target.value, false));
        
        // Submit action for Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeSearch(e.target.value, true);
            }
        });
    });

    if (searchBtns) {
        searchBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const input = btn.previousElementSibling;
                if (input) executeSearch(input.value, true);
            });
        });
    }

    // Check url for search query on page load
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        const desktopSearch = document.querySelector('.search-bar input');
        if (desktopSearch) {
            desktopSearch.value = searchQuery;
            executeSearch(searchQuery, false);
        }
    }

    // Initial Cart Render
    updateCartCount();
    renderCart();
});
