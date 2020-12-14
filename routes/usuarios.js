// Ruta api/usuarios
const { Router } = require('express');
const { check } = require('express-validator')

const { validatorCampos } = require('../bml/middlewares/validation-values');
const { validationJWT } = require('../bml/middlewares/validation-jwt');
const {
    getUsuarios,
    getUsuarioId,
    addUsuario,
    updateUsuario,
    deleteUsuario,
} = require('../bml/controlles/usuarios');

const router = Router();

// GetAll
router.get('/', getUsuarios);

// GetById
router.get('/id/:id', getUsuarioId);

// Add User
router.post('/',
    [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('email', 'Email no válido').isEmail(),
        check('password', 'Password no válido').not().isEmpty(),
        validatorCampos,
    ],
    addUsuario
);

// Edit User
router.put('/:id',
    [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('email', 'Email no válido').isEmail(),
        check('password', 'Password no válido').not().isEmpty(),
        validatorCampos,
    ],
    updateUsuario
);

// Delete User
router.delete('/:id', deleteUsuario);


module.exports = router;