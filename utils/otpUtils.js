// Hàm tạo mã OTP ngẫu nhiên
function genOtp(length = 6) {
    // Tạo một chuỗi số từ 0 đến 9
    const digits = '0123456789';
    let otp = '';

    // Tạo mã OTP bằng cách ngẫu nhiên chọn các ký tự từ chuỗi digits
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;  // trả về mã OTP
}

export default genOtp;