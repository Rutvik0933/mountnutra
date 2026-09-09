/* ==========================================================================
   Mount Nutra — Admin Dashboard JS (Complete Rebuild)
   ========================================================================== */

// ════════════════════════════════════════════════════════════════
// AUTH GUARD
// ════════════════════════════════════════════════════════════════
(function() {
  if (!sessionStorage.getItem('mount_nutra_admin_auth')) {
    window.location.href = 'login.html';
  }
})();

// ════════════════════════════════════════════════════════════════
// PRODUCT DATA
// ════════════════════════════════════════════════════════════════
const DEFAULT_PRODUCTS = [
  { id: 'electrolytes', name: 'Essential Electrolytes', subTitle: 'Essential Electrolytes with Vitamin + Taurine', price: 399, originalPrice: 599, image: '../assets/images/electrolytes-blue.png', hex: '#0252cf', hexLight: '#eff6ff', category: 'Hydration', stock: 'In Stock', badge: '⚡ Best Seller for Endurance', flavour: 'Lemon Flavour', benefits: ['Rapid Cellular Rehydration & Electrolyte Balance', 'Infused with Essential Vitamins & Taurine', 'Prevents Muscle Cramps & Fatigue'], nutrition: [{name:'Sodium',amount:'400mg'},{name:'Potassium',amount:'200mg'},{name:'Magnesium',amount:'60mg'},{name:'Taurine',amount:'500mg'},{name:'Vitamin C',amount:'60mg'},{name:'Added Sugar',amount:'0g'}] },
  { id: 'amla-c', name: 'Amla C & Zinc', subTitle: 'Triple Immunity Shield', price: 349, originalPrice: 549, image: '../assets/images/amla-orange.png', hex: '#ea580c', hexLight: '#fff7ed', category: 'Immunity', stock: 'In Stock', badge: '🛡️ #1 Immunity Stack', flavour: 'Orange Flavour', benefits: ['Triple-Powered Immunity Defense', 'Fights Seasonal Infections & Cold', 'Potent Anti-Oxidant Shield'], nutrition: [{name:'Amla Extract',amount:'200mg'},{name:'Zinc',amount:'15mg'},{name:'Vitamin C',amount:'500mg'},{name:'Added Sugar',amount:'0g'}] },
  { id: 'acv-moringa', name: 'ACV Moringa', subTitle: 'Metabolic Activator with Moringa', price: 379, originalPrice: 579, image: '../assets/images/acv-green.png', hex: '#15803d', hexLight: '#f0fdf4', category: 'Weight Management', stock: 'In Stock', badge: '🔥 Top Weight Management', flavour: 'Green Apple Flavour', benefits: ['ACV for Appetite & Blood Sugar Control', 'Moringa Boosts Metabolism', 'Supports Healthy Weight Management'], nutrition: [{name:'Apple Cider Vinegar',amount:'500mg'},{name:'Moringa Extract',amount:'200mg'},{name:'Chromium',amount:'200mcg'},{name:'Added Sugar',amount:'0g'}] },
  { id: 'glutathione', name: 'Glutathione Vit. C', subTitle: 'Bioavailable Skin Brightening Formula', price: 449, originalPrice: 699, image: '../assets/images/glutathione-red.png', hex: '#e31c3d', hexLight: '#fff1f2', category: 'Beauty & Skin', stock: 'In Stock', badge: '✨ #1 Skin Glow Formula', flavour: 'Watermelon Flavour', benefits: ['L-Glutathione (500mg) for Glass Skin', 'Fights Active Acne & Inflammation', 'Watermelon Taste, 90%+ Bioavailability'], nutrition: [{name:'L-Glutathione',amount:'500mg'},{name:'Vitamin C',amount:'100mg'},{name:'Hyaluronic Acid',amount:'50mg'},{name:'Added Sugar',amount:'0g'}] }
];

function getAdminProducts() {
  const saved = localStorage.getItem('mount_nutra_products');
  return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
}

function saveAdminProducts(prods) {
  localStorage.setItem('mount_nutra_products', JSON.stringify(prods));
}

let adminProducts = getAdminProducts();

// ════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════
function getOrders() { return JSON.parse(localStorage.getItem('mount_nutra_orders') || '[]'); }
function getUsers() { return JSON.parse(localStorage.getItem('mount_nutra_users') || '[]'); }
function getPromoCodes() { return JSON.parse(localStorage.getItem('mount_nutra_promo_codes') || '[]'); }
function getSettings() { return JSON.parse(localStorage.getItem('mount_nutra_settings') || '{}'); }
function saveSettings(s) { localStorage.setItem('mount_nutra_settings', JSON.stringify(s)); }

function getAdminCreds() {
  return JSON.parse(localStorage.getItem('mount_nutra_admin_creds') || '{"email":"admin@mountnutra.com","password":"admin123","name":"Admin User"}');
}

const STATUS_STYLES = {
  'Processing': 'bg-amber-100 text-amber-700 border border-amber-200',
  'Shipped':    'bg-blue-100 text-blue-700 border border-blue-200',
  'Delivered':  'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'Cancelled':  'bg-red-100 text-red-700 border border-red-200'
};

// ════════════════════════════════════════════════════════════════
// TOAST
// ════════════════════════════════════════════════════════════════
function showToast(msg, type = 'success') {
  let c = document.getElementById('adminToast');
  if (!c) {
    c = document.createElement('div');
    c.id = 'adminToast';
    c.className = 'fixed bottom-6 right-6 z-[999] flex flex-col gap-2';
    document.body.appendChild(c);
  }
  const colors = { success: 'bg-emerald-600', error: 'bg-rose-600', warning: 'bg-amber-500', info: 'bg-slate-800' };
  const el = document.createElement('div');
  el.className = `${colors[type]||colors.info} text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-300`;
  el.innerHTML = msg;
  c.appendChild(el);
  setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 10);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; setTimeout(() => el.remove(), 300); }, 3000);
}

// ════════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  loadAdminCreds();
  initDashboard();
  checkNotifications();
  lucide.createIcons();

  // Refresh notifications every 30 seconds
  setInterval(checkNotifications, 30000);
});

function loadAdminCreds() {
  const creds = getAdminCreds();
  const nameEl = document.getElementById('adminDisplayName');
  const emailEl = document.getElementById('adminDisplayEmail');
  if (nameEl) nameEl.innerText = creds.name || 'Admin User';
  if (emailEl) emailEl.innerText = creds.email || 'care@mountnutra.com';
}

// ════════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ════════════════════════════════════════════════════════════════
function checkNotifications() {
  const notifs = JSON.parse(localStorage.getItem('mount_nutra_admin_notifs') || '{"newOrders":0,"newUsers":0}');
  const badge = document.getElementById('newOrdersBadge');
  const bellBadge = document.getElementById('bellNotifBadge');

  if (badge) {
    if (notifs.newOrders > 0) {
      badge.innerText = notifs.newOrders;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
  if (bellBadge) {
    const total = notifs.newOrders + notifs.newUsers;
    if (total > 0) {
      bellBadge.innerText = total;
      bellBadge.classList.remove('hidden');
    } else {
      bellBadge.classList.add('hidden');
    }
  }
}

function clearOrderNotifications() {
  const notifs = JSON.parse(localStorage.getItem('mount_nutra_admin_notifs') || '{"newOrders":0,"newUsers":0}');
  notifs.newOrders = 0;
  localStorage.setItem('mount_nutra_admin_notifs', JSON.stringify(notifs));
  checkNotifications();
}

// ════════════════════════════════════════════════════════════════
// TAB SWITCHING
// ════════════════════════════════════════════════════════════════
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => { el.classList.add('hidden'); el.classList.remove('block'); });
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  const tab = document.getElementById('tab-' + tabId);
  if (tab) { tab.classList.remove('hidden'); tab.classList.add('block'); }
  const nav = document.getElementById('nav-' + tabId);
  if (nav) nav.classList.add('active');

  const titles = {
    dashboard: 'Overview', orders: 'Manage Orders', products: 'Product Catalog',
    customers: 'Customer Database', promocodes: 'Promo Codes & Vouchers',
    offers: 'Offers & Banners', sitecontent: 'Site Content',
    adminprofile: 'Admin Profile'
  };
  const topbar = document.getElementById('topbarTitle');
  if (topbar) topbar.innerText = titles[tabId] || tabId;

  if (tabId === 'orders') { clearOrderNotifications(); renderOrdersTable(); }
  if (tabId === 'dashboard') initDashboard();
  if (tabId === 'products') renderProductsGrid();
  if (tabId === 'customers') renderCustomersTable();
  if (tabId === 'promocodes') renderPromoCodes();
  if (tabId === 'offers') loadOffersSettings();
  if (tabId === 'sitecontent') loadSiteContentForm();
  if (tabId === 'adminprofile') loadAdminProfileForm();
  lucide.createIcons();
  return false;
}

// ════════════════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════════════════
function initDashboard() {
  const orders = getOrders();
  const users = getUsers();
  const revenue = orders.reduce((s, o) => s + (parseFloat(String(o.totalAmount).replace(/[^0-9.]/g, '')) || o.grandTotal || 0), 0);

  const statRevEl = document.getElementById('statRevenue');
  const statOrdEl = document.getElementById('statOrders');
  const statCustEl = document.getElementById('statCustomers');
  if (statRevEl) statRevEl.innerText = `₹${revenue.toLocaleString('en-IN')}`;
  if (statOrdEl) statOrdEl.innerText = orders.length;
  if (statCustEl) statCustEl.innerText = users.length;

  renderRecentOrders();
}

function renderRecentOrders() {
  const orders = getOrders().slice(-5).reverse();
  const tbody = document.getElementById('recentOrdersTableBody');
  if (!tbody) return;

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-10 text-center text-slate-400 text-sm">No orders yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => {
    const date = new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const status = o.status || 'Processing';
    return `<tr class="hover:bg-slate-50 transition">
      <td class="px-6 py-4 font-mono font-bold text-blue-600 text-sm">${o.id}</td>
      <td class="px-6 py-4 text-sm font-semibold text-slate-800">${o.customer?.name || '—'}</td>
      <td class="px-6 py-4 text-xs text-slate-500">${date}</td>
      <td class="px-6 py-4 font-bold text-slate-900">${o.totalAmount}</td>
      <td class="px-6 py-4"><span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLES[status]||STATUS_STYLES.Processing}">${status}</span></td>
    </tr>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════════
// ORDERS
// ════════════════════════════════════════════════════════════════
function renderOrdersTable() {
  const orders = getOrders();
  const search = (document.getElementById('orderSearch')?.value || '').toLowerCase();
  const filtered = orders.filter(o =>
    (o.id || '').toLowerCase().includes(search) ||
    (o.customer?.name || '').toLowerCase().includes(search)
  ).reverse();

  const tbody = document.getElementById('allOrdersTableBody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-14 text-center text-slate-400">No orders found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(o => {
    const date = new Date(o.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const status = o.status || 'Processing';
    const itemsList = (o.items || []).map(i => `${i.name} x${i.quantity}`).join(', ');
    const payIcon = o.paymentMethod === 'upi' ? '💳' : o.paymentMethod === 'cod' ? '💵' : '💳';
    return `<tr class="hover:bg-slate-50 transition">
      <td class="px-6 py-4">
        <div class="font-mono font-black text-blue-600 text-sm">${o.id}</div>
        <div class="text-xs text-slate-400 mt-0.5">${date}</div>
      </td>
      <td class="px-6 py-4">
        <div class="font-bold text-slate-800 text-sm">${o.customer?.name || '—'}</div>
        <div class="text-xs text-slate-500">${o.customer?.phone || ''}</div>
        <div class="text-xs text-slate-400 truncate max-w-[180px]">${o.customer?.email || ''}</div>
      </td>
      <td class="px-6 py-4 text-xs text-slate-600 max-w-[200px]">
        <div class="truncate">${itemsList}</div>
        <div class="text-[10px] text-slate-400 mt-0.5">${(o.items||[]).length} item(s)</div>
      </td>
      <td class="px-6 py-4">
        <div class="font-black text-slate-900">${o.totalAmount}</div>
        <div class="text-[10px] text-slate-400">${payIcon} ${(o.paymentMethod||'').toUpperCase()}</div>
      </td>
      <td class="px-6 py-4">
        <select onchange="updateOrderStatus('${o.id}', this.value)"
          class="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-500 cursor-pointer">
          ${['Processing','Shipped','Delivered','Cancelled'].map(s => `<option value="${s}" ${s === status ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick='downloadAdminInvoice(${JSON.stringify(o).replace(/'/g,"&#39;")})'
            class="px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 rounded-lg transition flex items-center gap-1">
            📄 Invoice
          </button>
          <button onclick="deleteOrder('${o.id}')"
            class="px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-400 rounded-lg transition">
            Delete
          </button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem('mount_nutra_orders', JSON.stringify(orders));
    showToast(`Order ${orderId} status updated to "${newStatus}"`, 'success');
  }
}

function deleteOrder(orderId) {
  if (!confirm(`Delete order ${orderId}? This cannot be undone.`)) return;
  let orders = getOrders();
  orders = orders.filter(o => o.id !== orderId);
  localStorage.setItem('mount_nutra_orders', JSON.stringify(orders));
  renderOrdersTable();
  showToast('Order deleted.', 'info');
}

function downloadAdminInvoice(order) {
  const invoiceDate = new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const itemsHtml = (order.items || []).map(i => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #f1f5f9;">${i.name} (${i.variant || ''})</td>
      <td style="padding:8px;border-bottom:1px solid #f1f5f9;text-align:center;">${i.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #f1f5f9;text-align:right;">₹${i.price}</td>
      <td style="padding:8px;border-bottom:1px solid #f1f5f9;text-align:right;">₹${i.price * i.quantity}</td>
    </tr>`).join('');

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Invoice ${order.id}</title>
<style>body{font-family:'Segoe UI',sans-serif;color:#1e293b;padding:40px;max-width:700px;margin:0 auto}.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;border-bottom:3px solid #0252cf;padding-bottom:20px}.logo{font-size:26px;font-weight:900;color:#0252cf}.inv-id{font-size:22px;font-weight:900;color:#0252cf}.section{margin-bottom:20px}.label{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}.value{font-size:14px;font-weight:600;color:#1e293b}table{width:100%;border-collapse:collapse;margin-top:12px}th{background:#0252cf;color:white;padding:10px 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:left}.total-row td{border-top:2px solid #0252cf;font-weight:900;font-size:15px;padding:12px 8px}.footer{margin-top:32px;text-align:center;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:16px}.badge{display:inline-block;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#dcfce7;color:#15803d;border:1px solid #86efac}</style>
</head><body>
<div class="header"><div><div class="logo">mount nutra™</div><div style="font-size:12px;color:#64748b;margin-top:2px">Tax Invoice (Admin Copy)</div></div>
<div style="text-align:right"><div class="inv-id">${order.id}</div><div style="font-size:12px;color:#64748b;margin-top:4px">${invoiceDate}</div><div style="margin-top:6px"><span class="badge">✓ ${order.status||'Processing'}</span></div></div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
<div class="section"><div class="label">Customer</div><div class="value">${order.customer?.name||'—'}</div><div style="font-size:13px;color:#64748b;margin-top:4px">${order.customer?.email||''}</div><div style="font-size:13px;color:#64748b">📞 ${order.customer?.phone||''}</div><div style="font-size:12px;color:#64748b;margin-top:4px">${order.customer?.address||''}, ${order.customer?.area||''}, ${order.customer?.city||''}, ${order.customer?.state||''} - ${order.customer?.pincode||''}</div></div>
<div class="section" style="text-align:right"><div class="label">Payment</div><div class="value">${(order.paymentMethod||'').toUpperCase()}</div>${order.paymentId ? `<div style="font-size:12px;color:#64748b;margin-top:4px">ID: ${order.paymentId}</div>` : ''}</div>
</div>
<table><thead><tr><th>Product</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Total</th></tr></thead>
<tbody>${itemsHtml}</tbody>
<tfoot><tr class="total-row"><td colspan="3" style="text-align:right;padding:12px 8px;border-top:2px solid #0252cf">Grand Total</td><td style="text-align:right;padding:12px 8px;border-top:2px solid #0252cf;color:#0252cf">${order.totalAmount}</td></tr></tfoot></table>
<div class="footer"><p>Mount Nutra™ — Premium Effervescent Wellness | FSSAI: 10019022024001234</p></div></body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Invoice_${order.id.replace('#','')}.html`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Invoice downloaded!', 'success');
}

// ════════════════════════════════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════════════════════════════════
function renderProductsGrid() {
  adminProducts = getAdminProducts();
  const container = document.getElementById('productsAdminGrid');
  if (!container) return;

  container.innerHTML = adminProducts.map(p => `
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div class="flex items-center gap-4 p-5 border-b border-slate-100">
        <div class="w-16 h-20 rounded-xl flex items-center justify-center shrink-0 overflow-hidden" style="background:${p.hexLight||'#f8fafc'}">
          <img src="${p.image}" alt="${p.name}" class="w-12 h-16 object-contain" onerror="this.src='../assets/images/logo.svg'">
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-bold text-slate-900 text-sm">${p.name}</h3>
            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">${p.stock||'In Stock'}</span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">${p.subTitle||''}</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-base font-black text-slate-900">₹${p.price}</span>
            <span class="text-sm text-slate-400 line-through">₹${p.originalPrice}</span>
          </div>
        </div>
      </div>
      <div class="p-4 flex gap-2">
        <button onclick="openEditModal('${p.id}')" class="flex-1 py-2 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 rounded-xl transition flex items-center justify-center gap-1">
          ✏️ Edit
        </button>
        <button onclick="deleteProduct('${p.id}')" class="px-4 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-400 rounded-xl transition">
          🗑️
        </button>
      </div>
    </div>`).join('');
}

function openAddModal() {
  document.getElementById('editModalTitle').innerText = 'Add New Product';
  document.getElementById('editProductId').value = '__NEW__';
  document.getElementById('editProductName').value = '';
  document.getElementById('editProductSubTitle').value = '';
  document.getElementById('editProductPrice').value = '';
  document.getElementById('editProductOriginalPrice').value = '';
  document.getElementById('editProductCategory').value = '';
  document.getElementById('editProductBadge').value = '';
  document.getElementById('editProductDesc').value = '';
  document.getElementById('editProductImagePreview').src = '../assets/images/logo.svg';
  document.getElementById('editProductCurrentImage').value = '';
  const modal = document.getElementById('editProductModal');
  if (modal) { modal.style.opacity = '1'; modal.style.pointerEvents = 'all'; document.getElementById('editProductModalBox').style.transform = 'scale(1)'; }
}

function openEditModal(productId) {
  const p = adminProducts.find(x => x.id === productId);
  if (!p) return;
  document.getElementById('editModalTitle').innerText = 'Edit Product';
  document.getElementById('editProductId').value = p.id;
  document.getElementById('editProductName').value = p.name;
  document.getElementById('editProductSubTitle').value = p.subTitle || '';
  document.getElementById('editProductPrice').value = p.price;
  document.getElementById('editProductOriginalPrice').value = p.originalPrice;
  document.getElementById('editProductCategory').value = p.category || '';
  document.getElementById('editProductBadge').value = p.badge || '';
  document.getElementById('editProductDesc').value = p.description || '';
  document.getElementById('editProductImagePreview').src = p.image;
  document.getElementById('editProductCurrentImage').value = p.image;
  const modal = document.getElementById('editProductModal');
  if (modal) { modal.style.opacity = '1'; modal.style.pointerEvents = 'all'; document.getElementById('editProductModalBox').style.transform = 'scale(1)'; }
}

function closeEditModal() {
  const modal = document.getElementById('editProductModal');
  if (modal) { modal.style.opacity = '0'; modal.style.pointerEvents = 'none'; document.getElementById('editProductModalBox').style.transform = 'scale(0.95)'; }
}

function previewProductImage(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 500 * 1024) { showToast('Image too large! Max size: 500KB', 'error'); e.target.value = ''; return; }
  const reader = new FileReader();
  reader.onload = function(ev) {
    document.getElementById('editProductImagePreview').src = ev.target.result;
    document.getElementById('editProductCurrentImage').value = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function saveProductEdits() {
  const id = document.getElementById('editProductId').value;
  const name = document.getElementById('editProductName').value.trim();
  const price = parseFloat(document.getElementById('editProductPrice').value);
  const originalPrice = parseFloat(document.getElementById('editProductOriginalPrice').value);
  if (!name || !price || !originalPrice) { showToast('Name and Prices are required.', 'error'); return; }

  const imageData = document.getElementById('editProductCurrentImage').value;

  if (id === '__NEW__') {
    const newId = 'product-' + Date.now();
    const newProduct = {
      id: newId, name,
      subTitle: document.getElementById('editProductSubTitle').value,
      price, originalPrice,
      image: imageData || '../assets/images/logo.svg',
      hex: '#0252cf', hexLight: '#eff6ff',
      category: document.getElementById('editProductCategory').value,
      badge: document.getElementById('editProductBadge').value,
      description: document.getElementById('editProductDesc').value,
      stock: 'In Stock', flavour: 'Default', benefits: ['Benefit 1', 'Benefit 2'], nutrition: [{name:'Calories',amount:'0kcal'}]
    };
    adminProducts.push(newProduct);
    showToast(`Product "${name}" added!`, 'success');
  } else {
    const idx = adminProducts.findIndex(p => p.id === id);
    if (idx > -1) {
      adminProducts[idx] = {
        ...adminProducts[idx],
        name,
        subTitle: document.getElementById('editProductSubTitle').value,
        price, originalPrice,
        image: imageData || adminProducts[idx].image,
        category: document.getElementById('editProductCategory').value,
        badge: document.getElementById('editProductBadge').value,
        description: document.getElementById('editProductDesc').value,
      };
      showToast(`Product "${name}" updated!`, 'success');
    }
  }

  saveAdminProducts(adminProducts);
  closeEditModal();
  renderProductsGrid();
}

function deleteProduct(productId) {
  if (!confirm('Delete this product from the storefront?')) return;
  adminProducts = adminProducts.filter(p => p.id !== productId);
  saveAdminProducts(adminProducts);
  renderProductsGrid();
  showToast('Product deleted.', 'info');
}

// ════════════════════════════════════════════════════════════════
// CUSTOMERS
// ════════════════════════════════════════════════════════════════
function renderCustomersTable() {
  const users = getUsers();
  const orders = getOrders();
  const tbody = document.getElementById('customersTableBody');
  const countEl = document.getElementById('customerCount');
  if (countEl) countEl.innerText = `${users.length} registered`;
  if (!tbody) return;

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-12 text-center text-slate-400">No customers have registered yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(u => {
    const orderCount = orders.filter(o => o.customer?.email === u.email || o.userId === u.email).length;
    const regDate = u.registeredAt ? new Date(u.registeredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
    return `<tr class="hover:bg-slate-50 transition">
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">${(u.name||'U').charAt(0).toUpperCase()}</div>
          <div><div class="font-bold text-slate-900 text-sm">${u.name||'—'}</div><div class="text-xs text-slate-500">${u.email}</div></div>
        </div>
      </td>
      <td class="px-6 py-4 text-sm text-slate-600">${u.phone||'—'}</td>
      <td class="px-6 py-4 text-xs text-slate-500">${regDate}</td>
      <td class="px-6 py-4 text-sm font-semibold text-slate-700">${(u.addresses||[]).length}</td>
      <td class="px-6 py-4"><span class="font-black text-blue-600 text-sm">${orderCount}</span></td>
    </tr>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════════
// PROMO CODES
// ════════════════════════════════════════════════════════════════
function createPromoCode() {
  const code = document.getElementById('newCodeName').value.trim().toUpperCase();
  const type = document.getElementById('newCodeType').value;
  const value = parseFloat(document.getElementById('newCodeValue').value);
  const minOrder = parseFloat(document.getElementById('newCodeMinOrder').value) || 0;
  const expiry = document.getElementById('newCodeExpiry').value;
  const active = document.getElementById('newCodeActive').checked;

  if (!code || !value || value <= 0) { showToast('Code name and discount value are required.', 'error'); return; }

  const codes = getPromoCodes();
  if (codes.find(c => c.code === code)) { showToast('A code with this name already exists!', 'warning'); return; }

  codes.push({ code, discountType: type, discountValue: value, minOrder, expiry: expiry || null, active, createdAt: new Date().toISOString() });
  localStorage.setItem('mount_nutra_promo_codes', JSON.stringify(codes));

  document.getElementById('newCodeName').value = '';
  document.getElementById('newCodeValue').value = '';
  document.getElementById('newCodeMinOrder').value = '';
  document.getElementById('newCodeExpiry').value = '';
  document.getElementById('newCodeActive').checked = true;

  renderPromoCodes();
  showToast(`Promo code "${code}" created!`, 'success');
}

function togglePromoCode(code) {
  const codes = getPromoCodes();
  const c = codes.find(x => x.code === code);
  if (c) c.active = !c.active;
  localStorage.setItem('mount_nutra_promo_codes', JSON.stringify(codes));
  renderPromoCodes();
  showToast(`Code "${code}" ${c.active ? 'activated' : 'deactivated'}.`, 'success');
}

function deletePromoCode(code) {
  if (!confirm(`Delete promo code "${code}"?`)) return;
  let codes = getPromoCodes().filter(c => c.code !== code);
  localStorage.setItem('mount_nutra_promo_codes', JSON.stringify(codes));
  renderPromoCodes();
  showToast('Promo code deleted.', 'info');
}

function renderPromoCodes() {
  const codes = getPromoCodes();
  const container = document.getElementById('promoCodesTable');
  if (!container) return;
  if (codes.length === 0) {
    container.innerHTML = `<div class="px-6 py-12 text-center text-slate-400">No promo codes yet. Create one!</div>`;
    return;
  }
  container.innerHTML = codes.map(c => {
    const expiryStr = c.expiry ? new Date(c.expiry).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : 'No expiry';
    const discountStr = c.discountType === 'percent' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`;
    return `<div class="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition gap-4">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-mono font-black text-slate-900 tracking-wider text-sm">${c.code}</span>
          <span class="px-2 py-0.5 text-[10px] font-bold rounded-full border ${c.active ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}">${c.active ? 'ACTIVE' : 'INACTIVE'}</span>
        </div>
        <div class="text-xs text-slate-500 mt-0.5">${discountStr}${c.minOrder ? ` · Min ₹${c.minOrder}` : ''} · Expires: ${expiryStr}</div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button onclick="togglePromoCode('${c.code}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 transition">${c.active ? 'Deactivate' : 'Activate'}</button>
        <button onclick="deletePromoCode('${c.code}')" class="px-3 py-1.5 text-xs font-semibold text-rose-600 rounded-lg border border-rose-200 hover:bg-rose-50 transition">Delete</button>
      </div>
    </div>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════════
// OFFERS & BANNERS
// ════════════════════════════════════════════════════════════════
function loadOffersSettings() {
  const s = getSettings();
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  const setCheck = (id, val) => { const el = document.getElementById(id); if (el) el.checked = val !== false; };
  setText('announcementText', s.announcementText || '✨ SPECIAL LAUNCH OFFER: Use code MOUNT20 for Extra 20% OFF | Free Express Shipping on ₹500+');
  setCheck('announcementActive', s.announcementActive);
  setText('socialInstagram', s.socialInstagram);
  setText('socialWhatsapp', s.socialWhatsapp);
  setText('socialFacebook', s.socialFacebook);
  setCheck('whatsappBtnActive', s.whatsappBtnActive);
  setText('razorpayKeyInput', s.razorpayKey || '');
}

function saveAnnouncementBar() {
  const s = getSettings();
  s.announcementText = document.getElementById('announcementText').value;
  s.announcementActive = document.getElementById('announcementActive').checked;
  saveSettings(s);
  showToast('Announcement bar saved! Refresh storefront to see changes.', 'success');
}

function saveSocialLinks() {
  const s = getSettings();
  s.socialInstagram = document.getElementById('socialInstagram').value;
  s.socialWhatsapp = document.getElementById('socialWhatsapp').value;
  s.socialFacebook = document.getElementById('socialFacebook').value;
  saveSettings(s);
  showToast('Social links saved!', 'success');
}

function saveWhatsappButton() {
  const s = getSettings();
  s.whatsappBtnActive = document.getElementById('whatsappBtnActive').checked;
  saveSettings(s);
  showToast('WhatsApp button setting saved!', 'success');
}

function saveRazorpayKey() {
  const s = getSettings();
  s.razorpayKey = document.getElementById('razorpayKeyInput').value.trim();
  saveSettings(s);
  showToast('Razorpay key saved! Cards payment will now use this key.', 'success');
}

// ════════════════════════════════════════════════════════════════
// SITE CONTENT
// ════════════════════════════════════════════════════════════════
function loadSiteContentForm() {
  const content = JSON.parse(localStorage.getItem('mount_nutra_content') || '{}');
  const get = id => { const el = document.getElementById(id); if (el) el.value = content[id] || ''; };
  get('configHeroTitle');
  get('configHeroSub');
  get('configScienceTitle');
  get('configScienceText');
}

function saveSiteContent() {
  const content = {};
  ['configHeroTitle', 'configHeroSub', 'configScienceTitle', 'configScienceText'].forEach(id => {
    const el = document.getElementById(id);
    if (el) content[id.replace('config', '').charAt(0).toLowerCase() + id.replace('config', '').slice(1)] = el.value;
  });
  // Map field IDs to content keys
  const mapped = {
    heroTitle: document.getElementById('configHeroTitle')?.value || '',
    heroSub: document.getElementById('configHeroSub')?.value || '',
    scienceTitle: document.getElementById('configScienceTitle')?.value || '',
    scienceText: document.getElementById('configScienceText')?.value || ''
  };
  localStorage.setItem('mount_nutra_content', JSON.stringify(mapped));
  showToast('Site content saved! Refresh storefront to see changes.', 'success');
}

// ════════════════════════════════════════════════════════════════
// ADMIN PROFILE
// ════════════════════════════════════════════════════════════════
function loadAdminProfileForm() {
  const creds = getAdminCreds();
  const nameEl = document.getElementById('adminProfileName');
  const emailEl = document.getElementById('adminProfileEmail');
  if (nameEl) nameEl.value = creds.name || '';
  if (emailEl) emailEl.value = creds.email || '';
}

function saveAdminProfile() {
  const name = document.getElementById('adminProfileName')?.value.trim();
  const email = document.getElementById('adminProfileEmail')?.value.trim();
  if (!name || !email) { showToast('Name and email are required.', 'error'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Enter a valid email.', 'error'); return; }

  const creds = getAdminCreds();
  creds.name = name;
  creds.email = email;
  localStorage.setItem('mount_nutra_admin_creds', JSON.stringify(creds));
  loadAdminCreds();
  showToast('Profile updated! Login email changed to: ' + email, 'success');
}

function saveAdminPassword() {
  const current = document.getElementById('adminCurrentPass')?.value;
  const newPass = document.getElementById('adminNewPass')?.value;
  const confirmPass = document.getElementById('adminConfirmPass')?.value;

  const creds = getAdminCreds();
  if (current !== creds.password) { showToast('Current password is incorrect.', 'error'); return; }
  if (!newPass || newPass.length < 6) { showToast('New password must be at least 6 characters.', 'error'); return; }
  if (newPass !== confirmPass) { showToast('Passwords do not match.', 'error'); return; }

  creds.password = newPass;
  localStorage.setItem('mount_nutra_admin_creds', JSON.stringify(creds));

  // Also update login.html to use the new credentials
  document.getElementById('adminCurrentPass').value = '';
  document.getElementById('adminNewPass').value = '';
  document.getElementById('adminConfirmPass').value = '';
  showToast('Password changed successfully!', 'success');
}

// ════════════════════════════════════════════════════════════════
// LOGOUT
// ════════════════════════════════════════════════════════════════
function logoutAdmin() {
  if (!confirm('Are you sure you want to logout?')) return;
  sessionStorage.removeItem('mount_nutra_admin_auth');
  window.location.href = 'login.html';
}
