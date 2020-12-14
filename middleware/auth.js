const jwt = require('jsonwebtoken');
const JWTSecret = require('../token/JWTSecret')

function auth(req, res, next) {

    const authToken = req.headers['authorization']
    const bearer = authToken.split(' ');
    var token = bearer[1]
    
    if(authToken != undefined) {
        jwt.verify(token, JWTSecret, (error, data) => {
            if(error) {
                res.status(401);
                res.json('Token Inválido')
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email}
                next();
            }
        })
    } else {
        res.status(401);
    }

}

module.exports = auth;