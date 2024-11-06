import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.IDENTIFY_KEY; // Lấy API Key từ biến môi trường

const checkApiKey = (req, res, next) => {
    // Chỉ kiểm tra API Key đối với phương thức POST
    if (req.method === 'POST') {
        const apiKey = req.body.apiKey; // Lấy API Key từ body
        console.log('apiKey: ' + apiKey)
        if (!apiKey) {
            return res.status(403).json({ message: 'Unauthorized' }); // Không có API Key
        }

        if (apiKey !== API_KEY) {
            return res.status(401).json({ message: 'Unauthorized: Invalid API key' }); // API Key không hợp lệ
        }
    }

    next(); // Nếu không phải POST hoặc API Key hợp lệ, tiếp tục tới route tiếp theo
};

export default checkApiKey;