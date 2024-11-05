const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log lỗi ra console

    // Gửi phản hồi lỗi
    res.status(500).json({
        message: 'Something went wrong!',
        error: err.message || 'Internal Server Error',
    });
};

module.exports = errorMiddleware;