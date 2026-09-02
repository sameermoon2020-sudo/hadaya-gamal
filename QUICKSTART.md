# Hadaya Wa Gamal - Gift & Beauty Store Mobile App

## Quick Start Guide - دليل البدء السريع

### المتطلبات
- Node.js 14+
- Firebase Account
- Expo CLI (`npm install -g expo-cli`)
- Expo Go App (على الهاتف الذكي)

### الخطوات السريعة

#### 1. تحضير Firebase
```bash
# 1. اذهب إلى firebase.google.com
# 2. أنشئ مشروع جديد
# 3. فعّل Authentication و Firestore و Storage
# 4. انسخ بيانات المشروع
```

#### 2. تشغيل Backend
```bash
cd backend
npm install

# أنشئ ملف .env
cat > .env << 'EOF'
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your-id
FIREBASE_PRIVATE_KEY=your-key
FIREBASE_CLIENT_EMAIL=your-email
JWT_SECRET=your-secret
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
EOF

npm run dev
# سيعمل على http://localhost:5000
```

#### 3. تشغيل Mobile App
```bash
cd mobile
npm install

# أنشئ ملف .env
cat > .env << 'EOF'
FIREBASE_API_KEY=your-key
FIREBASE_AUTH_DOMAIN=your-domain
FIREBASE_PROJECT_ID=your-id
FIREBASE_STORAGE_BUCKET=your-bucket
FIREBASE_MESSAGING_SENDER_ID=your-id
FIREBASE_APP_ID=your-id
API_URL=http://localhost:5000/api
EOF

npm start
# اقرأ QR Code من Expo Go
```

### الحسابات التجريبية

**بريد تجريبي:**
- Email: test@example.com
- Password: TestPassword123!

## هيكل المشروع الكامل

### Mobile (React Native + Expo)
- **Screens**: 7 شاشات رئيسية
- **Components**: مكونات قابلة لإعادة الاستخدام
- **Services**: تكامل Firebase و APIs
- **Navigation**: نظام ملاحة متقدم

### Backend (Node.js + Express)
- **Authentication**: تسجيل + مصادقة ثنائية
- **Products**: CRUD كامل
- **Orders**: إدارة الطلبات والإشعارات
- **Chat**: رسائل فورية
- **Notifications**: إشعارات فورية

## المميزات المرئية

✨ **تصميم أنيق:**
- ألوان أزرق هادئة
- واجهة سهلة الاستخدام
- شريط تنقل سفلي
- أيقونات واضحة

🔐 **أمان كامل:**
- تشفير كلمات المرور
- مصادقة ثنائية
- JWT Tokens
- تحقق من الصلاحيات

📱 **تطبيق متكامل:**
- متجر منتجات
- سلة تسوق
- نظام طلبات
- دردشة فورية
- ملف شخصي

## نقاط API الرئيسية

```
POST   /api/auth/register              - التسجيل
POST   /api/auth/login                 - تسجيل الدخول
POST   /api/auth/verify-2fa            - التحقق الثنائي
GET    /api/products                   - الحصول على المنتجات
POST   /api/products                   - إنشاء منتج
POST   /api/orders                     - إنشاء طلب
GET    /api/chat                       - الحصول على المحادثات
POST   /api/chat/:id/messages          - إرسال رسالة
```

## النشر على السحابة

### Backend على Render
1. اذهب إلى render.com
2. اختر New > Web Service
3. ربط GitHub
4. أضف متغيرات البيئة
5. Deploy!

### Mobile على Expo
```bash
cd mobile
eas build --platform ios --auto-submit
eas build --platform android --auto-submit
```

## الملفات المهمة

```
backend/
├── server.js                - الملف الرئيسي
├── config/firebase.js       - إعدادات Firebase
├── middleware/auth.js       - التحقق من الرموز
├── controllers/             - معالجات الطلبات
└── routes/                  - نقاط النهاية

mobile/
├── src/App.js              - الملف الرئيسي
├── src/navigation/          - نظام الملاحة
├── src/screens/            - جميع الشاشات
├── src/services/           - الخدمات والتكاملات
└── app.json                - إعدادات Expo
```

## الاختبار السريع

### اختبار API
```bash
# التحقق من أن الخادم يعمل
curl http://localhost:5000/api/health

# التسجيل
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@test.com",
    "password":"Test123!@#",
    "name":"Ahmed",
    "phone":"201001234567",
    "uid":"test-uid"
  }'
```

## نصائح مهمة

1. **Firebase**: استخدم Firestore وليس Realtime Database
2. **Email**: استخدم App Passwords مع Gmail
3. **Development**: استخدم localhost:5000 للتطوير المحلي
4. **Testing**: اختبر جميع العمليات قبل النشر

## المساعدة

إذا واجهت أي مشاكل:
1. تحقق من متغيرات .env
2. تأكد من تشغيل كل من Backend و Frontend
3. تحقق من اتصال الإنترنت
4. راجع رسائل الخطأ في Console

---

**استمتع ببناء تطبيقك! 🚀**
