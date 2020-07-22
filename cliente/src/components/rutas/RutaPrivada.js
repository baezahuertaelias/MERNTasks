import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

/** 
 * Es crear un compoenente, tomando su input de otro compoennte
 * Revisa si el usuario esta autenticado
 * Si esta autenticado, lo manda a la pagina que corresponde
 * caso contrario, lo manda al index
*/
const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return (

        <Route {...props} render={props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
                <Component {...props} />
            )}

        />
    );
}

export default RutaPrivada;