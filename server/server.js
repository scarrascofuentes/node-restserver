require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'))

// Conexión a MongoDB
mongoose.connect(
    process.env.URLDB,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    (err, res) => {
        if (err)
            throw err;

        console.log('Base de datos ONLINE');

    });

// Texto plano por pantalla
app.get('/', (req, res) => res.send('Bienvenido!'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);

})