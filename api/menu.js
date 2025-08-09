import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://your-shared-hosting.com/api/menu.php'); // رابط ملف PHP
    if (!response.ok) {
      return res.status(response.status).json({ error: 'خطأ في استرجاع البيانات من السيرفر' });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('خطأ في fetch API:', error);
    res.status(500).json({ error: 'حدث خطأ في السيرفر' });
  }
}
