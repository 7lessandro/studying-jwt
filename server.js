const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

const DB = require('./database/db')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())

//Autenticação login/web json token
app.post('/auth', (req, res) => {
    var {email, password} = req.body;

    if(email != undefined) {

        var user = DB.users.find(user => user.email === email)

        if(user != undefined) {

            if(user.password == password) {
                res.status(200);
                res.json({token: "token falso"})
            } else {
                res.status(401);
                res.json({error: "Senha inválida"})

            }

        } else {
            res.status(404);
            res.json({error: "O e-mail não existe"})
        }

    } else {
        res.status(400);
        res.json({error: "O e-mail é inválido"})
    }
})


app.get('/games', (req, res) => {
    res.statusCode = 200
    res.json(DB.games)

})

app.get('/game/:id', (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id === id)

        if(game != undefined) {
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
})

app.post('/game', (req, res) => {
    var {id, name, year, price} = req.body;
    
    DB.games.push({
        id,
        name,
        year,
        price
    })

    res.sendStatus(200)

})

app.delete('/game/:id', (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var index = DB.games.findIndex((g => g.id == id))

        if(index == -1) {
            res.sendStatus(404)
        } else {
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }
})

app.put('/game/:id', (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id === id)

        if(game != undefined) {
            var {name, year, price} = req.body;

            if(name != undefined) {
                game.name = name
            }

            if(year != undefined) {
                game.year = year
            }

            if(price != undefined) {
                game.price = price
            }

            res.sendStatus(200)

        } else {
            res.sendStatus(404)
        }
    }
})

app.listen(PORT, () => {
    console.log('Api [OK]')
})