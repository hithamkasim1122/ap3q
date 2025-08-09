import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST, // e.g. srv840.hstgr.io
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
};

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(`
      SELECT id, name, name_en, description, description_en, price, image, category_id, rating, reviews_count,
             is_spicy, is_vegetarian, is_popular, is_new, ingredients, allergens, calories, preparation_time,
             serving_size, is_available, sort_order, created_at, updated_at
      FROM menu_items
    `);

    await connection.end();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection error' });
  }
}
