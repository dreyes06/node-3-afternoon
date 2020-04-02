require('dotenv').config()
const express = require('express')
const massive = require('massive')
const product_controller = require("./product_controller");


const app = express()

app.use(express.json())

const {SERVER_PORT, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance)
    }).catch(error => {
        console.log(error)
    });



app.post('/api/products', product_controller.create);
app.get('/api/products', product_controller.getAll);
app.get('/api/products/:id', product_controller.getOne);
app.put('/api/products/:id', product_controller.update);
app.delete('/api/products/:id', product_controller.delete);

app.listen(SERVER_PORT, () => {console.log(`Running on ${SERVER_PORT}.`)})