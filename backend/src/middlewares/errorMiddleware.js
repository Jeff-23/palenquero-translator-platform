const errorMiddleware = (err, req, res, next) => {
    console.error("ERROR:", err);

    res.status(err.status || 500).json({
        ok: false,
        error: {
            message: err.message || "Error interno del servidor"
        }
    });
};

module.exports = errorMiddleware;