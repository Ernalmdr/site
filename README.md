# 🌰 Tüccarım — Organik Çiftlik & E-Ticaret Platformu

Giresun Keşap Vadisi asırlık ocaklarından sofralara uzanan, **Quiet Luxury Agronomy** (Sessiz Lüks Tarım) tasarım anlayışıyla geliştirilmiş reaktif ve modern Tek Sayfa Uygulaması (SPA).

---

## 🎨 Tasarım Sistemi & Özellikler

- **Marka:** Tüccarım — Organik Çiftlik (Menşei: Giresun Keşap Vadisi, Parsel 04 • 480m Rakım)
- **Tipografi:** Plus Jakarta Sans (Bütünsel, modern ve okunaklı zanaat tipografisi)
- **Renk Paleti:**
  - `Primary:` `#000000` (Obsidyen & Kömür)
  - `Secondary:` `#855232` (Kavrulmuş Fındık & Bronz Toprak)
  - `Surface:` `#fbf9f6` (Alabaster & Sıcak Keten)
  - `Outline:` `#80756f` / `#d1c4bd` (Hafif mimari çizgiler)

---

## 📱 5 Entegre Ekran (SPA Görünümleri)

1. **Mahsuller & Vitrin (`#katalog`):**
   - 2024 hasadı öne çıkan mahsulleri (Çifte Kavrulmuş, Taş Değirmen Ezme, Çiğ Fındık, Soğuk Sıkım Yağ, Yayla Balı, Fındık Unu, Gurme Sandık).
   - Kategori filtreleme (`all`, `nut`, `butter`, `oil`, `honey`), canlı arama, fiyata göre sıralama, gramaj seçimi ve hızlı sepete ekleme.
   - Hızlı inceleme modalı, aflatoksin analiz raporu ve favorilere ekleme.
2. **Sepet & Kasa (`#sepet`):**
   - 3 adımlı sipariş süreci (1. Sepet & Adres, 2. Ödeme Onayı, 3. Paketleme).
   - Kayıtlı adreslerden otomatik doldurma, özel çiftlik & hediye notu.
   - Ücretsiz kargo eşiği (500 ₺ üzeri kargo bedava ve -45 ₺ çiftçi desteği indirimi).
   - 3 ödeme yöntemi: Kredi Kartı (256-Bit SSL), Havale / EFT (%5 Nakit İndirimi), Kapıda Ödeme (+20 ₺).
3. **Satış & Operasyon Analitiği (`#admin-analitik`):**
   - Sol yönetici menüsü, Kemal Yılmaz kurucu profili.
   - 4 Bento KPI kartı: Brüt Hasılat, Lojistik Akış, Ortalama Sepet, İade Oranı.
   - Zaman periyodu filtreleri (Bugün, Son 7 Gün, Bu Ay, 2024 Hasadı).
   - HTML5 Canvas dinamik gelir eğrisi grafiği ve kategori dağılım çubukları.
   - En çok satan mahsuller tablosu ve canlı sipariş hareketleri (durum değiştirme ve CSV rapor indirme).
4. **Mahsul & Fiyat Yönetimi (`#admin-stok`):**
   - Toplam Çeşit, Aktif Satışta Olanlar, Kritik Stok ve Tükenenler sayaçları.
   - Dinamik stok arama ve kategori filtreleme.
   - Aktif/Pasif satış anahtarı, anlık kâr marjı hesaplama (% margin), fiyat geçmişi modalı.
   - Yeni Mahsul Ekle / Düzenle çekmecesi (Drawer) ve Toplu Fiyat Güncelleme modalı.
5. **Hasat Hikayemiz (`#ciftlik-hikayesi`):**
   - 3 kuşaklık Keşap mirası, el hasadı, güneşte kurutma ve laboratuvar aflatoksin güvencesi.

---

## 🚀 Çalıştırma & Dağıtım

### Yerel Geliştirme (Local):
```powershell
npm start
```
Tarayıcınızda: `http://localhost:3000`

### Vercel / Netlify Dağıtımı:
Proje `vercel.json` ve `netlify.toml` dosyalarıyla saf statik SPA olarak yapılandırılmıştır. GitHub deponuza (`Ernalmdr/site`) pushlandığı anda Vercel tarafından otomatik derlenir ve yayına alınır.

- **Canlı Adres:** https://tuccarim.vercel.app/
