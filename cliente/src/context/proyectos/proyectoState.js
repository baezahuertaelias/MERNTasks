import React, { useState, useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS } from '../../types';


/* State inicial de todo lo que es la admin del proyecto (CRUD) */
const ProyectoState = props => {

    const proyectos = [
        { id: 1, nombre: 'tienda virtual' },
        { id: 2, nombre: 'intranet' },
        { id: 3, nombre: 'diseno web' }];    


    /* state similar al de Redux 
    /* Siempre es un objeto 
    /* Es para mostrar el boton de "agregar proyecto" */
    const initialState = {
        proyectos: [],
        formulario: false
    }
    /* useReducer es parecido a useState */
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

    /* Si le paso las cosas como objeto, en el otro lado tiene que usar el mismo nombre */
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                mostrarFormulario,
                obtenerProyectos
            }}>
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;