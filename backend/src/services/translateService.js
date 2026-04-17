const { translateWord } = require("../linguisticEngine/translator");

const translate = (text) => {
    return translateWord(text);
};

module.exports = {
    translate
};