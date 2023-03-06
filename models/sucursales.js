const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El tipo es obligatorio']
    },
    municipio: {
        type: String,
        required: [true , 'La ubicacion es obligatoria']
    },
    empresa:{
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    },
    
});


module.exports = model('Sucursales', SucursalSchema);