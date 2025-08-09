import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8mb4',
    });

    const [rows] = await connection.execute('SELECT * FROM menu_items');
    await connection.end();

    return res.status(200).json({ success: true, data: rows });

  } catch (error) {
    console.error('Database error:', error); // راح يظهر في سجلات Vercel
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
