// Tüccarım - Organik Çiftlik & E-Ticaret Platformu
// Başlangıç Veri Seti (Tüccarım Design System)

export const INITIAL_PRODUCTS = [
  {
    id: "fnd-092",
    sku: "TC-FND-092",
    name: "Giresun Çifte Kavrulmuş Tombul Fındık",
    category: "nut",
    categoryName: "Çiğ & Kavrulmuş",
    origin: "Keşap Vadisi / Giresun",
    altitude: "Parsel 04 • 480m Rakım",
    lot: "Parti #24-11",
    badge: "Tescilli Tombul",
    badgeType: "secondary",
    tag: "Coğrafi İşaretli",
    rating: 4.9,
    reviewsCount: 142,
    costPrice: 210.0,
    price: 385.0,
    oldPrice: 440.0,
    stock: 420,
    unit: "Kavanoz",
    description: "Geleneksel bakır tavalarda düşük ısıda yavaşça kavrulmuş, yoğun fındık aroması ve gevrek doku.",
    details: "Giresun Keşap Vadisi'nin asırlık ocaklarından toplanan tescilli tombul fındıklarımız, meşe odunu ısısında yavaşça kavrulur. Vakum mühürlü cam kavanozda hava almadan tazeliğini korur.",
    nutritions: {
      energy: "628 kcal",
      fat: "60.8 g",
      protein: "15.0 g",
      carbs: "16.7 g",
      fiber: "9.7 g"
    },
    weights: [
      { label: "500g", price: 385.0, default: true },
      { label: "1000g", price: 720.0 }
    ],
    priceHistory: [
      { date: "15 Ağustos 2024", price: 385.0, reason: "2024 Hasat Lansman Fiyatı" },
      { date: "01 Mayıs 2024", price: 360.0, reason: "Bahar Dönemi Fiyatı" },
      { date: "10 Ocak 2024", price: 330.0, reason: "Kış Sezonu Sonu" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwYIOe0nv8Sbc7aFiHRLlR7KMC-Yirr1tgOvIG37UIDSeGzWggsv6C8Znqn6XkCkWmz6COQAD4WIvK50xbiteWTKwiYMVyYmF_Yfc5JGW7bVfrIYn-bWsZpkcnUy2UvL2rHvesofUV5ORDY6DMuY-3RenY6jw_x0adh1Fj0bJZxyv_mzpvwCYp5nWV8BcgrceWX1CzSaCbwfCHyfIO74d8_ByobLLZ7gxgACLMdOme",
    active: true
  },
  {
    id: "ezm-014",
    sku: "TC-EZM-014",
    name: "Şekersiz Doğal Fındık Ezmesi",
    category: "butter",
    categoryName: "Taş Değirmen Ezmeler",
    origin: "Tirebolu / Giresun",
    altitude: "Parsel 02 • 380m Rakım",
    lot: "Parti #24-08",
    badge: "%100 Fındık",
    badgeType: "primary",
    tag: "Taş Değirmen",
    rating: 5.0,
    reviewsCount: 98,
    costPrice: 165.0,
    price: 295.0,
    oldPrice: 340.0,
    stock: 185,
    unit: "Kavanoz",
    description: "Taş değirmende 18 saat boyunca soğuk ezilerek elde edilen pürüzsüz kıvam; ilave yağ veya şeker içermez.",
    details: "Granit taş değirmenlerde saatlerce yavaş devirde sürtünerek krema kıvamına getirilen ezmemiz, fındığın kendi doğal yağını salmasıyla pürüzsüzleşir. Şeker, palm yağı ve emülgatör içermez.",
    nutritions: {
      energy: "645 kcal",
      fat: "62.0 g",
      protein: "16.2 g",
      carbs: "11.0 g",
      fiber: "8.5 g"
    },
    weights: [
      { label: "320g", price: 295.0, default: true },
      { label: "650g", price: 560.0 }
    ],
    priceHistory: [
      { date: "15 Ağustos 2024", price: 295.0, reason: "Yeni Sezon Çekimi" },
      { date: "20 Mart 2024", price: 275.0, reason: "Bahar Fiyatı" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAN_w8juKM5D5u3Iln9kaU89qH0l2dN5lk8M9k5HCmLO5NTx_kCkwI0hEIpjw0MRfo8Lrs0ZA64ntniqDrrWQ6ow0btMRNWLW5MLmJf6rY8OAB3yaYJF-3NWSrx1gyQxs6eABAr-Oa4Q1CkUEENsQ--x7tvk5enusKWIiYWrOXnNySRK8vQzRvN1wq98Ik0HQPO4WfQh0KH2zw2ZlHyO8aoXC-cbIZ7P7m93kZGE7",
    active: true
  },
  {
    id: "cig-005",
    sku: "TC-CIG-005",
    name: "Doğal Güneşte Kurutulmuş Çiğ Fındık",
    category: "nut",
    categoryName: "Çiğ & Kavrulmuş",
    origin: "Yağlıdere / Giresun",
    altitude: "Parsel 06 • 520m Rakım",
    lot: "Parti #24-03",
    badge: "Güneşte Kurutulmuş",
    badgeType: "secondary",
    tag: "İşlem Görmemiş",
    rating: 4.8,
    reviewsCount: 64,
    costPrice: 195.0,
    price: 340.0,
    oldPrice: 380.0,
    stock: 260,
    unit: "Kese",
    description: "Karadeniz harmanlarında doğal esinti ve güneş ile kurutulmuş, işlem görmemiş saf tombul fındık içi.",
    details: "Dalından el ile toplanıp harmanlarda Karadeniz güneşiyle yavaşça nemi düşürülen çiğ fındıklarımız, canlı besin değerlerini ve enzimlerini eksiksiz muhafaza eder.",
    nutritions: {
      energy: "628 kcal",
      fat: "60.5 g",
      protein: "14.9 g",
      carbs: "17.0 g",
      fiber: "10.0 g"
    },
    weights: [
      { label: "500g", price: 180.0 },
      { label: "1000g", price: 340.0, default: true }
    ],
    priceHistory: [
      { date: "15 Ağustos 2024", price: 340.0, reason: "Yeni Mahsul Harmanı" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ0_kX_E6aojbyYC2V0OhO4oVKWCpciVRax6wfLzsrWLr1N02U1U0wRpcad9hiVRV6e5LL7rM1q4lqQvifqYE2yuYDhRToMONSRupjFRQK3SiMj1jLjOw34lxybAO0lQ-ZmR4VeR3wIKCaTExJfbuydEZ8-qTZfhbn6q-cCAfp0VTXZs79Zy5bQm07Gi9WL04WvbhEGOxIFvriNbRtm8HPKM8WSF9WJwTgrGIC_DeT",
    active: true
  },
  {
    id: "yag-021",
    sku: "TC-YAG-021",
    name: "Soğuk Sıkım Ham Fındık Yağı",
    category: "oil",
    categoryName: "Soğuk Sıkım Yağlar",
    origin: "Keşap / Giresun",
    altitude: "Parsel 04 • 480m Rakım",
    lot: "Parti #24-19",
    badge: "İlk Soğuk Sıkım",
    badgeType: "primary",
    tag: "27°C Altı Pres",
    rating: 4.9,
    reviewsCount: 52,
    costPrice: 310.0,
    price: 540.0,
    oldPrice: 600.0,
    stock: 95,
    unit: "Şişe",
    description: "27°C altı hidrolik presleme usulü ile elde edilen, E vitamini ve antioksidan zengini saf gurme yağ.",
    details: "Işık geçirmez koyu cam şişede sunulan soğuk sıkım yağımız; yüksek yanma derecesi (220°C) ve ipeksi hafif aromasıyla hem sıcak mutfakta hem salatalarda eşsizdir.",
    nutritions: {
      energy: "884 kcal",
      fat: "100.0 g",
      protein: "0.0 g",
      carbs: "0.0 g",
      fiber: "0.0 g"
    },
    weights: [
      { label: "250ml", price: 290.0 },
      { label: "500ml", price: 540.0, default: true }
    ],
    priceHistory: [
      { date: "15 Ağustos 2024", price: 540.0, reason: "İlk Damıtma Hasat Fiyatı" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxN_lAIwOaivxUa07pO5STxhpMFBiBxfbNU3ixpbs_yQUv-HUgAjLrirWJ0f3iXBHJaju8AkP_sjhvOZxJydU0ajJvIzZRPsEiCzZTCXobtS4PVGHUd4DjEdwNyUTYDpRHcn5EcR3a7hkA7rjRv7OnC3oI0DB_t9dUwEDhHMmBSurIIfUhfhBAgfM7DnKEUCbAPUwjml20hd01lePJY9SVkZ0BrFmJGobx6xl_NWUs",
    active: true
  },
  {
    id: "bal-033",
    sku: "TC-BAL-033",
    name: "Karadeniz Yayla Çiçek Balı",
    category: "honey",
    categoryName: "Yayla Balı",
    origin: "Kümbet Yaylası / Giresun",
    altitude: "1850m Rakım",
    lot: "Parti #24-02",
    badge: "1850m Rakım",
    badgeType: "secondary",
    tag: "Ham & Katkısız",
    rating: 5.0,
    reviewsCount: 71,
    costPrice: 260.0,
    price: 460.0,
    oldPrice: 510.0,
    stock: 42,
    unit: "Kavanoz",
    description: "Kümbet ve Bektaş yaylalarının endemik kır çiçeklerinden arıların süzdüğü, ısıl işlem görmemiş ham bal.",
    details: "Yüksek rakımlı Karadeniz yaylalarında yerleşim ve tarım ilaçlarından kilometrelerce uzakta üretilen polen ve propolis zengini saf ham bal.",
    nutritions: {
      energy: "304 kcal",
      fat: "0.0 g",
      protein: "0.3 g",
      carbs: "82.4 g",
      fiber: "0.2 g"
    },
    weights: [
      { label: "450g", price: 460.0, default: true },
      { label: "850g", price: 820.0 }
    ],
    priceHistory: [
      { date: "15 Ağustos 2024", price: 460.0, reason: "Yayla Sağım Sezonu" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdQ22WuJqkvhBLw1adQXb4u0r4GItQJPA--GmIkYZ-D4Wqhogy4pCEjAVwOxEg5k9fPN7AZGoKOS00UEDyuQjm0ykXUvEYBf36hlmFMngB5DfSmUGyQg4C55Z2rWXdMN4Wu-W0I8doWVyU1NV3Xn6hLiYzLqsErMXIvW8XMPFCd4JhquRQSfP6MVaYAB41WYnuyQmA421nLBoTc-dSUFPR_7o71yMS2G37OTnWpi-v",
    active: true
  },
  {
    id: "un-008",
    sku: "TC-UN-008",
    name: "Taş Değirmen İnce Fındık Unu",
    category: "butter",
    categoryName: "Taş Değirmen Ezmeler",
    origin: "Tirebolu / Giresun",
    altitude: "Parsel 02 • 380m Rakım",
    lot: "Parti #24-15",
    badge: "Glutensiz • Saf",
    badgeType: "primary",
    tag: "İnce Çekim",
    rating: 4.8,
    reviewsCount: 38,
    costPrice: 105.0,
    price: 190.0,
    oldPrice: 220.0,
    stock: 140,
    unit: "Paket",
    description: "Düşük ısıda öğütülmüş, yağı dengeli, pasta ve gurme tarifler için ideal ipeksi tombul fındık unu.",
    details: "Taş değirmende ince elekten geçirilmiş fındık unumuz, ketojenik ve glutensiz beslenenler için en saf ve doğal un alternatifidir.",
    nutritions: {
      energy: "610 kcal",
      fat: "55.0 g",
      protein: "16.5 g",
      carbs: "18.0 g",
      fiber: "9.0 g"
    },
    weights: [
      { label: "400g", price: 190.0, default: true },
      { label: "1000g", price: 420.0 }
    ],
    priceHistory: [
      { date: "15 Ağustos 2024", price: 190.0, reason: "Yeni Sezon Öğütümü" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAgVmUdz4jwzGZS0wLXuqm86fv6FssjQLvY3dkDBmH7l470CGVN7M8LUzbpfTr-fT46hifB5yRNiwtfWBXg632QmvT1BCFH4cE1FlXrrnOvY-7gEcRpgT6_3ZIEfs2p1BNGs5C4KDirmNyZkx0ektohyGp1oHOlLq-2kMSobuPkBEhvX2RdY_R7MoDarybSUhb7bM1-WvoP9aqZcuXLMDF8CDBZT_960M5ZFKrRWYG",
    active: true
  },
  {
    id: "pak-001",
    sku: "TC-PAK-001",
    name: "Gurme Ahşap Sandık Hasat Koleksiyonu",
    category: "set",
    categoryName: "Hasat Koleksiyonu",
    origin: "Keşap Vadisi / Giresun",
    altitude: "Özel Koleksiyon",
    lot: "Parti #24-GURME",
    badge: "Özel Hediye Seti",
    badgeType: "secondary",
    tag: "Sınırlı Üretim",
    rating: 5.0,
    reviewsCount: 56,
    costPrice: 540.0,
    price: 920.0,
    oldPrice: 1050.0,
    stock: 65,
    unit: "Sandık",
    description: "Kavrulmuş fındık (500g), taş değirmen fındık ezmesi (320g), soğuk sıkım fındık yağı (250ml) ve organik bal (450g) içeren lüks ahşap sandık seti.",
    details: "Çiftliğimizin en seçkin 4 mahsulünü özel kestane ağacından el yapımı ahşap sandık içinde, hasat sertifikası ve balmumu mühürle sunuyoruz.",
    nutritions: {
      energy: "Zengin Gurme Seçki",
      fat: "Doğal yağlar",
      protein: "Bitkisel protein",
      carbs: "Doğal karbonhidrat",
      fiber: "Yüksek lif"
    },
    weights: [
      { label: "Ahşap Sandık Set", price: 920.0, default: true }
    ],
    priceHistory: [
      { date: "15 Ağustos 2024", price: 920.0, reason: "Sezon Koleksiyonu" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGmFjEcZqLw2F9u0ZCanL3cwuHaiAh6OqaqUw4sTRFh-v6CiAml2bNo1i_JfON1RAvtpB9fugLlFMTEZngBzUC8Hmc5Ogn9_O8Y458tQAvwI5WpcSmICnZRSxBEQTpFOm5zBrO7VUfQrN8MT7S0U2xiePBrJnOcguHopjDSjpaDxV7lAMTknVvXVV5jsO0gAjU_-un6E7tdvW4Xml_eTwaiHYuVlNa-dBEYW5Whwd8SfddubEGR11KnQ",
    active: true
  }
];

// Başlangıç Sepeti (Initial Cart)
export const INITIAL_CART = [
  {
    productId: "fnd-092",
    sku: "TC-FND-092",
    name: "Giresun Çifte Kavrulmuş Tombul Fındık",
    weight: "500g",
    price: 385.0,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwYIOe0nv8Sbc7aFiHRLlR7KMC-Yirr1tgOvIG37UIDSeGzWggsv6C8Znqn6XkCkWmz6COQAD4WIvK50xbiteWTKwiYMVyYmF_Yfc5JGW7bVfrIYn-bWsZpkcnUy2UvL2rHvesofUV5ORDY6DMuY-3RenY6jw_x0adh1Fj0bJZxyv_mzpvwCYp5nWV8BcgrceWX1CzSaCbwfCHyfIO74d8_ByobLLZ7gxgACLMdOme",
    lot: "Parti #24-11",
    origin: "Keşap / Giresun"
  },
  {
    productId: "ezm-014",
    sku: "TC-EZM-014",
    name: "Şekersiz Doğal Fındık Ezmesi",
    weight: "320g",
    price: 295.0,
    quantity: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKAN_w8juKM5D5u3Iln9kaU89qH0l2dN5lk8M9k5HCmLO5NTx_kCkwI0hEIpjw0MRfo8Lrs0ZA64ntniqDrrWQ6ow0btMRNWLW5MLmJf6rY8OAB3yaYJF-3NWSrx1gyQxs6eABAr-Oa4Q1CkUEENsQ--x7tvk5enusKWIiYWrOXnNySRK8vQzRvN1wq98Ik0HQPO4WfQh0KH2zw2ZlHyO8aoXC-cbIZ7P7m93kZGE7",
    lot: "Parti #24-08",
    origin: "Tirebolu / Giresun"
  },
  {
    productId: "yag-021",
    sku: "TC-YAG-021",
    name: "Soğuk Sıkım Ham Fındık Yağı",
    weight: "500ml",
    price: 540.0,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxN_lAIwOaivxUa07pO5STxhpMFBiBxfbNU3ixpbs_yQUv-HUgAjLrirWJ0f3iXBHJaju8AkP_sjhvOZxJydU0ajJvIzZRPsEiCzZTCXobtS4PVGHUd4DjEdwNyUTYDpRHcn5EcR3a7hkA7rjRv7OnC3oI0DB_t9dUwEDhHMmBSurIIfUhfhBAgfM7DnKEUCbAPUwjml20hd01lePJY9SVkZ0BrFmJGobx6xl_NWUs",
    lot: "Parti #24-19",
    origin: "Keşap / Giresun"
  }
];

// Geçerli Kupon Kodları (Promo Coupons)
export const VALID_COUPONS = {
  YENIHASAT2024: { code: "YENIHASAT2024", type: "percent", value: 15, desc: "%15 Yeni Hasat İndirimi" },
  HASAT2024: { code: "HASAT2024", type: "percent", value: 15, desc: "%15 Hasat İndirimi" },
  FINDIK10: { code: "FINDIK10", type: "fixed", value: 50, desc: "50 ₺ Çiftlik Hoş Geldin İndirimi" },
  GURME75: { code: "GURME75", type: "fixed", value: 75, desc: "75 ₺ Gurme Mahsul Desteği" }
};

// Kayıtlı Demo Adresleri (Saved Addresses)
export const SAVED_ADDRESSES = [
  {
    id: "addr-1",
    title: "Ev Adresim (Kadıköy)",
    fullName: "Ahmet Yılmaz",
    phone: "0 (532) 714 88 92",
    city: "istanbul",
    district: "Kadıköy / Moda",
    detailedAddress: "Caferağa Mah. Sakızgülü Sk. No: 18 Daire: 4, Kadıköy / İstanbul",
    isDefault: true
  },
  {
    id: "addr-2",
    title: "Ofis (Maslak)",
    fullName: "Ahmet Yılmaz",
    phone: "0 (532) 714 88 92",
    city: "istanbul",
    district: "Sarıyer / Maslak",
    detailedAddress: "Büyükdere Cad. No: 245 USO Center K:8 D:32, Maslak / İstanbul",
    isDefault: false
  },
  {
    id: "addr-3",
    title: "Yazlık (Bodrum)",
    fullName: "Ahmet Yılmaz",
    phone: "0 (532) 714 88 92",
    city: "muğla",
    district: "Bodrum / Bitez",
    detailedAddress: "Bitez Mah. Çökertme Cad. No: 12, Bodrum / Muğla",
    isDefault: false
  }
];

// Başlangıç Sipariş Kayıtları (Initial Orders)
export const INITIAL_ORDERS = [
  {
    id: "TC-88412",
    date: "28 Ekim 2024, 14:10",
    customer: {
      name: "Ahmet Yılmaz",
      phone: "0 (532) 714 88 92",
      city: "İstanbul",
      district: "Kadıköy",
      address: "Caferağa Mah. Sakızgülü Sk. No: 18 D: 4, Kadıköy / İstanbul",
      email: "ahmet.yilmaz@posta.me"
    },
    items: [
      { name: "Giresun Çifte Kavrulmuş Tombul Fındık", weight: "500g", quantity: 1, price: 385.0, lot: "Parti #24-11" },
      { name: "Şekersiz Doğal Fındık Ezmesi", weight: "320g", quantity: 2, price: 295.0, lot: "Parti #24-08" },
      { name: "Soğuk Sıkım Ham Fındık Yağı", weight: "500ml", quantity: 1, price: 540.0, lot: "Parti #24-19" }
    ],
    subtotal: 1515.0,
    shippingFee: 0.0,
    farmDiscount: 45.0,
    couponDiscount: 0.0,
    total: 1470.0,
    paymentMethod: "Kredi Kartı (256-Bit SSL)",
    shippingMethod: "Çiftlik Özel Kargo (Yurtiçi)",
    status: "Hazırlanıyor",
    trackingNo: "YK-884120-TR",
    notes: "Ahşap sandık içine organik saman koruma eklensin, teşekkürler.",
    lot: "Parti #24-11 / KŞ-114"
  },
  {
    id: "TC-88405",
    date: "27 Ekim 2024, 11:45",
    customer: {
      name: "Selin Aksoy",
      phone: "0 (544) 312 90 14",
      city: "Ankara",
      district: "Çankaya",
      address: "Gaziosmanpaşa Mah. Arjantin Cad. No: 9 D: 2, Çankaya / Ankara",
      email: "selin.aksoy@posta.me"
    },
    items: [
      { name: "Gurme Ahşap Sandık Hasat Koleksiyonu", weight: "Set", quantity: 1, price: 920.0, lot: "Parti #24-GURME" }
    ],
    subtotal: 920.0,
    shippingFee: 0.0,
    farmDiscount: 45.0,
    couponDiscount: 0.0,
    total: 875.0,
    paymentMethod: "Havale / EFT (%5 İndirimli)",
    shippingMethod: "Hızlı Özel Sevkiyat (Hava Kargo)",
    status: "Kargoya Verildi",
    trackingNo: "YK-884050-TR",
    notes: "Hediye kartına 'Sevgilerle' yazılabilirse çok sevinirim.",
    lot: "Parti #24-GURME"
  },
  {
    id: "TC-88392",
    date: "26 Ekim 2024, 09:20",
    customer: {
      name: "Burak Karadeniz",
      phone: "0 (533) 489 12 77",
      city: "İzmir",
      district: "Urla",
      address: "İskele Mah. Mithatpaşa Cad. No: 44, Urla / İzmir",
      email: "burak.k@posta.me"
    },
    items: [
      { name: "Doğal Güneşte Kurutulmuş Çiğ Fındık", weight: "1000g", quantity: 2, price: 340.0, lot: "Parti #24-03" },
      { name: "Karadeniz Yayla Çiçek Balı", weight: "450g", quantity: 1, price: 460.0, lot: "Parti #24-02" }
    ],
    subtotal: 1140.0,
    shippingFee: 0.0,
    farmDiscount: 45.0,
    couponDiscount: 150.0,
    total: 945.0,
    paymentMethod: "Kredi Kartı (256-Bit SSL)",
    shippingMethod: "Çiftlik Özel Kargo",
    status: "Teslim Edildi",
    trackingNo: "YK-883920-TR",
    notes: "",
    lot: "Parti #24-03"
  }
];

// Analitik Periyot Veri Seti (Analytics Periods)
export const ANALYTICS_PERIOD_DATA = {
  today: {
    revenue: 1470,
    ordersCount: 4,
    avgOrder: 367,
    growthText: "+%12,4 dünkü performansa kıyasla",
    labels: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"],
    revenueData: [280, 520, 890, 1150, 1320, 1470, 1470],
    maxVal: 2000
  },
  "7d": {
    revenue: 42850,
    ordersCount: 88,
    avgOrder: 486,
    growthText: "+%14,2 önceki haftaya kıyasla",
    labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    revenueData: [4200, 5800, 6100, 5400, 7900, 6800, 6650],
    maxVal: 10000
  },
  month: {
    revenue: 184520,
    ordersCount: 428,
    avgOrder: 431,
    growthText: "+%18,4 geçen aya kıyasla",
    labels: ["1. Hafta", "2. Hafta", "3. Hafta", "4. Hafta"],
    revenueData: [38500, 44200, 48900, 52920],
    maxVal: 60000
  },
  harvest: {
    revenue: 624800,
    ordersCount: 1412,
    avgOrder: 442,
    growthText: "+%24,6 2023 sezonuna kıyasla",
    labels: ["Ağu '24", "Eyl '24", "Eki '24", "Kas '24 (Tahmin)"],
    revenueData: [142000, 218000, 264800, 290000],
    maxVal: 350000
  }
};
