const manejoErrores = (error, pool, tabla) => {
    let status, message;

    switch (error.code) {
        case '23505':
            status = 400;
            message = "Ya existe un registro con el mismo valor único";
            break;
        case '28P01':
            status = 400;
            message = "Error de autenticación de la contraseña o el usuario no existe";
            break;
        case '42P01':
            status = 400;
            message = "La tabla consultada no existe";
            break;
        case '3D000':
            status = 400;
            message = "La base de datos a la que intenta conectar no existe";
            break;
        case 'ENOTFOUND':
            status = 500;
            message = "Error en el valor utilizado como localhost";
            break;
        case 'ECONNREFUSED':
            status = 500;
            message = "Error en el puerto de conexión a la base de datos";
            break;
        case 'ECONNRESET':
            status = 500;
            message = "Conexión reseteada por el servidor de base de datos";
            break;
        default:
            status = 500;
            message = "Error genérico del servidor";
            break;
    }
    return { errorCode, status, message };
}

export { manejoErrores };
