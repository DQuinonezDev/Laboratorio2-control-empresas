const Empresa = require('../models/empresa');
//Este archivo maneja validaciones personalizadas


    const emailExiste = async (correo = '') => {

        //Verificamos si el correo ya existe en la DB
        const existeEmail = await Empresa.findOne({ correo });

        //Si existe (es true) lanzamos excepción
        if (existeEmail) {
            throw new Error(`El correo: ${correo} ya existe y esta registrado en la DB`);
        }

    }


module.exports = {
    emailExiste,
}
