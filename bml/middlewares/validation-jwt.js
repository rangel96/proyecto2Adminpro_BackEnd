const jwt = require('jsonwebtoken');

const validationJWT = (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.json({
            status: false,
            msg: 'Token is NULL',
            data: null
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (e) {
        return res.json({
            status: false,
            msg: 'Token incorrecto',
            data: null
        })
    }
}

module.exports = {
    validationJWT
}