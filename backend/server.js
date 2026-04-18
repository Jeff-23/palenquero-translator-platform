const express = require("express");
const cors = require("cors");

const translateRoutes = require("./src/routes/translateRoutes");
const dictionaryRoutes = require("./src/routes/dictionaryRoutes");
const statsRoutes = require("./src/routes/statsRoutes");
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

app.use("/api/v1", translateRoutes);
app.use("/api/v1", dictionaryRoutes);
app.use("/api/v1", statsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});