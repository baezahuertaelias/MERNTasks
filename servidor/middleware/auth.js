const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    /* Leer token del header */
    const token = req.header('x-auth-token');
    console.log(token);

    /* Revisar si no hay token */
    if (!token) {
        return res.status(401).json({ msg: 'Token vacio' });
    }

    /* Validar el token */
    try {
        /* Verifica que el token sea valido */
        const cifrado = jwt.verify(token, process.env.SECRETA);
        /* Agregamos el token al request */
        req.usuario = cifrado.usuario;
        /* Para que siga al proximo middleware */
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido' });
    }
}