# LibFlow - Kitob Boshqaruv Tizimi (Book Management System)

Zamonaviy kutubxona va kitoblarni boshqarish platformasi. Spring Boot (Java 21) backend va React (TypeScript + Vite + Tailwind CSS) client qismidan iborat.

---

## 🚀 Texnologiyalar

- **Backend**: Java 21, Spring Boot 4 / Spring Framework 7, Spring Data JPA, Spring Security, JWT, Dotenv
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Axios, React Hook Form, Zod
- **Ma'lumotlar bazasi**: Neon PostgreSQL (Production), H2 Database (In-Memory testlar uchun)
- **Deployment & Konteyner**: Docker, Docker Compose, Nginx, Render (render.yaml Blueprint)

---

## 🛠️ Sozlash va Ishga tushirish

### 1. Ma'lumotlar bazasi (Neon PostgreSQL)
Loyihada production va cloud muhiti uchun **Neon PostgreSQL** ma'lumotlar bazasi sozlangan:
- **Host**: `ep-square-feather-b4z5xe0q-pooler.c-6.us-east-2.aws.neon.tech`
- **Database**: `neondb`
- **Username**: `neondb_owner`
- **Password**: `npg_p4aI2JwcHNrz`
- **JDBC URL**: `jdbc:postgresql://ep-square-feather-b4z5xe0q-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require`

### 2. Backendni ishga tushirish
`library/.env` fayli tayyorlangan. Backendni ishga tushirish:
```bash
cd library
./gradlew bootRun
```
Backend standart holatda `http://localhost:8080/api/v1` da ishga tushadi.

### 3. Backend testlarini ishga tushirish
Backend uchun unit testlar va integratsiya (MockMvc) testlari yozilgan (42 ta test):
```bash
cd library
./gradlew test
```
*Eslatma: Testlar H2 in-memory bazasida mustaqil va tez ishlaydi.*

### 4. Frontendni ishga tushirish
```bash
cd client
npm install
npm run dev
```
Frontend `http://localhost:5173` da ishga tushadi.

---

## ☁️ Render Deployment (render.yaml)

Loyiha Render platformasiga deployment uchun to'liq tayyorlangan:
- `render.yaml` faylidan foydalanib, Render Dashboard orqali **"Blueprints"** bo'limida bitta tugma bilan backend (Web Service Docker) va frontend (Static Site) ni birgalikda deploy qilishingiz mumkin.
- Lokal diskka fayl saqlash olib tashlangan va rasmlar URL orqali boshqariladi. Bu Renderdagi ephemeral containerlarda ma'lumotlar yo'qolishining oldini oladi.

---

## 🐳 Docker orqali ishga tushirish

Loyiha ildizida:
```bash
docker compose up --build
```
- Backend: `http://localhost:8080/api/v1`
- Frontend: `http://localhost:3000`
