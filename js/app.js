// Fındık Vadisi - Modern Application Controller
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
      link.className = "nav-link px-space-md py-space-sm rounded-lg bg-primary text-on-primary font-label-lg text-label-lg transition-all shadow-xs font-bold";
    } else {
      link.className = "nav-link px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-all";
    }
  });

  // Update admin sidebar nav links
  document.querySelectorAll(".admin-nav-link").forEach((link) => {
    const linkRoute = link.getAttribute("data-admin-route");
    if (linkRoute === route) {
      link.className = "admin-nav-link flex items-center px-space-md py-space-sm rounded-lg bg-primary text-on-primary font-label-lg text-label-lg transition-colors shadow-xs font-bold";
    } else {
      link.className = "admin-nav-link flex items-center px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-lg text-label-lg transition-colors";
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
  const borderCol = isError ? "border-error/40 bg-error-container text-on-error-container" : "border-secondary/40 bg-surface-container-lowest text-on-surface shadow-xl";

  toast.className = `flex items-center gap-3 p-3.5 rounded-xl border ${borderCol} pointer-events-auto transition-all transform duration-300 translate-y-4 opacity-0`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] ${isError ? 'text-error' : 'text-secondary'}">${icon}</span>
    <span class="font-body-sm text-[13px] font-semibold flex-1 leading-snug">${message}</span>
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
let activeWeightFilter = "all";
let activeSortOrder = "featured";
let activeCatalogSearch = "";

function renderCatalog() {
  const container = document.getElementById("catalog-products-container");
  const countSpan = document.getElementById("catalog-count");
  if (!container) return;

  // Filter only active products for the customer catalog
  let products = store.getProducts().filter((p) => p.active !== false);

  // Filter Category
  if (activeCategoryFilter !== "all") {
    products = products.filter((p) => p.category === activeCategoryFilter);
  }

  // Filter Weight tag
  if (activeWeightFilter === "kavanoz") {
    products = products.filter((p) => p.category === "ezme" || p.name.includes("Kavanoz"));
  } else if (activeWeightFilter === "cuval") {
    products = products.filter((p) => p.category === "kavrulmus" || p.category === "cig");
  } else if (activeWeightFilter === "yagbal") {
    products = products.filter((p) => p.category === "yag" || p.category === "bal");
  }

  // Search Filter
  if (activeCatalogSearch) {
    const q = activeCatalogSearch.toLowerCase();
    products = products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.origin.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
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

  if (countSpan) countSpan.textContent = products.length;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-outline text-[48px]">search_off</span>
        <h4 class="font-title-md text-on-surface font-bold">Aradığınız kriterlere uygun mahsul bulunamadı</h4>
        <p class="font-body-sm text-on-surface-variant">Filtreleri temizleyerek veya farklı bir arama yaparak tekrar deneyin.</p>
        <button id="btn-reset-filters" class="mt-2 px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md">Tüm Mahsulleri Göster</button>
      </div>
    `;
    const resetBtn = document.getElementById("btn-reset-filters");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        activeCategoryFilter = "all";
        activeWeightFilter = "all";
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
        <div class="flex items-center gap-1 p-1 rounded-lg bg-surface-container-low mb-2">
          ${product.weights.map((w, idx) => `
            <button class="prod-weight-btn flex-1 py-1 rounded font-label-md text-[11px] transition-all ${w.default ? 'bg-primary text-on-primary font-bold shadow-xs' : 'text-on-surface-variant hover:bg-surface-container-high'}"
              data-prod-id="${product.id}"
              data-weight-label="${w.label}"
              data-weight-price="${w.price}">
              ${w.label}
            </button>
          `).join("")}
        </div>
      `
      : "";

    return `
      <article class="product-card flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-outline-variant/30" data-id="${product.id}">
        <!-- Image Area -->
        <div class="relative w-full aspect-square bg-surface-container-low overflow-hidden cursor-pointer btn-open-detail" data-id="${product.id}">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${product.name}" src="${product.image}"/>
          <span class="absolute top-3 left-3 px-space-sm py-0.5 rounded-full bg-secondary text-on-secondary font-label-tag text-label-tag uppercase tracking-wide font-bold shadow-xs">
            ${product.badge || "Yeni Mahsul"}
          </span>
          <button class="btn-favorite absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm ${isFav ? 'text-error' : 'text-on-surface-variant hover:text-primary'} flex items-center justify-center transition-colors shadow-xs" data-id="${product.id}">
            <span class="material-symbols-outlined text-[18px]" style="${isFav ? "font-variation-settings: 'FILL' 1;" : ''}">favorite</span>
          </button>
          <div class="absolute bottom-3 left-3 px-space-xs py-0.5 rounded bg-surface-container-lowest/90 font-label-tag text-label-tag text-on-surface-variant shadow-xs">
            ${product.lot} · ${product.altitude}
          </div>
        </div>

        <!-- Details Area -->
        <div class="p-space-md flex flex-col flex-1 justify-between gap-space-sm">
          <div>
            <div class="flex items-center justify-between gap-space-xs mb-1">
              <span class="font-label-tag text-label-tag text-secondary uppercase font-bold">${product.tag || "Organik Sertifikalı"}</span>
              <div class="flex items-center gap-0.5 text-tertiary">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="font-label-md text-label-md font-bold text-on-surface">${product.rating.toFixed(1)}</span>
                <span class="font-body-sm text-[11px] text-outline">(${product.reviewsCount})</span>
              </div>
            </div>
            
            <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors cursor-pointer btn-open-detail" data-id="${product.id}">
              ${product.name}
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
              ${product.description}
            </p>
          </div>

          <!-- Weights Selector -->
          ${weightsHtml}

          <!-- Price & Add To Cart -->
          <div class="pt-space-xs flex items-center justify-between gap-space-sm border-t border-outline-variant/20">
            <div class="flex flex-col">
              ${product.oldPrice ? `<span class="font-body-sm text-[12px] text-outline line-through">${product.oldPrice.toFixed(0)} ₺</span>` : ""}
              <span class="card-price font-headline-sm text-headline-sm text-primary font-bold" data-current-price="${defaultWeight.price}">
                ${defaultWeight.price.toFixed(0)} ₺
              </span>
            </div>

            <!-- Quantity Stepper & Add Button -->
            <div class="flex items-center gap-space-xs">
              <div class="flex items-center rounded-lg bg-surface-container border border-outline-variant/30">
                <button class="btn-card-minus w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors font-bold text-sm">−</button>
                <span class="card-qty-val font-label-md text-label-md px-1.5 text-on-surface font-semibold">1</span>
                <button class="btn-card-plus w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors font-bold text-sm">+</button>
              </div>
              <button class="btn-add-to-cart p-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-all flex items-center justify-center shadow-xs hover:scale-105" data-id="${product.id}" title="Sepete Ekle">
                <span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
              </button>
            </div>
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
    let qty = 1;

    const qtySpan = card.querySelector(".card-qty-val");
    const priceSpan = card.querySelector(".card-price");

    // Stepper
    card.querySelector(".btn-card-plus")?.addEventListener("click", () => {
      qty++;
      if (qtySpan) qtySpan.textContent = qty;
    });

    card.querySelector(".btn-card-minus")?.addEventListener("click", () => {
      if (qty > 1) {
        qty--;
        if (qtySpan) qtySpan.textContent = qty;
      }
    });

    // Weight switchers
    card.querySelectorAll(".prod-weight-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        card.querySelectorAll(".prod-weight-btn").forEach((b) => {
          b.className = "prod-weight-btn flex-1 py-1 rounded font-label-md text-[11px] text-on-surface-variant hover:bg-surface-container-high transition-colors";
        });
        btn.className = "prod-weight-btn flex-1 py-1 rounded font-label-md text-[11px] bg-primary text-on-primary font-bold shadow-xs";

        selectedWeightLabel = btn.getAttribute("data-weight-label");
        selectedPrice = parseFloat(btn.getAttribute("data-weight-price"));
        if (priceSpan) priceSpan.textContent = `${selectedPrice.toFixed(0)} ₺`;
      });
    });

    // Add to cart
    card.querySelector(".btn-add-to-cart")?.addEventListener("click", () => {
      if (product) {
        store.addToCart(product, selectedWeightLabel, qty);
        qty = 1;
        if (qtySpan) qtySpan.textContent = "1";
      }
    });

    // Persistent favorite toggle
    card.querySelector(".btn-favorite")?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isNowFav = store.toggleFavorite(prodId);
      const icon = e.currentTarget.querySelector("span");
      if (isNowFav) {
        icon.style.fontVariationSettings = "'FILL' 1";
        e.currentTarget.classList.add("text-error");
        e.currentTarget.classList.remove("text-on-surface-variant");
        store.notifyToast(`"${product.name}" favorilerinize eklendi!`, "info");
      } else {
        icon.style.fontVariationSettings = "'FILL' 0";
        e.currentTarget.classList.remove("text-error");
        e.currentTarget.classList.add("text-on-surface-variant");
        store.notifyToast(`"${product.name}" favorilerden çıkarıldı.`, "info");
      }
    });

    // Open detail modal
    card.querySelectorAll(".btn-open-detail").forEach((el) => {
      el.addEventListener("click", () => openQuickView(prodId));
    });
  });
}

function updateCategoryPills() {
  document.querySelectorAll(".cat-pill").forEach((btn) => {
    const cat = btn.getAttribute("data-cat");
    if (cat === activeCategoryFilter) {
      btn.className = "cat-pill px-space-md py-space-sm rounded-full bg-primary text-on-primary font-label-md text-label-md whitespace-nowrap shadow-xs transition-all font-bold";
    } else {
      btn.className = "cat-pill px-space-md py-space-sm rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-variant font-label-md text-label-md whitespace-nowrap transition-all";
    }
  });
}

// --- QUICK VIEW MODAL ---
function openQuickView(productId) {
  const product = store.getProductById(productId);
  if (!product) return;

  const modal = document.getElementById("quick-view-modal");
  const content = document.getElementById("quick-view-content");
  if (!modal || !content) return;

  let activeModalWeight = product.weights?.find((w) => w.default) || product.weights?.[0];
  let modalQty = 1;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <div class="aspect-square rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30">
        <img class="w-full h-full object-cover" alt="${product.name}" src="${product.image}"/>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-tag text-xs font-bold">${product.tag || "Organik Sertifikalı"}</span>
          <span class="text-outline text-xs">•</span>
          <span class="text-on-surface-variant font-label-md text-xs">${product.origin}</span>
        </div>
        <h2 class="font-headline-md text-on-surface font-bold">${product.name}</h2>
        <div class="flex items-baseline gap-2">
          <span id="modal-price" class="font-headline-lg text-primary font-bold">${activeModalWeight.price.toFixed(0)} ₺</span>
          ${product.oldPrice ? `<span class="text-outline text-sm line-through">${product.oldPrice.toFixed(0)} ₺</span>` : ""}
        </div>
        <p class="font-body-sm text-on-surface-variant leading-relaxed">${product.details || product.description}</p>
        
        <!-- Weight switcher in modal -->
        ${product.weights && product.weights.length > 1 ? `
          <div class="mt-2">
            <label class="block font-label-md text-xs font-bold text-on-surface mb-1">Gramaj / Ambalaj Seçimi:</label>
            <div class="flex gap-2 flex-wrap">
              ${product.weights.map((w) => `
                <button class="modal-weight-btn px-3 py-1.5 rounded-lg border text-body-sm font-semibold transition-all ${w.label === activeModalWeight.label ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant/50 text-on-surface-variant hover:bg-surface-container'}"
                  data-label="${w.label}" data-price="${w.price}">
                  ${w.label}
                </button>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Quantity & ATC -->
        <div class="flex items-center gap-3 pt-3">
          <div class="flex items-center rounded-xl bg-surface-container border border-outline-variant/30 p-1">
            <button id="modal-qty-minus" class="w-8 h-8 flex items-center justify-center font-bold text-on-surface-variant hover:text-primary">−</button>
            <span id="modal-qty-display" class="px-3 font-label-md font-bold">1</span>
            <button id="modal-qty-plus" class="w-8 h-8 flex items-center justify-center font-bold text-on-surface-variant hover:text-primary">+</button>
          </div>
          <button id="modal-add-to-cart" class="flex-1 py-3 px-5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all">
            <span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
            Sepete Ekle
          </button>
        </div>

        <!-- Lot & Quality Card -->
        <div class="mt-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1 text-[12px]">
          <div class="flex justify-between text-on-surface-variant">
            <span>Parti (Lot) Kodu:</span>
            <strong class="text-on-surface font-mono">${product.lot}</strong>
          </div>
          <div class="flex justify-between text-on-surface-variant">
            <span>Hasat Yılı:</span>
            <strong class="text-on-surface">2024 Hasadı (Taze Çekim)</strong>
          </div>
          <div class="flex justify-between text-on-surface-variant">
            <span>Enerji &amp; Yağ:</span>
            <strong class="text-secondary">${product.nutritions.energy} / ${product.nutritions.fat} Yağ</strong>
          </div>
        </div>
      </div>
    </div>
  `;

  // Weight click handler
  content.querySelectorAll(".modal-weight-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      content.querySelectorAll(".modal-weight-btn").forEach((b) => {
        b.className = "modal-weight-btn px-3 py-1.5 rounded-lg border text-body-sm font-semibold transition-all border-outline-variant/50 text-on-surface-variant hover:bg-surface-container";
      });
      btn.className = "modal-weight-btn px-3 py-1.5 rounded-lg border text-body-sm font-semibold transition-all border-primary bg-primary/10 text-primary";
      const lbl = btn.getAttribute("data-label");
      const prc = parseFloat(btn.getAttribute("data-price"));
      activeModalWeight = { label: lbl, price: prc };
      const prcEl = content.querySelector("#modal-price");
      if (prcEl) prcEl.textContent = `${prc.toFixed(0)} ₺`;
    });
  });

  // Quantity Stepper
  content.querySelector("#modal-qty-plus")?.addEventListener("click", () => {
    modalQty++;
    content.querySelector("#modal-qty-display").textContent = modalQty;
  });

  content.querySelector("#modal-qty-minus")?.addEventListener("click", () => {
    if (modalQty > 1) {
      modalQty--;
      content.querySelector("#modal-qty-display").textContent = modalQty;
    }
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
    if (countText) countText.textContent = "Sepetinizde ürün bulunmamaktadır";
    updateCheckoutCalculations();
    return;
  }

  if (emptyNotice) emptyNotice.classList.add("hidden");
  if (emptyNotice) emptyNotice.classList.remove("flex");

  const totalItemUnits = store.getCartCount();
  if (countText) countText.textContent = `Bugün hasat tazeliğinde paketlenecek ${totalItemUnits} adet ürün`;

  cartItemsContainer.innerHTML = cart.map((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    return `
      <div class="cart-item-row flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors border border-outline-variant/20">
        <div class="flex items-center gap-space-md min-w-0">
          <img alt="${item.name}" class="w-20 h-20 rounded-lg object-cover shrink-0 bg-surface-variant border border-outline-variant/30" src="${item.image}"/>
          <div class="min-w-0">
            <div class="flex items-center gap-space-xs mb-1">
              <span class="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-tag text-label-tag uppercase font-bold">Coğrafi İşaret</span>
              <span class="text-outline text-body-sm">•</span>
              <span class="text-secondary font-label-md text-label-md font-semibold">${item.origin || "Keşap / Giresun"}</span>
            </div>
            <h3 class="font-title-md text-title-md text-on-surface truncate font-semibold">${item.name}</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">${item.weight} • Birim: ${item.price.toFixed(0)} ₺</p>
            <p class="font-label-lg text-label-lg text-primary mt-1 sm:hidden font-bold">${itemSubtotal.toFixed(0)} ₺</p>
          </div>
        </div>

        <div class="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-space-lg shrink-0">
          <div class="flex items-center bg-surface-container-lowest rounded-lg p-1 shadow-xs border border-outline-variant/30">
            <button class="cart-minus-btn w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container-high rounded text-body-md font-bold" data-index="${index}">−</button>
            <span class="w-8 text-center font-label-md text-label-md text-on-surface font-bold">${item.quantity}</span>
            <button class="cart-plus-btn w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container-high rounded text-body-md font-bold" data-index="${index}">+</button>
          </div>
          <div class="text-right hidden sm:block w-24">
            <span class="font-title-md text-title-md text-primary font-bold block">${itemSubtotal.toFixed(0)} ₺</span>
            <span class="font-body-sm text-[12px] text-outline">${item.price.toFixed(0)} ₺/adet</span>
          </div>
          <button class="cart-del-btn p-2 text-outline hover:text-error rounded-lg hover:bg-error-container/20 transition-colors" data-index="${index}" title="Ürünü Çıkar">
            <span class="material-symbols-outlined text-[20px]">delete_outline</span>
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
  const cartCount = store.getCartCount();
  const coupon = store.getCoupon();
  const giftWrap = document.getElementById("checkbox-gift-wrap")?.checked || false;

  const subtotalEl = document.getElementById("summary-subtotal");
  const countEl = document.getElementById("summary-items-count");
  const shippingEl = document.getElementById("summary-shipping");
  const totalEl = document.getElementById("summary-total");
  const farmDiscRow = document.getElementById("farm-discount-row");
  const farmDiscEl = document.getElementById("summary-farm-discount");
  const transferDiscRow = document.getElementById("transfer-discount-row");
  const transferDiscEl = document.getElementById("summary-transfer-discount");
  const cashFeeRow = document.getElementById("cash-fee-row");
  const couponRow = document.getElementById("coupon-discount-row");
  const couponDiscEl = document.getElementById("summary-coupon-discount");
  const giftRow = document.getElementById("gift-wrap-row");
  const freeShipBar = document.getElementById("free-shipping-bar");
  const freeShipText = document.getElementById("free-shipping-text");
  const freeShipSub = document.getElementById("free-shipping-sub");

  if (countEl) countEl.textContent = `Ara Toplam (${cartCount} Adet)`;
  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(0)} ₺`;

  // Fix 1: If cart is empty (subtotal is 0), everything is 0
  if (subtotal === 0) {
    if (shippingEl) shippingEl.textContent = "0 ₺";
    if (totalEl) totalEl.textContent = "0 ₺";
    if (farmDiscRow) farmDiscRow.classList.add("hidden");
    if (transferDiscRow) transferDiscRow.classList.add("hidden");
    if (cashFeeRow) cashFeeRow.classList.add("hidden");
    if (couponRow) couponRow.classList.add("hidden");
    if (giftRow) giftRow.classList.add("hidden");
    if (freeShipBar) freeShipBar.style.width = "0%";
    if (freeShipText) freeShipText.textContent = "Sepetiniz Boş";
    if (freeShipSub) freeShipSub.textContent = "500 ₺ üzeri siparişlerde kargo çiftliğimizden hediye.";
    const completeBtn = document.getElementById("btn-complete-order");
    if (completeBtn) {
      completeBtn.querySelector("span:last-child").textContent = "Sepetiniz Boş (0 ₺)";
    }
    return;
  }

  // Free shipping progress logic (> 500 ₺ threshold)
  const freeThreshold = 500;
  if (subtotal >= freeThreshold) {
    if (freeShipBar) freeShipBar.style.width = "100%";
    if (freeShipText) freeShipText.textContent = "Ücretsiz Kargo Kazandınız!";
    if (freeShipSub) freeShipSub.textContent = "Harika! Sepetiniz çiftliğimizin ücretsiz kargo limitini aştı.";
  } else {
    const diff = freeThreshold - subtotal;
    const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
    if (freeShipBar) freeShipBar.style.width = `${pct}%`;
    if (freeShipText) freeShipText.textContent = `${diff.toFixed(0)} ₺ daha ekleyin bedava kargo kazanın!`;
    if (freeShipSub) freeShipSub.textContent = `500 ₺ üzeri siparişlerde kargo çiftliğimizden hediye.`;
  }

  // Shipping cost
  let shippingFee = 0;
  if (activeShippingMethod === "express") {
    shippingFee = 45;
    if (shippingEl) shippingEl.textContent = "+45 ₺ (Ekspres)";
  } else {
    shippingFee = subtotal >= freeThreshold ? 0 : 35;
    if (shippingEl) shippingEl.textContent = shippingFee === 0 ? "ÜCRETSİZ" : "35 ₺";
  }

  // Farm discount (> 500 ₺ is 50 ₺)
  const farmDiscount = subtotal >= freeThreshold ? 50 : 0;
  if (farmDiscRow) {
    if (farmDiscount > 0) {
      farmDiscRow.classList.remove("hidden");
      if (farmDiscEl) farmDiscEl.textContent = `-${farmDiscount} ₺`;
    } else {
      farmDiscRow.classList.add("hidden");
    }
  }

  // Fix 2: Payment method adjustments (Havale %5 discount, Kapıda +20 ₺)
  let paymentDiscount = 0;
  let paymentFee = 0;

  if (activePaymentMethod === "transfer") {
    paymentDiscount = Math.round(subtotal * 0.05);
    if (transferDiscRow) {
      transferDiscRow.classList.remove("hidden");
      if (transferDiscEl) transferDiscEl.textContent = `-${paymentDiscount} ₺ (%5 Havale İndirimi)`;
    }
  } else {
    if (transferDiscRow) transferDiscRow.classList.add("hidden");
  }

  if (activePaymentMethod === "cash") {
    paymentFee = 20;
    if (cashFeeRow) cashFeeRow.classList.remove("hidden");
  } else {
    if (cashFeeRow) cashFeeRow.classList.add("hidden");
  }

  // Coupon discount
  let couponDiscount = 0;
  if (coupon) {
    if (coupon.discountPercent) {
      couponDiscount = Math.round(subtotal * (coupon.discountPercent / 100));
    } else if (coupon.discountFixed) {
      couponDiscount = coupon.discountFixed;
    }
    if (couponRow) couponRow.classList.remove("hidden");
    if (couponDiscEl) couponDiscEl.textContent = `-${couponDiscount} ₺ (${coupon.label})`;
  } else {
    if (couponRow) couponRow.classList.add("hidden");
  }

  // Gift wrap
  const giftFee = giftWrap ? 35 : 0;
  if (giftRow) {
    if (giftWrap) giftRow.classList.remove("hidden");
    else giftRow.classList.add("hidden");
  }

  // Final Total
  const grandTotal = Math.max(0, subtotal + shippingFee + paymentFee - farmDiscount - couponDiscount - paymentDiscount + giftFee);
  if (totalEl) totalEl.textContent = `${grandTotal.toFixed(0)} ₺`;

  // Update complete order button text
  const completeBtn = document.getElementById("btn-complete-order");
  if (completeBtn) {
    completeBtn.querySelector("span:last-child").textContent = `Siparişi Güvenle Tamamla (${grandTotal.toFixed(0)} ₺)`;
  }
}

// --- SAVED ADDRESSES MODAL ---
function renderSavedAddresses() {
  const container = document.getElementById("saved-addresses-list");
  if (!container) return;

  container.innerHTML = SAVED_ADDRESSES.map((addr) => `
    <div class="p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-outline-variant/30 cursor-pointer transition-all flex flex-col gap-1 saved-addr-item" data-id="${addr.id}">
      <div class="flex items-center justify-between">
        <span class="font-label-md font-bold text-on-surface text-sm flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[18px] text-secondary">location_on</span>
          ${addr.title}
        </span>
        <button class="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary font-label-tag text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors">
          Seç
        </button>
      </div>
      <p class="font-body-sm text-[12px] text-on-surface-variant font-medium">${addr.address}</p>
      <div class="flex gap-2 text-[11px] text-outline">
        <span>${addr.name}</span> • <span>+90 ${addr.phone}</span>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".saved-addr-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      const addr = SAVED_ADDRESSES.find((a) => a.id === id);
      if (addr) {
        document.getElementById("input-customer-name").value = addr.name;
        document.getElementById("input-customer-phone").value = addr.phone;
        document.getElementById("input-customer-city").value = addr.city;
        document.getElementById("input-customer-district").value = addr.district;
        document.getElementById("input-customer-address").value = addr.address;
        if (addr.notes) document.getElementById("input-customer-notes").value = addr.notes;

        document.getElementById("saved-addresses-modal")?.classList.add("hidden");
        store.notifyToast(`"${addr.title}" teslimat adresi olarak seçildi!`, "success");
      }
    });
  });
}

// --- ADMIN SALES & ANALYTICS CONTROLLER ---
let activeAnalyticsPeriod = "season2024";

function renderAdminAnalytics() {
  const orders = store.getOrders();
  const products = store.getProducts();
  const periodData = ANALYTICS_PERIOD_DATA[activeAnalyticsPeriod] || ANALYTICS_PERIOD_DATA["season2024"];

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
      <span class="material-symbols-outlined text-[16px] mr-0.5">trending_up</span>
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
    { name: "Çifte Kavrulmuş Fındık", pct: 42, color: "bg-primary" },
    { name: "Taş Değirmen Ezmeler", pct: 28, color: "bg-secondary" },
    { name: "Köy Balları & Pekmez", pct: 18, color: "bg-tertiary" },
    { name: "Soğuk Sıkım Fındık Yağı", pct: 12, color: "bg-primary-container" }
  ];

  container.innerHTML = categories.map((cat) => `
    <div>
      <div class="flex justify-between text-body-sm font-semibold mb-1">
        <span>${cat.name}</span>
        <span class="font-bold font-mono">%${cat.pct}</span>
      </div>
      <div class="w-full bg-surface-container h-2 rounded-full overflow-hidden">
        <div class="${cat.color} h-full rounded-full transition-all duration-500" style="width: ${cat.pct}%;"></div>
      </div>
    </div>
  `).join("");
}

function renderTopSellingProducts() {
  const tbody = document.getElementById("top-selling-table-body");
  if (!tbody) return;

  const topItems = [
    { name: "Giresun Tombul Çifte Kavrulmuş", category: "Kavrulmuş Fındık", sales: "142 Kutu", rev: "₺51.830", stock: "420 Adet", badge: "En Çok Satan", color: "text-secondary" },
    { name: "Taş Değirmen Fındık Ezmesi (%100)", category: "Doğal Ezme", sales: "98 Kavanoz", rev: "₺27.930", stock: "185 Adet", badge: "Yüksek Talep", color: "text-primary" },
    { name: "Karadeniz Kestane Balı", category: "Köy Balı", sales: "64 Şişe", rev: "₺31.360", stock: "42 Adet (Kritik)", badge: "Sınırlı Stok", color: "text-error" },
    { name: "Saf Soğuk Sıkım Fındık Yağı", category: "Bitkisel Yağ", sales: "52 Şişe", rev: "₺15.080", stock: "95 Adet", badge: "Düzenli Talep", color: "text-secondary" }
  ];

  tbody.innerHTML = topItems.map((item) => `
    <tr class="hover:bg-surface-container-low/50 transition-colors">
      <td class="py-3 px-space-md font-semibold text-on-surface text-sm">${item.name}</td>
      <td class="py-3 px-space-md text-xs text-on-surface-variant">${item.category}</td>
      <td class="py-3 px-space-md font-bold text-on-surface font-mono text-sm">${item.sales}</td>
      <td class="py-3 px-space-md font-bold text-primary text-sm">${item.rev}</td>
      <td class="py-3 px-space-md text-xs font-semibold ${item.stock.includes('Kritik') ? 'text-error' : 'text-on-surface'}">${item.stock}</td>
      <td class="py-3 px-space-md text-right">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-surface-container ${item.color}">${item.badge}</span>
      </td>
    </tr>
  `).join("");
}

function renderAdminOrdersTable(orders) {
  const tbody = document.getElementById("admin-orders-table-body");
  if (!tbody) return;

  const searchQuery = (document.getElementById("admin-order-search")?.value || "").toLowerCase().trim();

  let filtered = orders;
  if (searchQuery) {
    filtered = orders.filter((o) =>
      o.id.toLowerCase().includes(searchQuery) ||
      o.customerName.toLowerCase().includes(searchQuery) ||
      o.city.toLowerCase().includes(searchQuery)
    );
  }

  tbody.innerHTML = filtered.map((order) => {
    let statusClass = "bg-secondary-fixed/50 text-secondary";
    if (order.status === "Hazırlanıyor") statusClass = "bg-primary-fixed/60 text-primary";
    if (order.status === "Teslim Edildi") statusClass = "bg-secondary/15 text-secondary";

    return `
      <tr class="hover:bg-surface-container-low/50 transition-colors">
        <td class="py-3 px-space-md font-mono font-bold text-primary">
          #${order.id}
          <span class="block font-body-sm text-[11px] text-outline font-normal">${order.date}</span>
        </td>
        <td class="py-3 px-space-md">
          <span class="font-title-md text-[14px] text-on-surface font-semibold block">${order.customerName}</span>
          <span class="font-body-sm text-[11px] text-outline">${order.city} / ${order.district || ''}</span>
        </td>
        <td class="py-3 px-space-md max-w-xs">
          <span class="font-body-sm text-body-sm text-on-surface line-clamp-1">${order.itemsSummary || 'Doğal Fındık Paketi'}</span>
          <span class="font-label-tag text-[10px] text-secondary font-bold">${order.lotMatch || 'LOT-2024'}</span>
        </td>
        <td class="py-3 px-space-md font-bold text-primary">
          ${order.total.toFixed(0)} ₺
        </td>
        <td class="py-3 px-space-md font-body-sm text-[12px] text-on-surface-variant">
          ${order.paymentMethod || 'Kredi Kartı'}
        </td>
        <td class="py-3 px-space-md text-center">
          <select class="order-status-select px-2.5 py-1 rounded-full text-xs font-bold ${statusClass} border border-outline-variant/30 focus:outline-none cursor-pointer" data-id="${order.id}">
            <option value="Hazırlanıyor" ${order.status === 'Hazırlanıyor' ? 'selected' : ''}>Hazırlanıyor</option>
            <option value="Kargoya Verildi" ${order.status === 'Kargoya Verildi' ? 'selected' : ''}>Kargoya Verildi</option>
            <option value="Teslim Edildi" ${order.status === 'Teslim Edildi' ? 'selected' : ''}>Teslim Edildi</option>
          </select>
        </td>
        <td class="py-3 px-space-md text-right">
          <button class="btn-view-order-detail p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors" data-id="${order.id}" title="Detay & İrsaliye">
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

function drawRevenueChart(period = "season2024") {
  const canvas = document.getElementById("revenue-trend-canvas");
  if (!canvas) return;

  const pData = ANALYTICS_PERIOD_DATA[period] || ANALYTICS_PERIOD_DATA["season2024"];
  const labels = pData.labels;
  const revenueData = pData.revenueData;
  const maxVal = pData.maxVal;

  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  const paddingLeft = 50;
  const paddingBottom = 30;
  const paddingTop = 20;
  const paddingRight = 20;
  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  // Draw grid lines
  ctx.strokeStyle = "#ead6c9";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);

  for (let i = 0; i <= 4; i++) {
    const y = paddingTop + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();

    // Y Axis label
    ctx.fillStyle = "#82746d";
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "right";
    const labelVal = Math.round(maxVal - (maxVal / 4) * i);
    ctx.fillText(`₺${(labelVal / 1000).toFixed(0)}k`, paddingLeft - 8, y + 4);
  }
  ctx.setLineDash([]);

  // Calculate points
  const points = revenueData.map((val, idx) => {
    const x = paddingLeft + (chartW / (labels.length - 1)) * idx;
    const y = paddingTop + chartH - (val / maxVal) * chartH;
    return { x, y, val };
  });

  // Draw Gradient fill
  const gradient = ctx.createLinearGradient(0, paddingTop, 0, height - paddingBottom);
  gradient.addColorStop(0, "rgba(111, 78, 55, 0.35)");
  gradient.addColorStop(1, "rgba(111, 78, 55, 0.0)");

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length - 1].x, height - paddingBottom);
  ctx.lineTo(points[0].x, height - paddingBottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = "#553722";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw points & labels
  points.forEach((pt, idx) => {
    // Circle point
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#3c6843";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // X Axis text
    ctx.fillStyle = "#50453e";
    ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[idx], pt.x, height - 8);
  });
}

function openOrderDetailModal(orderId) {
  const order = store.getOrders().find((o) => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById("order-detail-modal");
  const title = document.getElementById("modal-order-title");
  const content = document.getElementById("modal-order-content");
  if (!modal || !content) return;

  if (title) title.textContent = `Sipariş #${order.id} Detayı`;

  content.innerHTML = `
    <div class="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
      <div>
        <div class="font-label-md text-outline">Kargo Takip No:</div>
        <div class="font-label-lg font-bold text-on-surface font-mono text-base">${order.trackingNo}</div>
      </div>
      <span class="px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-tag font-bold">${order.status}</span>
    </div>

    <div class="space-y-2 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-body-sm">
      <div class="flex justify-between">
        <span class="text-outline">Müşteri:</span>
        <strong class="text-on-surface">${order.customerName}</strong>
      </div>
      <div class="flex justify-between">
        <span class="text-outline">Telefon &amp; Şehir:</span>
        <span class="text-on-surface">${order.phone} / ${order.city}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-outline">Açık Adres:</span>
        <span class="text-on-surface text-right max-w-xs">${order.address}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-outline">Ödeme Yöntemi:</span>
        <span class="text-primary font-semibold">${order.paymentMethod}</span>
      </div>
    </div>

    <div class="space-y-1.5 p-3 rounded-xl bg-surface-container-low text-body-sm">
      <div class="font-label-md text-secondary uppercase font-bold text-xs">Mahsul Lot ve Randıman Eşleşmesi</div>
      <div class="flex justify-between">
        <span>Parti Kodu:</span>
        <strong class="font-mono text-primary">${order.lotMatch || 'LOT-2024-KESAP-04'}</strong>
      </div>
      <div class="flex justify-between">
        <span>İç Fındık Randımanı:</span>
        <strong class="text-secondary">${order.yield || '%53.8'}</strong>
      </div>
    </div>

    <div class="flex justify-between items-center pt-2 font-title-md border-t border-outline-variant/30">
      <span class="font-bold text-on-surface">Toplam Tutar:</span>
      <span class="font-bold text-primary text-xl">${order.total.toFixed(0)} ₺</span>
    </div>
  `;

  // Setup printable invoice data
  const printOrderId = document.getElementById("print-order-id");
  const printOrderDate = document.getElementById("print-order-date");
  const printCustomerName = document.getElementById("print-customer-name");
  const printCustomerAddress = document.getElementById("print-customer-address");
  const printCustomerPhone = document.getElementById("print-customer-phone");
  const printTrackingNo = document.getElementById("print-tracking-no");
  const printLot = document.getElementById("print-lot");
  const printPayment = document.getElementById("print-payment");
  const printItemsBody = document.getElementById("print-items-body");
  const printSubtotal = document.getElementById("print-subtotal");
  const printTotal = document.getElementById("print-total");

  if (printOrderId) printOrderId.textContent = `#${order.id}`;
  if (printOrderDate) printOrderDate.textContent = order.date;
  if (printCustomerName) printCustomerName.textContent = order.customerName;
  if (printCustomerAddress) printCustomerAddress.textContent = `${order.address}, ${order.city}`;
  if (printCustomerPhone) printCustomerPhone.textContent = order.phone;
  if (printTrackingNo) printTrackingNo.textContent = order.trackingNo;
  if (printLot) printLot.textContent = order.lotMatch || "LOT-2024-KESAP-04";
  if (printPayment) printPayment.textContent = order.paymentMethod;
  if (printSubtotal) printSubtotal.textContent = `${(order.subtotal || order.total).toFixed(0)} ₺`;
  if (printTotal) printTotal.textContent = `${order.total.toFixed(0)} ₺`;

  if (printItemsBody) {
    if (order.items && order.items.length > 0) {
      printItemsBody.innerHTML = order.items.map((i) => `
        <tr>
          <td style="padding: 8px;">${i.name} (${i.weight})</td>
          <td style="padding: 8px; text-align: center;">${i.quantity}</td>
          <td style="padding: 8px; text-align: right;">${i.price.toFixed(0)} ₺</td>
          <td style="padding: 8px; text-align: right;">${(i.price * i.quantity).toFixed(0)} ₺</td>
        </tr>
      `).join("");
    } else {
      printItemsBody.innerHTML = `
        <tr>
          <td style="padding: 8px;">${order.itemsSummary || 'Doğal Fındık Paketi'}</td>
          <td style="padding: 8px; text-align: center;">1</td>
          <td style="padding: 8px; text-align: right;">${order.total.toFixed(0)} ₺</td>
          <td style="padding: 8px; text-align: right;">${order.total.toFixed(0)} ₺</td>
        </tr>
      `;
    }
  }

  modal.classList.remove("hidden");
}

// --- ADMIN INVENTORY CONTROLLER ---
let activeInvTab = "all";

function renderAdminInventory() {
  const products = store.getProducts();

  const totalEl = document.getElementById("inv-kpi-total");
  const activeEl = document.getElementById("inv-kpi-active");
  const lowStockEl = document.getElementById("inv-kpi-low-stock");

  const inStockCount = products.filter((p) => p.stock >= 50).length;
  const lowStockCount = products.filter((p) => p.stock < 50 && p.stock > 0).length;

  if (totalEl) totalEl.textContent = products.length.toString();
  if (activeEl) activeEl.textContent = products.filter((p) => p.active !== false).length.toString();
  if (lowStockEl) lowStockEl.textContent = lowStockCount.toString();

  // Tab counters
  const cntAll = document.getElementById("tab-cnt-all");
  const cntInStock = document.getElementById("tab-cnt-instock");
  const cntLow = document.getElementById("tab-cnt-low");

  if (cntAll) cntAll.textContent = products.length;
  if (cntInStock) cntInStock.textContent = inStockCount;
  if (cntLow) cntLow.textContent = lowStockCount;

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

  // Status Tab
  if (activeInvTab === "in-stock") {
    products = products.filter((p) => p.stock >= 50);
  } else if (activeInvTab === "low-stock") {
    products = products.filter((p) => p.stock < 50);
  }

  tbody.innerHTML = products.map((prod) => {
    const isLow = prod.stock < 50;
    const stockPct = Math.min(100, Math.round((prod.stock / 500) * 100));
    const stockBarColor = isLow ? "bg-error" : "bg-secondary";
    const isActive = prod.active !== false;

    return `
      <tr class="hover:bg-surface-container-low/50 transition-colors group">
        <td class="py-3 px-space-md">
          <div class="flex items-center gap-space-sm">
            <img class="w-12 h-12 rounded-lg object-cover shadow-xs bg-surface-container border border-outline-variant/30" src="${prod.image}" alt="${prod.name}"/>
            <div class="flex flex-col min-w-0">
              <span class="font-title-md text-[14px] text-on-surface font-semibold truncate group-hover:text-primary transition-colors">${prod.name}</span>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="font-mono text-[11px] text-outline">${prod.sku}</span>
                <span class="text-outline text-[10px]">•</span>
                <span class="font-body-sm text-[11px] text-on-surface-variant">${prod.weights?.[0]?.label || '500g'}</span>
              </div>
            </div>
          </div>
        </td>
        <td class="py-3 px-space-md">
          <div class="flex flex-col">
            <span class="font-label-md text-label-md text-on-surface font-medium">${prod.categoryName || prod.category}</span>
            <span class="font-body-sm text-[12px] text-secondary font-medium">${prod.origin}</span>
          </div>
        </td>
        <td class="py-3 px-space-md">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-[11px]">
            <span class="material-symbols-outlined text-[14px] text-secondary">verified</span>
            ${prod.lot}
          </span>
        </td>
        <td class="py-3 px-space-md font-body-sm text-on-surface-variant">
          ${prod.costPrice.toFixed(0)} ₺
        </td>
        <td class="py-3 px-space-md">
          <div class="flex items-center gap-1">
            <div class="relative w-24">
              <input class="inv-inline-price w-full px-2 py-1 rounded bg-surface-container font-label-lg text-primary font-bold focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none transition-all text-sm border border-outline-variant/30"
                type="number" step="1" value="${prod.price.toFixed(0)}" data-id="${prod.id}"/>
              <span class="absolute right-1.5 top-1/2 -translate-y-1/2 text-outline text-xs font-bold">₺</span>
            </div>
          </div>
        </td>
        <td class="py-3 px-space-md">
          <div class="flex flex-col gap-1 w-28">
            <div class="flex justify-between items-center text-xs">
              <span class="text-on-surface font-bold">${prod.stock} Adet</span>
              <span class="${isLow ? 'text-error font-bold' : 'text-secondary font-semibold'}">%${stockPct}</span>
            </div>
            <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div class="${stockBarColor} h-full rounded-full transition-all" style="width: ${stockPct}%"></div>
            </div>
          </div>
        </td>
        <td class="py-3 px-space-md text-center">
          <!-- Interactive toggle switch -->
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="inv-toggle-active sr-only peer" data-id="${prod.id}" ${isActive ? 'checked' : ''}/>
            <div class="w-9 h-5 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </td>
        <td class="py-3 px-space-md text-right">
          <div class="flex items-center justify-end gap-1">
            <button class="btn-inv-edit p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors" data-id="${prod.id}" title="Düzenle">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button class="btn-inv-history p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors" data-id="${prod.id}" title="Fiyat Geçmişi">
              <span class="material-symbols-outlined text-[18px]">history</span>
            </button>
            <button class="btn-inv-delete p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors" data-id="${prod.id}" title="Ürünü Sil">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  // Attach inline price edit
  tbody.querySelectorAll(".inv-inline-price").forEach((input) => {
    input.addEventListener("change", (e) => {
      const pId = input.getAttribute("data-id");
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) {
        store.updateProductPrice(pId, val);
      }
    });
  });

  // Attach active toggle switch
  tbody.querySelectorAll(".inv-toggle-active").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const pId = checkbox.getAttribute("data-id");
      store.toggleProductActive(pId);
    });
  });

  // Attach edit button
  tbody.querySelectorAll(".btn-inv-edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pId = btn.getAttribute("data-id");
      openEditProductDrawer(pId);
    });
  });

  // Attach price history button
  tbody.querySelectorAll(".btn-inv-history").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pId = btn.getAttribute("data-id");
      openPriceHistoryModal(pId);
    });
  });

  // Attach delete button
  tbody.querySelectorAll(".btn-inv-delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pId = btn.getAttribute("data-id");
      if (confirm("Bu ürünü çiftlik kataloğundan ve envanterden kaldırmak istediğinize emin misiniz?")) {
        store.deleteProduct(pId);
      }
    });
  });
}

function openEditProductDrawer(productId) {
  const prod = store.getProductById(productId);
  if (!prod) return;

  const drawer = document.getElementById("add-product-drawer");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const drawerPanel = document.getElementById("drawer-panel");
  const heading = document.getElementById("drawer-heading");
  const submitBtn = document.getElementById("btn-drawer-submit");

  document.getElementById("edit-prod-id").value = prod.id;
  document.getElementById("new-prod-name").value = prod.name;
  document.getElementById("new-prod-category").value = prod.category;
  document.getElementById("new-prod-lot").value = prod.lot;
  document.getElementById("new-prod-price").value = prod.price;
  document.getElementById("new-prod-cost").value = prod.costPrice;
  document.getElementById("new-prod-stock").value = prod.stock;
  document.getElementById("new-prod-desc").value = prod.description;
  document.getElementById("new-prod-image").value = prod.image;

  if (heading) heading.textContent = "Ürünü Düzenle: " + prod.name;
  if (submitBtn) submitBtn.textContent = "Değişiklikleri Güncelle";

  drawer.classList.remove("pointer-events-none");
  drawerBackdrop.classList.remove("pointer-events-none", "opacity-0");
  drawerPanel.classList.remove("translate-x-full");
}

function openPriceHistoryModal(productId) {
  const prod = store.getProductById(productId);
  if (!prod) return;

  const modal = document.getElementById("price-history-modal");
  const title = document.getElementById("price-history-title");
  const content = document.getElementById("price-history-content");
  if (!modal || !content) return;

  title.textContent = `Fiyat Geçmişi: ${prod.name}`;

  const history = prod.priceHistory && prod.priceHistory.length > 0
    ? prod.priceHistory
    : [
        { date: "12 Ağustos 2024", price: prod.price, reason: "Sezon Başlangıç Fiyatı" },
        { date: "15 Ocak 2024", price: prod.price * 0.9, reason: "Önceki Sezon Sonu" }
      ];

  content.innerHTML = `
    <div class="relative pl-6 border-l-2 border-primary/30 space-y-4">
      ${history.map((h) => `
        <div class="relative">
          <span class="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface-container"></span>
          <div class="flex items-center justify-between text-xs text-outline mb-0.5">
            <span>${h.date}</span>
            <span class="font-bold text-primary text-sm">${h.price.toFixed(0)} ₺</span>
          </div>
          <p class="font-body-sm text-[13px] text-on-surface font-medium">${h.reason}</p>
        </div>
      `).join("")}
    </div>
  `;

  modal.classList.remove("hidden");
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
    if (confirm("Tüm ürünler, sepet ve siparişler ilk demo haline sıfırlansın mı?")) {
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

  // Catalog Category Pills
  document.querySelectorAll(".cat-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategoryFilter = btn.getAttribute("data-cat");
      updateCategoryPills();
      renderCatalog();
    });
  });

  // Catalog Weight Filters
  document.querySelectorAll(".weight-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".weight-filter-btn").forEach((b) => {
        b.className = "weight-filter-btn px-space-sm py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-highest transition-colors";
      });
      btn.className = "weight-filter-btn px-space-sm py-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-xs transition-colors font-bold";
      activeWeightFilter = btn.getAttribute("data-weight-filter");
      renderCatalog();
    });
  });

  // Catalog Sort Selector
  document.getElementById("catalog-sort-select")?.addEventListener("change", (e) => {
    activeSortOrder = e.target.value;
    renderCatalog();
  });

  // Haftanın Çiftlik Paketi Button
  document.getElementById("btn-add-weekly-bundle")?.addEventListener("click", () => {
    const bundle = store.getProductById("pak-001");
    if (bundle) {
      store.addToCart(bundle, "Ahşap Sandık Set", 1);
    }
  });

  // Lab Report Modal Triggers
  const openLabModal = () => {
    document.getElementById("lab-report-modal")?.classList.remove("hidden");
  };
  document.getElementById("btn-show-lab-report")?.addEventListener("click", openLabModal);
  document.getElementById("btn-footer-traceability")?.addEventListener("click", openLabModal);
  document.getElementById("btn-close-lab-report")?.addEventListener("click", () => {
    document.getElementById("lab-report-modal")?.classList.add("hidden");
  });
  document.getElementById("btn-close-lab-report-2")?.addEventListener("click", () => {
    document.getElementById("lab-report-modal")?.classList.add("hidden");
  });

  // Saved Addresses Modal Trigger
  document.getElementById("btn-open-saved-addresses")?.addEventListener("click", () => {
    renderSavedAddresses();
    document.getElementById("saved-addresses-modal")?.classList.remove("hidden");
  });
  document.getElementById("btn-close-saved-addresses")?.addEventListener("click", () => {
    document.getElementById("saved-addresses-modal")?.classList.add("hidden");
  });

  // Price History Modal Closer
  document.getElementById("btn-close-price-history")?.addEventListener("click", () => {
    document.getElementById("price-history-modal")?.classList.add("hidden");
  });

  // Quick View Closer
  document.getElementById("btn-close-quick-view")?.addEventListener("click", closeQuickView);
  document.getElementById("btn-close-order-detail")?.addEventListener("click", () => {
    document.getElementById("order-detail-modal")?.classList.add("hidden");
  });
  document.getElementById("btn-order-detail-close")?.addEventListener("click", () => {
    document.getElementById("order-detail-modal")?.classList.add("hidden");
  });

  // Print Invoice Action
  document.getElementById("btn-print-invoice")?.addEventListener("click", () => {
    window.print();
  });

  // CHECKOUT: Payment Tabs
  document.querySelectorAll(".payment-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".payment-tab").forEach((t) => {
        t.className = "payment-tab py-space-sm px-space-xs md:px-space-md rounded-lg font-label-lg text-label-lg transition-all flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface font-semibold";
      });
      tab.className = "payment-tab active-tab py-space-sm px-space-xs md:px-space-md rounded-lg font-label-lg text-label-lg transition-all flex items-center justify-center gap-1.5 bg-primary text-on-primary shadow-sm font-semibold";
      activePaymentMethod = tab.getAttribute("data-method");

      document.getElementById("payment-pane-card")?.classList.toggle("hidden", activePaymentMethod !== "card");
      document.getElementById("payment-pane-transfer")?.classList.toggle("hidden", activePaymentMethod !== "transfer");
      document.getElementById("payment-pane-cash")?.classList.toggle("hidden", activePaymentMethod !== "cash");

      updateCheckoutCalculations();
    });
  });

  // CHECKOUT: Shipping Radio Buttons
  document.querySelectorAll("input[name='shipping_method']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      activeShippingMethod = e.target.value;
      document.querySelectorAll(".shipping-option").forEach((lbl) => {
        const inp = lbl.querySelector("input");
        if (inp.checked) {
          lbl.classList.add("border-secondary");
          lbl.classList.remove("border-transparent");
        } else {
          lbl.classList.remove("border-secondary");
          lbl.classList.add("border-transparent");
        }
      });
      updateCheckoutCalculations();
    });
  });

  // CHECKOUT: Gift Wrap Checkbox
  document.getElementById("checkbox-gift-wrap")?.addEventListener("change", () => {
    updateCheckoutCalculations();
  });

  // CHECKOUT: Copy IBAN Button
  document.getElementById("btn-copy-iban")?.addEventListener("click", () => {
    navigator.clipboard.writeText("TR780001002134987654320199").then(() => {
      store.notifyToast("IBAN panoya kopyalandı!", "info");
    });
  });

  // CHECKOUT: Card Number & Expiry Auto-Formatters
  const cardInput = document.getElementById("input-card-number");
  const cardIcon = document.getElementById("card-brand-icon");
  if (cardInput) {
    cardInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 16);
      if (val.startsWith("4")) {
        if (cardIcon) cardIcon.textContent = "credit_card";
      } else if (val.startsWith("5")) {
        if (cardIcon) cardIcon.textContent = "contactless";
      }
      val = val.replace(/(.{4})/g, "$1 ").trim();
      e.target.value = val;
    });
  }

  const expInput = document.getElementById("input-card-exp");
  if (expInput) {
    expInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + "/" + val.substring(2);
      }
      e.target.value = val;
    });
  }

  // CHECKOUT: Coupon Apply & Remove
  document.getElementById("btn-apply-coupon")?.addEventListener("click", () => {
    const val = document.getElementById("coupon-input")?.value;
    const res = store.applyCoupon(val);
    if (res.success) {
      document.getElementById("coupon-badge")?.classList.remove("hidden");
      document.getElementById("coupon-badge")?.classList.add("flex");
      document.getElementById("coupon-badge-text").textContent = `"${res.coupon.code}" uygulandı (${res.coupon.label})`;
      updateCheckoutCalculations();
    }
  });

  document.getElementById("btn-remove-coupon")?.addEventListener("click", () => {
    store.removeCoupon();
    document.getElementById("coupon-badge")?.classList.add("hidden");
    document.getElementById("coupon-badge")?.classList.remove("flex");
    const cInput = document.getElementById("coupon-input");
    if (cInput) cInput.value = "";
    updateCheckoutCalculations();
  });

  // CHECKOUT: Complete Order Button
  document.getElementById("btn-complete-order")?.addEventListener("click", () => {
    const name = document.getElementById("input-customer-name")?.value.trim();
    const phone = document.getElementById("input-customer-phone")?.value.trim();
    const city = document.getElementById("input-customer-city")?.value;
    const district = document.getElementById("input-customer-district")?.value.trim();
    const address = document.getElementById("input-customer-address")?.value.trim();
    const notes = document.getElementById("input-customer-notes")?.value.trim();
    const giftWrap = document.getElementById("checkbox-gift-wrap")?.checked;

    if (!name || !phone || !address) {
      alert("Lütfen teslimat için ad, telefon ve adres alanlarını eksiksiz doldurun.");
      return;
    }

    try {
      const order = store.createOrder({
        customer: { name, phone, city, district, address, email: "musteri@posta.com" },
        shippingMethod: activeShippingMethod,
        paymentMethod: activePaymentMethod === "card" ? "Kredi Kartı (3D Secure)" : activePaymentMethod === "transfer" ? "Havale / EFT (%5 İndirimli)" : "Kapıda Ödeme",
        notes,
        giftWrap
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

  // ADMIN ANALYTICS: Time Periods
  document.querySelectorAll(".analytics-period-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".analytics-period-btn").forEach((b) => {
        b.className = "analytics-period-btn px-3 py-1.5 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all";
      });
      btn.className = "analytics-period-btn px-3 py-1.5 rounded-md font-label-md text-label-md bg-primary text-on-primary shadow-xs font-semibold transition-all";
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
    let csv = "Siparis_No,Tarih,Musteri,Telefon,Sehir,Tutar,Odeme,Durum,Kargo_Takip\n";
    orders.forEach((o) => {
      csv += `"${o.id}","${o.date}","${o.customerName}","${o.phone}","${o.city}","${o.total} ₺","${o.paymentMethod}","${o.status}","${o.trackingNo}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Findik_Vadisi_Siparisler_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    store.notifyToast("Sipariş verileri CSV dosyası olarak indirildi!", "success");
  });

  // ADMIN INVENTORY: Search & Filters
  document.getElementById("inv-search-input")?.addEventListener("input", renderInventoryTable);
  document.getElementById("inv-cat-filter")?.addEventListener("change", renderInventoryTable);

  document.querySelectorAll(".inv-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".inv-tab-btn").forEach((b) => {
        b.className = "inv-tab-btn px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-all";
      });
      btn.className = "inv-tab-btn px-space-md py-1.5 rounded-full font-label-md text-label-md bg-primary-container text-on-primary font-bold transition-all";
      activeInvTab = btn.getAttribute("data-status-tab");
      renderInventoryTable();
    });
  });

  // ADMIN INVENTORY: Bulk Price Modal
  const bulkModal = document.getElementById("bulk-price-modal");
  document.getElementById("btn-open-bulk-modal")?.addEventListener("click", () => {
    bulkModal?.classList.remove("hidden");
  });
  document.getElementById("btn-close-bulk-modal")?.addEventListener("click", () => {
    bulkModal?.classList.add("hidden");
  });
  document.getElementById("btn-cancel-bulk-modal")?.addEventListener("click", () => {
    bulkModal?.classList.add("hidden");
  });

  // Bulk type radio toggles symbol
  document.querySelectorAll("input[name='bulk_type']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const sym = document.getElementById("bulk-symbol");
      if (sym) sym.textContent = e.target.value === "percent" ? "%" : "₺";
    });
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
    document.getElementById("btn-drawer-submit").textContent = "Ürünü Kaydet & Yayınla";
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
      // Update existing product
      store.updateProduct(editId, { name, category, lot, price, costPrice, stock, description, image });
    } else {
      // Add new product
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
