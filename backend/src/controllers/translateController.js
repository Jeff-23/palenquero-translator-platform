console.log("translateController.js cargado");

const { translate } = require("../services/translateService");

const translateText = (req, res) => {
    try {
        const { text } = req.body;

        if (!text || typeof text !== "string" || !text.trim()) {
            return res.status(400).json({
                ok: false,
                error: "Debes enviar un texto válido para traducir"
            });
        }

        const result = translate(text);

        res.json({
            ok: true,
            original: text,
            translation: result.translation,
            tokens: result.tokens,
            unknownWords: result.unknownWords
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