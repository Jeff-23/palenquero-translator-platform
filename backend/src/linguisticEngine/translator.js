const dictionary = require("./dictionary");
const { tokenize, removeAccents } = require("./tokenizer");

const cleanToken = (word) => {
    return removeAccents(
        word.toLowerCase().replace(/[.,!?;:]/g, "")
    );
};

const getEndingPunctuation = (word) => {
    return word.match(/[.,!?;:]+$/)?.[0] || "";
};

const translateText = (text) => {
    const tokens = tokenize(text);
    const unknownWordsSet = new Set();
    const translatedWords = [];

    let i = 0;

    while (i < tokens.length) {
        const current = cleanToken(tokens[i]);
        const next = i + 1 < tokens.length ? cleanToken(tokens[i + 1]) : null;
        const nextNext = i + 2 < tokens.length ? cleanToken(tokens[i + 2]) : null;

        // Intentar frase de 3 palabras
        if (current && next && nextNext) {
            const phrase3 = `${current}_${next}_${nextNext}`;
            const punctuation3 = getEndingPunctuation(tokens[i + 2]);

            if (dictionary[phrase3]) {
                translatedWords.push(dictionary[phrase3] + punctuation3);
                i += 3;
                continue;
            }
        }

        // Intentar frase de 2 palabras
        if (current && next) {
            const phrase2 = `${current}_${next}`;
            const punctuation2 = getEndingPunctuation(tokens[i + 1]);

            if (dictionary[phrase2]) {
                translatedWords.push(dictionary[phrase2] + punctuation2);
                i += 2;
                continue;
            }
        }

        // Traducir palabra individual
        const punctuation1 = getEndingPunctuation(tokens[i]);
        const translated = dictionary[current] || current;

        if (!dictionary[current]) {
            unknownWordsSet.add(current);
        }

        translatedWords.push(translated + punctuation1);
        i += 1;
    }

    return {
        translation: translatedWords.join(" "),
        tokens,
        unknownWords: Array.from(unknownWordsSet)
    };
};

module.exports = {
    translateText
};