const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'u532642612_abu_haitham',
  password: process.env.DB_PASSWORD || 'Numo@up11111',
  database: process.env.DB_NAME || 'u532642612_abu_haitham',
  charset: 'utf8mb4',
};

router.get('/menu', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);

    const [rows] = await conn.execute(`
      SELECT id, name, description, price, is_available, sort_order
      FROM menu_items
      WHERE is_available = 1
      ORDER BY sort_order ASC
    `);

    await conn.end();

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ success: false, error: 'حدث خطأ في تحميل البيانات: ' + err.message });
  }
});

module.exports = router;
