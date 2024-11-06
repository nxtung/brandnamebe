import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

// Gửi OTP qua Infobip
function sendOtp  (phoneNumber, otp) {
    const payload = JSON.stringify({
        messages: [
            {
                destinations: [{"to": phoneNumber }],
                from: process.env.INFOBIP_API_SENDER, // Thay bằng sender ID của bạn
                text: `Your OTP code is: ${otp}`
            }
        ]
    });

    const options = {
        method: 'POST',
        hostname: process.env.INFOBIP_API_URL,
        path: process.env.INFOBIP_API_PATH, // Đường dẫn API
        headers: {
            'Authorization': `App ${process.env.INFOBIP_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            // Nhận dữ liệu trả về
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Kết thúc response
            res.on('end', () => {
                resolve(data);
            });
        });

        // Xử lý lỗi
        req.on('error', (error) => {
            reject(new Error(`Failed to send OTP: ${error.message}`));
        });

        // Gửi dữ liệu
        req.write(payload);
        req.end();
    });
};

export default sendOtp