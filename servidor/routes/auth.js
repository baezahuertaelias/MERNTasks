/* Rutas para autenticar usuarios */
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


/** 
 * Crea un usuario /api/usuarios
 * Agregado el check para revisar que los datos cumpla lo requerido
 */
router.post('/', authController.autenticarUsuario);

/* Obtiene el usuario autenticado */
router.get('/',
    auth,
    authController.usuarioAutenticado
);



module.exports = router;