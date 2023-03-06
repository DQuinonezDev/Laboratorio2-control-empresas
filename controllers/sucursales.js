const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Sucursal = require('../models/sucursales');
const Empresa = require('../models/empresa');

const getSucursales = async (req = request, res = response) => {

    //Condiciones del get
    const query = req.body;

    const listaSucursales = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query).populate('empresa', 'nombre')
    ]);

    res.status(201).json({
        msg: 'GET SUCURSALES',
        listaSucursales
    })

}

const postSucursal = async (req = request, res = response) => {
    const { nombre, municipio, empresa } = req.body;
    const sucursalGuardadaDB = new Sucursal({ nombre: nombre.toUpperCase(), municipio, empresa });

    const sucursalDB = await Sucursal.findOne({ nombre: nombre.toUpperCase() });


    if (sucursalDB) {
        return res.status(400).json({
            msg: `La sucursal ya existe en la DB`
        })
    } else {


        await sucursalGuardadaDB.save();
        res.status(201)
            .json({
                msg: 'POST SUCURSAL',
                sucursalGuardadaDB
            });

    }


}


const putSucursal = async (req = request, res = response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    const sucursalDB = await Sucursal.findOne({ nombre: resto.nombre });

    if (sucursalDB) {
        return res.status(400).json({
            msg: `La sucursal ya existe en la DB`
        })
    } else {

        const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto, { new: true });
        res.status(201).json(sucursalEditada);

    }

}




const deleteSucursal = async (req = request, res = response) => {
    const { id } = req.params;

    const sucursalE = await Sucursal.findById(id);

    if(!sucursalE){
        res.status(404).json({ msg:'La sucursal ya ha sido eliminada' });
    }

    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);
    res.status(201).json({
        msg: "DELETE SUCURSAL",
        sucursalEliminada
    });

}


module.exports = {
    getSucursales,
    postSucursal,
    putSucursal,
    deleteSucursal,
}


// CONTROLADOR