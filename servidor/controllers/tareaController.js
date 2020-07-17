const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

/* Crea una nueva tarea */
exports.crearTarea = async (req, res) => {
    /* Revisar si hay errores */
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    };

    try {
        /* Extraer el proyecto */
        const { proyecto } = req.body;

        /* Busca el proyecto con su ID */
        const existeProyecto = await Proyecto.findById(proyecto);

        /* Revisa que el proyecto exista, si no, retorna error 404 */
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        /* Revisar si el proyecto actual pertenece al usuario autenticado */
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        /* Crear tarea */
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo error');
    }

};

/* Obtiene las tareas por proyecto */
exports.obtenerTareas = async (req, res) => {
    try {
        /* Extraer el proyecto */
        const { proyecto } = req.body;

        /* Busca el proyecto con su ID */
        const existeProyecto = await Proyecto.findById(proyecto);

        /* Revisa que el proyecto exista, si no, retorna error 404 */
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        /* Revisar si el proyecto actual pertenece al usuario autenticado */
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        /* Obtener las tareas por proyecto */
        const tareas = await Tarea.find({ proyecto })
        res.json({ tareas });
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
};

exports.actualizarTarea = async (req, res) => {
    try {
        /* Extraer el proyecto */
        const { proyecto, nombre, estado } = req.body;

        /* Busca el proyecto con su ID */
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        /* Revisar si el proyecto actual pertenece al usuario autenticado */
        const existeProyecto = await Proyecto.findById(proyecto);
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        /* Crear objeto con nueva info */
        const nuevaTarea = {};
        if (nombre) nuevaTarea.nombre = nombre;
        if (estado) nuevaTarea.estado = estado;

        /* Guardar la tarea */
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, {new: true});
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }

};
/* Elimina una tarea */
exports.eliminarTarea = async (req, res) => {
    try {
        /* Extraer el proyecto */
        const { proyecto } = req.body;

        /* Busca el proyecto con su ID */
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        /* Revisar si el proyecto actual pertenece al usuario autenticado */
        const existeProyecto = await Proyecto.findById(proyecto);
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        /* Eliminar */
        await Tarea.findOneAndRemove({_id : req.params.id});
        res.json({msg: 'Tarea eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }

};