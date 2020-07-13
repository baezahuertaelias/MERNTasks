const express = require('express');
const conectarDB = require('./config/db');

/* Crear servidor */
const app = express();

/* Conectar a la BD */
conectarDB();

/* Habilitar express.json */
app.use(express.json({extended: true}));

/* Puerto de la app */
const PORT = process.env.PORT || 4000;

/* Importar rutas */
app.use('/api/usuarios', require('./routes/usuarios'));

/* Correr server */
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`); 
});