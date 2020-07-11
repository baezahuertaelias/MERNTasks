import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS } from '../../types';


/* El reducer funcion igual que en Redux */
export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        default:
            return state;
    }
}