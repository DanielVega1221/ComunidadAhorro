const express = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../midelwares/validarCampos');
const { validarJWTVentas } = require('../midelwares/ValidarSWTVentas');
const { crearVentaCompleta, cargarPrestamos, cargarSistemaVentas } = require('../controllers/RegVentas');


const routerVentas = express.Router();




//para crear la venbta completa
routerVentas.post('/new-venta',validarJWTVentas,

    [
      check('dni', 'El DNI es obligatorio y debe tener 8 caracteres').isLength({ min: 8, max: 8 }).isNumeric(),
  
      validarCampos, // Middleware para validar los campos de entrada
    ],
    crearVentaCompleta
);

routerVentas.get('/ventas-pres', validarJWTVentas, cargarPrestamos);

routerVentas.get('/ventas-sis-vta', validarJWTVentas, cargarSistemaVentas);

routerVentas.get('/cliente/:dni', validarJWTVentas, async (req, res) => {
  const { dni } = req.params;

  try {
    const ventas = await Venta.find({ 'cliente.dni': dni });

    if (!ventas.length) {
      return res.status(404).json({ msg: 'No hay ventas registradas para este cliente.' });
    }

    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas del cliente:', error);
    res.status(500).json({ msg: 'Error interno al cargar ventas.' });
  }
});





module.exports = routerVentas;