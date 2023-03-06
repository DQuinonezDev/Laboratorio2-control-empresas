const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Sucursal = require('../models/sucursales');
const Empresa = require('../models/empresa');
const empresa = require('../models/empresa');


const coleccionesPermitidas = [
    'sucursales',
    'empresa'
];


const buscarSucursales = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);  //TRUE

    if (esMongoID) {
        const sucursal = await Sucursal.findById(termino);

        return res.json({
            //results: [ usuario ]
            results: (sucursal) ? [sucursal] : []
            //Preugntar si el usuario existe, si no existe regresa un array vacio
        });
    }

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp(termino, 'i');

    const sucursal = await Sucursal.find({
        $or: [{ nombre: regex }, { municipio: regex }],
    });


    res.json({
        results: sucursal
    })

}


const buscarEmpresas = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);  //TRUE

    if (esMongoID) {
        const empresa = await Empresa.findById(termino);

        return res.json({
            //results: [ usuario ]
            results: (empresa) ? [empresa] : []
            //Preugntar si el usuario existe, si no existe regresa un array vacio
        });
    }

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp(termino, 'i');

    const empresa = await Empresa.find({
        $or: [{ nombre: regex }],
    });


    res.json({
        results: empresa
    })

}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `La colección: ${coleccion} no existe en la DB. Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }


    switch (coleccion) {
        case 'sucursales':
            buscarSucursales(termino, res);
            break;
        case 'empresa':
            buscarEmpresas(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'La sucursal no existe'
            });
            break;
    }

}


module.exports = {
    buscar
}