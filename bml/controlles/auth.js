const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const { querySingle } = require('../../dal/data-access');

let usuario = null;
let sqlParams = null;

// Login with NATIVE
const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        sqlParams = [{
            'name': 'email',
            'value': email
        }];

        usuario = await querySingle('stp_usuarios_login', sqlParams);

        if (!usuario) {
            res.json({
                status: false,
                msg: 'Email no encontrado',
                data: null
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.json({
                status: false,
                msg: 'Password incorrect',
                data: null
            });
        }

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            status: true,
            msg: 'Acceso correcto',
            data: { usuario, token }
        });
    } catch {
        return res.json({
            status: false,
            msg: 'Login incorrecto. Credenciales incorrectas',
            data: null
        });
    }
}


// Login with GOOGLE
const googleSignIn = async (req, res = response) => {
    const googleToken = req.body.token;
    const { name, email, picture } = await googleVerify(googleToken);

    try {

        console.log(name);
        sqlParams = [{
            'name': 'email',
            'value': email
        }];

        usuario = await querySingle('stp_usuarios_login', sqlParams);
        if (!usuario) {
            // Crear usuario
            sqlParams = [
                {
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'imagen',
                    'value': picture
                },
                {
                    'name': 'local',
                    'value': 0
                },
                {
                    'name': 'google',
                    'value': 1
                }
            ];
            usuario = await querySingle('stp_usuarios_add', sqlParams);
            console.log('Usuario added');
        } else {
            // Actualizar usuario
            sqlParams = [
                {
                    'name': 'idUsuario',
                    'value': usuario.idUsuario
                },
                {
                    'name': 'nombre',
                    'value': usuario.nombre
                },
                {
                    'name': 'email',
                    'value': usuario.email
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'imagen',
                    'value': usuario.imagen
                }
            ];

            usuario = await querySingle('stp_usuarios_update', sqlParams);
            console.log('usuario updated');

        }

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            status: true,
            msg: 'Logeado correctamente',
            data: { usuario, token }
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: false,
            msg: 'Token de google no es correcto',
            data: error
        });
    }
}


// Obtener Usuario por EMAIL
const reset = async (req, res = response) => {
    const { email } = req.body;

    try {
        sqlParams = [
            {
                'name': 'email',
                'value': email
            }
        ];

        usuario = await querySingle('stp_usuarios_getbyemail', sqlParams);

        if (!usuario) {
            res.json({
                status: false,
                msg: 'Usuario inexistente',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'usuario encontrado',
                data: { usuario }
            });
        }
    } catch {
        return res.json({
            status: false,
            msg: 'Servidor desconcectado',
            data: err
        });
    }
}


// Renovar token
const newToken = async (req, res = response) => {
    try {
        const { id } = req.id;
        const token = await generateJWT(id);

        res.json({
            status: true,
            msg: 'Token nuevo',
            data: { token }
        });
    } catch (e) {
        console.error(e);
        res.json({
            status: false,
            msg: 'Token no se puede renovar',
            data: null
        });

    }

}


module.exports = {
    login,
    googleSignIn,
    newToken,
    reset
}