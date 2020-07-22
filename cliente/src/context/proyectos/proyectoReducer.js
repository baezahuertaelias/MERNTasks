import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, PROYECTO_ERROR, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';
/**
 * El reducer funcion igual que en Redux
 * Ayuda a manejar los distintos casos que pueden ocurrir en proyectoState 
 */
export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            /* Abre el formulario para se puede agregar un proyecto */
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
            /* Responde con todos los proyectos */
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            /**
             * Cuando se agrega el proyecto, genera una copia de lo que esta
             * Agrega el proyecto nuevo
             * Oculta el formulario
             * Oculta mensaje de error (nombre proyecto vacio)
             */
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case VALIDAR_FORMULARIO:
            /* Valida que el campo no este vacio
             * Muestra un mensaje de error
             */
            return {
                ...state,
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            /* Va a iterar hasta que el ID coincida y mande el correspondiente y lo manda en proyecto */
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            /* Va a eliminar SOLO el proyecto que coincide con el id */
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}