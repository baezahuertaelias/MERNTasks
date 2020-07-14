const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');

/**
 * Crea proyectos
 * /api/proyectos/
 * Primero pasa por auth (para la autenticacion)
 */
router.post('/', auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto);

/* Obtiene todos los proyectos */
router.get('/', auth, proyectoController.obtenerProyectos);

/* Actualiza el proyecto con su ID */
router.put('/:id', auth, proyectoController.actualizarProyecto);

router.delete('/:id', auth, proyectoController.eliminarProyecto);


module.exports = router;