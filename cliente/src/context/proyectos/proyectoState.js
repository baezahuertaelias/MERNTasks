import React, { useReducer } from 'react'; 
import { v4 as uuidv4 } from 'uuid';


import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';


/* State inicial de todo lo que es la admin del proyecto (CRUD) */
const ProyectoState = props => {

    /* Proyectos temporales */
    const proyectos = [
        { id: 1, nombre: 'tienda virtual' },
        { id: 2, nombre: 'intranet' },
        { id: 3, nombre: 'diseno web' }];    


    /* El state funciona similar al de Redux 
    /* Siempre es un objeto 
    /* Sirve para manejar los datos que se van trabajando en el sidebar */
    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null
        
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
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    /* Agregar nuevo proyecto */
    const agregarProyecto = proyecto => {
        
        /* De esta manera si me esta generando un uuid */
        proyecto.id = uuidv4();

        /* Insertar el proyecto en el state */
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    };

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
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    /* Si le paso las cosas como objeto, en el otro lado tiene que usar el mismo nombre */
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
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