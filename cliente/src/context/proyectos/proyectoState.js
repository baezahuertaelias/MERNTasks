import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, PROYECTO_ERROR, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';

import clienteAxios from '../../config/axios';

/* State inicial de todo lo que es la admin del proyecto (CRUD) */
const ProyectoState = props => {

    /* El state funciona similar al de Redux 
    /* Siempre es un objeto 
    /* Sirve para manejar los datos que se van trabajando en el sidebar */
    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null, 
        mensaje: null
    }
    /* useReducer es parecido a useState
    /* Dispatch para ejecutar acciones */
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    /* Serie de funciones para CRUD */
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    };

    /* Obtener los proyectos 
    /* El payload es lo que toma por funcion */
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }


    /* Agregar nuevo proyecto */
    const agregarProyecto = async proyecto => {
        try {

            const resultado = await clienteAxios.post('/api/proyectos', proyecto);

            /* Insertar el proyecto en el state */
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            });

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    /* Valida formulario por errores */
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    };

    /* Selecciona el proyecto que el usuario dio click */
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    };

    /* Elimina un proyecto */
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    /* Si le paso las cosas como objeto, en el otro lado tiene que usar el mismo nombre */
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}>
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;