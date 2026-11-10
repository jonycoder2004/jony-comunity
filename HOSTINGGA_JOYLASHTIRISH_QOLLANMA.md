# 🚀 Jony Comunity — Saytni Hostingga Joylashtirish Bo'yicha To'liq Qo'llanma

Tabriklaymiz! Saytingiz barcha xavfsizlik, Anti-DDoS, SEO va boshqaruv tizimlari bilan to'liq **hostingga yuklashga 100% tayyor holatga keltirildi**.

---

## 📁 `jony production` Papkasidagi Fayllar:
- **`index.html`** — Asosiy veb-sayt sahifasi.
- **`admin.html`** — Boshqaruv paneli (Parol bilan himoyalangan).
- **`css/styles.css`** — 4 xil rangdagi dizayn va animatsiyalar.
- **`js/app.js`** — Interaktiv kalkulyator, forma, dinamik matnlar va Anti-DDoS himoya skripti.
- **`.htaccess`** — Apache/cPanel serverlari uchun Anti-DDoS, SSL va kesh sozlamalari.
- **`robots.txt`** va **`sitemap.xml`** — Google va Yandex qidiruv tizimlari uchun.

---

## 🔑 1. Admin Panelga Kirish Ma'lumotlari:
- **Admin Panelga kirish usuli:** Asosiy saytning eng pastki qismida (Footerda) **`🔐 Admin Panelga Kirish`** tugmasi joylashgan.
- **Standart maxfiy kod (PIN):** `88888888` (8 ta 8)
- **Bruteforce himoyasi:** Agar kimdir 3 marta ketma-ket xato kod kiritsa, tizim uni avtomatik 1 daqiqaga qulflaydi.
- **Kodni o'zgartirish:** Admin panelga kirgach, birinchi bo'limdanoq yangi xohlagan parolingizni belgilashingiz mumkin.
- **Brend nomini o'zgartirish:** Admin paneldagi **Sayt Brend Nomi** maydonidan istalgan matnni yozishingiz mumkin (standart: `Jony Comunity`).

---

## 🌐 2. Hostingga Joylash Usullari:

### A) Oddiy Web Hosting (cPanel / Beget / Reg.ru / Eskiz):
1. Hosting boshqaruv paneliga kiring (`cPanel` yoki `File Manager`).
2. `public_html` (yoki domeningizga tegishli papkaga) kiring.
3. `jony production` papkasidagi **barcha fayllarni** (ichidagi `index.html`, `admin.html`, `css`, `js`, `.htaccess` va h.k.) to'g'ridan-to'g'ri `public_html` ichiga yuklang (Upload).
4. Bo'ldi! Saytingiz `https://sizning-domeningiz.uz` manzilida ishlay boshlaydi.

### B) Bepul Zamonaviy Hosting (Vercel yoki Netlify):
1. [vercel.com](https://vercel.com) yoki [netlify.com](https://netlify.com) saytiga kiring.
2. `jony production` papkasini brauzer orqali sudrab tashlang (Drag & Drop).
3. 30 soniya ichida saytingiz bepul yuqori tezlikdagi SSL sertifikati bilan global serverlarda ishga tushadi.

---

## 🛡️ 3. Xavfsizlik va Anti-DDoS Tizimlari:
- **Honeypot Trap:** Avtomatik spam botlarni aniqlaydi va filtrlaydi.
- **Client-Side Rate Limiter:** Formaga bir vaqtning o'zida ko'p sonli so'rovlar tashlashni cheklaydi.
- **Server-Level Protection (.htaccess):** Shubhali skanerlarni (sqlmap, nikto, botnetlar) hosting darajasida bloklaydi.
- **Maksimal tavsiya:** Domenni ulagandan so'ng bepul **Cloudflare (Under Attack mode)** xizmatiga ulab qo'ysangiz, millionlab DDoS hujumlaridan 100% himoyalangan bo'lasiz.
