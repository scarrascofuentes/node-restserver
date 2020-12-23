const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos= {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

// Crea modelo de Usuario
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    }, 
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    img: {
        type: String,
        required: [false, 'La imagen no es necesaria']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
        
    },
    estado: {
        type: Boolean,
        required: [true, 'El password es necesario'],
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Impide que 'password' sea devuelto en objeto tras consulta a API REST
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

// Agrega mensaje de error para campos del modelo que deben ser únicos
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único'});


module.exports = mongoose.model('Usuario', usuarioSchema);

