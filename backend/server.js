const express = require("express");
const app = express();

console.log("=== SERVER PRUEBA DIRECTA ===");

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

app.get("/health", (req, res) => {
    res.json({
        status: "Corriendo",
        message: "backend funcionando correctamente"
    });
});

app.post("/api/test", (req, res) => {
    console.log("ENTRO A /api/test");
    res.json({
        ok: true,
        body: req.body
    });
});

app.post("/api/translate", (req, res) => {
    console.log("ENTRO A /api/translate");
    res.json({
        ok: true,
        translation: "prueba directa",
        recibido: req.body
    });
});

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
});