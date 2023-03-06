const { Router } = require('express');

//Controllers
const { buscar } = require('../controllers/buscar');
// Middlewares


const router = Router();

//Manejo de rutas
router.get('/:coleccion/:termino' ,buscar);


module.exports = router;