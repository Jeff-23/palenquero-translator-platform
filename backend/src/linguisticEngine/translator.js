//Carpeta de Diego Casseres 
const dictionary = require("./dictionary");
const { tokenize } = require("./tokenizer");

const translateText = (text) => {
    const words = tokenize(text);
    const unknownWords = [];

    const translatedWords = words.map((word) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
        const punctuation = word.match(/[.,!?;:]+$/)?.[0] || "";

        if (!dictionary[cleanWord]) {
            unknownWords.push(cleanWord);
        }

        const translated = dictionary[cleanWord] || cleanWord;
        return translated + punctuation;
    });

    return {
        translation: translatedWords.join(" "),
        tokens: words,
        unknownWords
    };
};

module.exports = {
    translateText
};