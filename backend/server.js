const express = require("express");
const app = express();

const translateRoutes = require("./src/routes/translateRoutes");
const dictionaryRoutes = require("./src/routes/dictionaryRoutes");

console.log("=== SERVIDOR BACKEND TRADUCTOR ===");

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

app.use("/api", translateRoutes);
app.use("/api", dictionaryRoutes);

app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: "Ruta no encontrada"
    });
});

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});