//Carga de servidor y definicion de las rutas
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log("Servidor escuchado en puerto 3000"));

//Importando funcion desde el modulo consultas.js
const { agregar, todos, eliminar, editar} = require('./consultas/consultas.js');
//middleware para recibir desde el front como json
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

//Ruta para agregar una cancion a la tabla cancion
app.post("/cancion", async (req, res) => {
    const { titulo, artista, tono } = req.body;
    try {
        const result = await agregar(titulo, artista, tono);
        console.log("Valor devuelto por la función de base de datos: ", result);
        res.json(result);
    } catch (error) {
        console.error("Error al agregar la canción:", error);
        res.status(500).json({ error: "Error al agregar la canción" });
    }
});
//Ruta GET/cancion que recibe los datos de una canción que se desea editar y ejecuta una función asíncrona para hacer la consulta SQL y actualice ese registro de la tabla canciones.
app.put("/cancion", async (req, res) => {
    const { id, cancion, artista, tono } = req.body;
    const result = await editar(id, cancion, artista, tono);
    console.log("Respuesta de la funcion editar: ", result);
    res.json(result);
})

//Ruta que devuelve un JSON con los registros de la tabla canciones.
app.get("/canciones", async (req, res) => {
    const result = await todos();
    console.log("Respuesta de la funcion todos: ", result);
    res.json(result);
})

//Recibe por queryString el id de una canción y realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.
app.delete("/cancion", async (req, res) => {
    const { id } = req.query;
    const result = await eliminar(id);
    console.log("Respuesta de la funcion eliminar: ", result);
    res.json(result);
})

