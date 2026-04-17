const dictionary = require("./dictionary");
const { tokenize, removeAccents } = require("./tokenizer");

const cleanToken = (word) => {
    return removeAccents(
        word
            .toLowerCase()
            .replace(/^[¿¡"“"'([{]+/, "")
            .replace(/[.,!?;:¿¡"”"'\])}]+$/g, "")
    );
};

const getStartingPunctuation = (word) => {
    const match = word.match(/^[¿¡]+/);
    return match ? match[0] : "";
};

const getEndingPunctuation = (word) => {
    const match = word.match(/[.,!?;:]+$/);
    return match ? match[0] : "";
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

        if (current && next && nextNext) {
            const phrase3 = `${current}_${next}_${nextNext}`;
            const startPunctuation3 = getStartingPunctuation(tokens[i]);
            const endPunctuation3 = getEndingPunctuation(tokens[i + 2]);

            if (dictionary[phrase3]) {
                translatedWords.push(
                    `${startPunctuation3}${dictionary[phrase3]}${endPunctuation3}`
                );
                i += 3;
                continue;
            }
        }

        if (current && next) {
            const phrase2 = `${current}_${next}`;
            const startPunctuation2 = getStartingPunctuation(tokens[i]);
            const endPunctuation2 = getEndingPunctuation(tokens[i + 1]);

            if (dictionary[phrase2]) {
                translatedWords.push(
                    `${startPunctuation2}${dictionary[phrase2]}${endPunctuation2}`
                );
                i += 2;
                continue;
            }
        }

        const startPunctuation1 = getStartingPunctuation(tokens[i]);
        const endPunctuation1 = getEndingPunctuation(tokens[i]);
        const translated = dictionary[current] || current;

        if (!dictionary[current]) {
            unknownWordsSet.add(current);
        }

        translatedWords.push(
            `${startPunctuation1}${translated}${endPunctuation1}`
        );

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