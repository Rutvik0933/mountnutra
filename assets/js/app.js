/* ==========================================================================
   Mount Nutra — Complete App JS (Rebuilt)
   ========================================================================== */

// ════════════════════════════════════════════════════════════════
// PRODUCT DATA
// ════════════════════════════════════════════════════════════════
var PRODUCTS = [
  {
    id: 'electrolytes',
    name: 'Essential Electrolytes',
    subTitle: 'Essential Electrolytes with Vitamin + Taurine',
    flavour: 'Lemon Flavour',
    flavourShort: '🍋 Lemon',
    badge: '⚡ Best Seller for Endurance',
    price: 399,
    originalPrice: 599,
    rating: 4.9,
    image: 'assets/images/electrolytes-blue.png',
    hex: '#0252cf',
    hexLight: '#eff6ff',
    benefits: [
      'Rapid Cellular Rehydration & Electrolyte Balance',
      'Infused with Essential Vitamins (B-Complex, C) & Taurine',
      'Prevents Painful Muscle Cramps & Fatigue'
    ],
    description: 'Complete electrolyte replenishment powered by clinically validated bioavailable minerals with advanced Vitamin B-Complex and Taurine matrix. Designed for athletes, high-performance professionals, and daily wellness enthusiasts who demand peak hydration.',
    nutrition: [
      { name: 'Sodium (as Sodium Chloride)', amount: '400 mg' },
      { name: 'Potassium (as Potassium Chloride)', amount: '200 mg' },
      { name: 'Magnesium (as Magnesium Sulphate)', amount: '60 mg' },
      { name: 'Taurine', amount: '500 mg' },
      { name: 'Vitamin B6 (Pyridoxine HCl)', amount: '2 mg' },
      { name: 'Vitamin C (Ascorbic Acid)', amount: '60 mg' },
      { name: 'Added Sugar', amount: '0.0 g' }
    ]
  },
  {
    id: 'amla-c',
    name: 'Amla C & Zinc',
    subTitle: 'Triple Immunity Shield with Ayurvedic Amla',
    flavour: 'Orange Flavour',
    flavourShort: '🍊 Orange',
    badge: '🛡️ #1 Immunity Stack',
    price: 349,
    originalPrice: 549,
    rating: 4.8,
    image: 'assets/images/amla-orange.png',
    hex: '#ea580c',
    hexLight: '#fff7ed',
    benefits: [
      'Triple-Powered Immunity Defense (Amla + Zinc + Vitamin C)',
      'Fights Seasonal Infections, Cold & Flu Rapidly',
      'Potent Anti-Oxidant Shield Against Free Radical Damage'
    ],
    description: 'A triple-synergy immunity booster combining India\'s most potent Ayurvedic superfood Amla with high-potency Zinc and pharmaceutical-grade Vitamin C. Each tablet delivers 20x the Vitamin C of an orange with zero added sugar.',
    nutrition: [
      { name: 'Amla Extract (Emblica officinalis)', amount: '200 mg' },
      { name: 'Zinc (as Zinc Sulphate)', amount: '15 mg' },
      { name: 'Vitamin C (Ascorbic Acid)', amount: '500 mg' },
      { name: 'Elderberry Extract', amount: '100 mg' },
      { name: 'Echinacea Extract', amount: '50 mg' },
      { name: 'Added Sugar', amount: '0.0 g' }
    ]
  },
  {
    id: 'acv-moringa',
    name: 'ACV Moringa',
    subTitle: 'Metabolic Activator with Superfood Moringa',
    flavour: 'Green Apple Flavour',
    flavourShort: '🍏 Green Apple',
    badge: '🔥 Top Weight Management',
    price: 379,
    originalPrice: 579,
    rating: 4.7,
    image: 'assets/images/acv-green.png',
    hex: '#15803d',
    hexLight: '#f0fdf4',
    benefits: [
      'Clinically Proven ACV for Appetite & Blood Sugar Control',
      'Moringa Superfood Boosts Metabolism & Detoxification',
      'Supports Healthy Weight Management & Gut Microbiome'
    ],
    description: 'Precision metabolic formula combining the clinically validated power of Apple Cider Vinegar (2500mg equivalent) with nutrient-dense Moringa Oleifera to supercharge fat metabolism, stabilize blood sugar spikes, and promote healthy gut flora.',
    nutrition: [
      { name: 'Apple Cider Vinegar Powder', amount: '500 mg' },
      { name: 'Moringa Extract (Moringa oleifera)', amount: '200 mg' },
      { name: 'Chromium Picolinate', amount: '200 mcg' },
      { name: 'Inulin (Prebiotic Fiber)', amount: '250 mg' },
      { name: 'Green Tea Extract (EGCG)', amount: '100 mg' },
      { name: 'Added Sugar', amount: '0.0 g' }
    ]
  },
  {
    id: 'glutathione',
    name: 'Glutathione Vit. C',
    subTitle: 'Bioavailable Skin Brightening & Glow Formula',
    flavour: 'Watermelon Flavour',
    flavourShort: '🍉 Watermelon',
    badge: '✨ #1 Skin Glow Formula',
    price: 449,
    originalPrice: 699,
    rating: 4.9,
    image: 'assets/images/glutathione-red.png',
    hex: '#e31c3d',
    hexLight: '#fff1f2',
    benefits: [
      'High-Potency L-Glutathione (500mg) for Glass Skin Radiance',
      'Fights Active Acne, Inflammation & Environmental Free Radicals',
      'Refreshing Watermelon Taste with 90%+ Superior Bioavailability'
    ],
    description: 'Unlock luminous, spot-free glass skin from within. High-potency L-Glutathione pairs with Vitamin C and Hyaluronic Acid to inhibit melanin enzyme pathways and restore skin elasticity with maximum cellular absorption.',
    nutrition: [
      { name: 'L-Glutathione (Reduced Form)', amount: '500 mg' },
      { name: 'Vitamin C (Ascorbic Acid)', amount: '100 mg' },
      { name: 'Hyaluronic Acid (Low Molecular Weight)', amount: '50 mg' },
      { name: 'Vitamin E (Tocopherol)', amount: '10 mg' },
      { name: 'Grape Seed Extract', amount: '50 mg' },
      { name: 'Added Sugar', amount: '0.0 g' }
    ]
  }
];

// Load Admin Edited Products if available
const _savedAdminProds = localStorage.getItem('mount_nutra_products');
if (_savedAdminProds) {
  try {
    const adminProds = JSON.parse(_savedAdminProds);
    PRODUCTS = adminProds.map(ap => {
      const original = PRODUCTS.find(p => p.id === ap.id);
      return {
        ...original,
        ...ap,
        image: ap.image && ap.image.startsWith('../') ? ap.image.substring(3) : ap.image,
        benefits: ap.benefits || (original ? original.benefits : ['Benefit 1', 'Benefit 2']),
        nutrition: ap.nutrition || (original ? original.nutrition : [{ name: 'Placeholder', amount: '10g' }])
      };
    });
  } catch(e) { console.warn('Could not load admin products', e); }
}

// ════════════════════════════════════════════════════════════════
// APP STATE
// ════════════════════════════════════════════════════════════════
var state = {
  currentUser: JSON.parse(localStorage.getItem('mount_nutra_current_user') || 'null'),
  activeHeroIndex: 0,
  cart: JSON.parse(localStorage.getItem('mount_nutra_cart') || '[]'),
  selectedBundleProducts: ['electrolytes', 'amla-c', 'acv-moringa', 'glutathione'],
  appliedCoupon: null,
  activeQuizStep: 0,
  quizAnswers: {},
  currency: 'INR',
  currencySymbol: '₹'
};

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  loadSiteSettings();
  initHeroBubbles();
  renderProductsGrid();
  renderBundleBuilder();
  updateCartBadge();
  updateUserNav();
  setupEventListeners();
  switchHeroProduct(0);
  renderQuiz();
  lucide && lucide.createIcons();
});

// ════════════════════════════════════════════════════════════════
// CANVAS BUBBLES
// ════════════════════════════════════════════════════════════════
let heroBubblesEngine = null;
let simBubblesEngine = null;

function initHeroBubbles() {
  if (typeof BubblesEngine === 'undefined') return;
  heroBubblesEngine = new BubblesEngine('heroCanvas', {
    bubbleCount: 35, minRadius: 2, maxRadius: 5.5, accentColor: PRODUCTS[0].hex
  });
  simBubblesEngine = new BubblesEngine('simCanvas', {
    bubbleCount: 60, minRadius: 1.5, maxRadius: 4, accentColor: PRODUCTS[0].hex
  });
}

// ════════════════════════════════════════════════════════════════
// HERO PRODUCT SWITCHER
// ════════════════════════════════════════════════════════════════
function switchHeroProduct(index) {
  state.activeHeroIndex = index;
  const p = PRODUCTS[index];
  if (!p) return;

  const heroImg = document.getElementById('heroProductImg');
  const heroTitle = document.getElementById('heroProductTitle');
  const heroSubTitle = document.getElementById('heroProductSubTitle');
  const heroBadge = document.getElementById('heroProductBadge');
  const heroFlavour = document.getElementById('heroFlavourPill');
  const heroPrice = document.getElementById('heroProductPrice');
  const heroOrigPrice = document.getElementById('heroProductOriginalPrice');
  const heroBenefits = document.getElementById('heroBenefitsList');
  const heroGlow = document.getElementById('heroGlowOrb');

  if (heroImg) { heroImg.src = p.image; heroImg.style.opacity = '0'; setTimeout(() => heroImg.style.opacity = '1', 50); }
  if (heroTitle) { heroTitle.innerText = p.name; heroTitle.style.background = `linear-gradient(135deg, ${p.hex}, ${p.hex}99)`; heroTitle.style.webkitBackgroundClip = 'text'; heroTitle.style.webkitTextFillColor = 'transparent'; }
  if (heroSubTitle) heroSubTitle.innerText = p.subTitle;
  if (heroBadge) { heroBadge.innerText = p.badge; heroBadge.style.color = p.hex; heroBadge.style.borderColor = p.hex + '55'; heroBadge.style.background = p.hexLight; }
  if (heroFlavour) { heroFlavour.innerText = p.flavourShort; heroFlavour.style.color = p.hex; heroFlavour.style.borderColor = p.hex + '44'; heroFlavour.style.background = p.hexLight; }
  if (heroPrice) heroPrice.innerText = `₹${p.price}`;
  if (heroOrigPrice) heroOrigPrice.innerText = `₹${p.originalPrice}`;
  if (heroGlow) heroGlow.style.background = `radial-gradient(circle, ${p.hex}30, transparent)`;
  if (heroBenefits) {
    heroBenefits.innerHTML = p.benefits.map(b => `
      <li class="flex items-start gap-2.5 text-sm text-slate-700">
        <span class="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 shrink-0" style="background:${p.hex}">✓</span>
        <span>${b}</span>
      </li>`).join('');
  }

  // Update flavor buttons
  document.querySelectorAll('.hero-flavor-btn').forEach((btn, i) => {
    btn.style.background = i === index ? PRODUCTS[i].hex : '';
    btn.style.color = i === index ? '#fff' : '';
    btn.style.borderColor = i === index ? PRODUCTS[i].hex : '';
  });

  // Update sim bubbles color
  if (simBubblesEngine) simBubblesEngine.updateColor(p.hex);
  if (heroBubblesEngine) heroBubblesEngine.updateColor(p.hex);
}

// ════════════════════════════════════════════════════════════════
// PRODUCTS GRID
// ════════════════════════════════════════════════════════════════
function renderProductsGrid() {
  const container = document.getElementById('productsGrid');
  if (!container) return;
  container.innerHTML = PRODUCTS.map(p => `
    <div class="glass-card group rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white cursor-pointer" onclick="openProductModal('${p.id}')">
      <div class="relative overflow-hidden" style="background: linear-gradient(135deg, ${p.hexLight}, white); height: 200px;">
        <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" onerror="this.src='assets/images/logo.svg'">
        <div class="absolute top-3 left-3">
          <span class="text-[10px] font-bold px-2.5 py-1 rounded-full" style="color:${p.hex}; background:${p.hexLight}; border:1px solid ${p.hex}44">${p.badge}</span>
        </div>
      </div>
      <div class="p-5">
        <h3 class="text-base font-bold text-slate-900">${p.name}</h3>
        <p class="text-xs text-slate-500 mt-0.5">${p.subTitle}</p>
        <div class="flex items-center gap-2 mt-3">
          <span class="text-lg font-black text-slate-900">₹${p.price}</span>
          <span class="text-sm text-slate-400 line-through">₹${p.originalPrice}</span>
          <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">${Math.round((1-p.price/p.originalPrice)*100)}% OFF</span>
        </div>
        <div class="text-xs text-amber-500 font-semibold mt-1">★ ${p.rating} (1,400+ ratings)</div>
        <div class="flex gap-2 mt-4">
          <button onclick="event.stopPropagation(); addToCart('${p.id}', 1)" class="flex-1 py-2.5 rounded-xl text-white font-bold text-xs transition active:scale-95" style="background:${p.hex}">
            🛒 Add to Cart
          </button>
          <button onclick="event.stopPropagation(); openProductModal('${p.id}')" class="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition">
            Info
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════════════════════════
// PRODUCT MODAL
// ════════════════════════════════════════════════════════════════
function openProductModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const modal = document.getElementById('productModal');
  if (!modal) return;

  document.getElementById('modalProductName').innerText = p.name;
  document.getElementById('modalProductSubTitle').innerText = p.subTitle;
  document.getElementById('modalProductDesc').innerText = p.description;
  document.getElementById('modalProductImg').src = p.image;
  document.getElementById('modalProductPrice').innerText = `₹${p.price}`;
  document.getElementById('modalProductOrigPrice').innerText = `₹${p.originalPrice}`;
  document.getElementById('modalProductBadge').innerText = p.badge;
  document.getElementById('modalProductBadge').style.color = p.hex;
  document.getElementById('modalProductBadge').style.background = p.hexLight;
  document.getElementById('modalProductBadge').style.borderColor = p.hex + '44';
  document.getElementById('modalAddBtn').onclick = () => { addToCart(p.id, 1); closeProductModal(); };

  const nutritionContainer = document.getElementById('modalNutritionTable');
  if (nutritionContainer) {
    nutritionContainer.innerHTML = p.nutrition.map(n => `
      <div class="flex justify-between py-2 border-b border-slate-100 last:border-0 text-xs">
        <span class="text-slate-700 font-medium">${n.name}</span>
        <span class="text-slate-900 font-bold">${n.amount}</span>
      </div>`).join('');
  }

  const benefitsContainer = document.getElementById('modalBenefits');
  if (benefitsContainer) {
    benefitsContainer.innerHTML = p.benefits.map(b => `
      <li class="flex items-start gap-2 text-xs text-slate-700">
        <span class="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 shrink-0" style="background:${p.hex}">✓</span>
        <span>${b}</span>
      </li>`).join('');
  }

  modal.classList.add('open');
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('open');
}

// ════════════════════════════════════════════════════════════════
// CART
// ════════════════════════════════════════════════════════════════
function addToCart(productId, qty = 1) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({
      id: p.id, name: p.name, price: p.price, image: p.image,
      variant: p.flavourShort, quantity: qty
    });
  }
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast(`✅ ${p.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) removeFromCart(productId);
  else { saveCart(); updateCartBadge(); renderCartDrawer(); }
}

function saveCart() {
  localStorage.setItem('mount_nutra_cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
  const total = state.cart.reduce((s, i) => s + i.quantity, 0);
  document.querySelectorAll('.cart-count-badge').forEach(el => {
    el.innerText = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function openCartDrawer() {
  renderCartDrawer();
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) backdrop.classList.add('open');
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (backdrop) backdrop.classList.remove('open');
}

function renderCartDrawer() {
  const listEl = document.getElementById('cartItemsList');
  if (!listEl) return;

  if (state.cart.length === 0) {
    listEl.innerHTML = `<div class="flex flex-col items-center justify-center py-16 text-slate-400">
      <span class="text-5xl mb-3">🛒</span>
      <p class="font-semibold text-slate-600">Your cart is empty</p>
      <p class="text-xs mt-1">Add some products to get started!</p>
    </div>`;
  } else {
    listEl.innerHTML = state.cart.map(item => `
      <div class="flex items-center gap-3 bg-slate-50 rounded-2xl p-3 border border-slate-100">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-16 object-contain shrink-0" onerror="this.src='assets/images/logo.svg'">
        <div class="flex-1 min-w-0">
          <div class="text-xs font-bold text-slate-900 truncate">${item.name}</div>
          <div class="text-[10px] text-slate-500">${item.variant}</div>
          <div class="text-sm font-extrabold text-slate-900 mt-0.5">₹${item.price}</div>
        </div>
        <div class="flex flex-col items-end gap-2">
          <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-rose-600 transition text-xs">✕</button>
          <div class="flex items-center gap-1 bg-white border border-slate-200 rounded-lg">
            <button onclick="updateCartQty('${item.id}', -1)" class="w-6 h-6 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center font-bold text-sm transition">-</button>
            <span class="text-xs font-bold text-slate-900 px-1">${item.quantity}</span>
            <button onclick="updateCartQty('${item.id}', 1)" class="w-6 h-6 text-slate-600 hover:bg-slate-100 rounded flex items-center justify-center font-bold text-sm transition">+</button>
          </div>
        </div>
      </div>`).join('');
  }

  // Update totals
  const subtotal = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 49;
  let couponDisc = 0;
  if (state.appliedCoupon && state.appliedCoupon.discount) couponDisc = state.appliedCoupon.discount;
  const grandTotal = Math.max(0, subtotal - couponDisc + shipping);

  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('cartDiscountRow');
  const discountEl = document.getElementById('cartDiscount');
  const shippingEl = document.getElementById('cartShipping');
  const grandEl = document.getElementById('cartGrandTotal');

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal.toLocaleString()}`;
  if (shippingEl) shippingEl.innerText = shipping === 0 ? 'FREE' : `₹${shipping}`;
  if (grandEl) grandEl.innerText = `₹${grandTotal.toLocaleString()}`;
  if (discountRow && discountEl) {
    discountRow.style.display = couponDisc > 0 ? 'flex' : 'none';
    discountEl.innerText = `-₹${couponDisc}`;
  }

  // Free shipping progress
  const threshold = 500;
  const progress = Math.min(100, (subtotal / threshold) * 100);
  const freeShipText = document.getElementById('freeShippingText');
  const freeShipBar = document.getElementById('freeShippingProgressBar');
  if (freeShipText) {
    freeShipText.innerHTML = subtotal >= threshold
      ? '🎉 You\'ve unlocked <strong>FREE Express Shipping!</strong>'
      : `Add <strong>₹${threshold - subtotal}</strong> more for <strong>FREE Express Shipping</strong>!`;
  }
  if (freeShipBar) freeShipBar.style.width = progress + '%';
}

// ════════════════════════════════════════════════════════════════
// PROMO CODE
// ════════════════════════════════════════════════════════════════
function applyCouponCode() {
  const input = document.getElementById('couponCodeInput');
  const code = (input?.value || '').trim().toUpperCase();
  if (!code) { showToast('Please enter a promo code.', 'warning'); return; }

  const subtotal = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  if (subtotal === 0) { showToast('Add items to cart first.', 'warning'); return; }

  const adminCodes = JSON.parse(localStorage.getItem('mount_nutra_promo_codes') || '[]');
  const match = adminCodes.find(c => c.code === code && c.active);

  if (match) {
    if (match.expiry && new Date(match.expiry) < new Date()) { showToast('This promo code has expired.', 'error'); return; }
    if (match.minOrder && subtotal < match.minOrder) { showToast(`Min. order ₹${match.minOrder} required for this code.`, 'warning'); return; }
    let discount = match.discountType === 'percent'
      ? Math.round(subtotal * match.discountValue / 100)
      : Math.min(match.discountValue, subtotal);
    state.appliedCoupon = { code, discount };
    showToast(`✅ "${code}" applied! You save ₹${discount}`, 'success');
    renderCartDrawer();
    return;
  }

  // Built-in codes
  const builtIn = { 'MOUNT20': 0.20, 'FIZZ10': 0.10, 'WELCOME15': 0.15 };
  if (builtIn[code]) {
    const discount = Math.round(subtotal * builtIn[code]);
    state.appliedCoupon = { code, discount };
    showToast(`✅ "${code}" applied! You save ₹${discount}`, 'success');
    renderCartDrawer();
    return;
  }

  showToast('Invalid or expired promo code.', 'error');
}

// ════════════════════════════════════════════════════════════════
// CHECKOUT
// ════════════════════════════════════════════════════════════════
function proceedToCheckout() {
  if (state.cart.length === 0) { showToast('Your cart is empty!', 'warning'); return; }
  if (!state.currentUser) { openAuthModal('login'); return; }

  closeCartDrawer();
  renderCheckoutSummary();
  renderSavedAddresses();
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.add('open');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('open');
}

function renderSavedAddresses() {
  const container = document.getElementById('addressBookContainer');
  const addBtn = document.getElementById('addNewAddressBtn');
  const newForm = document.getElementById('newAddressForm');
  if (!container) return;

  const user = state.currentUser;
  const addresses = user ? (user.addresses || []) : [];

  if (addresses.length === 0) {
    container.innerHTML = '';
    if (newForm) newForm.classList.remove('hidden');
    if (addBtn) addBtn.classList.add('hidden');
    return;
  }

  if (addBtn) addBtn.classList.remove('hidden');
  container.innerHTML = addresses.map((a, i) => `
    <label class="flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${a.isDefault ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}">
      <input type="radio" name="savedAddr" value="${i}" ${a.isDefault ? 'checked' : ''} class="mt-1 text-blue-600">
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm text-slate-900">${a.name}</span>
          ${a.isDefault ? '<span class="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">Default</span>' : ''}
        </div>
        <p class="text-xs text-slate-600 mt-0.5">${a.address}, ${a.area}, ${a.city}, ${a.state} - ${a.pincode}</p>
        <p class="text-xs text-slate-500">📞 ${a.phone}</p>
      </div>
      <button type="button" onclick="deleteAddressFromCheckout(${i})" class="text-slate-400 hover:text-rose-600 text-xs p-1 transition">🗑</button>
    </label>`).join('');
}

function showNewAddressForm() {
  const form = document.getElementById('newAddressForm');
  if (form) form.classList.remove('hidden');
}

function deleteAddressFromCheckout(index) {
  if (!state.currentUser) return;
  state.currentUser.addresses.splice(index, 1);
  if (state.currentUser.addresses.length > 0 && !state.currentUser.addresses.some(a => a.isDefault)) {
    state.currentUser.addresses[0].isDefault = true;
  }
  localStorage.setItem('mount_nutra_current_user', JSON.stringify(state.currentUser));
  const users = JSON.parse(localStorage.getItem('mount_nutra_users') || '[]');
  const idx = users.findIndex(u => u.email === state.currentUser.email);
  if (idx > -1) { users[idx] = state.currentUser; localStorage.setItem('mount_nutra_users', JSON.stringify(users)); }
  renderSavedAddresses();
}

function saveNewAddress() {
  const name = document.getElementById('checkoutName')?.value.trim();
  const phone = document.getElementById('checkoutPhone')?.value.trim();
  const email = document.getElementById('checkoutEmail')?.value.trim();
  const address = document.getElementById('checkoutAddress')?.value.trim();
  const pincode = document.getElementById('checkoutPincode')?.value.trim();
  const state_ = document.getElementById('checkoutState')?.value.trim();
  const city = document.getElementById('checkoutCity')?.value.trim();
  const area = document.getElementById('checkoutArea')?.value.trim();

  if (!name || !phone || !address || !city || !state_ || !pincode) {
    showToast('Please fill all required fields.', 'warning'); return;
  }
  if (!/^\d{10}$/.test(phone)) { showToast('Please enter a valid 10-digit phone number.', 'warning'); return; }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Please enter a valid email.', 'warning'); return; }

  if (!state.currentUser) { showToast('Please login first.', 'warning'); return; }
  if (!state.currentUser.addresses) state.currentUser.addresses = [];
  const isFirst = state.currentUser.addresses.length === 0;
  const newAddr = { name, phone, email, address, area, city, state: state_, pincode, isDefault: isFirst };
  state.currentUser.addresses.push(newAddr);

  localStorage.setItem('mount_nutra_current_user', JSON.stringify(state.currentUser));
  const users = JSON.parse(localStorage.getItem('mount_nutra_users') || '[]');
  const idx = users.findIndex(u => u.email === state.currentUser.email);
  if (idx > -1) { users[idx] = state.currentUser; localStorage.setItem('mount_nutra_users', JSON.stringify(users)); }

  document.getElementById('newAddressForm').classList.add('hidden');
  renderSavedAddresses();
  showToast('Address saved!', 'success');
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutSummaryItems');
  if (!container) return;

  container.innerHTML = state.cart.map(item => `
    <div class="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-sm">
      <img src="${item.image}" alt="${item.name}" class="w-10 h-14 object-contain" onerror="this.src='assets/images/logo.svg'">
      <div class="flex-1 min-w-0">
        <h5 class="text-xs font-bold text-slate-900 truncate">${item.name}</h5>
        <div class="text-[10px] text-slate-500">${item.variant}</div>
        <div class="text-xs font-bold text-slate-800 mt-0.5">₹${item.price} <span class="text-[10px] text-slate-400 font-normal">x ${item.quantity}</span></div>
      </div>
      <div class="text-sm font-extrabold text-blue-600">₹${item.price * item.quantity}</div>
    </div>`).join('');

  const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 49;
  let couponDiscount = state.appliedCoupon?.discount || 0;
  const upiSelected = document.querySelector('input[name="pay"][value="upi"]')?.checked;
  const upiDiscount = upiSelected ? 20 : 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount - upiDiscount + shipping);

  document.getElementById('checkoutSubtotal').innerText = `₹${subtotal.toLocaleString()}`;
  document.getElementById('checkoutShipping').innerText = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.getElementById('checkoutGrandTotal').innerText = `₹${grandTotal.toLocaleString()}`;

  const discountRow = document.getElementById('checkoutDiscountRow');
  if (discountRow) { discountRow.style.display = couponDiscount > 0 ? 'flex' : 'none'; }
  const discountEl = document.getElementById('checkoutDiscount');
  if (discountEl) discountEl.innerText = `-₹${couponDiscount}`;
  const upiRow = document.getElementById('checkoutUpiDiscountRow');
  if (upiRow) upiRow.style.display = upiSelected ? 'flex' : 'none';
}

function togglePaymentDetails() {
  const payMethod = document.querySelector('input[name="pay"]:checked')?.value;
  const cardSection = document.getElementById('cardDetailsSection');
  if (cardSection) cardSection.classList.toggle('hidden', payMethod !== 'card');
  const upiRow = document.getElementById('checkoutUpiDiscountRow');
  if (upiRow) upiRow.style.display = payMethod === 'upi' ? 'flex' : 'none';
  renderCheckoutSummary();
}

function formatCardNumber(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function formatCardExpiry(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
  input.value = v;
}

// ─── Razorpay Payment ─────────────────────────────────────────
function submitSimulatedOrder(event) {
  event.preventDefault();

  const payMethod = document.querySelector('input[name="pay"]:checked')?.value || 'upi';

  // Gather address
  let customerData = {};
  const selectedAddrIndex = document.querySelector('input[name="savedAddr"]:checked')?.value;
  if (selectedAddrIndex !== undefined && state.currentUser?.addresses?.length > 0) {
    const addr = state.currentUser.addresses[parseInt(selectedAddrIndex)];
    customerData = { name: addr.name, phone: addr.phone, email: addr.email || state.currentUser?.email, address: addr.address, area: addr.area, city: addr.city, state: addr.state, pincode: addr.pincode };
  } else {
    customerData = {
      name: document.getElementById('checkoutName')?.value,
      phone: document.getElementById('checkoutPhone')?.value,
      email: document.getElementById('checkoutEmail')?.value || state.currentUser?.email,
      address: document.getElementById('checkoutAddress')?.value,
      area: document.getElementById('checkoutArea')?.value,
      city: document.getElementById('checkoutCity')?.value,
      state: document.getElementById('checkoutState')?.value,
      pincode: document.getElementById('checkoutPincode')?.value,
    };
  }

  const subtotal = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 500 ? 0 : 49;
  const couponDiscount = state.appliedCoupon?.discount || 0;
  const upiDiscount = payMethod === 'upi' ? 20 : 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount - upiDiscount + shipping);

  if (payMethod === 'upi' || payMethod === 'cod') {
    // Simulate payment for UPI and COD
    placeOrder(customerData, payMethod, grandTotal);
  } else if (payMethod === 'card') {
    // Launch Razorpay
    launchRazorpay(customerData, grandTotal);
  }
}

function launchRazorpay(customerData, amount) {
  const settings = JSON.parse(localStorage.getItem('mount_nutra_settings') || '{}');
  const rzpKey = settings.razorpayKey || 'rzp_test_XXXXXXXXXXXXXXXXXX'; // Test key from admin

  if (!window.Razorpay) {
    showToast('Razorpay not loaded. Processing as simulation...', 'info');
    placeOrder(customerData, 'card', amount);
    return;
  }

  const options = {
    key: rzpKey,
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    name: 'Mount Nutra™',
    description: 'Premium Effervescent Wellness',
    image: 'assets/images/logo.svg',
    prefill: { name: customerData.name, email: customerData.email, contact: customerData.phone },
    theme: { color: '#0252cf' },
    handler: function(response) {
      placeOrder(customerData, 'card', amount, response.razorpay_payment_id);
    },
    modal: {
      ondismiss: function() { showToast('Payment cancelled.', 'info'); }
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

function placeOrder(customerData, payMethod, grandTotal, paymentId = null) {
  const orderId = '#MN-' + Date.now();
  const order = {
    id: orderId,
    userId: state.currentUser?.email,
    customer: customerData,
    items: state.cart.map(i => ({ ...i })),
    totalAmount: `₹${grandTotal.toLocaleString()}`,
    grandTotal,
    paymentMethod: payMethod,
    paymentId,
    status: 'Processing',
    date: new Date().toISOString(),
    coupon: state.appliedCoupon?.code || null
  };

  const orders = JSON.parse(localStorage.getItem('mount_nutra_orders') || '[]');
  orders.push(order);
  localStorage.setItem('mount_nutra_orders', JSON.stringify(orders));

  // Notify admin (new order badge count)
  const adminNotifs = JSON.parse(localStorage.getItem('mount_nutra_admin_notifs') || '{"newOrders":0,"newUsers":0}');
  adminNotifs.newOrders++;
  localStorage.setItem('mount_nutra_admin_notifs', JSON.stringify(adminNotifs));

  // Clear cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartBadge();

  closeCheckoutModal();
  openOrderSuccessModal(orderId);
}

function openOrderSuccessModal(orderId) {
  const modal = document.getElementById('orderSuccessModal');
  const idEl = document.getElementById('orderSuccessId');
  if (idEl) idEl.innerText = orderId;
  if (modal) modal.classList.add('open');
}

function closeOrderSuccessModal() {
  const modal = document.getElementById('orderSuccessModal');
  if (modal) modal.classList.remove('open');
}

// ════════════════════════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════════════════════════
function openAuthModal(tab) {
  closeCartDrawer();
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('open');
  switchAuthTab(tab || 'login');
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('open');
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  if (!loginForm || !registerForm) return;

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    if (tabLogin) { tabLogin.classList.add('text-slate-900', 'border-slate-900'); tabLogin.classList.remove('text-slate-400', 'border-transparent'); }
    if (tabRegister) { tabRegister.classList.add('text-slate-400', 'border-transparent'); tabRegister.classList.remove('text-slate-900', 'border-slate-900'); }
  } else {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    if (tabRegister) { tabRegister.classList.add('text-slate-900', 'border-slate-900'); tabRegister.classList.remove('text-slate-400', 'border-transparent'); }
    if (tabLogin) { tabLogin.classList.add('text-slate-400', 'border-transparent'); tabLogin.classList.remove('text-slate-900', 'border-slate-900'); }
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const users = JSON.parse(localStorage.getItem('mount_nutra_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) { showToast('Invalid email or password.', 'error'); return; }
  state.currentUser = user;
  localStorage.setItem('mount_nutra_current_user', JSON.stringify(user));
  updateUserNav();
  showToast(`Welcome back, ${user.name}! 👋`, 'success');
  closeAuthModal();
  proceedToCheckout();
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const phone = document.getElementById('registerPhone').value.trim();
  const password = document.getElementById('registerPassword').value;

  if (!name || !email || !phone || !password) { showToast('Please fill all fields.', 'warning'); return; }
  if (!/^[a-zA-Z\s]+$/.test(name)) { showToast('Name should contain only letters.', 'warning'); return; }
  if (!/^\d{10}$/.test(phone)) { showToast('Phone must be exactly 10 digits.', 'warning'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Please enter a valid email.', 'warning'); return; }
  if (password.length < 6) { showToast('Password must be at least 6 characters.', 'warning'); return; }

  const users = JSON.parse(localStorage.getItem('mount_nutra_users') || '[]');
  if (users.find(u => u.email === email)) { showToast('Account already exists with this email.', 'warning'); return; }

  const newUser = { id: 'USR-' + Date.now(), name, email, phone, password, registeredAt: new Date().toISOString(), addresses: [] };
  users.push(newUser);
  localStorage.setItem('mount_nutra_users', JSON.stringify(users));

  // Admin notification
  const adminNotifs = JSON.parse(localStorage.getItem('mount_nutra_admin_notifs') || '{"newOrders":0,"newUsers":0}');
  adminNotifs.newUsers++;
  localStorage.setItem('mount_nutra_admin_notifs', JSON.stringify(adminNotifs));

  state.currentUser = newUser;
  localStorage.setItem('mount_nutra_current_user', JSON.stringify(newUser));
  updateUserNav();
  showToast(`Welcome to Mount Nutra, ${name}! 🎉`, 'success');
  closeAuthModal();
  proceedToCheckout();
}

// ════════════════════════════════════════════════════════════════
// USER NAV
// ════════════════════════════════════════════════════════════════
function updateUserNav() {
  const user = state.currentUser;
  const loggedOut = document.getElementById('userMenuLoggedOut');
  const loggedIn = document.getElementById('userMenuLoggedIn');
  const nameEl = document.getElementById('userNavName');

  if (user) {
    if (loggedOut) loggedOut.classList.add('hidden');
    if (loggedIn) loggedIn.classList.remove('hidden');
    if (nameEl) nameEl.innerText = user.name ? user.name.split(' ')[0] : 'Account';
    const nameDisp = document.getElementById('userMenuDisplayName');
    const emailDisp = document.getElementById('userMenuDisplayEmail');
    if (nameDisp) nameDisp.innerText = user.name || 'User';
    if (emailDisp) emailDisp.innerText = user.email || '';
  } else {
    if (loggedOut) loggedOut.classList.remove('hidden');
    if (loggedIn) loggedIn.classList.add('hidden');
    if (nameEl) nameEl.innerText = 'Account';
  }
}

function toggleUserMenu() {
  document.getElementById('userDropdownMenu')?.classList.toggle('hidden');
}

function closeUserMenu() {
  document.getElementById('userDropdownMenu')?.classList.add('hidden');
}

function logoutUser() {
  if (!confirm('Are you sure you want to logout?')) return;
  state.currentUser = null;
  localStorage.removeItem('mount_nutra_current_user');
  updateUserNav();
  showToast('You have been logged out.', 'info');
}

document.addEventListener('click', (e) => {
  const c = document.getElementById('userMenuContainer');
  if (c && !c.contains(e.target)) closeUserMenu();
});

// ════════════════════════════════════════════════════════════════
// SITE SETTINGS
// ════════════════════════════════════════════════════════════════
function loadSiteSettings() {
  const settings = JSON.parse(localStorage.getItem('mount_nutra_settings') || '{}');
  const bar = document.getElementById('announcementBar');
  const barText = document.getElementById('announcementText');
  if (bar) {
    if (settings.announcementActive === false) bar.style.display = 'none';
    else if (settings.announcementText && barText) barText.innerHTML = settings.announcementText;
  }
  if (settings.socialInstagram) { const el = document.getElementById('footerInstagram'); if (el) el.href = settings.socialInstagram; }
  if (settings.socialWhatsapp) {
    const wa = document.getElementById('footerWhatsapp'); if (wa) wa.href = `https://wa.me/${settings.socialWhatsapp}`;
    const waBtn = document.getElementById('whatsappFloatBtn'); if (waBtn) waBtn.href = `https://wa.me/${settings.socialWhatsapp}`;
  }
  if (settings.socialFacebook) { const el = document.getElementById('footerFacebook'); if (el) el.href = settings.socialFacebook; }
  const waBtn = document.getElementById('whatsappFloatBtn');
  if (waBtn && settings.whatsappBtnActive === false) waBtn.style.display = 'none';
}

function loadSiteContent() {
  const content = JSON.parse(localStorage.getItem('mount_nutra_content') || '{}');
  if (content.heroTitle) { const el = document.getElementById('storefrontHeroTitle'); if (el) el.innerText = content.heroTitle; }
  if (content.heroSub) { const el = document.getElementById('storefrontHeroSub'); if (el) { el.innerText = content.heroSub; el.classList.remove('hidden'); } }
  if (content.scienceTitle) { const el = document.getElementById('storefrontScienceTitle'); if (el) el.innerText = content.scienceTitle; }
  if (content.scienceText) { const el = document.getElementById('storefrontScienceText'); if (el) el.innerText = content.scienceText; }
}

// ════════════════════════════════════════════════════════════════
// BUNDLE BUILDER
// ════════════════════════════════════════════════════════════════
function renderBundleBuilder() {
  const container = document.getElementById('bundleBuilderProducts');
  if (!container) return;
  container.innerHTML = PRODUCTS.map(p => `
    <div onclick="toggleBundleProduct('${p.id}')" id="bundle-card-${p.id}"
      class="bundle-product-card flex items-center justify-between rounded-2xl border-2 p-4 sm:p-5 cursor-pointer transition-all duration-300 ${state.selectedBundleProducts.includes(p.id) ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]' : 'border-slate-200 bg-white hover:border-slate-400'}"
      style="${state.selectedBundleProducts.includes(p.id) ? `border-color:${p.hex}; background:${p.hexLight}` : ''}">
      
      <div class="flex items-center gap-4 sm:gap-6">
        <div class="relative">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shadow-inner" style="background: white">
            <img src="${p.image}" alt="${p.name}" class="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 ${state.selectedBundleProducts.includes(p.id) ? 'scale-110 drop-shadow-md' : ''}" onerror="this.src='assets/images/logo.svg'">
          </div>
          ${state.selectedBundleProducts.includes(p.id) ? `
          <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md" style="background:${p.hex}">
            ✓
          </div>` : ''}
        </div>
        
        <div>
          <h4 class="text-sm sm:text-base font-bold text-slate-900">${p.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5">${p.subTitle}</p>
          <div class="flex items-center gap-2 mt-1.5">
            <span class="text-sm font-black" style="color:${p.hex}">₹${p.price}</span>
            <span class="text-xs text-slate-400 line-through">₹${p.originalPrice}</span>
          </div>
        </div>
      </div>

      <div class="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300 ${state.selectedBundleProducts.includes(p.id) ? 'border-transparent text-white' : 'border-slate-300 text-transparent'}" style="${state.selectedBundleProducts.includes(p.id) ? `background:${p.hex}` : ''}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
      </div>
    </div>`).join('');
  updateBundleTotal();
}

function toggleBundleProduct(id) {
  const idx = state.selectedBundleProducts.indexOf(id);
  if (idx > -1) state.selectedBundleProducts.splice(idx, 1);
  else state.selectedBundleProducts.push(id);
  renderBundleBuilder();
}

function updateBundleTotal() {
  const selected = state.selectedBundleProducts.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const originalTotal = selected.reduce((s, p) => s + p.originalPrice, 0);
  const bundlePrice = Math.round(selected.reduce((s, p) => s + p.price, 0) * 0.75);
  const savings = originalTotal - bundlePrice;
  const totalEl = document.getElementById('bundleTotalPrice');
  const savingsEl = document.getElementById('bundleSavings');
  const originalEl = document.getElementById('bundleOriginalPrice');
  if (totalEl) totalEl.innerText = `₹${bundlePrice.toLocaleString()}`;
  if (savingsEl) savingsEl.innerText = `₹${savings.toLocaleString()}`;
  if (originalEl) originalEl.innerText = `₹${originalTotal.toLocaleString()}`;
}

function addBundleToCart() {
  if (state.selectedBundleProducts.length === 0) { showToast('Please select at least one product.', 'warning'); return; }
  state.selectedBundleProducts.forEach(id => addToCart(id, 1));
  showToast(`🎁 ${state.selectedBundleProducts.length} products added to cart!`, 'success');
  openCartDrawer();
}

// ════════════════════════════════════════════════════════════════
// FIZZ SIMULATION
function runFizzSimulation(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p || !simBubblesEngine) return;
  const water = document.getElementById('simGlassWater');
  const tablet = document.getElementById('simTablet');
  const flavorName = document.getElementById('simFlavorName');
  const statusText = document.getElementById('simStatusText');
  
  if (water) water.style.background = `linear-gradient(180deg, ${p.hex}60, ${p.hex}20)`;
  if (tablet) tablet.style.background = p.hex;
  if (flavorName) flavorName.innerText = `${p.name} (${p.subTitle})`;
  if (statusText) statusText.innerHTML = `<span class="text-emerald-600 font-semibold">✨ Instant Fizzy Action! 100% Bio-available drink ready.</span>`;
  
  // Re-run the tablet falling animation
  if (tablet) {
    tablet.classList.remove('dissolved');
    setTimeout(() => {
      tablet.classList.add('dissolved');
    }, 50);
  }

  simBubblesEngine.setAccentColor(p.hex);
  simBubblesEngine.burst(50);
}

// ════════════════════════════════════════════════════════════════
// QUIZ
// ════════════════════════════════════════════════════════════════
const QUIZ_STEPS = [
  { question: 'What is your #1 primary health or lifestyle goal right now?', options: ['⚡ Peak Workout Energy, Cramp Prevention & Cellular Hydration', '🛡️ All-Day Immunity Shield, Sickness Defense & Daily Wellness', '🌿 Healthy Weight Management, Metabolism Boost & Gut Health', '✨ Flawless Glowing Skin, Hyperpigmentation & Acne Reduction'] },
  { question: 'When do you struggle most with fatigue or wellness routines?', options: ['During intense workouts or hot humid summer days', 'Seasonal flu changes or feeling low in morning resistance', 'Post-heavy meals, bloating, or stubborn belly fat', 'Dull skin from pollution, stress, and late night screens'] },
  { question: 'Which sparkling flavour excites your tastebuds?', options: ['🍋 Zesty Electric Lemon', '🍊 Juicy Citrus Orange Sunrise', '🍏 Tangy Fresh Crisp Green Apple', '🍉 Sweet & Refreshing Ruby Watermelon'] }
];

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;
  if (state.activeQuizStep >= QUIZ_STEPS.length) {
    showQuizResult(); return;
  }
  const step = QUIZ_STEPS[state.activeQuizStep];
  const percent = Math.round(((state.activeQuizStep + 1) / QUIZ_STEPS.length) * 100);
  
  container.innerHTML = `
    <div class="mb-6 text-left">
      <div class="flex justify-between items-center text-xs font-bold text-slate-500 mb-5 px-2">
        <span>Question ${state.activeQuizStep + 1} of ${QUIZ_STEPS.length}</span>
        <span class="text-blue-600">${percent}% Completed</span>
      </div>
      <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 font-heading">${step.question}</h3>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${step.options.map(opt => `
        <button onclick="selectQuizAnswer('${opt.replace(/'/g, "\\'")}')" class="p-6 rounded-3xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 transition text-left flex justify-between items-center group shadow-sm hover:shadow">
          <span class="pr-4 leading-relaxed">${opt}</span>
          <span class="text-slate-300 group-hover:text-blue-500 transition">→</span>
        </button>`).join('')}
    </div>`;
}

function selectQuizAnswer(answer) {
  state.quizAnswers[state.activeQuizStep] = answer;
  state.activeQuizStep++;
  renderQuiz();
}

function showQuizResult() {
  const container = document.getElementById('quizContainer');
  if (!container) return;
  
  const goal = state.quizAnswers[0] || '';
  let recommended = PRODUCTS[0];
  if (goal.includes('Immunity')) recommended = PRODUCTS[1];
  else if (goal.includes('Weight')) recommended = PRODUCTS[2];
  else if (goal.includes('Skin')) recommended = PRODUCTS[3];

  container.innerHTML = `
    <div class="text-center">
      <div class="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wide border border-emerald-200 mb-6 uppercase shadow-sm">
        ✨ 99.4% MATCH FOUND!
      </div>
      
      <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-4">Your Ideal Formula: Mount Nutra ${recommended.name}</h3>
      
      <p class="text-sm text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
        Mount Nutra ${recommended.name} delivers clinical hydration with 5 vital electrolytes, Taurine, and essential vitamins in a sparkling, zesty fizz. It absorbs 3x faster than normal water without unnecessary sugar spikes.
      </p>

      <div class="max-w-lg mx-auto p-5 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left shadow-sm">
        <img src="${recommended.image}" class="w-20 sm:w-24 object-contain drop-shadow-lg" onerror="this.src='assets/images/logo.svg'">
        <div class="flex-1">
          <div class="text-[11px] text-slate-500 uppercase tracking-wide font-semibold mb-1">${recommended.subTitle}</div>
          <div class="text-lg font-bold text-slate-900 mb-2">${recommended.name}</div>
          <div class="flex items-center justify-center sm:justify-start gap-2">
            <span class="text-lg font-black text-emerald-600">₹${recommended.price}</span>
            <span class="text-sm font-medium text-slate-400 line-through">₹${recommended.originalPrice}</span>
          </div>
        </div>
      </div>
      
      <div class="max-w-lg mx-auto mt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
        <button onclick="claimQuizOffer('${recommended.id}')" class="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold text-sm transition shadow-lg hover:shadow-xl active:scale-95 bg-blue-600 hover:bg-blue-700">
          ⚡ Claim Formula with Extra 20% OFF
        </button>
        <button onclick="state.activeQuizStep=0; state.quizAnswers={}; renderQuiz()" class="text-xs font-semibold text-slate-500 hover:text-slate-800 underline transition">
          Retake Quiz
        </button>
      </div>
    </div>`;
}

function claimQuizOffer(productId) {
  const subtotal = PRODUCTS.find(p => p.id === productId)?.price || 0;
  const discount = Math.round(subtotal * 0.20);
  state.appliedCoupon = { code: 'QUIZ20', discount };
  addToCart(productId, 1);
  showToast('Added quiz match to cart!', 'success');
}

// ════════════════════════════════════════════════════════════════
// TOAST NOTIFICATION
// ════════════════════════════════════════════════════════════════
function showToast(msg, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-2 pointer-events-none';
    document.body.appendChild(container);
  }
  const colors = { success: 'bg-emerald-600', error: 'bg-rose-600', warning: 'bg-amber-500', info: 'bg-slate-800' };
  const el = document.createElement('div');
  el.className = `${colors[type] || colors.info} text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300 flex items-center gap-2`;
  el.innerHTML = msg;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 10);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; setTimeout(() => el.remove(), 300); }, 3200);
}

// ════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ════════════════════════════════════════════════════════════════
function setupEventListeners() {
  loadSiteContent();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) { e.preventDefault(); targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // jQuery form validation
  if (typeof $ !== 'undefined') {
    $('#checkoutName').on('input', function() {
      var val = $(this).val();
      $(this).val(val.replace(/[^a-zA-Z\s]/g, ''));
      $('#nameError').toggleClass('hidden', val.length === 0 || /^[a-zA-Z\s]+$/.test(val));
    });
    $('#checkoutPhone').on('input', function() {
      var val = $(this).val().replace(/[^0-9]/g, '').substring(0, 10);
      $(this).val(val);
      $('#phoneError').toggleClass('hidden', val.length === 0 || val.length === 10);
    });
    $('#checkoutEmail').on('input blur', function() {
      var email = $(this).val();
      var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      $('#emailError').toggleClass('hidden', email.length === 0 || isValid);
    });
  }

  // Initialize Quiz
  renderQuiz();
}

// ════════════════════════════════════════════════════════════════
// INVOICE DOWNLOAD (Storefront - from My Orders)
// ════════════════════════════════════════════════════════════════
function downloadInvoice(order) {
  if (typeof order === 'string') {
    // Called with order ID from account page
    const orders = JSON.parse(localStorage.getItem('mount_nutra_orders') || '[]');
    order = orders.find(o => o.id === order);
  }
  if (!order) { alert('Order not found.'); return; }

  const invoiceDate = new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const itemsHtml = (order.items || []).map(i => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #f1f5f9;">${i.name} (${i.variant || ''})</td>
      <td style="padding:8px;border-bottom:1px solid #f1f5f9;text-align:center;">${i.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #f1f5f9;text-align:right;">₹${i.price}</td>
      <td style="padding:8px;border-bottom:1px solid #f1f5f9;text-align:right;">₹${i.price * i.quantity}</td>
    </tr>`).join('');

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Invoice - ${order.id}</title>
<style>
body{font-family:'Segoe UI',sans-serif;color:#1e293b;padding:40px;max-width:700px;margin:0 auto}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;border-bottom:3px solid #0252cf;padding-bottom:20px}
.logo{font-size:28px;font-weight:900;color:#0252cf;letter-spacing:-1px}
.invoice-title{font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:2px;margin-top:4px}
.section{margin-bottom:24px}
.label{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.value{font-size:14px;font-weight:600;color:#1e293b}
table{width:100%;border-collapse:collapse;margin-top:16px}
th{background:#0252cf;color:white;padding:10px 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:left}
th:nth-child(2),th:nth-child(3),th:nth-child(4){text-align:center;} th:last-child{text-align:right}
.total-row td{border-top:2px solid #0252cf;font-weight:900;font-size:15px;padding:12px 8px}
.footer{margin-top:40px;text-align:center;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:20px}
.badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;background:#dcfce7;color:#15803d;border:1px solid #86efac}
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="logo">mount nutra™</div>
    <div class="invoice-title">Tax Invoice</div>
  </div>
  <div style="text-align:right">
    <div style="font-size:22px;font-weight:900;color:#0252cf">${order.id}</div>
    <div style="font-size:12px;color:#64748b;margin-top:4px">Date: ${invoiceDate}</div>
    <div style="margin-top:6px"><span class="badge">✓ ${order.status || 'Processing'}</span></div>
  </div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
  <div class="section">
    <div class="label">Bill To</div>
    <div class="value">${order.customer?.name || '—'}</div>
    <div style="font-size:13px;color:#64748b;margin-top:4px">${order.customer?.email || ''}</div>
    <div style="font-size:13px;color:#64748b">📞 ${order.customer?.phone || ''}</div>
    <div style="font-size:13px;color:#64748b;margin-top:4px">${order.customer?.address || ''}, ${order.customer?.area || ''}, ${order.customer?.city || ''}, ${order.customer?.state || ''} - ${order.customer?.pincode || ''}</div>
  </div>
  <div class="section" style="text-align:right">
    <div class="label">Shipped By</div>
    <div class="value">Mount Nutra™</div>
    <div style="font-size:13px;color:#64748b;margin-top:4px">care@mountnutra.com</div>
    <div style="font-size:13px;color:#64748b">+91 98765 43210</div>
    <div style="font-size:13px;color:#64748b;margin-top:4px">FSSAI: 10019022024001234</div>
    <div style="font-size:13px;color:#64748b">Payment: ${order.paymentMethod?.toUpperCase() || 'UPI'}</div>
  </div>
</div>

<table>
  <thead><tr>
    <th>Product</th><th>Qty</th><th>Unit Price</th><th>Total</th>
  </tr></thead>
  <tbody>${itemsHtml}</tbody>
  <tfoot>
    <tr class="total-row">
      <td colspan="3" style="text-align:right;padding:12px 8px;border-top:2px solid #0252cf">Grand Total</td>
      <td style="text-align:right;padding:12px 8px;border-top:2px solid #0252cf;color:#0252cf">${order.totalAmount}</td>
    </tr>
  </tfoot>
</table>

<div class="footer">
  <p>Thank you for choosing Mount Nutra™ – Premium Effervescent Wellness</p>
  <p style="margin-top:4px">This is a computer-generated invoice. No signature required.</p>
  <p style="margin-top:8px;color:#0252cf;font-weight:700">www.mountnutra.com</p>
</div>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MountNutra_Invoice_${order.id.replace('#', '')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
