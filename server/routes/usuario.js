const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

const Usuario = require('../models/usuario');


// ===================
// API REST de Usuario
// ===================


// Método: GET
app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.countDocuments({estado: true}, (err, contador) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: contador
                })
            })


        });
});

// Método: POST 
app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({

        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

// Método: PUT 
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuario
        })
    })


});


// Método: DELETE
app.delete('/usuario/:id', (req, res) => {
    
    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuario) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuario){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario
        });
    });

    // Usuario.findByIdAndRemove(id, (err, usuario) => {
    //     if(err){
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if(!usuario){
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario
    //     });
    // });
});

module.exports = app;