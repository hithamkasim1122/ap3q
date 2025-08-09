import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://pt.hqasite.com/abu_haitham/wep/api/menu.php');
    if (!response.ok) {
      console.error('Response status:', response.status);
      throw new Error(`خطأ في استرجاع البيانات: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('حدث خطأ في API /api/menu:', error);
    res.status(500).json({ message: 'حدث خطأ عند تحميل البيانات.' });
  }
}
