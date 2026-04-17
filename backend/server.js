const express = require("express");
const cors = require("cors");

const translateRoutes = require("./src/routes/translateRoutes");
const dictionaryRoutes = require("./src/routes/dictionaryRoutes");
const notFoundMiddleware = require("./src/middlewares/notFoundMiddleware");
const errorMiddleware = require("./src/middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 4001;

console.log("=== SERVIDOR BACKEND TRADUCTOR ===");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

app.get("/health", (req, res) => {
    res.json({
        ok: true,
        message: "Backend funcionando correctamente"
    });
});

app.use("/api", translateRoutes);
app.use("/api", dictionaryRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});