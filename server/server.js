const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Texto plano por pantalla
app.get('/', (req, res) => res.send('Bienvenido!'));

app.listen(3000, () => {
    console.log('Escuchando puerto: ', 3000);

})