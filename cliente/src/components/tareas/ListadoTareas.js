import React, { Fragment } from 'react';
import Tarea from './Tarea';

const ListadoTareas = () => {

    const tareasProyecto = [
        {nombre: 'elegir platafrma', estado: true},
        {nombre: 'elegir color', estado: false},
        {nombre: 'elegir pago', estado: false},
        {nombre: 'elegir hosting', estado: true}
    ]
    return ( 
        <Fragment>
            <h2>Proyecto: Testinglindo</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length===0 
                ? (<li className="tarea"><p>No hay tareas</p></li>) 
                : (tareasProyecto.map(tarea => (
                    <Tarea
                        tarea={tarea}
                    />
                )))
                }
            </ul>

            <button type="button" className="btn btn-eliminar">Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;