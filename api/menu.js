const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// إعدادات قاعدة البيانات (تأكد إنها متطابقة مع إعدادات مشروعك)
const dbConfig = {
  host: 'localhost',
  user: 'u532642612_abu_haitham',
  password: 'Numo@up11111',
  database: 'u532642612_abu_haitham',
};

// الـ API الأصلي (مثلاً لعرض الأصناف)
// router.get('/menu', async (req, res) => { ... });

// أضف هذا الـ endpoint لاختبار الاتصال
router.get('/test-db', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute('SELECT 1');
    await conn.end();
    res.json({ success: true, message: '✅ تم الاتصال بقاعدة البيانات بنجاح.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
