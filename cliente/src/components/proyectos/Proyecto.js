import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {

    /* Obtener state del formulario */
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    /* Obtener la funcion del context de tarea */
    const tareasContext= useContext(tareaContext);
    const {obtenerTareas} = tareasContext;


    /* Funcion para agregar el proyecto actual */
    const seleccionarProyecto = id => {
        /**
     * proyectoActual manda el id al proyectoState
     * proyectoState manda el dato al dispatch (proyectoReducer)
     * proyectoReducer hace el filtro
     */
        proyectoActual(id); //Fija el proyecto actual
        obtenerTareas(id); //Filtra las tareas cuando se da click
    }

    
    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
    );
}

export default Proyecto;