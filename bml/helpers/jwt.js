const jwt = require('jsonwebtoken');

/* Genetate JSON Web Token (JWT) */
const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {id,};
        jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '12h'}, (err, token) => {
            if (err) {
                console.log(err);
                reject('JWT no generado');
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    generateJWT
}