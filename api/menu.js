const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// خذ إعدادات قاعدة البيانات من متغيرات البيئة (مهم لـ Vercel)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'u532642612_abu_haitham',
  password: process.env.DB_PASSWORD || 'Numo@up11111',
  database: process.env.DB_NAME || 'u532642612_abu_haitham',
};

// endpoint لعرض قائمة menu_items
router.get('/menu', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(`
      SELECT id, name, name_en, description, description_en, price, image, category_id, rating, reviews_count, is_spicy, is_vegetarian, is_popular, is_new, ingredients, allergens, calories, preparation_time, serving_size, is_available, sort_order, created_at, updated_at
      FROM menu_items
      WHERE is_available = 1
      ORDER BY sort_order ASC
    `);
    await conn.end();
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// endpoint اختبار الاتصال بقاعدة البيانات
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
