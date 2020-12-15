const jwt = require('jsonwebtoken');
const JWTSecret = require('../token/JWTSecret')

function auth(req, res, next) {

    const authToken = req.headers['authorization']
    
    if(authToken != undefined) {
        console.log(authToken)
        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token, JWTSecret, (error, data) => {
            if(error) {
                res.status(401);
                res.json('Token Inválido')
            } else {
                req.token = token
                req.LoggedUser = {id: data.id, email: data.email}
                console.log(data)
                next()
            }
        })
    } else {
        res.json('Você não tem autorização para estar aqui')
        res.status(401);
    }

}

module.exports = auth;