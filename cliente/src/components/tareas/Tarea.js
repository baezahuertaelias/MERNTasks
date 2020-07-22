import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Tarea = ({ tarea }) => {


    /* Extraer si un proyecto esta activo */
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    /* Obtener la funcion del context de tarea */
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    /* Extraer el proyecto */
    const [proyectoActual] = proyecto;

    /* Funcion que se ejecuta cuando el usuario presiona btn eliminar tarea */
    const tareaEliminar = id => {
        /* Elimina la tarea con su respectivo ID */
        eliminarTarea(id, proyectoActual._id);
        /* Se obtiene el proyecto actual con el context, posterior un destructuring y se refrezca solo el proyecto actual */
        obtenerTareas(proyectoActual.id);
    };

    /* Funcion que modifica el estado de la tarea */
    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    };

    /* Agrega una tarea actual cuando el usuario quiere editar */
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    };

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
            {tarea.estado
                    ? (<button type="button" onClick={() => cambiarEstado(tarea)} className="completo">Completo</button>)
                    : (<button type="button" onClick={() => cambiarEstado(tarea)} className="incompleto">Incompleto</button>)
                }
            </div>

            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => seleccionarTarea(tarea)}>Editar</button>
                <button type="button" className="btn btn-secundario" onClick={() => tareaEliminar(tarea._id)}>Eliminar</button>
            </div>
        </li>
    );
}

export default Tarea;