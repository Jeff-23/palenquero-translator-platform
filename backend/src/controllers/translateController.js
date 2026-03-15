const { translate } = require("../services/translateService");

const translateText = async (req, res) => {
    const text = req.body.text;

    if (!text) {
        return res.status(400).json({
            error: "Debes enviar un texto para traducir"
        });
    }

    const result = await translate(text);

    res.json({
        translation: result 
    });
};

module.exports = {
    translateText
};