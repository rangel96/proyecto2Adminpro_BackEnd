// Ruta api/login
const { Router } = require('express');
const { check } = require('express-validator')
const { validatorCampos } = require('../bml/middlewares/validation-values');
const { login, googleSignIn } = require('../bml/controlles/auth');

const router = Router();

// Login
router.post('/login', [
        check('email', 'Email obligatorio').isEmail(),
        check('password', 'Password obligatorio').not().isEmpty(),
        validatorCampos
    ],
    login
);

router.post('/google', [
        check('token', 'Token Google obligatorio').not().isEmpty(),
        validatorCampos
    ],
    googleSignIn
);

module.exports = router;