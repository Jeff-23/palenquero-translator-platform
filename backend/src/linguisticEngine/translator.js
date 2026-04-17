//Carpeta de Diego Casseres 
const dictionary = require("./dictionary");
const { tokenize } = require("./tokenizer");

const translateWord = (text) => {
    const words = tokenize(text);

    const translatedWords = words.map((word) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
        const punctuation = word.match(/[.,!?;:]+$/)?.[0] || "";
        const translated = dictionary[cleanWord] || cleanWord;

        return translated + punctuation;
    });

    return translatedWords.join(" ");
};

module.exports = {
    translateWord
};