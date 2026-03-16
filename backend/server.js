const express = require("express"); // Importamos el framework Express para crear el servidor web
const app = express(); // Creamos el servidor en express y lo asignamos a la variable app

app.use(express.json());// Middleware para permitir texto en formato JSON   

const translateRoutes = require("./src/routes/translateRoutes");//importa las rutas de traducción
console.log("server.js cargó translateRoutes");

app.get("/health", (req, res) => {
    res.json({ 
        status: "Corriendo", 
        message : "backend funcionando correctamente"
    });
     });// Creamos una ruta que muestre el estado del servidor y un mensaje indicando que el backend está funcionando correctamente


    app.post("/api/test", (req, res) => {
    console.log("ENTRO A /api/test");
    res.json({
        ok: true,
        body: req.body
    });
});
   
app.use("/api", translateRoutes); //conecta las rutas de traducción al servidor

    const PORT = 4000; // Puerto asignado para el servidor

    app.listen(PORT, () => {
        console.log(`servidor corriendo en puerto ${PORT}`);
    }); // El servidor escucha el puerto y envia un mensaje a la consola indicando que el servidor está corriendo en el puerto que se le asignó    
    