# 🌱 Fındık Vadisi & Doğal Çiftlik E-Ticaret Platformu

Karadeniz'in kalbinden, Giresun Keşap Vadisi'nin asırlık taş değirmen zanaatıyla üretilen tescilli fındık ve doğal köy mahsullerini tüketiciyle buluşturan ve işletme süreçlerini tek merkezden yöneten **entegre, reaktif ve modern e-ticaret platformu**.

Bu proje, Stitch tasarım sistemini ve **Artisan Harvest** tasarım dilini (Epilogue ve Plus Jakarta Sans tipografisi, sıcak toprak tonları, meşe odunu kavurma renk paleti) tam fonksiyonel bir web uygulamasına dönüştürür.

---

## 🚀 Hızlı Başlangıç

Projeyi çalıştırmak için hiçbir harici kütüphane veya ağır kurulum gerekmez (sıfır bağımlılık):

### Yöntem 1: Yerel HTTP Sunucusu ile (Önerilen)
```bash
# Proje dizininde:
npm start
# veya
node server.js
```
Tarayıcınızda otomatik olarak açılır: **`http://localhost:3000`**

### Yöntem 2: Doğrudan Tarayıcıda Açma
`index.html` dosyasını çift tıklayarak herhangi bir modern tarayıcıda doğrudan açabilirsiniz.

---

## 🌟 Öne Çıkan Özellikler ve Modüller

### 1. 🛒 Müşteri Vitrini & Mahsul Kataloğu (`#katalog`)
* **Kategori Filtreleme:** Çifte Kavrulmuş Fındık, Çiğ Tombul, Şekersiz Taş Değirmen Ezmesi, Soğuk Sıkım Fındık Yağı, Yayla & Kestane Balı, Köy Pekmezi ve Gurme Paketler.
* **Gramaj & Fiyat Senkronizasyonu:** Her ürün kartında gramaj seçimi (`250g`, `500g`, `1kg`, vb.) yapıldığında fiyat etiketi anında ve dinamik olarak yeniden hesaplanır.
* **Canlı Arama ve Sıralama:** Başlıkta veya katalogda yazılan arama terimine göre anında filtreleme; fiyata göre artan/azalan ve popülerlik sıralaması.
* **Hızlı İncele (Quick View Modal):** Ürünün yüksek çözünürlüklü görseli, besin değerleri (Kalori, Yağ, Protein), parti (lot) numarası, rakım bilgisi ve doğrudan sepete ekleme.
* **Haftanın Çiftlik Paketi:** Tek tıkla "Vadiden Sofraya Gurme Tadım Paketi"ni sepete ekleme.
* **Hasat İzlenebilirliği & Laboratuvar Raporu:** Coğrafi işaretli Keşap fındığı için TÜBİTAK/ISO analiz raporu sorgulama penceresi.

### 2. 🧺 Sepet & Güvenli Ödeme (`#sepet`)
* **Reaktif Alışveriş Sepeti:** Miktar artırma/azaltma, sepetten ürün silme, anlık ara toplam ve adet sayacı.
* **Ücretsiz Kargo İlerleme Çubuğu:** 500 ₺ limitine göre kalan tutarı veya kazanılan kargo hakkını canlı gösteren interaktif bar.
* **Kupon & İndirim Motoru:**
  * `HASAT2024` → %15 Yeni Hasat İndirimi
  * `FINDIK10` → %10 Köy Dayanışma İndirimi
  * `GURME75` → 75 ₺ Sabit İndirim
* **Ahşap Hediye Sandığı Seçeneği:** +35 ₺ opsiyonel ahşap koruma sandığı ve not ekleme.
* **Teslimat & Kargo Tercihi:** Çiftlik Doğrudan Kargo (Ücretsiz) veya Aynı Gün Ekspres Kargo (+45 ₺).
* **3 Farklı Ödeme Yöntemi:**
  * **Kredi / Banka Kartı:** Canlı kart numarası formatlayıcı (4 hanede bir boşluk), kart markası simgesi, son kullanma ve CVV güvenlik kontrolleri.
  * **Havale / EFT:** Tek tıkla panoya kopyalanabilir Ziraat Bankası IBAN ve %5 ek indirim avantajı.
  * **Kapıda Ödeme:** Kurye kapıya geldiğinde nakit veya temassız POS ile ödeme.
* **Sipariş Oluşturma:** Siparişi Tamamla dendiğinde otomatik **Sipariş Takip Kodu** (`YK-XXXXXXXXX-TR`) ve Benzersiz Sipariş ID üretilir, stoktan düşülür ve sipariş anında Yönetici Paneline iletilir.

### 3. 📊 Satış & Analitik Paneli (`#admin-analitik`)
* **Dinamik KPI Kartları:** Toplam Ciro, Toplam Sipariş Adedi, Ortalama Sepet Tutarı ve Taş Değirmen Kapasite Kullanımı.
* **Zaman Filtreleri:** Bugün, Son 7 Gün, Bu Ay, Bu Yıl ve Hasat 2024 seçeneklerine göre anlık veri tazeleme.
* **HTML5 Canvas Trend Grafiği:** Günlük ciro ve kargo hacmini gösteren çift eksenli yumuşak eğri grafiği.
* **Canlı Sipariş Takip Tablosu:**
  * Müşterinin verdiği son siparişler burada anında listelenir.
  * Sipariş durumu (Hazırlanıyor → Kargoya Verildi → Teslim Edildi) tek tıkla güncellenir ve müşteriye yansır.
  * **İrsaliye ve Sipariş Detayı Modalı:** Müşteri adresi, telefon, parti kodu ve resmi irsaliye yazdırma (`window.print()`).
* **Excel (CSV) Dışa Aktarım:** Tek tıkla tüm sipariş listesini `.csv` tablosu olarak bilgisayara indirme.

### 4. 📦 Fiyat & Stok Yönetimi (`#admin-stok`)
* **Hızlı Fiyat Güncelleme (Inline Edit):** Tablodaki herhangi bir ürünün fiyatını değiştirip enter'a bastığınızda, **müşteri vitrinindeki fiyat anında güncellenir!**
* **Stok Seviyesi Görselleştirmesi:** 500 adet üzerinden doluluk çubuğu; 50 adedin altına inen mahsullerde kırmızı "Kritik Stok" alarmı.
* **Toplu Fiyat Güncelleme Modalı:** Seçili kategoriye veya tüm ürünlere tek seferde yüzdesel (%10, %15) veya sabit (₺50) fiyat artışı/indirimi uygulama.
* **+ Yeni Ürün Ekleme Çekmecesi (Slide-Over Drawer):** Çiftliğin yeni mahsulünü kategori, lot numarası, maliyet, fiyat ve stok bilgileriyle sisteme ekleme; kaydedildiği an vitrinde canlıya çıkar.

### 5. 📜 Çiftlik Mirası & Hikayesi (`#ciftlik-hikayesi`)
* Giresun Keşap Vadisi'nin 3 kuşaklık üretim mirası, granit taş değirmen zanaatı, kimyasalsız üretim ilkeleri ve uluslararası kalite sertifikaları (Coğrafi İşaret, İTU, ISO 22000, Organik Tarım No: 28-341).

---

## 🎨 Tasarım Sistemi & Kimlik (Artisan Harvest)

| Öğe | Değer | Açıklama |
| :--- | :--- | :--- |
| **Ana Başlık Fontu** | `Epilogue` | Zanaatkarlık ve güçlü tipografik karakter |
| **Gövde & Veri Fontu** | `Plus Jakarta Sans` | Tablolar, fiyatlar ve veri netliği |
| **Primary Renk** | `#553722` / `#6F4E37` | Kavrulmuş Giresun Fındığı ve kabuk tonu |
| **Secondary Renk** | `#3C6843` / `#2E5A36` | Karadeniz fındık yaprağı ve organik yeşil |
| **Tertiary Renk** | `#613200` / `#D97706` | Ham orman ve yayla balı kehribarı |
| **Canvas / Zemin** | `#FFF8F5` | Sıcak süt ve doğal un parşömeni |

---

## 📁 Proje Dizin Yapısı

```
stitch_organik_r_n_e_ticaret_platformu/
├── index.html                   # Ana tek sayfa uygulama (SPA)
├── server.js                    # Sıfır bağımlılıklı yerel HTTP sunucusu
├── package.json                 # Proje bilgisi ve npm komutları
├── js/
│   ├── data.js                  # Başlangıç ürünleri, sepet ve sipariş verileri
│   ├── store.js                 # LocalStorage & Reaktif Event Bus motoru
│   └── app.js                   # Yönlendirme, görünüm kontrolcüleri ve etkileşimler
├── stitch_organik_r_n_e_ticaret_platformu/  # Orijinal Stitch tasarım kaynakları
│   ├── artisan_harvest/DESIGN.md
│   ├── organik_r_nler_f_nd_k_katalo_u/
│   ├── sepet_g_venli_deme/
│   ├── r_n_fiyat_y_netimi_i_letme_paneli/
│   └── sat_i_statistikleri_analitik_paneli/
└── README.md                    # Proje dokümantasyonu
```

---

© 2026 Fındık Vadisi Doğal Çiftlik İşletmesi.
