const dictionary = require("../linguisticEngine/dictionary");

const getStats = (req, res) => {
    try {
        res.json({
            ok: true,
            data: {
                totalDictionaryWords: Object.keys(dictionary).length,
                availableEndpoints: [
                    "/api/v1/translate",
                    "/api/v1/dictionary",
                    "/api/v1/dictionary/:word",
                    "/api/v1/stats"
                ]
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: {
                message: "Error al obtener estadísticas"
            }
        });
    }
};

module.exports = {
    getStats
};