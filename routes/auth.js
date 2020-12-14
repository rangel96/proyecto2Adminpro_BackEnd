// Ruta api/auth
const { Router } = require('express');
const { check } = require('express-validator');

const { validationJWT } = require('../bml/middlewares/validation-jwt');
const { validatorCampos } = require('../bml/middlewares/validation-values');
const { login, googleSignIn, newToken, reset } = require('../bml/controlles/auth');

const router = Router();

// Login nativo
router.post('/login',
    [
        check('email', 'Email obligatorio').isEmail(),
        check('password', 'Password obligatorio').not().isEmpty(),
        validatorCampos
    ],
    login
);

// Login google
router.post('/google',
    [
        check('token', 'Token Google obligatorio').not().isEmpty(),
        validatorCampos
    ],
    googleSignIn
);

// Renovar token
router.post('/token', validationJWT, newToken);

// Reset pasword
router.post('/reset',
    [
        check('email', 'Email obligatorio').isEmail(),
        validatorCampos
    ],
    reset);

module.exports = router;