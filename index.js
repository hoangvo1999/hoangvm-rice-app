const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

// Cấu hình kết nối RDS
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// API 1: Kiểm tra kết nối
app.get('/', (req, res) => {
  res.send('Hello Words');
});

// API 2: Lấy danh sách các loại gạo
app.get('/gao', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API 3: Tạo đơn hàng mới
app.post('/dat-hang', async (req, res) => {
  const { ten_khach, loai_gao, so_luong } = req.body;
  try {
    await pool.query(
      'INSERT INTO orders (customer_name, product_name, quantity) VALUES ($1, $2, $3)',
      [ten_khach, loai_gao, so_luong]
    );
    res.status(201).send('Đặt gạo thành công!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ứng dụng hoangvm đang chạy trên cổng ${PORT}`);
});
