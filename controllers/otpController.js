const db = require('../configs/db');
const otpService = require('../services/otpService');
const { genOtp } = require('../utils/otpUtils'); // Import hàm genOtp

// Tạo OTP mới
exports.createOtp = async (req, res) => {
    // const { otp, phoneNumber } = req.body;

    // const stmt = db.prepare("INSERT INTO otps (otp, phoneNumber, messageId, expired_at) VALUES (?, ?, ?, ?)");
    // stmt.run(otp, phoneNumber, messageId, expired_at, function(err) {
    //     if (err) {
    //         return res.status(500).json({ message: err.message });
    //     }

    //     res.status(201).json({ 
    //         id: this.lastID, 
    //         otp, 
    //         phoneNumber, 
    //         messageId, 
    //         expired_at,
    //         created_at: new Date().toISOString() // Có thể trả về thời gian tạo nếu cần
    //     });
    // });
    // stmt.finalize();

    try {
        const { phoneNumber } = req.body;
        const otp = genOtp();
        const otpResponse = await otpService.sendOtp(phoneNumber, otp);
        console.log(otpResponse);
        const messageId = JSON.parse(otpResponse).messages[0].messageId;
        await saveOtp(otp, phoneNumber, messageId);
        res.send(otpResponse);
        // res.send({ "messages": [200], "otp": otp });
    } catch (error) {
        res.status(500).send({ "messages": [500] });
    }
};

// Lấy danh sách tất cả OTPs
exports.getOtps = (req, res) => {
    db.all("SELECT * FROM otps", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
};

// Xoá OTP theo ID
exports.deleteOtp = (req, res) => {
    const id = req.params.id;

    const stmt = db.prepare("DELETE FROM otps WHERE id = ?");
    stmt.run(id, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: 'OTP not found' });
        }

        res.status(204).send(); // 204 No Content
    });
    stmt.finalize();
};

// Hàm lưu OTP vào cơ sở dữ liệu
function saveOtp(otp, phoneNumber, messageId) {
    return new Promise((resolve, reject) => {
        const expiredAt = new Date(Date.now() + 120 * 1000); // Thêm 120 giây vào thời gian hiện tại
        const sql = 'INSERT INTO otps (otp, phoneNumber, messageId, expired_at) VALUES (?, ?, ?, ?)';
        db.run(sql, [otp, phoneNumber, messageId, expiredAt.toISOString()], function(err) {
            if (err) {
                return reject(err); // Nếu có lỗi, từ chối Promise
            }
            resolve(this.lastID); // Trả về ID của bản ghi mới được chèn
        });
    });
}