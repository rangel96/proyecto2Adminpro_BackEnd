const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');

const { query, querySingle, execute } = require('../../dal/data-access');

let usuarios = null;
let usuario = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Usuarios  */
const getUsuarios = async (req, res) => {
    try {
        usuarios = await query('stp_usuarios_getall');

        if (!usuarios) {
            console.log("BD vacia");
            res.status(101).json({
                ok: true,
                msg: 'Ingresar usuarios'
            });
        } else {
            res.status(200).json({
                ok: true,
                usuarios
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.status(400).json({
            ok: false,
            msg: 'No se puede obtener los usuarios',
            error: err
        });
    }
}

/* Obtener UN Usuario */
const getUsuario = async (req, res) => {
    const idUser = req.params.id;

    try {
        sqlParams = [{
            'name': 'idUsuario',
            'value': idUser
        }];

        const resp = await querySingle('stp_usuarios_getbyid', sqlParams);
        usuario = resp;

        if (!usuario) {
            console.log("Usuario no encontrado");
            res.status(204).json({
                ok: true,
                msg: 'Usuario inexistente o vacio',
            });
        } else {
            res.status(200).json({
                ok: true,
                usuario: usuario
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.status(401).json({
            ok: false,
            msg: 'Usuario no encontrado, intentelo de nuevo',
            error: err
        });
    }
}

/*  Agregar un Usuario (Check encryptation) */
const addUsuario = async (req, res = response) => {
    const { nombre, email, password, imagen } = req.body;

    /* Encryptar password */
    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(password, salt);

    try {
        sqlParams = [
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': passwordEncrypted
            },
            {
                'name': 'imagen',
                'value': imagen
            },
            {
                'name': 'local',
                'value': 1
            },
            {
                'name': 'google',
                'value': 0
            },
        ];

        usuario = await query('stp_usuarios_add', sqlParams);
        console.log('Usuario added');

        const token = await generateJWT(usuario.idUsuario);
        console.log('Token: \n' + token)

        res.status(200).json({
            ok: true,
            msg: 'Usuario agregado correctamente',
            usuario,
            token: token
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.status(404).json({
            ok: false,
            msg: 'El usuario no se pudo agregar',
            error: err
        });
    }
}

/* Editar Usuario */
const updateUsuario = async (req, res = response) => {
    const idUsuario = req.params.id;
    const { nombre, email, password, imagen } = req.body;

    // Encryptar password
    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(password, salt);

    try {
        sqlParams = [
            {
                'name': 'idUsuario',
                'value': idUsuario
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': passwordEncrypted
            },
            {
                'name': 'imagen',
                'value': imagen
            }
        ];

        usuario = await execute('stp_usuarios_update', sqlParams);
        console.log('Usuario Edited');

        const token = await generateJWT(usuario.idUsuario);
        console.log('Token: \n' + token);

        res.json({
            ok: true,
            msg: 'Usuario modificado correctamente',
            usuario,
            token: token
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.status(401).json({
            ok: false,
            msg: 'El usuario no se pudo actualizar',
            error: err
        });
    }
}

/* Eliminar Usuario */
const deleteUsuario = async (req, res) => {
    const idUsuario = req.params.id;

    try {
        sqlParams = [{
            'name': 'idUsuario',
            'value': idUsuario
        }];

        usuario = await execute('stp_usuarios_delete', sqlParams);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.status(401).json({
            ok: false,
            msg: 'Usuario no se pudo eliminar',
            error: err
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario,
}