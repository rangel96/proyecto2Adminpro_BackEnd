// Ruta api/usuarios
const { Router } = require('express');
const { check } = require('express-validator')

const { validatorCampos } = require('../bml/middlewares/validation-values');
const {
    getAlumnos,
    getAlumnoId,
    addAlumno,
    updateAlumno,
    deleteAlumno,
} = require('../bml/controlles/alumnos');

const router = Router();

// GetAll
router.get('/', getAlumnos);


// GetById
router.get('/:id', getAlumnoId);


// Add User
router.post('/',
    [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('edad', 'Edad no válido').not().isEmpty(),
        check('sexo', 'Sexo no válido').not().isEmpty(),
        check('semestre', 'Semestre no válido').not().isEmpty(),
        check('carrera', 'Carrera no válida').not().isEmpty(),
        validatorCampos,
    ],
    addAlumno
);


// Edit User
router.put('/:id',
    [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('edad', 'Edad no válido').not().isEmpty(),
        check('sexo', 'Sexo no válido').not().isEmpty(),
        check('semestre', 'Semestre no válido').not().isEmpty(),
        check('carrera', 'Carrera no válida').not().isEmpty(),
        validatorCampos,
    ],
    updateAlumno
);


// Delete User
router.delete('/:id', deleteAlumno);


module.exports = router;