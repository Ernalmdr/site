// Fındık Vadisi - Doğal Çiftlik & E-Ticaret Platformu
// Başlangıç Veri Seti (Initial Dataset)

export const INITIAL_PRODUCTS = [
  {
    id: "fnd-092",
    sku: "FND-092",
    name: "Çifte Kavrulmuş Giresun Fındığı",
    category: "kavrulmus",
    categoryName: "Çifte Kavrulmuş Fındık",
    origin: "Keşap / Giresun",
    altitude: "450m Rakım",
    lot: "LOT-2024-K09",
    badge: "Yeni Mahsul",
    badgeType: "secondary",
    tag: "Organik Sertifikalı",
    rating: 4.9,
    reviewsCount: 128,
    costPrice: 175.0,
    price: 365.0,
    oldPrice: 420.0,
    stock: 420,
    unit: "Adet",
    description: "Meşe odunu fırınında düşük ısıda yavaşça kavrulmuş, ağızda çıtır çıtır dağılan yağ oranı yüksek tombul fındık.",
    details: "Giresun Keşap Vadisi'nin 450 metre rakımlı yamaçlarından toplanan fındıklarımız, geleneksel yöntemlerle meşe odunu ateşinde kavrulur. Hiçbir kimyasal koruyucu, tuz veya aroma verici içermez.",
    nutritions: {
      energy: "628 kcal",
      fat: "60.8 g",
      protein: "15.0 g",
      carbs: "16.7 g",
      fiber: "9.7 g"
    },
    weights: [
      { label: "250g", price: 195.0 },
      { label: "500g", price: 365.0, default: true },
      { label: "1 kg", price: 680.0 },
      { label: "2.5 kg", price: 1620.0 }
    ],
    priceHistory: [
      { date: "12 Ağustos 2024", price: 365.0, reason: "Yeni Hasat Lansman Fiyatı" },
      { date: "01 Mayıs 2024", price: 350.0, reason: "Bahar Dönemi Fiyatı" },
      { date: "15 Ocak 2024", price: 320.0, reason: "Önceki Sezon Sonu" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiyGuGQg_uXH2QIu5crnSJ3xCAQ86QGURDsgjmQzmwKkjem7dXcNL9e_7JzAR6ANlt_0zi3vtWWa-NAsEHcX7DqWF0mZTshVdiLKbvEQflNiF8WeJ94WDvlxkrU3wQz_6iI6boO7nGJ2ZvL2Tc4xtBL7eDezquW3XbRckkYAmkpkjJs-qprBhnn3qNU7fzUp-BaUjKsCtcKU-R72Ifj-1hGVvqicQzGNQY9Wkab980pN-03zqN8ei34Q",
    active: true
  },
  {
    id: "ezm-014",
    sku: "EZM-014",
    name: "Kremamsı Doğal Fındık Ezmesi",
    category: "ezme",
    categoryName: "Taş Değirmen Ezme",
    origin: "Tirebolu • Taş Değirmen",
    altitude: "380m Rakım",
    lot: "LOT-2024-TD02",
    badge: "%100 Fındık İçi",
    badgeType: "primary",
    tag: "Taş Değirmen",
    rating: 5.0,
    reviewsCount: 84,
    costPrice: 140.0,
    price: 285.0,
    oldPrice: 320.0,
    stock: 185,
    unit: "Adet",
    description: "Sadece kavrulmuş fındıktan taş değirmende çekilmiş, sıfır şeker, sıfır palm yağı ve sıfır koruyucu içeren saf enerji kaynağı.",
    details: "Geleneksel granit taş değirmenlerde saatlerce yavaş devirde sürtünerek krema kıvamına getirilen ezmemiz, fındığın kendi doğal yağını salmasıyla pürüzsüzleşir.",
    nutritions: {
      energy: "645 kcal",
      fat: "62.0 g",
      protein: "16.2 g",
      carbs: "14.1 g",
      fiber: "10.1 g"
    },
    weights: [
      { label: "320g", price: 285.0, default: true },
      { label: "650g", price: 540.0 },
      { label: "1 kg Kova", price: 790.0 }
    ],
    priceHistory: [
      { date: "15 Ağustos 2024", price: 285.0, reason: "2024 Taze Çekim Fiyatı" },
      { date: "10 Mart 2024", price: 260.0, reason: "Sezon İçi Güncelleme" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQBXKICbkb7VszXzYSzRZRrA1YiSKvmPRQ39nx3jR-l2ysHebJbp3ziLjOps4SWo8-tgiVXlV7sU2BuAVGH1XMYGWxjbZ9H91DoVFSgDA9VGz83WxLIlNKBDesFMMByzY1Dmywoq3qIHBjBVPa-TjAM4wDd6XpG2OR5HJ_qV_nSDb5oG8FvyB9s25TivXgziYDtXB5L3USyWugm7TyqTLh9BNj0CRNKuDWXR3lL-npUWaL5op1Tjt4DQ",
    active: true
  },
  {
    id: "cig-041",
    sku: "CIG-041",
    name: "Çiğ Tombul Giresun Fındığı",
    category: "cig",
    categoryName: "Çiğ & Naturel",
    origin: "Espiye / Giresun",
    altitude: "520m Rakım",
    lot: "LOT-2024-CG01",
    badge: "Güneşte Kurutulmuş",
    badgeType: "secondary-container",
    tag: "İyi Tarım Sertifikalı",
    rating: 4.8,
    reviewsCount: 62,
    costPrice: 160.0,
    price: 340.0,
    oldPrice: 380.0,
    stock: 310,
    unit: "Adet",
    description: "İşlem görmemiş, çiğ haliyle besin değerlerini ve doğal yağını eksiksiz koruyan 13-15 mm kalibre birinci sınıf tombul fındık.",
    details: "Harman yerinde tülbentler üzerinde Karadeniz güneşinde yavaşça kurutulmuş, nem oranı %5.5 altına düşürülmüş taze çiğ iç fındık.",
    nutritions: {
      energy: "620 kcal",
      fat: "58.5 g",
      protein: "14.8 g",
      carbs: "17.2 g",
      fiber: "9.2 g"
    },
    weights: [
      { label: "500g", price: 340.0, default: true },
      { label: "1 kg", price: 640.0 },
      { label: "5 kg Çuval", price: 2950.0 }
    ],
    priceHistory: [
      { date: "10 Ağustos 2024", price: 340.0, reason: "İlk Mahsul Satış Fiyatı" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4UcNb6SAWQaVzrh6ZGdDW7a6vpiN8DDFkjUk57h7PG411qZ31_IKVFC9HeCPgAg8WSiRE6aBcUK_OG1v_vtpdtoOcCTFcruuZ-LETny0fUjDHpcT8ryKka9iyXmkdG_6Czp3Xn7ln7lW-Nys-udHAOs5THqLvlp_1hs7H3DVPciwhh8f6ssDumVf-flbghQIDCaIKfhWzAGlIq3Y67fEqz_ELwSNd9mED-BWb3uVY2-bydIn5fYUrLw",
    active: true
  },
  {
    id: "yag-008",
    sku: "YAG-008",
    name: "Saf Soğuk Sıkım Fındık Yağı",
    category: "yag",
    categoryName: "Soğuk Sıkım Yağ",
    origin: "Keşap Çiftliği",
    altitude: "450m Rakım",
    lot: "LOT-2024-SS04",
    badge: "Soğuk Sıkım",
    badgeType: "surface-highest",
    tag: "E Vitamini Deposu",
    rating: 4.9,
    reviewsCount: 41,
    costPrice: 135.0,
    price: 290.0,
    oldPrice: 330.0,
    stock: 95,
    unit: "Adet",
    description: "Salatalar, mezeler ve gurme yemekler için 27°C altında preslenmiş, hafif aromalı şifalı yemeklik yağ.",
    details: "Yüksek yanma derecesi (221°C) ve olağanüstü E vitamini içeriğiyle Akdeniz ve Karadeniz mutfaklarının gözdesi olan soğuk pres saf fındık yağı.",
    nutritions: {
      energy: "884 kcal",
      fat: "100.0 g",
      protein: "0.0 g",
      carbs: "0.0 g",
      fiber: "0.0 g"
    },
    weights: [
      { label: "250 ml", price: 290.0, default: true },
      { label: "500 ml", price: 530.0 },
      { label: "1 Litre", price: 980.0 }
    ],
    priceHistory: [
      { date: "18 Ağustos 2024", price: 290.0, reason: "Yeni Sezon Soğuk Sıkım" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7wg03NoC-hQ3cJ_ghVqqg0JOPEZ4c2YbNCig4WxcO_l-wO-3HKiJ3Z9wXXsntPm1jLSwSgAVofrep7DCDOSAvFZFdD3DlJBpVBQ8iAjoIE4GVD-vyDHtZVrMqeBtF0SPDd64qQJzhmdqjcp2DQwRmlStm8_mlZuW5OPR0-Y8oiRkaI5WxeueeiL0oK7VjRKWWTLdM9yQyG6FUo9aOlRbAF5YHIHriBHddOKc9aMdKFQcJi_h5CZ8vvA",
    active: true
  },
  {
    id: "bal-019",
    sku: "BAL-019",
    name: "Karadeniz Yayla Çiçek Balı",
    category: "bal",
    categoryName: "Köy Balları",
    origin: "Kümbet Yaylası (1800m)",
    altitude: "1800m Rakım",
    lot: "LOT-2024-YB08",
    badge: "Yayla Balı",
    badgeType: "tertiary-container",
    tag: "Ham & Katkısız",
    rating: 4.9,
    reviewsCount: 56,
    costPrice: 220.0,
    price: 460.0,
    oldPrice: 520.0,
    stock: 64,
    unit: "Adet",
    description: "Isıl işlem görmemiş, yabani dağ kekiği ve orman çiçeklerinin florasından sağılmış saf ham bal.",
    details: "Kümbet ve Bektaş yaylalarının el değmemiş zirvelerinde kafkas arılarımız tarafından üretilmiştir. Polen analizi ve prolin değeri tescillidir.",
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
      { date: "05 Eylül 2024", price: 460.0, reason: "Yayla Hasadı Sağımı" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUAtXJmRgIHP5-tx0l_CZg98ITTVpSr87tqxlqSxe_sd5n4G6CNRZsrrpssX05tYljS1aJT3k1W28ewfd8wPKIueI3t2LQNMlewmB1jeVKfkomgrIaH_tf5fAAQn4GbuYhKBoyOeugOFBXRjcMN5mNYQkKF25oNnE2Z52GSOZVz-moRij1Fxn-x0pOUZgUmkZSSD-NxoRDBXfqJjxRrSkIPVopYFHNnu7D3zzN9TQZhPIzgc_cZiahZg",
    active: true
  },
  {
    id: "bal-027",
    sku: "BAL-027",
    name: "Organik Karadeniz Kestane Balı",
    category: "bal",
    categoryName: "Köy Balları",
    origin: "Dereli Dağ Köyü",
    altitude: "1100m Rakım",
    lot: "LOT-2024-KB03",
    badge: "Orman Balı",
    badgeType: "tertiary",
    tag: "Koyu Amber Şifalı",
    rating: 5.0,
    reviewsCount: 78,
    costPrice: 240.0,
    price: 490.0,
    oldPrice: 560.0,
    stock: 42,
    unit: "Adet",
    description: "Karadeniz kestane ormanlarının çiçeklerinden derlenen, yüksek antioksidan ve mineral değerli sertifikalı kestane balı.",
    details: "Boğazı tatlı bir acılıkla yakan hakiki kestane balı. Bağışıklık dostu fenolik bileşenler açısından zengindir.",
    nutritions: {
      energy: "310 kcal",
      fat: "0.0 g",
      protein: "0.4 g",
      carbs: "80.5 g",
      fiber: "0.0 g"
    },
    weights: [
      { label: "450g", price: 490.0, default: true },
      { label: "850g", price: 890.0 }
    ],
    priceHistory: [
      { date: "01 Eylül 2024", price: 490.0, reason: "Kestane Balı Sağımı" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDedlIzf8hz5UNgj7TyrODrRaqaqrMooHZL_wJWC5J0FvlHujVd3_ldAkMxGseuJgSznMIANzutmZtX2t_dDoQos4WLvU_xYOblPy4O1MgcbZVEvdRTlyq_prYaJrJPHuIvsq2e92LdzsUGrYktNBtUi5itYz9rqPFbVm3k4BoSVFXD4RC88i_7AlSbdQjphIisBF7GoDmsNX08ZRz1s__0NTs9OLvNrpjziv0u90D-0WtvEmc8mNWdpg",
    active: true
  },
  {
    id: "pek-005",
    sku: "PEK-005",
    name: "Köy Usulü Beyaz Dut Pekmezi",
    category: "pekmez",
    categoryName: "Köy Pekmezi",
    origin: "Şebinkarahisar Köyü",
    altitude: "1250m Rakım",
    lot: "LOT-2024-DP07",
    badge: "Kazan Kaynatması",
    badgeType: "surface-highest",
    tag: "Geleneksel Tarif",
    rating: 4.7,
    reviewsCount: 33,
    costPrice: 95.0,
    price: 210.0,
    oldPrice: 240.0,
    stock: 120,
    unit: "Adet",
    description: "Odun ateşinde bakır kazanlarda kaynatılmış, ilave şeker içermeyen yoğun kıvamlı geleneksel dut pekmezi.",
    details: "Yüksek demir ve kalsiyum deposu. Sabah kahvaltılarında veya tahinle birleştiğinde mükemmel bir doğal enerji kaynağı.",
    nutritions: {
      energy: "290 kcal",
      fat: "0.1 g",
      protein: "1.4 g",
      carbs: "70.5 g",
      fiber: "1.8 g"
    },
    weights: [
      { label: "400g", price: 210.0, default: true },
      { label: "800g", price: 380.0 }
    ],
    priceHistory: [
      { date: "20 Temmuz 2024", price: 210.0, reason: "Dut Pekmezi Kaynatımı" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7t0NPl6U9CAz2aDOLJy5Cy74j7j1Im60p67LlYYGMBQNTMV1777HEbqUQgk2vl0PgSHAfS37pncwRCEBLJxTIwMhDSQXKaB4CHbRnAXl4Si3nVh4URguWujK6ncpVhl3cLS3FqocAF_NzYOD--PRLvjavz2_HyQ2UhYgFM2gytz_9LEoDSyx9YVAEcDQHPftqG4VsE5hRps2trUpHgMaxW3qUMsuzI-fgsZR4FsM1hL-RlEK2qNEDPw",
    active: true
  },
  {
    id: "pak-001",
    sku: "PAK-001",
    name: "Vadiden Sofraya Gurme Tadım Paketi",
    category: "paket",
    categoryName: "Hediyelik Sandıklar",
    origin: "Giresun Keşap Çiftliği",
    altitude: "Özel Koleksiyon",
    lot: "LOT-2024-PK01",
    badge: "Haftanın Çiftlik Paketi",
    badgeType: "secondary",
    tag: "Avantajlı Fiyat",
    rating: 5.0,
    reviewsCount: 92,
    costPrice: 420.0,
    price: 849.0,
    oldPrice: 1040.0,
    stock: 50,
    unit: "Kutu",
    description: "500g Çifte Kavrulmuş Fındık + 320g Şekersiz Fındık Ezmesi + 250ml Soğuk Sıkım Fındık Yağı + Ahşap Muhafaza Sandığı.",
    details: "Çiftliğimizin en sevilen 3 ana lezzetini el yapımı ahşap sandık ve keten bez keselerle sevdiklerinize hediye edin.",
    nutritions: {
      energy: "Karma Paket",
      fat: "Doğal Yağlar",
      protein: "Yüksek",
      carbs: "Dengeli",
      fiber: "Bol Lifli"
    },
    weights: [
      { label: "Ahşap Sandık Set", price: 849.0, default: true }
    ],
    priceHistory: [
      { date: "01 Eylül 2024", price: 849.0, reason: "Özel Hasat İndirimi" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGmFjEcZqLw2F9u0ZCanL3cwuHaiAh6OqaqUw4sTRFh-v6CiAml2bNo1i_JfON1RAvtpB9fugLlFMTEZngBzUC8Hmc5Ogn9_O8Y458tQAvwI5WpcSmICnZRSxBEQTpFOm5zBrO7VUfQrN8MT7S0U2xiePBrJnOcguHopjDSjpaDxV7lAMTknVvXVV5jsO0gAjU_-un6E7tdvW4Xml_eTwaiHYuVlNa-dBEYW5Whwd8SfddubEGR11KnQ",
    active: true
  }
];

export const INITIAL_CART = [
  {
    productId: "fnd-092",
    sku: "FND-092",
    name: "Giresun Tomurcuk Çifte Kavrulmuş Fındık",
    weight: "1.000 gr",
    price: 640.0,
    quantity: 1,
    origin: "Keşap / Giresun",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWyrlavD5JBF9rKhgoelIR7Akz3xlzJ2kSRe32b9sMF4hUzIxypCgatDcoxH791VQTS0eEe20VA0yTrkPTUTJssbgn4no2tkwEErX_gZxukHH6eT79cm1HCajS-UQCsbyTi0EOIXfTNLA_VuCIlED6wfIiXKMckIq9Zx7XpMZMyLe2Y0B95ACNBYMsrMmP1rfWWFoI4TiBPvSLKc-WrBWj5v-twz4M7f3xpkAunFr57RsDhJekQh4flw"
  },
  {
    productId: "ezm-014",
    sku: "EZM-014",
    name: "Kremamsı Doğal Fındık Ezmesi",
    weight: "650 gr",
    price: 560.0,
    quantity: 1,
    origin: "Tirebolu / Taş Değirmen",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQBXKICbkb7VszXzYSzRZRrA1YiSKvmPRQ39nx3jR-l2ysHebJbp3ziLjOps4SWo8-tgiVXlV7sU2BuAVGH1XMYGWxjbZ9H91DoVFSgDA9VGz83WxLIlNKBDesFMMByzY1Dmywoq3qIHBjBVPa-TjAM4wDd6XpG2OR5HJ_qV_nSDb5oG8FvyB9s25TivXgziYDtXB5L3USyWugm7TyqTLh9BNj0CRNKuDWXR3lL-npUWaL5op1Tjt4DQ"
  },
  {
    productId: "bal-027",
    sku: "BAL-027",
    name: "Organik Karadeniz Kestane Balı",
    weight: "450 gr",
    price: 490.0,
    quantity: 1,
    origin: "Yüksek Rakım Orman",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDedlIzf8hz5UNgj7TyrODrRaqaqrMooHZL_wJWC5J0FvlHujVd3_ldAkMxGseuJgSznMIANzutmZtX2t_dDoQos4WLvU_xYOblPy4O1MgcbZVEvdRTlyq_prYaJrJPHuIvsq2e92LdzsUGrYktNBtUi5itYz9rqPFbVm3k4BoSVFXD4RC88i_7AlSbdQjphIisBF7GoDmsNX08ZRz1s__0NTs9OLvNrpjziv0u90D-0WtvEmc8mNWdpg"
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-9842",
    date: "27 Ekim 2026, 14:32",
    customerName: "Elif Çiftçi",
    email: "elif.ciftci@vadiposta.com",
    phone: "0532 890 44 21",
    city: "İstanbul",
    district: "Kadıköy",
    address: "Caferağa Mah. Sakızgülü Sok. No: 18 D: 4, Kadıköy / İstanbul",
    itemsSummary: "1x Fındık 1kg, 1x Ezme 650g, 1x Kestane Balı 450g",
    itemCount: 3,
    subtotal: 1690.0,
    shippingFee: 0,
    farmDiscount: 50.0,
    couponDiscount: 0,
    total: 1640.0,
    paymentMethod: "Kredi Kartı (3D Secure)",
    status: "Kargoya Verildi",
    trackingNo: "YK-78921849102-TR",
    lotMatch: "LOT-2024-KESAP-04",
    yield: "%53.8"
  },
  {
    id: "ORD-9839",
    date: "27 Ekim 2026, 11:15",
    customerName: "Ahmet Kaya",
    email: "ahmet.kaya@email.com",
    phone: "0544 321 98 76",
    city: "Ankara",
    district: "Çankaya",
    address: "Gaziosmanpaşa Mah. Arjantin Cad. No: 12/6",
    itemsSummary: "2x Çifte Kavrulmuş Fındık 500g, 1x Fındık Yağı 500ml",
    itemCount: 3,
    subtotal: 1260.0,
    shippingFee: 0,
    farmDiscount: 50.0,
    couponDiscount: 100.0,
    total: 1110.0,
    paymentMethod: "Havale / EFT",
    status: "Hazırlanıyor",
    trackingNo: "ARAS-612093418-TR",
    lotMatch: "LOT-2024-TD02",
    yield: "%54.2"
  },
  {
    id: "ORD-9831",
    date: "26 Ekim 2026, 18:40",
    customerName: "Zeynep Demir",
    email: "zeynep.demir@gmail.com",
    phone: "0555 789 12 34",
    city: "İzmir",
    district: "Karşıyaka",
    address: "Bostanlı Mah. Cemal Gürsel Cad. 142/B",
    itemsSummary: "1x Vadiden Sofraya Gurme Tadım Paketi",
    itemCount: 1,
    subtotal: 849.0,
    shippingFee: 0,
    farmDiscount: 50.0,
    couponDiscount: 0,
    total: 799.0,
    paymentMethod: "Kredi Kartı",
    status: "Teslim Edildi",
    trackingNo: "YK-45189201991-TR",
    lotMatch: "LOT-2024-PK01",
    yield: "%55.0"
  },
  {
    id: "ORD-9824",
    date: "26 Ekim 2026, 13:05",
    customerName: "Mehmet Öztürk",
    email: "mehmet.ozturk@firmamail.com",
    phone: "0533 111 22 33",
    city: "Bursa",
    district: "Nilüfer",
    address: "İhsaniye Mah. Barış Cad. No: 44",
    itemsSummary: "4x Doğal Fındık Ezmesi 320g, 2x Yayla Balı 450g",
    itemCount: 6,
    subtotal: 2060.0,
    shippingFee: 0,
    farmDiscount: 50.0,
    couponDiscount: 200.0,
    total: 1810.0,
    paymentMethod: "Kapıda Ödeme",
    status: "Teslim Edildi",
    trackingNo: "SURAT-891048123-TR",
    lotMatch: "LOT-2024-YB08",
    yield: "%54.0"
  }
];

export const VALID_COUPONS = {
  HASAT2024: { code: "HASAT2024", discountPercent: 15, label: "%15 Yeni Hasat İndirimi" },
  FINDIK10: { code: "FINDIK10", discountPercent: 10, label: "%10 Köy Dayanışma İndirimi" },
  GURME75: { code: "GURME75", discountFixed: 75, label: "75 ₺ Gurme Sepet İndirimi" }
};

export const SAVED_ADDRESSES = [
  {
    id: "addr-1",
    title: "Ev Adresim (Moda)",
    name: "Elif Çiftçi",
    phone: "532 890 44 21",
    city: "İstanbul",
    district: "Kadıköy / Moda Mah.",
    address: "Caferağa Mah. Sakızgülü Sok. No: 18 Daire: 4, Kadıköy",
    notes: "Zile basmayın lütfen, kapıya asınız."
  },
  {
    id: "addr-2",
    title: "Yazlık & Köy Evi",
    name: "Elif Çiftçi",
    phone: "532 890 44 21",
    city: "Giresun",
    district: "Keşap / Fındıklı Köyü",
    address: "Fındıklı Köyü Yukarı Mevkii No: 24, Keşap / Giresun",
    notes: "Köy muhtarlığı yanı."
  },
  {
    id: "addr-3",
    title: "Ofis / İşyeri",
    name: "Elif Çiftçi",
    phone: "532 890 44 21",
    city: "İstanbul",
    district: "Şişli / Levent",
    address: "Büyükdere Cad. No: 195 K: 8, Levent / Şişli",
    notes: "Hafta içi 09:00 - 18:00 arası danışmaya teslim."
  }
];

export const ANALYTICS_PERIOD_DATA = {
  today: {
    revenue: 8450,
    ordersCount: 14,
    avgOrder: 603,
    labels: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"],
    revenueData: [680, 1420, 1950, 2800, 4200, 6400, 8450],
    maxVal: 10000,
    growthText: "+%12.4 dünden bugüne"
  },
  "7days": {
    revenue: 38900,
    ordersCount: 68,
    avgOrder: 572,
    labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    revenueData: [18400, 24200, 21800, 29600, 34500, 42100, 38900],
    maxVal: 50000,
    growthText: "+%15.2 geçen haftaya göre"
  },
  month: {
    revenue: 142300,
    ordersCount: 240,
    avgOrder: 592,
    labels: ["1. Hafta", "2. Hafta", "3. Hafta", "4. Hafta"],
    revenueData: [31200, 38500, 42100, 30500],
    maxVal: 50000,
    growthText: "+%21.0 geçen aya göre"
  },
  year: {
    revenue: 940000,
    ordersCount: 1580,
    avgOrder: 594,
    labels: ["Oca", "Mar", "May", "Tem", "Ağu", "Eki"],
    revenueData: [45000, 62000, 78000, 110000, 184500, 142300],
    maxVal: 200000,
    growthText: "+%34.5 geçen yıla göre"
  },
  season2024: {
    revenue: 184520,
    ordersCount: 312,
    avgOrder: 591,
    labels: ["Ağustos (Hasat)", "Eylül (Kavurma)", "Ekim (Güncel)"],
    revenueData: [58200, 71400, 54920],
    maxVal: 80000,
    growthText: "+%18.4 2023 sezonuna göre"
  }
};
