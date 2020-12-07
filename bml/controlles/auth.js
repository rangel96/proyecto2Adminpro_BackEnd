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
        console.log('Token: \n' + token);

        res.json({
            status: true,
            msg: 'Acceso correcto',
            data: { usuario, token }
        });
    } catch (err) {
        return res.json({
            status: false,
            msg: 'Login incorrecto n/Credenciales incorrectas',
            data: null
        });
    }
}

// Login with GOOGLE
const googleSignIn = async (req, res = response) => {
    const googleToken = req.body.token;
    const { name, email, picture } = await googleVerify(googleToken);

    sqlParams = [{
        'name': 'email',
        'value': email
    }];

    try {
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
        console.log('token: n/' + token);

        res.json({
            status: true,
            msg: 'Logeado correctamente',
            data: { usuario, token }
        })
    } catch (error) {
        console.log('');
        res.json({
            status: false,
            msg: 'Token de google no es correcto',
            data: error
        })
    }
}

module.exports = {
    login,
    googleSignIn
}