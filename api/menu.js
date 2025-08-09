import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
  };

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute(`
      SELECT id, name, description, price, is_available, sort_order
      FROM menu_items
      WHERE is_available = 1
      ORDER BY sort_order ASC
    `);
    await conn.end();

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'خطأ في تحميل البيانات: ' + error.message });
  }
}
