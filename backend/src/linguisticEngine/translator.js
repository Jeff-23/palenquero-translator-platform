const dictionary = require("./dictionary");
const { tokenize, removeAccents } = require("./tokenizer");

const cleanToken = (word) => {
    const withoutAccents = removeAccents(word.toLowerCase());

    return withoutAccents
        .replace(/^[^a-z0-9]+/gi, "")
        .replace(/[^a-z0-9]+$/gi, "");
};

const getStartingPunctuation = (word) => {
    const match = word.match(/^[¿¡]+/);
    return match ? match[0] : "";
};

const getEndingPunctuation = (word) => {
    const match = word.match(/[.,!?;:]+$/);
    return match ? match[0] : "";
};

const startsWithUppercase = (word) => {
    const clean = word.replace(/^[^A-Za-zÁÉÍÓÚáéíóúÑñ]+/, "");
    return clean.length > 0 && clean[0] === clean[0].toUpperCase() && clean[0] !== clean[0].toLowerCase();
};

const applyCapitalization = (originalWord, translatedWord) => {
    if (!translatedWord) return translatedWord;

    if (startsWithUppercase(originalWord)) {
        return translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
    }

    return translatedWord;
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

        // Frase de 3 palabras
        if (current && next && nextNext) {
            const phrase3 = `${current}_${next}_${nextNext}`;
            const startPunctuation3 = getStartingPunctuation(tokens[i]);
            const endPunctuation3 = getEndingPunctuation(tokens[i + 2]);

            if (dictionary[phrase3]) {
                const translatedPhrase = applyCapitalization(tokens[i], dictionary[phrase3]);

                translatedWords.push(
                    `${startPunctuation3}${translatedPhrase}${endPunctuation3}`
                );
                i += 3;
                continue;
            }
        }

        // Frase de 2 palabras
        if (current && next) {
            const phrase2 = `${current}_${next}`;
            const startPunctuation2 = getStartingPunctuation(tokens[i]);
            const endPunctuation2 = getEndingPunctuation(tokens[i + 1]);

            if (dictionary[phrase2]) {
                const translatedPhrase = applyCapitalization(tokens[i], dictionary[phrase2]);

                translatedWords.push(
                    `${startPunctuation2}${translatedPhrase}${endPunctuation2}`
                );
                i += 2;
                continue;
            }
        }

        // Palabra individual
        const startPunctuation1 = getStartingPunctuation(tokens[i]);
        const endPunctuation1 = getEndingPunctuation(tokens[i]);
        let translated = dictionary[current] || current;

        if (!dictionary[current]) {
            unknownWordsSet.add(current);
        }

        translated = applyCapitalization(tokens[i], translated);

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