import React, { useReducer } from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../types';

const TareaState = props => {
    /*State incial */
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    };

    /* Crear dispatch y state */
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    /* Crear funciones */
    /* Obtener las tareas de un proyecto */
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    };

    /* Agregar tarea al proyecto seleccionado */
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
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