# My Restaurant - Vercel deployment
هذه نسخة جاهزة للنشر على Vercel. **لا تُضع** معلومات حساسة مباشرة في الكود؛ استخدم Environment Variables في إعدادات Vercel.

## خطوات سريعة
1. انسخ المشروع إلى GitHub.
2. اربط المستودع مع Vercel ونشره.
3. في Hostinger: في MySQL Remote أضف IPs سيرفرات Vercel أو ضع '%' مؤقتًا.
4. في Vercel dashboard → Settings → Environment Variables أضف:
   - DB_HOST
   - DB_USER
   - DB_PASS
   - DB_NAME
5. افتح: `https://<your-vercel-project>.vercel.app/`

## ملاحظات
- تأكد أن قاعدة البيانات تسمح بالوصول الخارجي من Vercel.
- استخدم Secrets بدل وضع كلمات المرور في الملفات.
