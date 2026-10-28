// Tüccarım - Organik Çiftlik & E-Ticaret Platformu
// Modern Application Controller (Quiet Luxury Agronomy Theme)

import { store } from "./store.js";
import { SAVED_ADDRESSES, ANALYTICS_PERIOD_DATA } from "./data.js";

// --- ROUTER & VIEW MANAGEMENT ---
const ROUTES = ["katalog", "sepet", "admin-analitik", "admin-stok", "ciftlik-hikayesi"];
const ROUTE_VIEW_MAP = {
  "katalog": "view-katalog",
  "catalog": "view-katalog",
  "sepet": "view-sepet",
  "cart": "view-sepet",
  "admin-analitik": "view-admin-analitik",
  "admin-analytics": "view-admin-analitik",
  "admin-stok": "view-admin-stok",
  "admin-inventory": "view-admin-stok",
  "ciftlik-hikayesi": "view-ciftlik-hikayesi",
  "farm-story": "view-ciftlik-hikayesi"
};
let currentRoute = "katalog";

function navigateTo(route) {
  const normalizedRoute = (route === "catalog" ? "katalog" :
                           route === "cart" ? "sepet" :
                           route === "admin-analytics" ? "admin-analitik" :
                           route === "admin-inventory" ? "admin-stok" :
                           route === "farm-story" ? "ciftlik-hikayesi" : route);
  if (!ROUTES.includes(normalizedRoute)) route = "katalog";
  else route = normalizedRoute;

  currentRoute = route;
  window.location.hash = `#${route}`;

  // Hide all views
  document.querySelectorAll(".app-view").forEach((view) => {
    view.classList.add("hidden");
    view.classList.remove("flex");
  });

  // Show active view
  const targetId = ROUTE_VIEW_MAP[route] || `view-${route}`;
  const activeView = document.getElementById(targetId) || document.getElementById(`view-${route}`);
  if (activeView) {
    activeView.classList.remove("hidden");
    activeView.classList.add("flex");
  }

  // Update header nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkRoute = link.getAttribute("data-route");
    if (linkRoute === route) {
      link.className = "nav-link text-[14px] font-bold text-primary border-b-2 border-primary pb-1 transition-all";
    } else {
      link.className = "nav-link text-[14px] font-medium text-on-surface-variant hover:text-on-surface transition-all";
    }
  });

  // Update admin sidebar nav links
  document.querySelectorAll(".admin-nav-link").forEach((link) => {
    const linkRoute = link.getAttribute("data-admin-route");
    if (linkRoute === route) {
      link.className = "admin-nav-link flex items-center gap-space-sm px-space-sm py-2 rounded text-[13px] bg-surface-container-highest text-on-surface font-semibold transition-colors";
    } else {
      link.className = "admin-nav-link flex items-center gap-space-sm px-space-sm py-2 rounded text-[13px] text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-medium";
    }
  });

  // Close mobile nav if open
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileNav) mobileNav.classList.add("hidden");

  // View specific re-renders
  if (route === "katalog") renderCatalog();
  if (route === "sepet") renderCart();
  if (route === "admin-analitik") renderAdminAnalytics();
  if (route === "admin-stok") renderAdminInventory();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initRouter() {
  const hash = window.location.hash.replace("#", "");
  navigateTo(hash || "katalog");

  window.addEventListener("hashchange", () => {
    const newHash = window.location.hash.replace("#", "");
    navigateTo(newHash || "katalog");
  });
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const isError = type === "error";
  const icon = isError ? "error" : type === "info" ? "info" : "check_circle";
  const borderCol = isError ? "border-error/40 bg-error-container text-on-error-container" : "border-outline-variant/40 bg-surface-container-lowest text-on-surface shadow-xl";

  toast.className = `flex items-center gap-3 p-3.5 rounded-xl border ${borderCol} pointer-events-auto transition-all transform duration-300 translate-y-4 opacity-0`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] ${isError ? 'text-error' : 'text-secondary'}">${icon}</span>
    <span class="text-[13px] font-semibold flex-1 leading-snug">${message}</span>
    <button class="text-outline hover:text-on-surface p-1">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  });

  const closeToast = () => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector("button").addEventListener("click", closeToast);
  setTimeout(closeToast, 4000);
}

// --- CATALOG CONTROLLER ---
let activeCategoryFilter = "all";
let activeSortOrder = "featured";
let activeCatalogSearch = "";

function renderCatalog() {
  const container = document.getElementById("catalog-products-container");
  const countBadge = document.getElementById("catalog-count-badge");
  if (!container) return;

  // Filter only active products for the customer catalog
  let products = store.getProducts().filter((p) => p.active !== false);

  // Filter Category
  if (activeCategoryFilter !== "all") {
    products = products.filter((p) => p.category === activeCategoryFilter);
  }

  // Search Filter
  if (activeCatalogSearch) {
    const q = activeCatalogSearch.toLowerCase();
    products = products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.lot.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (activeSortOrder === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (activeSortOrder === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (activeSortOrder === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  }

  if (countBadge) countBadge.textContent = `${products.length} Seçkin Mahsul`;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-outline text-[48px]">search_off</span>
        <h4 class="text-[16px] text-on-surface font-bold">Aradığınız kriterlere uygun mahsul bulunamadı</h4>
        <p class="text-[13px] text-on-surface-variant">Filtreleri temizleyerek veya farklı bir arama yaparak tekrar deneyin.</p>
        <button id="btn-reset-filters" class="mt-2 px-5 py-2 rounded-lg bg-primary text-on-primary text-[13px] font-semibold hover:bg-secondary transition-colors">Tüm Mahsulleri Göster</button>
      </div>
    `;
    const resetBtn = document.getElementById("btn-reset-filters");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        activeCategoryFilter = "all";
        activeCatalogSearch = "";
        const searchInput = document.getElementById("header-search-input");
        if (searchInput) searchInput.value = "";
        updateCategoryPills();
        renderCatalog();
      });
    }
    return;
  }

  container.innerHTML = products.map((product) => {
    const defaultWeight = product.weights?.find((w) => w.default) || product.weights?.[0] || { label: "500g", price: product.price };
    const isFav = store.isFavorite(product.id);
    
    // Weight switchers
    const weightsHtml = product.weights && product.weights.length > 1
      ? `
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Gramaj</span>
          <div class="inline-flex gap-1 bg-surface-container-low p-0.5 rounded">
            ${product.weights.map((w, idx) => `
              <button class="weight-opt px-2.5 py-1 text-[11px] rounded transition-all ${w.default ? 'bg-surface-container-lowest text-on-surface shadow-xs font-semibold' : 'text-on-surface-variant hover:text-on-surface font-medium'}"
                data-prod-id="${product.id}"
                data-weight-label="${w.label}"
                data-weight-price="${w.price}">
                ${w.label}
              </button>
            `).join("")}
          </div>
        </div>
      `
      : `
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Ambalaj</span>
          <span class="text-[12px] text-on-surface font-medium">${defaultWeight.label}</span>
        </div>
      `;

    return `
      <article class="product-card group bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-outline-variant/30" data-id="${product.id}">
        <div>
          <!-- Visual Container -->
          <div class="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low mb-space-md cursor-pointer btn-open-detail" data-id="${product.id}">
            <img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" alt="${product.name}" src="${product.image}"/>
            <span class="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface/90 backdrop-blur text-secondary text-[11px] uppercase font-semibold">
              ${product.badge || "Yeni Mahsul"}
            </span>
            <span class="absolute top-3 right-3 text-on-surface-variant text-[11px] bg-surface-container-low/90 backdrop-blur px-2 py-0.5 rounded font-mono">
              ${product.lot}
            </span>
            <button class="btn-favorite absolute bottom-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur ${isFav ? 'text-error' : 'text-on-surface-variant hover:text-secondary'} flex items-center justify-center transition-colors shadow-xs" data-id="${product.id}" title="Favorilere Ekle">
              <span class="material-symbols-outlined text-[18px]" style="${isFav ? "font-variation-settings: 'FILL' 1;" : ''}">favorite</span>
            </button>
          </div>

          <!-- Product Details -->
          <div class="flex items-start justify-between gap-space-xs mb-1">
            <h3 class="text-[17px] font-semibold text-on-surface group-hover:text-secondary transition-colors cursor-pointer btn-open-detail" data-id="${product.id}">
              ${product.name}
            </h3>
          </div>
          <p class="text-[13px] text-on-surface-variant mb-space-sm line-clamp-2 leading-relaxed">
            ${product.description}
          </p>
        </div>

        <div class="mt-space-sm pt-space-sm border-t border-outline-variant/20 flex flex-col gap-space-sm">
          <!-- Weight selector -->
          ${weightsHtml}

          <!-- Price & Add Button -->
          <div class="flex items-center justify-between mt-1">
            <div>
              <span class="text-[11px] text-on-surface-variant block font-medium">Birim Fiyat</span>
              <span class="product-price text-[22px] text-on-surface font-bold tracking-tight" data-current-price="${defaultWeight.price}">
                ${defaultWeight.price.toFixed(0)} ₺
              </span>
            </div>
            <button class="add-to-cart-btn px-space-md py-2.5 rounded bg-primary hover:bg-secondary text-on-primary text-[13px] font-semibold transition-colors duration-200 flex items-center gap-1.5 shadow-sm active:scale-95" data-id="${product.id}">
              <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Sepete Ekle</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Attach card event listeners
  container.querySelectorAll(".product-card").forEach((card) => {
    const prodId = card.getAttribute("data-id");
    const product = store.getProductById(prodId);
    let selectedWeightLabel = product?.weights?.find((w) => w.default)?.label || product?.weights?.[0]?.label || "500g";
    let selectedPrice = product?.weights?.find((w) => w.default)?.price || product?.price || 0;

    const priceSpan = card.querySelector(".product-price");

    // Weight switchers
    card.querySelectorAll(".weight-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        card.querySelectorAll(".weight-opt").forEach((b) => {
          b.className = "weight-opt px-2.5 py-1 text-[11px] rounded transition-all text-on-surface-variant hover:text-on-surface font-medium";
        });
        btn.className = "weight-opt px-2.5 py-1 text-[11px] rounded transition-all bg-surface-container-lowest text-on-surface shadow-xs font-semibold";

        selectedWeightLabel = btn.getAttribute("data-weight-label");
        selectedPrice = parseFloat(btn.getAttribute("data-weight-price"));
        if (priceSpan) priceSpan.textContent = `${selectedPrice.toFixed(0)} ₺`;
      });
    });

    // Add to cart
    card.querySelector(".add-to-cart-btn")?.addEventListener("click", () => {
      store.addToCart(product, selectedWeightLabel, 1);
    });

    // Favorite toggle
    card.querySelector(".btn-favorite")?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isNowFav = store.toggleFavorite(product.id);
      const icon = card.querySelector(".btn-favorite span");
      if (icon) {
        icon.style.fontVariationSettings = isNowFav ? "'FILL' 1" : "";
        card.querySelector(".btn-favorite").className = `btn-favorite absolute bottom-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur ${isNowFav ? 'text-error' : 'text-on-surface-variant hover:text-secondary'} flex items-center justify-center transition-colors shadow-xs`;
      }
    });

    // Open detail
    card.querySelectorAll(".btn-open-detail").forEach((el) => {
      el.addEventListener("click", () => {
        openQuickViewModal(product);
      });
    });
  });
}

function updateCategoryPills() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    const cat = btn.getAttribute("data-category");
    if (cat === activeCategoryFilter) {
      btn.className = "filter-btn active px-4 py-2 rounded text-[13px] transition-all duration-200 bg-primary text-on-primary font-medium shadow-sm";
    } else {
      btn.className = "filter-btn px-4 py-2 rounded text-[13px] transition-all duration-200 bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-medium";
    }
  });
}

// --- QUICK VIEW MODAL ---
function openQuickViewModal(product) {
  const modal = document.getElementById("quick-view-modal");
  const content = document.getElementById("quick-view-content");
  if (!modal || !content) return;

  const weights = product.weights || [{ label: "500g", price: product.price }];
  let activeModalWeight = weights.find((w) => w.default) || weights[0];
  let modalQty = 1;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
      <div class="aspect-square rounded-xl bg-surface-container-low overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover"/>
      </div>
      <div class="flex flex-col justify-between gap-space-sm">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded bg-secondary/15 text-secondary text-[11px] font-bold uppercase">${product.tag || 'Organik Mahsul'}</span>
            <span class="text-on-surface-variant text-[11px] font-mono">${product.lot}</span>
          </div>
          <h2 class="text-[22px] font-bold text-on-surface">${product.name}</h2>
          <p class="text-[12px] text-secondary font-semibold mt-0.5">${product.origin} • ${product.altitude}</p>
          <p class="text-[13px] text-on-surface-variant mt-3 leading-relaxed">${product.details || product.description}</p>
          
          <!-- Nutrition info -->
          <div class="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-surface-container-low mt-4 text-center text-[11px]">
            <div>
              <span class="text-on-surface-variant block">Enerji</span>
              <span class="font-bold text-on-surface">${product.nutritions?.energy || '628 kcal'}</span>
            </div>
            <div>
              <span class="text-on-surface-variant block">Doğal Yağ</span>
              <span class="font-bold text-on-surface">${product.nutritions?.fat || '60.8 g'}</span>
            </div>
            <div>
              <span class="text-on-surface-variant block">Protein</span>
              <span class="font-bold text-on-surface">${product.nutritions?.protein || '15.0 g'}</span>
            </div>
          </div>
        </div>

        <div class="space-y-3 pt-3 border-t border-outline-variant/20">
          <div class="flex items-center justify-between">
            <span class="text-[12px] font-semibold text-on-surface-variant">Gramaj / Ambalaj:</span>
            <div class="flex gap-1">
              ${weights.map((w) => `
                <button class="modal-weight-btn px-2.5 py-1 text-[11px] rounded border ${w.label === activeModalWeight.label ? 'border-primary bg-primary text-on-primary font-bold' : 'border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant'}" data-label="${w.label}" data-price="${w.price}">
                  ${w.label}
                </button>
              `).join("")}
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[11px] text-on-surface-variant block">Birim Fiyat</span>
              <span id="modal-price" class="text-[24px] font-bold text-on-surface">${activeModalWeight.price.toFixed(0)} ₺</span>
            </div>
            <button id="modal-add-to-cart" class="px-6 py-2.5 rounded-lg bg-primary hover:bg-secondary text-on-primary text-[13px] font-bold transition-colors flex items-center gap-1.5 shadow-sm">
              <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Modal weights switcher
  content.querySelectorAll(".modal-weight-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const label = btn.getAttribute("data-label");
      activeModalWeight = weights.find((w) => w.label === label);
      content.querySelectorAll(".modal-weight-btn").forEach((b) => {
        b.className = "modal-weight-btn px-2.5 py-1 text-[11px] rounded border border-outline-variant/40 bg-surface-container-lowest text-on-surface-variant";
      });
      btn.className = "modal-weight-btn px-2.5 py-1 text-[11px] rounded border border-primary bg-primary text-on-primary font-bold";
      content.querySelector("#modal-price").textContent = `${activeModalWeight.price.toFixed(0)} ₺`;
    });
  });

  // Add to cart from modal
  content.querySelector("#modal-add-to-cart")?.addEventListener("click", () => {
    store.addToCart(product, activeModalWeight.label, modalQty);
    closeQuickView();
  });

  modal.classList.remove("hidden");
}

function closeQuickView() {
  const modal = document.getElementById("quick-view-modal");
  if (modal) modal.classList.add("hidden");
}

// --- CART & CHECKOUT CONTROLLER ---
let activePaymentMethod = "card";
let activeShippingMethod = "standard";

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyNotice = document.getElementById("cart-empty-notice");
  const countText = document.getElementById("cart-item-count-text");
  if (!cartItemsContainer) return;

  const cart = store.getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "";
    if (emptyNotice) emptyNotice.classList.remove("hidden");
    if (emptyNotice) emptyNotice.classList.add("flex");
    if (countText) countText.textContent = "Sepetiniz boş";
    updateCheckoutCalculations();
    return;
  }

  if (emptyNotice) emptyNotice.classList.add("hidden");
  if (emptyNotice) emptyNotice.classList.remove("flex");

  const totalItemUnits = store.getCartCount();
  if (countText) countText.textContent = `${cart.length} Farklı Mahsul • ${totalItemUnits} Adet`;

  cartItemsContainer.innerHTML = cart.map((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    return `
      <div class="cart-item flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-sm rounded-lg bg-surface-container-low/60 hover:bg-surface-container-low transition-colors duration-200 gap-space-sm border border-outline-variant/20" data-id="${item.productId}">
        <div class="flex items-center gap-space-md min-w-0">
          <img class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0 bg-surface-container" src="${item.image}" alt="${item.name}"/>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-[11px] text-secondary bg-secondary-fixed/50 px-1.5 py-0.5 rounded font-semibold">${item.lot || 'Parti #24-11'}</span>
              <span class="text-[11px] text-on-surface-variant font-medium">Vakum Mühürlü</span>
            </div>
            <h3 class="text-[15px] font-bold text-on-surface truncate mt-0.5">${item.name}</h3>
            <p class="text-[12px] text-on-surface-variant">${item.weight} • Birim: ${item.price.toFixed(0)} ₺</p>
          </div>
        </div>
        
        <div class="flex items-center justify-between w-full sm:w-auto gap-space-md self-end sm:self-center">
          <div class="flex items-center bg-surface-container-lowest rounded px-1 py-0.5 shadow-sm border border-outline-variant/20">
            <button class="cart-minus-btn w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors font-bold" data-index="${index}" type="button">
              <span class="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span class="w-6 text-center text-[13px] text-on-surface font-bold">${item.quantity}</span>
            <button class="cart-plus-btn w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors font-bold" data-index="${index}" type="button">
              <span class="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
          <div class="text-right min-w-[70px]">
            <span class="text-[16px] font-bold text-on-surface item-total">${itemSubtotal.toFixed(0)} ₺</span>
          </div>
          <button class="cart-del-btn text-on-surface-variant hover:text-error transition-colors p-1" data-index="${index}" type="button" title="Ürünü Çıkar">
            <span class="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Stepper & Delete handlers
  cartItemsContainer.querySelectorAll(".cart-plus-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      store.updateCartQty(idx, cart[idx].quantity + 1);
    });
  });

  cartItemsContainer.querySelectorAll(".cart-minus-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      store.updateCartQty(idx, cart[idx].quantity - 1);
    });
  });

  cartItemsContainer.querySelectorAll(".cart-del-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      store.removeFromCart(idx);
    });
  });

  updateCheckoutCalculations();
}

function updateCheckoutCalculations() {
  const subtotal = store.getCartSubtotal();
  const coupon = store.getCoupon();

  const subtotalEl = document.getElementById("subtotal-amount");
  const shippingEl = document.getElementById("shipping-amount");
  const totalEl = document.getElementById("final-total-amount");
  const farmDiscRow = document.getElementById("farm-discount-row");
  const farmDiscEl = document.getElementById("farmer-discount-amount");
  const transferDiscRow = document.getElementById("payment-discount-row");
  const transferDiscEl = document.getElementById("payment-discount-amount");
  const cashFeeRow = document.getElementById("payment-fee-row");
  const cashFeeEl = document.getElementById("payment-fee-amount");
  const couponRow = document.getElementById("coupon-discount-row");
  const couponDiscEl = document.getElementById("coupon-discount-amount");

  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(0)} ₺`;

  // Fix: If cart is empty, everything is 0
  if (subtotal === 0) {
    if (shippingEl) shippingEl.textContent = "0 ₺";
    if (totalEl) totalEl.textContent = "0 ₺";
    if (farmDiscRow) farmDiscRow.classList.add("hidden");
    if (transferDiscRow) transferDiscRow.classList.add("hidden");
    if (cashFeeRow) cashFeeRow.classList.add("hidden");
    if (couponRow) couponRow.classList.add("hidden");
    return;
  }

  // Free shipping threshold (> 500 ₺)
  const freeThreshold = 500;
  let shippingFee = 0;
  if (activeShippingMethod === "express") {
    shippingFee = 45;
    if (shippingEl) shippingEl.textContent = "+45 ₺";
  } else {
    shippingFee = subtotal >= freeThreshold ? 0 : 35;
    if (shippingEl) shippingEl.textContent = shippingFee === 0 ? "Ücretsiz" : "35 ₺";
  }

  // Farm direct support discount (> 500 ₺ is -45 ₺)
  const farmDiscount = subtotal >= freeThreshold ? 45 : 0;
  if (farmDiscRow) {
    if (farmDiscount > 0) {
      farmDiscRow.classList.remove("hidden");
      if (farmDiscEl) farmDiscEl.textContent = `-${farmDiscount} ₺`;
    } else {
      farmDiscRow.classList.add("hidden");
    }
  }

  // Payment method adjustments (Havale %5 discount, Kapıda +20 ₺)
  let paymentDiscount = 0;
  let paymentFee = 0;

  if (activePaymentMethod === "transfer") {
    paymentDiscount = Math.round(subtotal * 0.05);
    if (transferDiscRow) {
      transferDiscRow.classList.remove("hidden");
      if (transferDiscEl) transferDiscEl.textContent = `-${paymentDiscount} ₺`;
    }
  } else {
    if (transferDiscRow) transferDiscRow.classList.add("hidden");
  }

  if (activePaymentMethod === "cash") {
    paymentFee = 20;
    if (cashFeeRow) {
      cashFeeRow.classList.remove("hidden");
      if (cashFeeEl) cashFeeEl.textContent = `+${paymentFee} ₺`;
    }
  } else {
    if (cashFeeRow) cashFeeRow.classList.add("hidden");
  }

  // Coupon discount
  let couponDiscount = 0;
  if (coupon) {
    if (coupon.type === "percent") {
      couponDiscount = Math.round(subtotal * (coupon.value / 100));
    } else if (coupon.type === "fixed") {
      couponDiscount = coupon.value;
    }
    if (couponRow) {
      couponRow.classList.remove("hidden");
      if (couponDiscEl) couponDiscEl.textContent = `-${couponDiscount} ₺`;
    }
  } else {
    if (couponRow) couponRow.classList.add("hidden");
  }

  // Final Total
  const grandTotal = Math.max(0, subtotal + shippingFee + paymentFee - farmDiscount - couponDiscount - paymentDiscount);
  if (totalEl) totalEl.textContent = `${grandTotal.toFixed(0)} ₺`;
}

// --- SAVED ADDRESSES MODAL ---
function renderSavedAddresses() {
  const container = document.getElementById("saved-addresses-list");
  if (!container) return;

  container.innerHTML = SAVED_ADDRESSES.map((addr) => `
    <div class="p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 cursor-pointer transition-all flex flex-col gap-1 saved-addr-item" data-id="${addr.id}">
      <div class="flex items-center justify-between">
        <span class="font-bold text-on-surface text-[14px] flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-secondary">location_on</span>
          ${addr.title}
        </span>
        <button class="px-2.5 py-1 rounded bg-surface-container-lowest text-primary text-[11px] font-bold hover:bg-primary hover:text-on-primary transition-colors">
          Seç
        </button>
      </div>
      <p class="text-[12px] text-on-surface-variant font-medium">${addr.detailedAddress}</p>
      <div class="flex gap-2 text-[11px] text-outline">
        <span>${addr.fullName}</span> • <span>${addr.phone}</span>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".saved-addr-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      const addr = SAVED_ADDRESSES.find((a) => a.id === id);
      if (addr) {
        document.getElementById("full-name").value = addr.fullName;
        document.getElementById("phone-number").value = addr.phone;
        document.getElementById("city-select").value = addr.city;
        document.getElementById("district-select").value = addr.district;
        document.getElementById("detailed-address").value = addr.detailedAddress;

        document.getElementById("saved-addresses-modal")?.classList.add("hidden");
        store.notifyToast(`"${addr.title}" adresi forma aktarıldı.`, "success");
      }
    });
  });

  document.getElementById("saved-addresses-modal")?.classList.remove("hidden");
}

// --- ADMIN SALES & ANALYTICS CONTROLLER ---
let activeAnalyticsPeriod = "harvest";

function renderAdminAnalytics() {
  const orders = store.getOrders();
  const periodData = ANALYTICS_PERIOD_DATA[activeAnalyticsPeriod] || ANALYTICS_PERIOD_DATA["harvest"];

  // Update dynamic KPIs
  const kpiRevenue = document.getElementById("kpi-revenue");
  const kpiOrders = document.getElementById("kpi-orders-count");
  const kpiAvg = document.getElementById("kpi-avg-order");
  const kpiGrowth = document.getElementById("kpi-growth-text");

  if (kpiRevenue) kpiRevenue.textContent = `₺${periodData.revenue.toLocaleString("tr-TR")}`;
  if (kpiOrders) kpiOrders.textContent = periodData.ordersCount.toString();
  if (kpiAvg) kpiAvg.textContent = `₺${periodData.avgOrder.toLocaleString("tr-TR")},00`;
  if (kpiGrowth) {
    kpiGrowth.innerHTML = `
      <span class="material-symbols-outlined text-[14px] mr-0.5">arrow_upward</span>
      ${periodData.growthText}
    `;
  }

  // Render category distribution dynamically
  renderCategoryDistribution();

  // Render top selling products table
  renderTopSellingProducts();

  // Render orders table
  renderAdminOrdersTable(orders);

  // Draw Canvas Chart with period data
  drawRevenueChart(activeAnalyticsPeriod);
}

function renderCategoryDistribution() {
  const container = document.getElementById("category-distribution-container");
  if (!container) return;

  const categories = [
    { name: "Çifte Kavrulmuş Fındık", pct: 44, color: "bg-primary" },
    { name: "Taş Değirmen Ezmeler", pct: 28, color: "bg-secondary" },
    { name: "Soğuk Sıkım Yağlar", pct: 16, color: "bg-secondary-fixed-dim" },
    { name: "Yayla Balları", pct: 12, color: "bg-outline" }
  ];

  container.innerHTML = categories.map((cat) => `
    <div>
      <div class="flex justify-between text-[13px] font-semibold mb-1">
        <span>${cat.name}</span>
        <span class="font-bold font-mono">%${cat.pct}</span>
      </div>
      <div class="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
        <div class="${cat.color} h-full rounded-full transition-all duration-500" style="width: ${cat.pct}%;"></div>
      </div>
    </div>
  `).join("");
}

function renderTopSellingProducts() {
  const tbody = document.getElementById("top-selling-table-body");
  if (!tbody) return;

  const topItems = [
    { name: "Giresun Çifte Kavrulmuş Tombul", category: "Çiğ & Kavrulmuş", sales: "142 Kavanoz", rev: "₺54.670", stock: "420 Adet" },
    { name: "Şekersiz Doğal Fındık Ezmesi", category: "Taş Değirmen", sales: "98 Kavanoz", rev: "₺28.910", stock: "185 Adet" },
    { name: "Doğal Güneşte Kurutulmuş Çiğ Fındık", category: "Çiğ & Kavrulmuş", sales: "64 Kese", rev: "₺21.760", stock: "260 Adet" },
    { name: "Soğuk Sıkım Ham Fındık Yağı", category: "Soğuk Sıkım", sales: "52 Şişe", rev: "₺28.080", stock: "95 Adet" }
  ];

  tbody.innerHTML = topItems.map((item) => `
    <tr class="hover:bg-surface-container-low/50 transition-colors">
      <td class="py-2.5 px-3 font-semibold text-on-surface">${item.name}</td>
      <td class="py-2.5 px-3 text-on-surface-variant">${item.category}</td>
      <td class="py-2.5 px-3 font-semibold text-on-surface">${item.sales}</td>
      <td class="py-2.5 px-3 font-mono font-bold text-secondary">${item.rev}</td>
      <td class="py-2.5 px-3 text-on-surface-variant">${item.stock}</td>
    </tr>
  `).join("");
}

function renderAdminOrdersTable(orders) {
  const tbody = document.getElementById("admin-orders-table-body");
  if (!tbody) return;

  const q = (document.getElementById("admin-order-search")?.value || "").toLowerCase().trim();
  let filtered = [...orders];

  if (q) {
    filtered = filtered.filter((o) =>
      o.id.toLowerCase().includes(q) ||
      (o.customer?.name || o.customerName || "").toLowerCase().includes(q) ||
      (o.itemsSummary || "").toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-outline text-[13px]">
          Eşleşen sipariş hareketi bulunamadı.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((order) => {
    const custName = order.customer?.name || order.customerName || "Değerli Müşteri";
    const status = order.status || "Hazırlanıyor";
    const statusCol = status === "Teslim Edildi" ? "text-secondary bg-secondary-fixed/50" : status === "Kargoya Verildi" ? "text-on-surface bg-surface-container-high" : "text-secondary font-semibold bg-secondary/10";
    const total = order.total || 0;
    const summary = order.itemsSummary || (order.items ? order.items.map(i => `${i.quantity}x ${i.name}`).join(", ") : "Organik Mahsuller");

    return `
      <tr class="hover:bg-surface-container-low/50 transition-colors">
        <td class="py-3 px-3 font-mono font-bold text-on-surface">${order.id}</td>
        <td class="py-3 px-3">
          <div class="font-semibold text-on-surface">${custName}</div>
          <div class="text-[11px] text-outline">${order.date}</div>
        </td>
        <td class="py-3 px-3 max-w-xs truncate text-on-surface-variant text-[12px]">${summary}</td>
        <td class="py-3 px-3 font-mono font-bold text-on-surface">₺${total.toFixed(0)}</td>
        <td class="py-3 px-3">
          <select class="order-status-select text-[11px] font-semibold py-1 px-2 rounded cursor-pointer ${statusCol} border-0 outline-none" data-id="${order.id}">
            <option value="Hazırlanıyor" ${status === "Hazırlanıyor" ? "selected" : ""}>Hazırlanıyor</option>
            <option value="Kargoya Verildi" ${status === "Kargoya Verildi" ? "selected" : ""}>Kargoya Verildi</option>
            <option value="Teslim Edildi" ${status === "Teslim Edildi" ? "selected" : ""}>Teslim Edildi</option>
          </select>
        </td>
        <td class="py-3 px-3 text-right">
          <button class="btn-view-order-detail p-1.5 rounded text-outline hover:text-primary hover:bg-surface-container transition-colors" data-id="${order.id}" title="Detay & İrsaliye">
            <span class="material-symbols-outlined text-[18px]">receipt_long</span>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  // Status changer listeners
  tbody.querySelectorAll(".order-status-select").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const oId = sel.getAttribute("data-id");
      store.updateOrderStatus(oId, e.target.value);
    });
  });

  // Detail modal listeners
  tbody.querySelectorAll(".btn-view-order-detail").forEach((btn) => {
    btn.addEventListener("click", () => {
      const oId = btn.getAttribute("data-id");
      openOrderDetailModal(oId);
    });
  });
}

function drawRevenueChart(period = "harvest") {
  const canvas = document.getElementById("revenue-trend-canvas");
  if (!canvas) return;

  const pData = ANALYTICS_PERIOD_DATA[period] || ANALYTICS_PERIOD_DATA["harvest"];
  const labels = pData.labels;
  const revenueData = pData.revenueData;
  const maxVal = pData.maxVal;

  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = rect.width || 600;
  const height = rect.height || 250;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, width, height);

  const paddingLeft = 45;
  const paddingBottom = 25;
  const paddingTop = 15;
  const paddingRight = 15;
  const chartW = Math.max(10, width - paddingLeft - paddingRight);
  const chartH = Math.max(10, height - paddingTop - paddingBottom);

  // Draw grid lines
  ctx.strokeStyle = "#eae8e5";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);

  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();

    // Y Axis label
    ctx.fillStyle = "#80756f";
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "right";
    const labelVal = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillText(`₺${(labelVal / 1000).toFixed(0)}k`, paddingLeft - 6, y + 4);
  }
  ctx.setLineDash([]);

  // Calculate points
  const points = revenueData.map((val, idx) => {
    const x = paddingLeft + (chartW / (labels.length - 1)) * idx;
    const y = paddingTop + chartH - (val / maxVal) * chartH;
    return { x, y, val };
  });

  // Gradient fill
  const grad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + chartH);
  grad.addColorStop(0, "rgba(133, 82, 50, 0.18)");
  grad.addColorStop(1, "rgba(133, 82, 50, 0.0)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
  }
  ctx.lineTo(points[points.length - 1].x, paddingTop + chartH);
  ctx.lineTo(points[0].x, paddingTop + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw revenue curve
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
  }
  ctx.strokeStyle = "#855232";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw points & X Axis labels
  points.forEach((pt, idx) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#855232";
    ctx.lineWidth = 2;
    ctx.stroke();

    // X Label
    ctx.fillStyle = "#80756f";
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[idx], pt.x, height - 6);
  });
}

// --- ORDER DETAIL & PRINTABLE MODAL ---
function openOrderDetailModal(orderId) {
  const modal = document.getElementById("order-detail-modal");
  const content = document.getElementById("order-detail-content");
  if (!modal || !content) return;

  const orders = store.getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  const custName = order.customer?.name || order.customerName || "Değerli Müşteri";
  const phone = order.customer?.phone || order.phone || "-";
  const address = order.customer?.address || order.address || "-";
  const items = order.items || [];

  content.innerHTML = `
    <div class="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-surface-container-low text-[13px]">
      <div>
        <span class="text-on-surface-variant block text-[11px] font-semibold uppercase">Müşteri &amp; İletişim</span>
        <span class="font-bold text-on-surface">${custName}</span>
        <span class="text-on-surface-variant block">${phone}</span>
        <span class="text-on-surface-variant block text-[12px] mt-1">${address}</span>
      </div>
      <div>
        <span class="text-on-surface-variant block text-[11px] font-semibold uppercase">Lojistik &amp; Ödeme</span>
        <span class="font-bold text-secondary font-mono">${order.trackingNo || 'YK-XXXXXX-TR'}</span>
        <span class="text-on-surface-variant block">${order.shippingMethod || 'Çiftlik Kargo'}</span>
        <span class="text-on-surface block font-semibold mt-1">${order.paymentMethod || 'Kredi Kartı'}</span>
      </div>
    </div>

    <div>
      <h4 class="text-[13px] font-bold text-on-surface mb-2">Mahsuller</h4>
      <div class="space-y-1.5 divide-y divide-outline-variant/10 text-[13px]">
        ${items.map((i) => `
          <div class="pt-1.5 flex justify-between items-center">
            <div>
              <span class="font-semibold text-on-surface">${i.name}</span>
              <span class="text-outline text-[11px] ml-1">(${i.weight})</span>
            </div>
            <div class="font-mono font-bold text-on-surface">${i.quantity} x ${i.price.toFixed(0)} ₺ = ${(i.quantity * i.price).toFixed(0)} ₺</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="pt-3 border-t border-outline-variant/20 space-y-1 text-right text-[13px]">
      <div class="text-on-surface-variant">Ara Toplam: <span class="font-mono font-semibold">${order.subtotal?.toFixed(0) || 0} ₺</span></div>
      <div class="text-secondary">İndirimler: <span class="font-mono font-semibold">-${(order.farmDiscount || 0) + (order.couponDiscount || 0) + (order.paymentDiscount || 0)} ₺</span></div>
      <div class="text-[16px] font-bold text-on-surface pt-1 border-t border-outline-variant/20">Genel Toplam: <span class="font-mono text-secondary">${order.total?.toFixed(0) || 0} ₺</span></div>
    </div>
  `;

  // Prepare print template
  const printId = document.getElementById("print-order-id");
  const printDate = document.getElementById("print-order-date");
  const printName = document.getElementById("print-customer-name");
  const printAddr = document.getElementById("print-customer-address");
  const printPhone = document.getElementById("print-customer-phone");
  const printTrack = document.getElementById("print-tracking-no");
  const printLot = document.getElementById("print-lot");
  const printPayment = document.getElementById("print-payment");
  const printBody = document.getElementById("print-items-body");
  const printSub = document.getElementById("print-subtotal");
  const printDisc = document.getElementById("print-discount");
  const printTot = document.getElementById("print-total");

  if (printId) printId.textContent = order.id;
  if (printDate) printDate.textContent = order.date;
  if (printName) printName.textContent = custName;
  if (printAddr) printAddr.textContent = address;
  if (printPhone) printPhone.textContent = phone;
  if (printTrack) printTrack.textContent = order.trackingNo || "YK-XXXXXX-TR";
  if (printLot) printLot.textContent = order.lot || "Parti #24-11";
  if (printPayment) printPayment.textContent = order.paymentMethod || "Kredi Kartı";
  if (printSub) printSub.textContent = `${order.subtotal?.toFixed(0) || 0} ₺`;
  if (printDisc) printDisc.textContent = `-${(order.farmDiscount || 0) + (order.couponDiscount || 0) + (order.paymentDiscount || 0)} ₺`;
  if (printTot) printTot.textContent = `${order.total?.toFixed(0) || 0} ₺`;

  if (printBody) {
    printBody.innerHTML = items.map((i) => `
      <tr>
        <td style="padding: 8px 10px;">${i.name} (${i.weight})</td>
        <td style="padding: 8px 10px; text-align: center;">${i.quantity}</td>
        <td style="padding: 8px 10px; text-align: right;">${i.price.toFixed(0)} ₺</td>
        <td style="padding: 8px 10px; text-align: right;">${(i.quantity * i.price).toFixed(0)} ₺</td>
      </tr>
    `).join("");
  }

  modal.classList.remove("hidden");
}

// --- ADMIN INVENTORY CONTROLLER ---
function renderAdminInventory() {
  const products = store.getProducts();

  const totalEl = document.getElementById("inv-kpi-total");
  const activeEl = document.getElementById("inv-kpi-active");
  const lowStockEl = document.getElementById("inv-kpi-low-stock");

  const lowStockCount = products.filter((p) => p.stock < 50 && p.stock > 0).length;

  if (totalEl) totalEl.textContent = products.length.toString();
  if (activeEl) activeEl.textContent = products.filter((p) => p.active !== false).length.toString();
  if (lowStockEl) lowStockEl.textContent = lowStockCount.toString();

  renderInventoryTable();
}

function renderInventoryTable() {
  const tbody = document.getElementById("inventory-table-body");
  if (!tbody) return;

  const searchQuery = (document.getElementById("inv-search-input")?.value || "").toLowerCase().trim();
  const categoryFilter = document.getElementById("inv-cat-filter")?.value || "all";

  let products = store.getProducts();

  // Search
  if (searchQuery) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.sku.toLowerCase().includes(searchQuery) ||
      p.lot.toLowerCase().includes(searchQuery)
    );
  }

  // Category
  if (categoryFilter !== "all") {
    products = products.filter((p) => p.category === categoryFilter);
  }

  if (products.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-12 text-center text-outline text-[13px]">
          Filtrelere uygun mahsul kaydı bulunamadı.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = products.map((product) => {
    const cost = product.costPrice || (product.price * 0.55);
    const profit = product.price - cost;
    const margin = Math.round((profit / product.price) * 100);
    const stockPct = Math.min(100, Math.round((product.stock / 500) * 100));
    const stockBarColor = product.stock < 50 ? "bg-error" : product.stock < 150 ? "bg-secondary" : "bg-primary";
    const isActive = product.active !== false;

    return `
      <tr class="hover:bg-surface-container-low/40 transition-colors">
        <td class="py-3 px-4">
          <div class="flex items-center gap-space-sm">
            <img class="w-11 h-11 rounded-lg object-cover bg-surface-container shrink-0 border border-outline-variant/30" src="${product.image}" alt="${product.name}"/>
            <div class="min-w-0">
              <span class="font-bold text-on-surface block text-[13px] truncate">${product.name}</span>
              <div class="flex items-center gap-1.5 text-[11px] text-outline">
                <span class="font-mono">${product.sku}</span>
                <span>•</span>
                <span class="text-secondary font-medium">${product.lot}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="py-3 px-3 text-[12px] text-on-surface-variant font-medium">
          ${product.categoryName || product.category}
        </td>
        <td class="py-3 px-3 font-mono font-bold text-on-surface text-[14px]">
          ${product.price.toFixed(0)} ₺
        </td>
        <td class="py-3 px-3 font-mono text-outline text-[13px]">
          ${cost.toFixed(0)} ₺
        </td>
        <td class="py-3 px-3 font-mono font-bold text-secondary text-[13px]">
          %${margin}
        </td>
        <td class="py-3 px-3">
          <div class="flex items-center gap-2">
            <div class="w-20 bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div class="${stockBarColor} h-full rounded-full" style="width: ${stockPct}%;"></div>
            </div>
            <span class="text-[12px] font-mono text-on-surface font-semibold">${product.stock}</span>
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer prod-active-toggle" data-id="${product.id}" ${isActive ? 'checked' : ''}>
            <div class="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="inline-flex items-center gap-1">
            <button class="btn-price-history p-1.5 text-outline hover:text-secondary rounded hover:bg-surface-container transition-colors" data-id="${product.id}" title="Fiyat Geçmişi">
              <span class="material-symbols-outlined text-[18px]">history</span>
            </button>
            <button class="btn-edit-product p-1.5 text-outline hover:text-primary rounded hover:bg-surface-container transition-colors" data-id="${product.id}" title="Düzenle">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button class="btn-delete-product p-1.5 text-outline hover:text-error rounded hover:bg-error-container/20 transition-colors" data-id="${product.id}" title="Sil">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  // Toggle active switch
  tbody.querySelectorAll(".prod-active-toggle").forEach((toggle) => {
    toggle.addEventListener("change", (e) => {
      const id = toggle.getAttribute("data-id");
      store.toggleProductActive(id, toggle.checked);
    });
  });

  // Price history modal
  tbody.querySelectorAll(".btn-price-history").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      openPriceHistoryModal(id);
    });
  });

  // Edit product drawer
  tbody.querySelectorAll(".btn-edit-product").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      openEditProductDrawer(id);
    });
  });

  // Delete product
  tbody.querySelectorAll(".btn-delete-product").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Bu mahsul kaydını sistemden kaldırmak istediğinize emin misiniz?")) {
        store.deleteProduct(id);
        renderAdminInventory();
      }
    });
  });
}

function openPriceHistoryModal(productId) {
  const modal = document.getElementById("price-history-modal");
  const list = document.getElementById("price-history-list");
  const title = document.getElementById("price-history-title");
  if (!modal || !list) return;

  const product = store.getProductById(productId);
  if (!product) return;

  if (title) title.textContent = `${product.name} • Fiyat Geçmişi`;

  const history = product.priceHistory || [
    { date: "15 Ağustos 2024", price: product.price, reason: "2024 Hasat Sezonu Fiyatı" }
  ];

  list.innerHTML = history.map((h) => `
    <div class="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low text-[13px]">
      <div>
        <span class="font-semibold text-on-surface block">${h.reason}</span>
        <span class="text-[11px] text-outline">${h.date}</span>
      </div>
      <span class="font-mono font-bold text-secondary">${h.price.toFixed(0)} ₺</span>
    </div>
  `).join("");

  modal.classList.remove("hidden");
}

function openEditProductDrawer(productId) {
  const product = store.getProductById(productId);
  if (!product) return;

  document.getElementById("edit-prod-id").value = product.id;
  document.getElementById("drawer-heading").textContent = `Mahsulü Düzenle: ${product.name}`;
  document.getElementById("btn-drawer-submit").textContent = "Değişiklikleri Kaydet";

  document.getElementById("new-prod-name").value = product.name;
  document.getElementById("new-prod-category").value = product.category;
  document.getElementById("new-prod-lot").value = product.lot;
  document.getElementById("new-prod-price").value = product.price;
  document.getElementById("new-prod-cost").value = product.costPrice || (product.price * 0.55);
  document.getElementById("new-prod-stock").value = product.stock;
  document.getElementById("new-prod-desc").value = product.description;
  document.getElementById("new-prod-image").value = product.image;

  const drawer = document.getElementById("add-product-drawer");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const drawerPanel = document.getElementById("drawer-panel");

  drawer.classList.remove("pointer-events-none");
  drawerBackdrop.classList.remove("pointer-events-none", "opacity-0");
  drawerPanel.classList.remove("translate-x-full");
}

// --- INITIALIZE ALL EVENT LISTENERS & MODULES ---
function initApp() {
  initRouter();

  // Subscribe to store notifications
  store.on("toast", ({ message, type }) => showToast(message, type));

  // Sync cart counter badge
  const updateCartBadge = () => {
    const badge = document.getElementById("header-cart-badge");
    const count = store.getCartCount();
    if (badge) {
      badge.textContent = count.toString();
      badge.classList.toggle("hidden", count === 0);
    }
  };

  store.on("cartChanged", () => {
    updateCartBadge();
    if (currentRoute === "sepet") renderCart();
  });

  store.on("productsChanged", () => {
    if (currentRoute === "katalog") renderCatalog();
    if (currentRoute === "admin-stok") renderAdminInventory();
  });

  store.on("ordersChanged", () => {
    if (currentRoute === "admin-analitik") renderAdminAnalytics();
  });

  updateCartBadge();

  // Profile Dropdown Toggle
  const profileBtn = document.getElementById("profile-dropdown-btn");
  const profileMenu = document.getElementById("profile-dropdown-menu");
  if (profileBtn && profileMenu) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle("hidden");
    });
    document.addEventListener("click", () => profileMenu.classList.add("hidden"));
  }

  // Reset Demo button
  document.getElementById("btn-reset-demo")?.addEventListener("click", () => {
    if (confirm("Tüccarım demo verileri ilk orijinal haline sıfırlansın mı?")) {
      store.resetToDefaults();
      location.reload();
    }
  });

  // Mobile menu button
  document.getElementById("mobile-menu-btn")?.addEventListener("click", () => {
    document.getElementById("mobile-nav")?.classList.toggle("hidden");
  });

  // Header Search Input
  const headerSearch = document.getElementById("header-search-input");
  if (headerSearch) {
    headerSearch.addEventListener("input", (e) => {
      activeCatalogSearch = e.target.value.trim();
      if (currentRoute !== "katalog") {
        navigateTo("katalog");
      } else {
        renderCatalog();
      }
    });
  }

  // Catalog Category Filter Pills
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategoryFilter = btn.getAttribute("data-category");
      updateCategoryPills();
      renderCatalog();
    });
  });

  // Catalog Sort Selector
  document.getElementById("catalog-sort-select")?.addEventListener("change", (e) => {
    activeSortOrder = e.target.value;
    renderCatalog();
  });

  // Quick View Close Buttons
  document.getElementById("btn-close-quick-view")?.addEventListener("click", closeQuickView);
  document.getElementById("quick-view-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "quick-view-modal") closeQuickView();
  });

  // Saved Addresses Modal Trigger
  document.getElementById("btn-open-saved-addresses")?.addEventListener("click", () => {
    renderSavedAddresses();
  });
  document.getElementById("btn-close-saved-addresses")?.addEventListener("click", () => {
    document.getElementById("saved-addresses-modal")?.classList.add("hidden");
  });
  document.getElementById("btn-close-saved-addresses-2")?.addEventListener("click", () => {
    document.getElementById("saved-addresses-modal")?.classList.add("hidden");
  });

  // Payment Tabs Switcher
  document.querySelectorAll(".pay-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".pay-tab").forEach((t) => {
        t.className = "pay-tab flex-1 min-w-[140px] py-2.5 px-3 rounded text-center text-[13px] transition-all duration-200 text-on-surface-variant hover:text-on-surface";
      });
      tab.className = "pay-tab flex-1 min-w-[140px] py-2.5 px-3 rounded text-center text-[13px] transition-all duration-200 bg-surface-container-lowest text-on-surface shadow-sm font-semibold";

      const target = tab.getAttribute("data-target");
      document.querySelectorAll(".pay-panel").forEach((panel) => panel.classList.add("hidden"));
      const activePanel = document.getElementById(target);
      if (activePanel) activePanel.classList.remove("hidden");

      if (target === "card-form") activePaymentMethod = "card";
      else if (target === "wire-form") activePaymentMethod = "transfer";
      else if (target === "cod-form") activePaymentMethod = "cash";

      updateCheckoutCalculations();
    });
  });

  // Shipping Method Radios
  document.querySelectorAll("input[name='shipping-method']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      activeShippingMethod = e.target.value;
      updateCheckoutCalculations();
    });
  });

  // Apply Coupon Button
  document.getElementById("btn-apply-coupon")?.addEventListener("click", () => {
    const code = document.getElementById("coupon-code")?.value;
    store.applyCoupon(code);
    updateCheckoutCalculations();
  });

  // Card formatting
  const cardInput = document.getElementById("card-number");
  const brandBadge = document.getElementById("card-brand-badge");
  if (cardInput) {
    cardInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(" ") || val;
      e.target.value = formatted;

      if (val.startsWith("4")) {
        if (brandBadge) brandBadge.textContent = "VISA";
      } else if (val.startsWith("51") || val.startsWith("52") || val.startsWith("53") || val.startsWith("54") || val.startsWith("55")) {
        if (brandBadge) brandBadge.textContent = "Mastercard";
      } else if (val.startsWith("9792")) {
        if (brandBadge) brandBadge.textContent = "TROY";
      } else {
        if (brandBadge) brandBadge.textContent = "KART";
      }
    });
  }

  // Card Expiry Mask
  const expiryInput = document.getElementById("card-expiry");
  if (expiryInput) {
    expiryInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 3) {
        e.target.value = `${val.substring(0, 2)}/${val.substring(2)}`;
      } else {
        e.target.value = val;
      }
    });
  }

  // Complete Order Button
  document.getElementById("btn-checkout")?.addEventListener("click", () => {
    if (store.getCart().length === 0) {
      alert("Sepetiniz boş! Lütfen önce ürün ekleyin.");
      return;
    }

    const name = document.getElementById("full-name")?.value.trim();
    const phone = document.getElementById("phone-number")?.value.trim();
    const city = document.getElementById("city-select")?.value;
    const district = document.getElementById("district-select")?.value.trim();
    const address = document.getElementById("detailed-address")?.value.trim();
    const notes = document.getElementById("farm-notes")?.value.trim();

    if (!name || !phone || !address) {
      alert("Lütfen teslimat için ad, telefon ve adres alanlarını eksiksiz doldurun.");
      return;
    }

    try {
      const order = store.createOrder({
        customer: { name, phone, city, district, address, email: "musteri@posta.me" },
        shippingMethod: activeShippingMethod,
        paymentMethod: activePaymentMethod === "card" ? "Kredi Kartı (256-Bit SSL)" : activePaymentMethod === "transfer" ? "Havale / EFT (%5 İndirimli)" : "Kapıda Ödeme (+20 ₺)",
        notes
      });

      // Show Order Success Modal
      document.getElementById("success-order-id").textContent = `#${order.id}`;
      document.getElementById("success-tracking-no").textContent = order.trackingNo;
      document.getElementById("success-total").textContent = `${order.total.toFixed(0)} ₺`;

      const successModal = document.getElementById("order-success-modal");
      if (successModal) successModal.classList.remove("hidden");

      renderCart();
    } catch (err) {
      alert(err.message);
    }
  });

  // Success Modal Actions
  document.getElementById("btn-success-view-admin")?.addEventListener("click", () => {
    document.getElementById("order-success-modal")?.classList.add("hidden");
    navigateTo("admin-analitik");
  });

  document.getElementById("btn-success-continue")?.addEventListener("click", () => {
    document.getElementById("order-success-modal")?.classList.add("hidden");
    navigateTo("katalog");
  });

  // Order Detail Modal Close & Print
  document.getElementById("btn-close-order-detail")?.addEventListener("click", () => {
    document.getElementById("order-detail-modal")?.classList.add("hidden");
  });
  document.getElementById("btn-close-order-detail-2")?.addEventListener("click", () => {
    document.getElementById("order-detail-modal")?.classList.add("hidden");
  });
  document.getElementById("btn-print-order")?.addEventListener("click", () => {
    window.print();
  });

  // Price History Modal Close
  document.getElementById("btn-close-price-history")?.addEventListener("click", () => {
    document.getElementById("price-history-modal")?.classList.add("hidden");
  });
  document.getElementById("btn-close-price-history-2")?.addEventListener("click", () => {
    document.getElementById("price-history-modal")?.classList.add("hidden");
  });

  // Lab Report Modal Triggers
  const openLabModal = () => {
    document.getElementById("lab-report-modal")?.classList.remove("hidden");
  };
  document.getElementById("btn-footer-traceability")?.addEventListener("click", openLabModal);
  document.getElementById("btn-close-lab-report")?.addEventListener("click", () => {
    document.getElementById("lab-report-modal")?.classList.add("hidden");
  });
  document.getElementById("btn-close-lab-report-2")?.addEventListener("click", () => {
    document.getElementById("lab-report-modal")?.classList.add("hidden");
  });

  // ADMIN ANALYTICS: Time Periods
  document.querySelectorAll(".analytics-period-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".analytics-period-btn").forEach((b) => {
        b.className = "analytics-period-btn px-3 py-1.5 rounded text-[12px] text-on-surface-variant hover:text-on-surface transition-colors";
      });
      btn.className = "analytics-period-btn px-3 py-1.5 rounded text-[12px] bg-primary text-on-primary font-semibold shadow-sm transition-colors";
      activeAnalyticsPeriod = btn.getAttribute("data-period");
      renderAdminAnalytics();
      store.notifyToast(`Analitik görünümü "${btn.textContent}" periyoduna göre güncellendi.`, "info");
    });
  });

  // ADMIN ANALYTICS: Order Search
  document.getElementById("admin-order-search")?.addEventListener("input", () => {
    renderAdminOrdersTable(store.getOrders());
  });

  // ADMIN ANALYTICS: CSV Export
  document.getElementById("btn-export-csv")?.addEventListener("click", () => {
    const orders = store.getOrders();
    let csv = "Siparis No;Tarih;Musteri;Sehir;Urunler;Tutar;Durum\n";
    orders.forEach((o) => {
      const name = o.customer?.name || o.customerName || "-";
      const city = o.customer?.city || o.city || "-";
      const summary = (o.itemsSummary || "").replace(/;/g, ",");
      csv += `${o.id};${o.date};${name};${city};${summary};${o.total} TL;${o.status}\n`;
    });
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Tuccarim_Siparis_Raporu_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    store.notifyToast("Sipariş raporu CSV olarak indirildi.", "success");
  });

  // ADMIN INVENTORY: Search & Filter
  document.getElementById("inv-search-input")?.addEventListener("input", renderInventoryTable);
  document.getElementById("inv-cat-filter")?.addEventListener("change", renderInventoryTable);

  // ADMIN INVENTORY: Bulk Price Modal
  const bulkModal = document.getElementById("bulk-price-modal");
  document.getElementById("btn-open-bulk-price")?.addEventListener("click", () => {
    bulkModal?.classList.remove("hidden");
  });
  document.getElementById("btn-close-bulk-modal")?.addEventListener("click", () => {
    bulkModal?.classList.add("hidden");
  });
  document.getElementById("btn-cancel-bulk-modal")?.addEventListener("click", () => {
    bulkModal?.classList.add("hidden");
  });

  // Bulk Form Submit
  document.getElementById("bulk-price-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const category = document.getElementById("bulk-category").value;
    const type = document.querySelector("input[name='bulk_type']:checked").value;
    const value = document.getElementById("bulk-value").value;

    store.applyBulkPriceUpdate({ category, type, value });
    bulkModal?.classList.add("hidden");
    renderAdminInventory();
  });

  // ADMIN INVENTORY: Add / Edit Product Drawer
  const drawer = document.getElementById("add-product-drawer");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const drawerPanel = document.getElementById("drawer-panel");

  const openDrawer = () => {
    document.getElementById("edit-prod-id").value = "";
    document.getElementById("drawer-heading").textContent = "Yeni Mahsul Ekle";
    document.getElementById("btn-drawer-submit").textContent = "Kaydet & Yayınla";
    document.getElementById("new-product-form").reset();

    drawer.classList.remove("pointer-events-none");
    drawerBackdrop.classList.remove("pointer-events-none", "opacity-0");
    drawerPanel.classList.remove("translate-x-full");
  };

  const closeDrawer = () => {
    drawerBackdrop.classList.add("opacity-0", "pointer-events-none");
    drawerPanel.classList.add("translate-x-full");
    drawer.classList.add("pointer-events-none");
  };

  document.getElementById("btn-open-add-product")?.addEventListener("click", openDrawer);
  document.getElementById("btn-close-drawer")?.addEventListener("click", closeDrawer);
  document.getElementById("btn-cancel-drawer")?.addEventListener("click", closeDrawer);
  drawerBackdrop?.addEventListener("click", closeDrawer);

  // New / Edit Product Form Submit
  document.getElementById("new-product-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = document.getElementById("edit-prod-id").value;
    const name = document.getElementById("new-prod-name").value.trim();
    const category = document.getElementById("new-prod-category").value;
    const lot = document.getElementById("new-prod-lot").value.trim();
    const price = document.getElementById("new-prod-price").value;
    const costPrice = document.getElementById("new-prod-cost").value;
    const stock = document.getElementById("new-prod-stock").value;
    const description = document.getElementById("new-prod-desc").value.trim();
    const image = document.getElementById("new-prod-image").value.trim();

    if (editId) {
      store.updateProduct(editId, { name, category, lot, price, costPrice, stock, description, image });
    } else {
      store.addProduct({ name, category, lot, price, costPrice, stock, description, image });
    }

    closeDrawer();
    renderAdminInventory();
  });
}

// Resilient initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
