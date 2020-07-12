import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../types';

const TareaState = props => {
    /*State incial */
    const initalState = {
        tareas: [
            { id: 1, proyectoId: 1, nombre: 'Elegir plataforma', estado: true },
            { id: 2, proyectoId: 2, nombre: 'Elegir colores', estado: false },
            { id: 3, proyectoId: 3, nombre: 'Elegir plataformas de pago', estado: false },
            { id: 4, proyectoId: 4, nombre: 'elegir hosting', estado: true },
            { id: 5, proyectoId: 1, nombre: 'Elegir plataforma', estado: true },
            { id: 6, proyectoId: 2, nombre: 'Elegir colores', estado: false },
            { id: 7, proyectoId: 3, nombre: 'Elegir plataformas de pago', estado: false },
            { id: 8, proyectoId: 4, nombre: 'Elegir plataforma', estado: true },
            { id: 9, proyectoId: 1, nombre: 'Elegir colores', estado: false },
            { id: 10, proyectoId: 2, nombre: 'Elegir plataformas de pago', estado: false },
            { id: 11, proyectoId: 3, nombre: 'Elegir plataforma', estado: true },
            { id: 12, proyectoId: 4, nombre: 'Elegir colores', estado: false },
            { id: 13, proyectoId: 3, nombre: 'Elegir plataformas de pago', estado: false }
        ],
        /* Va a ser nulo hasta que el usuario elija una tarea */
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    };

    /* Crear dispatch y state */
    const [state, dispatch] = useReducer(TareaReducer, initalState);

    /* Crear funciones */
    /* Obtener las tareas de un proyecto */
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    };

    /* Agregar tarea al proyecto seleccionado */
    const agregarTarea = tarea => {
        /* Agrego un id unico, pq estaria borrando varias tareas que no deberia */
        tarea.id = uuidv4();

        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    };

    /* Valida y muestra un error en caso que exista */
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    };

    /* Eliminar tarea por ID */
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    };

    /* Cambia el estado de la tarea */
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    };

    /* Extrae una tarea para edicion */
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    };

    /* Modifica o edita una tarea */
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    };

    /* Elimina tarea seleccionada */
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider value={{
            tareas: state.tareas,
            tareasproyecto: state.tareasproyecto,
            errortarea: state.errortarea,
            tareaseleccionada: state.tareaseleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
        }}>
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;