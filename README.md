# هدايا وجمال - Hadaya Wa Gamal App

تطبيق جوال متكامل لمتجر التحف والهدايا مع نظام كامل للمنتجات، الطلبات، والدردشة الفورية.

## المميزات الرئيسية

✅ **نظام المصادقة الآمن**
- تسجيل دخول وتسجيل حساب
- المصادقة الثنائية (2FA)
- تشفير كلمات المرور

✅ **إدارة المنتجات**
- إضافة وتعديل وحذف المنتجات
- رفع صور وفيديوهات
- عرض شبكة منتجات جميلة

✅ **نظام الطلبات**
- سلة التسوق
- إنشاء الطلبات
- تتبع حالة الطلب
- إشعارات فورية للتاجر

✅ **الدردشة الفورية**
- محادثات حقيقية
- ربط مباشر مع WhatsApp
- Real-time Messaging

✅ **التصميم والواجهة**
- ألوان أزرق هادئة (#1A5276)
- تصميم بسيط وسهل الاستخدام
- شريط تنقل سفلي

## متطلبات التشغيل

### للجهاز
- Node.js 14+
- npm أو yarn
- Expo CLI
- Firebase Account

### حسابات خارجية مطلوبة
- Firebase Project
- حساب Gmail لإرسال رسائل التحقق
- حساب Render أو Heroku للنشر

## البنية الكاملة

```
hadaya-gamal/
├── mobile/                    # تطبيق React Native
│   ├── src/
│   │   ├── screens/          # جميع الشاشات
│   │   ├── components/       # المكونات المشتركة
│   │   ├── services/         # الخدمات (API, Firebase)
│   │   ├── context/          # إدارة الحالة
│   │   ├── navigation/       # التنقل بين الشاشات
│   │   └── utils/            # الأدوات المساعدة
│   ├── app.json              # إعدادات Expo
│   └── package.json
│
├── backend/                   # Node.js + Express
│   ├── controllers/           # معالجات العمليات
│   ├── routes/                # نقاط النهاية (APIs)
│   ├── middleware/            # البرامج الوسيطة
│   ├── config/                # الإعدادات
│   ├── server.js              # الملف الرئيسي
│   └── package.json
│
└── README.md
```

## الشاشات المتاحة

### شاشات المصادقة
1. **LoginScreen** - تسجيل الدخول
2. **RegisterScreen** - إنشاء حساب جديد
3. **TwoFactorScreen** - التحقق من البريد الإلكتروني

### الشاشات الرئيسية
1. **HomeScreen** - الصفحة الرئيسية مع آخر المنتجات
2. **ProductsScreen** - جميع المنتجات مع الفلترة
3. **ProductDetailScreen** - تفاصيل المنتج
4. **CartScreen** - سلة التسوق
5. **ChatsScreen** - قائمة المحادثات
6. **ChatDetailScreen** - محادثة مفصلة مع خيار WhatsApp
7. **ProfileScreen** - الملف الشخصي والإعدادات

## الخطوات الكاملة للتشغيل

### 1️⃣ إعداد Firebase

```bash
# زيارة https://firebase.google.com
# إنشاء مشروع جديد
# تفعيل:
# - Authentication (Email/Password)
# - Firestore Database
# - Storage
# - Cloud Messaging

# نسخ بيانات المشروع من Project Settings
```

### 2️⃣ إعداد المشروع المحلي

```bash
# استنساخ المستودع
git clone https://github.com/sameermoon2020-sudo/hadaya-gamal.git
cd hadaya-gamal

# إعداد Backend
cd backend
npm install
cp .env.example .env

# ملء متغيرات .env
# FIREBASE_PROJECT_ID=your-id
# FIREBASE_PRIVATE_KEY=your-key
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASSWORD=your-app-password
# JWT_SECRET=your-secret

# تشغيل Backend
npm run dev
# سيعمل على http://localhost:5000

# في Terminal جديد - إعداد Mobile
cd ../mobile
npm install
cp .env.example .env

# ملء متغيرات .env
# FIREBASE_API_KEY=your-key
# FIREBASE_PROJECT_ID=your-id
# API_URL=http://localhost:5000/api
```

### 3️⃣ تشغيل التطبيق على الهاتف الحقيقي

```bash
# تنزيل تطبيق Expo Go من App Store أو Google Play

# في مجلد mobile
npm start

# سيظهر QR Code
# اقرأه من Expo Go على هاتفك

# للتشغيل المباشر على iOS
npm run ios

# أو على Android
npm run android
```

### 4️⃣ النشر على السحابة

#### نشر Backend على Render

```bash
# 1. زيارة https://render.com
# 2. Sign up وتسجيل الدخول
# 3. New > Web Service
# 4. ربط GitHub repository
# 5. الإعدادات:
#    - Name: hadaya-gamal-backend
#    - Runtime: Node
#    - Build Command: npm install
#    - Start Command: npm start
#    - Environment Variables: أضف متغيرات .env
# 6. Create Web Service
```

#### نشر Mobile على Expo

```bash
# في مجلد mobile

# تسجيل الدخول إلى Expo
expо login

# بناء التطبيق
expó build --platform ios
expó build --platform android

# أو استخدام EAS (الطريقة الحديثة)
eas build --platform ios
eas build --platform android

# نشر على متاجر التطبيقات
# اتبع التعليمات على https://docs.expo.dev/eas/
```

## API Endpoints (نقاط النهاية)

### المصادقة
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/send-verification
POST /api/auth/verify-2fa
GET  /api/auth/profile (Protected)
PUT  /api/auth/profile (Protected)
POST /api/auth/change-password (Protected)
```

### المنتجات
```
GET  /api/products
GET  /api/products/:id
POST /api/products (Protected)
PUT  /api/products/:id (Protected)
DELETE /api/products/:id (Protected)
POST /api/products/:id/upload-image (Protected)
POST /api/products/:id/upload-video (Protected)
```

### الطلبات
```
POST /api/orders (Protected)
GET  /api/orders (Protected)
GET  /api/orders/:id (Protected)
PUT  /api/orders/:id (Protected)
DELETE /api/orders/:id (Protected)
```

### الدردشة
```
GET  /api/chat (Protected)
GET  /api/chat/:chatId (Protected)
POST /api/chat/:chatId/messages (Protected)
POST /api/chat (Protected)
```

### الإشعارات
```
POST /api/notifications/register-device (Protected)
POST /api/notifications/send (Protected)
GET  /api/notifications (Protected)
```

## الألوان المستخدمة

```javascript
{
  primary: '#1A5276',        // الأزرق الأساسي
  primaryLight: '#2980B9',   // الأزرق الفاتح
  background: '#FFFFFF',     // الخلفية البيضاء
  text: '#2C3E50',           // النص الرئيسي
  textLight: '#7F8C8D',      // النص الخفيف
  border: '#ECF0F1',         // الحدود
  success: '#27AE60',        // النجاح
  danger: '#E74C3C',         // الخطر
  warning: '#F39C12',        // التحذير
  card: '#ECEFF1',           // خلفية البطاقات
}
```

## مثال على الاستخدام

### التسجيل
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Secure123!@#",
    "name": "محمد",
    "phone": "201001234567",
    "uid": "firebase-uid"
  }'
```

### إنشاء منتج
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "هدية فاخرة",
    "description": "هدية جميلة وفاخرة",
    "price": 99.99,
    "category": "gifts"
  }'
```

## استكشاف الأخطاء

### المشكلة: Token invalid
**الحل:** تأكد من صحة JWT_SECRET في .env

### المشكلة: Firebase connection failed
**الحل:** تحقق من بيانات Firebase وصحة المفاتيح

### المشكلة: CORS errors
**الحل:** تأكد أن CORS مفعل في server.js

### المشكلة: Email not sending
**الحل:** استخدم App Password من Gmail وليس كلمة المرور العادية

## التوثيق الإضافي

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Documentation](https://reactnative.dev)
- [Express.js Documentation](https://expressjs.com)
- [Expo Documentation](https://docs.expo.dev)

## الدعم والمساعدة

للمساعدة والدعم، يرجى فتح Issue على GitHub أو التواصل عبر البريد الإلكتروني.

## الترخيص

هذا المشروع مرخص تحت MIT License.

---

**تم إنشاء التطبيق بواسطة GitHub Copilot**
**آخر تحديث:** 2026-09-02
