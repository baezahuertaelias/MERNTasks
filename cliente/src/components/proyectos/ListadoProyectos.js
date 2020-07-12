import React,{useContext, useEffect} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {

    /* Extraer proyectos del state inicial */
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;

    useEffect(()=>{
        obtenerProyectos();
        // eslint-disable-next-line
    },[]);
    
    /* Revisar si proyectos tiene contenido */
    if(proyectos.length===0) return <p>No hay proyectos</p>;

    

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
            {proyectos.map(proyecto => (
                <CSSTransition key={proyecto.id} timeout={200} classNames="proyecto">
                    <Proyecto proyecto={proyecto} />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;