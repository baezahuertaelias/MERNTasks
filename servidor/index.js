const express = require('express');
const conectarDB = require('./config/db');

/* Crear servidor */
const app = express();

/* Conectar a la BD */
conectarDB();

/* Puerto de la app */
const PORT = process.env.PORT || 4000;

/* Correr server */
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`); 
});