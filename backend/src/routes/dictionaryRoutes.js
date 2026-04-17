const express = require("express");
const router = express.Router();

const {
    getDictionary,
    getWord
} = require("../controllers/dictionaryController");

console.log("dictionaryRoutes.js cargado");

// Obtener todo el diccionario
router.get("/dictionary", getDictionary);

// Buscar una palabra
router.get("/dictionary/:word", getWord);

module.exports = router;