const jwt = require('jsonwebtoken');

const valitationJWT = (req, res, next) => {
    const token = req.headers("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            error: 'Token is NULL'
        });
    }

    try {
        const {id}=jwt.verify(token,process.env.JWT_SECRET)
        req.id = id;
        next();
    } catch (e) {
        return res.status(401).json({
            ok: false,
            error: 'Token incorrecto'
        })
    }
}

module.exports = {
    valitationJWT
}