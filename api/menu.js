// ملف api/menu.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// إعدادات اتصال قاعدة البيانات (عدلها حسب استضافتك)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'u532642612_abu_haitham',
  password: process.env.DB_PASSWORD || 'Numo@up11111',
  database: process.env.DB_NAME || 'u532642612_abu_haitham',
  charset: 'utf8mb4',
};

router.get('/menu', async (req, res) => {
  try {
    // إنشاء اتصال بقاعدة البيانات
    const conn = await mysql.createConnection(dbConfig);

    // استعلام الأصناف المتاحة فقط، مع ترتيب حسب sort_order
    const [rows] = await conn.execute(`
      SELECT id, name, name_en, description, description_en, price, image, category_id, rating, reviews_count, is_spicy, is_vegetarian, is_popular, is_new, ingredients, allergens, calories, preparation_time, serving_size, is_available, sort_order, created_at, updated_at
      FROM menu_items
      WHERE is_available = 1
      ORDER BY sort_order ASC
    `);

    await conn.end();

    // إرسال البيانات بصيغة JSON
    res.json({ success: true, data: rows });

  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ success: false, error: 'حدث خطأ في تحميل البيانات: ' + err.message });
  }
});

module.exports = router;
