const tokenize = (text) => {
    return text.trim().split(/\s+/);
};

const removeAccents = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

module.exports = {
    tokenize,
    removeAccents
};