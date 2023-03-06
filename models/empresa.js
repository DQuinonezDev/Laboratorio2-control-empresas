const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio' ]
    },
    tipo: {
        type: String,
        required: true,
    }, 
    sucursales:[{
        type: Schema.Types.ObjectId,
        ref: 'Sucursales',
        default: ['no hay sucursales aun']
    }],
    rol: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
});


module.exports = model('Empresa', EmpresaSchema);