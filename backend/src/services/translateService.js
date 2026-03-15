const { translateWord } = require("../linguisticEngine/translator");

const translate = async (text) => {
    const result = translateWord(text);
    return result;
};

module.exports = {
    translate
};