// Fındık Vadisi - State Management & LocalStorage Engine
import { INITIAL_PRODUCTS, INITIAL_CART, INITIAL_ORDERS, VALID_COUPONS } from "./data.js";

const STORAGE_KEYS = {
  PRODUCTS: "findik_vadisi_products",
  CART: "findik_vadisi_cart",
  ORDERS: "findik_vadisi_orders",
  COUPON: "findik_vadisi_coupon",
  FAVORITES: "findik_vadisi_favorites"
};

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(INITIAL_CART));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(["fnd-092", "ezm-014"]));
    }
  }

  // Event dispatcher
  emit(event, data) {
    window.dispatchEvent(new CustomEvent(`fv:${event}`, { detail: data }));
  }

  on(event, callback) {
    window.addEventListener(`fv:${event}`, (e) => callback(e.detail));
  }

  // --- Products ---
  getProducts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  getProductById(id) {
    return this.getProducts().find((p) => p.id === id);
  }

  saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.emit("productsChanged", products);
  }

  updateProductPrice(id, newPrice) {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    if (product) {
      const parsedPrice = parseFloat(newPrice);
      if (isNaN(parsedPrice) || parsedPrice <= 0) return;
      
      product.oldPrice = product.price;
      product.price = parsedPrice;
      
      // Add to price history
      if (!product.priceHistory) product.priceHistory = [];
      const now = new Date();
      product.priceHistory.unshift({
        date: `${now.getDate()} ${["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"][now.getMonth()]} ${now.getFullYear()}`,
        price: parsedPrice,
        reason: "Yönetici Fiyat Güncellemesi"
      });

      // Update weights accordingly if single weight
      if (product.weights && product.weights.length > 0) {
        const defaultWeight = product.weights.find((w) => w.default) || product.weights[0];
        defaultWeight.price = parsedPrice;
      }
      this.saveProducts(products);
      this.notifyToast(`"${product.name}" fiyatı ₺${parsedPrice.toFixed(0)} olarak güncellendi.`, "success");
    }
  }

  updateProductStock(id, newStock) {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    if (product) {
      product.stock = parseInt(newStock, 10);
      this.saveProducts(products);
      this.notifyToast(`"${product.name}" stoğu ${newStock} adet olarak güncellendi.`, "info");
    }
  }

  toggleProductActive(id) {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    if (product) {
      product.active = product.active === false ? true : false;
      this.saveProducts(products);
      const statusText = product.active ? "vitrine alındı (aktif)" : "vitrinden gizlendi (pasif)";
      this.notifyToast(`"${product.name}" ${statusText}.`, "info");
      return product.active;
    }
    return false;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index > -1) {
      const prod = products[index];
      const oldPrice = prod.price;
      const newPrice = parseFloat(updatedFields.price);
      
      products[index] = {
        ...prod,
        name: updatedFields.name || prod.name,
        category: updatedFields.category || prod.category,
        categoryName: updatedFields.categoryName || prod.categoryName,
        lot: updatedFields.lot || prod.lot,
        costPrice: parseFloat(updatedFields.costPrice) || prod.costPrice,
        price: newPrice || prod.price,
        oldPrice: newPrice !== oldPrice ? oldPrice : prod.oldPrice,
        stock: parseInt(updatedFields.stock, 10) || prod.stock,
        description: updatedFields.description || prod.description,
        image: updatedFields.image || prod.image
      };

      if (products[index].weights && products[index].weights.length > 0) {
        const defW = products[index].weights.find((w) => w.default) || products[index].weights[0];
        defW.price = products[index].price;
      }

      this.saveProducts(products);
      this.notifyToast(`"${products[index].name}" başarıyla güncellendi!`, "success");
      return products[index];
    }
    return null;
  }

  addProduct(newProd) {
    const products = this.getProducts();
    const id = "prd-" + Date.now().toString(36);
    const sku = "SKU-" + Math.floor(100 + Math.random() * 900);
    const catNames = {
      kavrulmus: "Çifte Kavrulmuş Fındık",
      cig: "Çiğ & Naturel",
      ezme: "Taş Değirmen Ezme",
      yag: "Soğuk Sıkım Yağ",
      bal: "Köy Balları",
      pekmez: "Köy Pekmezi",
      paket: "Hediyelik Sandıklar"
    };

    const product = {
      id,
      sku: newProd.sku || sku,
      name: newProd.name,
      category: newProd.category || "kavrulmus",
      categoryName: catNames[newProd.category] || "Doğal Mahsul",
      origin: newProd.origin || "Keşap / Giresun",
      altitude: newProd.altitude || "450m",
      lot: newProd.lot || `LOT-2024-K${Math.floor(10 + Math.random() * 90)}`,
      badge: newProd.badge || "Yeni Hasat",
      badgeType: "secondary",
      tag: "Doğal Çiftlik",
      rating: 5.0,
      reviewsCount: 1,
      costPrice: parseFloat(newProd.costPrice) || (parseFloat(newProd.price) * 0.5),
      price: parseFloat(newProd.price),
      oldPrice: parseFloat(newProd.price) * 1.15,
      stock: parseInt(newProd.stock, 10) || 50,
      unit: "Adet",
      description: newProd.description || "Giresun Keşap Vadisi doğal çiftliğimizden taze üretim.",
      details: newProd.details || "Taş değirmen gelenekleriyle özenle hazırlanmıştır.",
      nutritions: {
        energy: "620 kcal",
        fat: "55.0 g",
        protein: "14.0 g",
        carbs: "18.0 g",
        fiber: "9.0 g"
      },
      weights: [
        { label: "500g", price: parseFloat(newProd.price), default: true }
      ],
      priceHistory: [
        { date: "Bugün", price: parseFloat(newProd.price), reason: "İlk Hasat Listelemesi" }
      ],
      image: newProd.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDiyGuGQg_uXH2QIu5crnSJ3xCAQ86QGURDsgjmQzmwKkjem7dXcNL9e_7JzAR6ANlt_0zi3vtWWa-NAsEHcX7DqWF0mZTshVdiLKbvEQflNiF8WeJ94WDvlxkrU3wQz_6iI6boO7nGJ2ZvL2Tc4xtBL7eDezquW3XbRckkYAmkpkjJs-qprBhnn3qNU7fzUp-BaUjKsCtcKU-R72Ifj-1hGVvqicQzGNQY9Wkab980pN-03zqN8ei34Q",
      active: true
    };
    products.unshift(product);
    this.saveProducts(products);
    this.notifyToast(`Yeni ürün "${product.name}" çiftlik kataloğuna eklendi!`, "success");
    return product;
  }

  deleteProduct(id) {
    let products = this.getProducts();
    const target = products.find((p) => p.id === id);
    products = products.filter((p) => p.id !== id);
    this.saveProducts(products);
    if (target) {
      this.notifyToast(`"${target.name}" katalogdan kaldırıldı.`, "info");
    }
  }

  applyBulkPriceUpdate({ category, type, value }) {
    const products = this.getProducts();
    let updatedCount = 0;
    const val = parseFloat(value);
    if (isNaN(val) || val <= 0) return 0;

    products.forEach((p) => {
      if (category === "all" || p.category === category) {
        p.oldPrice = p.price;
        if (type === "percent") {
          p.price = Math.round(p.price * (1 + val / 100));
        } else {
          p.price = Math.round(p.price + val);
        }
        if (p.weights) {
          p.weights.forEach((w) => {
            if (type === "percent") {
              w.price = Math.round(w.price * (1 + val / 100));
            } else {
              w.price = Math.round(w.price + val);
            }
          });
        }
        if (!p.priceHistory) p.priceHistory = [];
        p.priceHistory.unshift({
          date: "Toplu Güncelleme",
          price: p.price,
          reason: `Toplu Fiyat Güncellemesi (${type === 'percent' ? `%${val}` : `+₺${val}`})`
        });
        updatedCount++;
      }
    });

    this.saveProducts(products);
    this.notifyToast(`${updatedCount} adet mahsulün fiyatı toplu güncellendi!`, "success");
    return updatedCount;
  }

  // --- Favorites ---
  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
    } catch {
      return [];
    }
  }

  isFavorite(productId) {
    return this.getFavorites().includes(productId);
  }

  toggleFavorite(productId) {
    const favs = this.getFavorites();
    const index = favs.indexOf(productId);
    let isFav = false;
    if (index > -1) {
      favs.splice(index, 1);
      isFav = false;
    } else {
      favs.push(productId);
      isFav = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    this.emit("favoritesChanged", favs);
    return isFav;
  }

  // --- Cart ---
  getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
    } catch {
      return [];
    }
  }

  saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.emit("cartChanged", cart);
  }

  addToCart(product, weightLabel = null, qty = 1) {
    const cart = this.getCart();
    let selectedPrice = product.price;
    let selectedWeight = weightLabel;

    if (!selectedWeight) {
      const defaultW = product.weights?.find((w) => w.default) || product.weights?.[0];
      selectedWeight = defaultW ? defaultW.label : "500g";
      selectedPrice = defaultW ? defaultW.price : product.price;
    } else {
      const matchingW = product.weights?.find((w) => w.label === selectedWeight);
      if (matchingW) selectedPrice = matchingW.price;
    }

    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.weight === selectedWeight
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        productId: product.id,
        sku: product.sku,
        name: product.name,
        weight: selectedWeight,
        price: selectedPrice,
        quantity: qty,
        origin: product.origin,
        image: product.image
      });
    }

    this.saveCart(cart);
    this.notifyToast(`"${product.name} (${selectedWeight})" sepete eklendi!`, "success");
  }

  updateCartQty(index, newQty) {
    const cart = this.getCart();
    if (cart[index]) {
      if (newQty <= 0) {
        cart.splice(index, 1);
        this.notifyToast("Ürün sepetten çıkarıldı.", "info");
      } else {
        cart[index].quantity = newQty;
      }
      this.saveCart(cart);
    }
  }

  removeFromCart(index) {
    const cart = this.getCart();
    if (cart[index]) {
      const removed = cart.splice(index, 1)[0];
      this.saveCart(cart);
      this.notifyToast(`"${removed.name}" sepetten silindi.`, "info");
    }
  }

  clearCart() {
    this.saveCart([]);
  }

  getCartCount() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartSubtotal() {
    return this.getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // --- Coupons ---
  getCoupon() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.COUPON)) || null;
    } catch {
      return null;
    }
  }

  applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (VALID_COUPONS[cleanCode]) {
      const coupon = VALID_COUPONS[cleanCode];
      localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(coupon));
      this.emit("couponChanged", coupon);
      this.notifyToast(`"${cleanCode}" kuponu başarıyla uygulandı!`, "success");
      return { success: true, coupon };
    } else {
      this.notifyToast("Geçersiz kupon kodu. 'HASAT2024' deneyin.", "error");
      return { success: false, message: "Kupon bulunamadı" };
    }
  }

  removeCoupon() {
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    this.emit("couponChanged", null);
    this.notifyToast("Kupon kaldırıldı.", "info");
  }

  // --- Orders ---
  getOrders() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  }

  saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.emit("ordersChanged", orders);
  }

  createOrder({ customer, shippingMethod, paymentMethod, notes, giftWrap }) {
    const cart = this.getCart();
    if (cart.length === 0) {
      throw new Error("Sepetiniz boş!");
    }

    const subtotal = this.getCartSubtotal();
    const freeThreshold = 500;
    
    // Shipping calculation
    let shippingFee = 0;
    if (shippingMethod === "express") {
      shippingFee = 45.0;
    } else {
      shippingFee = subtotal >= freeThreshold ? 0.0 : 35.0;
    }

    // Farm discount
    const farmDiscount = subtotal >= freeThreshold ? 50.0 : 0.0;

    // Coupon discount
    let couponDiscount = 0;
    const coupon = this.getCoupon();
    if (coupon) {
      if (coupon.discountPercent) {
        couponDiscount = Math.round(subtotal * (coupon.discountPercent / 100));
      } else if (coupon.discountFixed) {
        couponDiscount = coupon.discountFixed;
      }
    }

    // Payment method adjustments
    let paymentDiscount = 0;
    let paymentFee = 0;
    if (paymentMethod.includes("Havale") || paymentMethod.includes("EFT")) {
      paymentDiscount = Math.round(subtotal * 0.05); // %5 discount
    } else if (paymentMethod.includes("Kapıda")) {
      paymentFee = 20.0; // +20 ₺ collection fee
    }

    const giftFee = giftWrap ? 35.0 : 0.0;
    const total = Math.max(0, subtotal + shippingFee + paymentFee - farmDiscount - couponDiscount - paymentDiscount + giftFee);

    const orderNumber = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `YK-${Math.floor(1000000000 + Math.random() * 9000000000)}-TR`;

    const now = new Date();
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const dateFormatted = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const itemsSummary = cart.map((i) => `${i.quantity}x ${i.name} (${i.weight})`).join(", ");

    const newOrder = {
      id: orderNumber,
      date: dateFormatted,
      customerName: customer.name || "Değerli Müşteri",
      email: customer.email || "musteri@posta.com",
      phone: customer.phone || "0500 000 00 00",
      city: customer.city || "İstanbul",
      district: customer.district || "Merkez",
      address: customer.address || "Adres Belirtilmedi",
      notes: notes || "",
      items: [...cart],
      itemsSummary,
      itemCount: this.getCartCount(),
      subtotal,
      shippingFee,
      farmDiscount,
      couponDiscount,
      paymentDiscount,
      paymentFee,
      giftFee,
      total,
      paymentMethod,
      status: "Hazırlanıyor",
      trackingNo: trackingCode,
      lotMatch: "LOT-2024-KESAP-04",
      yield: "%54.0"
    };

    // Update stock for purchased products
    const products = this.getProducts();
    cart.forEach((cartItem) => {
      const prod = products.find((p) => p.id === cartItem.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - cartItem.quantity);
      }
    });
    this.saveProducts(products);

    // Save order
    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.saveOrders(orders);

    // Clear cart & coupon
    this.clearCart();
    this.removeCoupon();

    this.notifyToast(`Tebrikler! ${orderNumber} numaralı siparişiniz oluşturuldu!`, "success");
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.saveOrders(orders);
      this.notifyToast(`Sipariş #${orderId} durumu "${newStatus}" olarak güncellendi.`, "info");
    }
  }

  // --- Toast Notifications ---
  notifyToast(message, type = "success") {
    this.emit("toast", { message, type });
  }

  // --- Reset All to Defaults (Useful helper) ---
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(INITIAL_CART));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(["fnd-092", "ezm-014"]));
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    this.emit("productsChanged", INITIAL_PRODUCTS);
    this.emit("cartChanged", INITIAL_CART);
    this.emit("ordersChanged", INITIAL_ORDERS);
    this.notifyToast("Tüm veriler fabrika ayarlarına sıfırlandı.", "info");
  }
}

export const store = new Store();
