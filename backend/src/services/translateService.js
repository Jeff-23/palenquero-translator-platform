const { translateText } = require("../linguisticEngine/translator");

const translate = (text) => {
    return translateText(text);
};

module.exports = {
    translate
};