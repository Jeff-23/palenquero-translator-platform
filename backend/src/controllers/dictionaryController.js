console.log("dictionaryController.js cargado");

const {
    getAllWords,
    getWordTranslation
} = require("../services/dictionaryService");

const getDictionary = (req, res) => {
    try {
        const data = getAllWords();

        res.json({
            ok: true,
            total: Object.keys(data).length,
            data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: "Error al obtener el diccionario",
            details: error.message
        });
    }
};

const getWord = (req, res) => {
    try {
        const { word } = req.params;

        if (!word) {
            return res.status(400).json({
                ok: false,
                error: "Debes enviar una palabra"
            });
        }

        const translation = getWordTranslation(word);

        if (!translation) {
            return res.status(404).json({
                ok: false,
                message: "Palabra no encontrada en el diccionario"
            });
        }

        res.json({
            ok: true,
            word,
            translation
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error: "Error al buscar la palabra",
            details: error.message
        });
    }
};

module.exports = {
    getDictionary,
    getWord
};