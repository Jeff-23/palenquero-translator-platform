const dictionary = require("../linguisticEngine/dictionary");

const getAllWords = () => {
    return dictionary;
};

const getWordTranslation = (word) => {
    return dictionary[word.toLowerCase()] || null;
};

module.exports = {
    getAllWords,
    getWordTranslation
};