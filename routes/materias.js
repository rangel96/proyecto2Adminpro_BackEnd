// Ruta api/usuarios
const { Router } = require('express');
const { check } = require('express-validator')

const { validatorCampos } = require('../bml/middlewares/validation-values');
const {
    getMaterias,
    getMateriaId,
    addMateria,
    updateMateria,
    deleteMateria,
} = require('../bml/controlles/materias');

const router = Router();

// GetAll
router.get('/', getMaterias);


// GetById
router.get('/:id', getMateriaId);


// Add User
router.post('/',
    [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('horas', 'Horas no válidas').not().isEmpty(),
        check('horasp', 'Horas P no válidas').not().isEmpty(),
        check('horast', 'HorasT no válidas').not().isEmpty(),
        check('creditos', 'Créditos no válidas').not().isEmpty(),
        validatorCampos,
    ],
    addMateria
);


// Edit User
router.put('/:id',
    [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('horas', 'Horas no válidas').not().isEmpty(),
        check('horasp', 'Horas P no válidas').not().isEmpty(),
        check('horast', 'HorasT no válidas').not().isEmpty(),
        check('creditos', 'Créditos no válidas').not().isEmpty(),
        validatorCampos,
    ],
    updateMateria
);


// Delete User
router.delete('/:id', deleteMateria);


module.exports = router;