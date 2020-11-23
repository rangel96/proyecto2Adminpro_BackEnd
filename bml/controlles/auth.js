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
            res.status(204).json({
                ok: false,
                error: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(200).json({
                ok: false,
                error: 'Contraseña incorrecta'
            });
        }

        const token = await generateJWT(usuario.idUsuario);
        console.log('token: ' + token);

        res.status(201).json({
            ok: true,
            msg: 'Acceso correcto',
            token: token
        });
    } catch (err) {
        return res.status(204).json({
            ok: false,
            msg: 'Login incorrecto n/Credenciales incorrectas',
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

        res.status(201).json({
            ok: true,
            msg: 'Logeado correctamente',
            usuario,
            token: token
        })
    } catch (error) {
        console.log('');
        res.status(204).json({
            ok: false,
            msg: 'Token de google no es correcto',
            error: error
        })
    }
}

module.exports = {
    login,
    googleSignIn
}