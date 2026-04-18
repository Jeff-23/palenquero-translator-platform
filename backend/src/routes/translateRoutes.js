const express = require("express");
const router = express.Router();

const { translateText } = require("../controllers/translateController");

console.log("translateRoutes.js cargado");

router.post("/translate", translateText);

module.exports = router;