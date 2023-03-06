const { Router } = require('express');
const { check } = require('express-validator');
const { getSucursales, postSucursal, deleteSucursal, putSucursal } = require('../controllers/sucursales');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
// const { check } = require('express-validator');
// // const { tieneRole } = require('../middlewares/validar-roles');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { emailExiste, esTipoValido } = require('../helpers/db-validators');
// const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');
const router = Router();

router.get('/mostrar', getSucursales);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('municipio', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] ,postSucursal);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('municipio', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,putSucursal);


router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    validarCampos   
] , deleteSucursal);


module.exports = router;


// ROUTES