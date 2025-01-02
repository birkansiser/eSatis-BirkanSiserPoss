# 🛒️ E-Satış Projesi  

Modern bir e-ticaret platformu, MERN (MongoDB, Express.js, React.js, Node.js) stack kullanılarak geliştirilmiştir.  

## 🚀 Teknolojiler  

### Frontend  
- **React.js 18**  
- **Material-UI (MUI)**  
- **Redux Toolkit**  
- **React Query**  
- **Axios**  

### Backend  
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **JWT Authentication**  

## 💻 Kurulum  

### Gereksinimler  
- **Node.js** (v14 ve üzeri)  
- **MongoDB**  
- **npm** veya **yarn**  

### Kurulum Adımları  

1. **Projeyi Klonlayın**  
```bash  
git clone https://github.com/birkansiser/eSatis.git  
cd eSatis  
```  

2. **Backend Kurulumu**  
```bash  
cd backend  
npm install  
```  

3. **.env Dosyasını Düzenleyin**  
`.env` dosyası aşağıdaki gibi olmalıdır:  
```env  
PORT=5000
MONGODB_URI=mongodb<URL>
JWT_SECRET=pcb-tasarim-jwt-secret-2024
IYZICO_API_KEY=<api.key>
IYZICO_SECRET_KEY=<secret.key>
IYZICO_URI=<url>
EMAIL_USER=admin@example.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=admin@example.com 
```  

4. **Frontend Kurulumu**  
```bash  
cd eSatis  
npm install  
```  

5. **Uygulamayı Başlatın**  

Frontend için:  
```bash  
cd eSatis  
npm run dev  
```  

Backend için:  
```bash  
cd backend  
npm start  
```  

## 📦 Özellikler  

- ✨ Modern ve responsive tasarım  
- 🛒 Sepet yönetimi  
- 👤 Kullanıcı doğrulama sistemi  
- 🔐 Admin paneli  
- 💳 Ödeme entegrasyonu  
- 📦 Sipariş takibi  

## 🔑 Admin Paneli  

- **URL:** `/admin`  
- **Email:** `admin@example.com`  
- **Şifre:** `admin123`  

## 🌐 API Endpoints  

### Authentication  
- `POST /api/auth/register` - Kayıt ol  
- `POST /api/auth/login` - Giriş yap  

### Siparişler  
- `POST /api/orders` - Sipariş oluştur  
- `GET /api/orders` - Sipariş listesini al  
- `GET /api/orders/:id` - Sipariş detayını al  

## 🤝 Katkıda Bulunma  

1. Projeyi **fork** edin  
2. Yeni bir **branch** oluşturun (`git checkout -b feature/ozellik`)  
3. Yaptığınız değişiklikleri **commit** edin (`git commit -m 'Yeni özellik eklendi'`)  
4. **Push** edin (`git push origin feature/ozellik`)  
5. Pull Request gönderin  

## 🖍 Lisans  

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.  

## 📧 İletişim  

Proje Sahibi - [@birkansiser](https://github.com/birkansiser)  
