const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        ok: false,
        error: {
            message: "Ruta no encontrada"
        }
    });
};

module.exports = notFoundMiddleware;
