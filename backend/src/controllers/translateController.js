console.log("translateController.js cargado");

const { translate } = require("../services/translateService");

const translateText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                ok: false,
                error: "Debes enviar un texto para traducir"
            });
        }

        const result = await translate(text);

        res.json({
            ok: true,
            original: text,
            translation: result
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: "Error al traducir el texto",
            details: error.message
        });
    }
};

module.exports = {
    translateText
};