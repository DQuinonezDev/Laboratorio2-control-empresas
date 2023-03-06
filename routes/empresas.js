const { Router } = require('express');
const { check } = require('express-validator');
const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');
const { emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('tipo', 'El tipo de empresa es obligatorio').not().isEmpty(),
    validarCampos,
] ,postEmpresa);

router.put('/editar', [
    validarJWT,
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('sucursales', 'Las sucursales son obligatorias').not().isEmpty(),
    validarCampos
] ,putEmpresa);


router.delete('/eliminar/', [
    validarJWT,
    validarCampos
] ,deleteEmpresa);


module.exports = router;
