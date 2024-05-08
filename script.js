// Importamos express y levantamos servidor por el puerto 3000
import express from "express";
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// Importamos funciones desde consultas.js
import { agregar, todos, eliminar, editar } from './consultas/consultas.js';

// Middleware 
app.use(express.json());

// Creamos una ruta raíz que devuelve un archivo (index.html)
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "./" });
})

// Creamos una ruta para agregar una canción.
app.post("/cancion", async (req, res) => {
    const { titulo, artista, tono } = req.body;
    try {
        const result = await agregar(titulo, artista, tono);
        console.log("Valor devuelto por la función de base de datos: ", result);
        res.json(result);
    } catch (error) {
        res.send(error);
    }
});

// 
app.put("/cancion/:id", async (req, res) => {
    const { titulo, artista, tono } = req.body; 
    const { id } = req.params;
    try {
        const result = await editar(id, titulo, artista, tono); 
        console.log("Respuesta de la función editar: ", result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
});

// 
app.get("/canciones", async (req, res) => {
    try {
        const result = await todos();
        console.log("Respuesta de la función todos: ", result);
        res.json(result);
    } catch (error) {
        res.send(error);
    }
});

//Recibe por queryString el id de una canción y realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.
app.delete("/cancion", async (req, res) => {
    const { id } = req.query;
    try {
        const result = await eliminar(id);
        console.log("Respuesta de la función eliminar: ", result);
        res.json(result);
    } catch (error) {
        res.send(error);
    }
});