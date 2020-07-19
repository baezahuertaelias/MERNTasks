const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


/* /api/auth */
exports.autenticarUsuario = async (req, res) => {

    /* Revisa si hay errores */
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    };

    /* Extraer email y password */
    const {email, password} = req.body;
    try {
        /* Revisar que sea un usuario registrado */
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        /* Revisar el password */
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

        /* Si todo es correcto Firmar el JWT */

        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //DURACION DE UNA HORA
        }, (error, token) => {
            if (error) throw error;

            /* Mensaje con el token */
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}

/* Obtiene usuario está autenticado */
exports.usuarioAutenticado = async(req,res)=>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); //Significa que quiero todo menos el campo password
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}