

const config = require('./config');
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = config.PORT; // Chọn cổng theo mong muốn

// Kết nối đến MySQL
const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password:config.db.password,
  database: config.db.database,
  port:  config.db.port
});

app.use(cors());
// Sử dụng bodyParser để đọc dữ liệu từ body của request
app.use(bodyParser.json());

// Hàm lấy tất cả người dùng
function getAllUsers(req, res) {
  connection.query('SELECT * FROM user', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No users found, please create new user' });
    }

    res.json(results);
  });
}


// Hàm đăng nhập người dùng
function loginUser(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  connection.query(
    'SELECT * FROM user WHERE email = ? AND password = ?',
    [email, password],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.json({ message: 'Login successful', user: results[0] });
    }
  );
}

// Hàm đăng ký người dùng
function registerUser(req, res) {
  const { email, name, password } = req.body;

  console.log(req.body);

  connection.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.log(error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Nếu tồn tại email, trả về lỗi
    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Nếu không tồn tại email, thực hiện thêm người dùng mới
    connection.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [name, email, password], (error) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ message: 'User registered successfully' });
    });
  });
}

// Router
app.get('/api/users', getAllUsers);
app.post('/api/users/login', loginUser);
app.post('/api/users/register', registerUser);

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
