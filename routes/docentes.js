// Ruta api/usuarios
const { Router } = require('express');
const { check } = require('express-validator')

const { validatorCampos } = require('../bml/middlewares/validation-values');
const {
    getDocentes,
    getDocenteId,
    addDocente,
    updateDocente,
    deleteDocente,
} = require('../bml/controlles/docentes');

const router = Router();

// GetAll
router.get('/', getDocentes);


// GetById
router.get('/:id', getDocenteId);


// Add User
router.post('/',
    [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('edad', 'Edad no válido').not().isEmpty(),
        check('titulo', 'Título no válido').not().isEmpty(),
        check('tipo', 'Tipo no válido').not().isEmpty(),
        validatorCampos,
    ],
    addDocente
);


// Edit User
router.put('/:id',
    [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('edad', 'Edad no válido').not().isEmpty(),
        check('titulo', 'Título no válido').not().isEmpty(),
        check('tipo', 'Tipo no válido').not().isEmpty(),
        validatorCampos,
    ],
    updateDocente
);


// Delete User
router.delete('/:id', deleteDocente);


module.exports = router;