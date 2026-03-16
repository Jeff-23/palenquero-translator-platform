const dictionary = { 
    desecho: "ansusú",
    raquítico : "aburao",
    anillo : "anio",
    hoy : "Agüe",
    abril : "abrí",
    sosten : "ajutaró",
    suelto : "aggarete",
    malcriado : "ambelike",
    arroz_con_asadura : "ambrakanbraka",
    facil : "anchoba",
    huir : "ajuí",
    colonia : "agua_pompeya",
    donde : "andi",
    entonces : "antose",
    movimiento : "aberunto",
    asi_es : "asina_jue",
    obligar : "akosá",
    condimento : "arobo",
    abuelo : "agüelo",
    recompensa : "ayako",
    asi : "asina",
    azul : "asú",
    agua : "apu",
    planta_medicinal : "anamú",
    arroz : "alo´",
    apellido : "apelatibo",
    agosto : "agoto",
    apurarse : "apura"
 };
const translateWord = (text) => {
    const words = text.split(" ");

    const translatedWords = words.map((word) => {
        return dictionary[word] || word;
    });
    return translatedWords.join(" ");
 };
module.exports = {
    translateWord
};