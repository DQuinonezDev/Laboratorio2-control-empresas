const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {

    const query = { estado: true };

    const listaEmpresas = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
        .populate('sucursales', 'nombre , municipio')
    ]);

    res.status(201).json(listaEmpresas)

}

const postEmpresa = async (req = request, res = response) => {
    
    const { nombre, correo, password, tipo, sucursales, rol="EMPRESA" ,...body } = req.body;
    const empresaGuardadaDB = new Empresa({ nombre, correo, password, rol, tipo, sucursales, ...body });

    // Ocultar la contrasena
    const salt = bcrypt.genSaltSync();
    empresaGuardadaDB.password = bcrypt.hashSync(password, salt);

    const empresaDB = await Empresa.findOne({ nombre: nombre });

    // Validacion si la empresa ya existe
    if (empresaDB) {
        return res.status(400).json({
            msg: `La empresa ${empresaDB.nombre} ya existe en la DB`
        })
    } else {
        await empresaGuardadaDB.save();
        res.status(201).json(empresaGuardadaDB);
    }
    //Guardar en la DB

}


const putEmpresa = async (req = request, res = response) => {
    const _id = req.usuario.id;
    const { correo, password, ...resto } = req.body;

    
    //Editar al Curso por el id
    const empresaEditada = await Empresa.findByIdAndUpdate(_id, resto);

    res.status(201).json(empresaEditada);

}

const deleteEmpresa = async (req = request, res = response) => {
    const _id = req.usuario.id;

    //Eliminar fisicamente de la DB
    const empresaEliminada = await Empresa.findByIdAndDelete(_id);

    res.status(201).json(empresaEliminada);
}


module.exports = {
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
}


// CONTROLADOR