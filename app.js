const express = require('express');
const db = require('./configs/db'); // Import db config
const otpRoutes = require('./routes/otpRoutes');
const spamRoutes = require('./routes/spamRoutes'); // Import spamRoutes

const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

// Khởi tạo cơ sở dữ liệu
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS otps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        otp TEXT NOT NULL,
        phoneNumber TEXT NOT NULL,
        messageId TEXT NOT NULL,
        expired_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Sử dụng routes
app.use('/api/v1/opts', otpRoutes);
app.use('/api/v1/spam', spamRoutes); 

// Sử dụng middleware xử lý lỗi
app.use(errorMiddleware);

module.exports = app;