import pkg from 'pg';
import 'dotenv/config';
const { Pool } = pkg;
import { manejoErrores } from '../errores/moduloErrores.js';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// Función para insertar registros en la tabla repertorio

async function agregar (titulo, artista, tono) {
    console.log("Valores recibidos: ", titulo, artista, tono);
    try {
        const result = await pool.query({ 
            text: 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *',
            values: [titulo, artista, tono]
        });
        console.log("Registro agregado: ", result.rows[0]);
        return result.rows[0];
    } catch (error) {
        return manejoErrores(error, pool, tabla);
    }
}

//Función para mostrar todos los registros
async function todos () {
    const result = await pool.query("SELECT * FROM canciones");
    return result.rows;
}

//función para eliminar un registro según su nombre
async function eliminar(id) {
    try {
        const result = await pool.query("DELETE FROM canciones WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length > 0) {
            return { mensaje: `El registro con ID ${id} se ha eliminado` };
        } else {
            return { mensaje: 'El registro no se eliminó correctamente o no existe.' };
        }
    } catch (error) {
        return manejoErrores(error, pool, tabla);
    }
}

//función para editar un registro
async function editar (id, titulo, artista, tono) {
    const result = await pool.query("UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *", [titulo, artista, tono, id]);
    return result.rows[0];
}

export {agregar, todos, eliminar, editar};