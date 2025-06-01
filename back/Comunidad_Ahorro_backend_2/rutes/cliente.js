const express = require('express');
const router = express.Router();

const { loginCliente } = require('../controllers/cliente');
const Venta = require('../models/Venta');

const { check } = require('express-validator');
const { validarCampos } = require('../midelwares/validarCampos');
const { validarJWTCliente } = require('../midelwares/validarJWTCliente');

// 🔐 Ruta de login de cliente
router.post('/login', [
  check("dni", "El DNI es obligatorio").not().isEmpty(),
  check("dni", "El DNI debe tener exactamente 8 caracteres").isLength({ min: 8, max: 8 }),
  check("dni", "El DNI debe contener solo números").isNumeric(),
  validarCampos
], loginCliente);

// 📦 Ruta para obtener ventas del cliente autenticado (por DNI)
router.get('/ventas/:dni', validarJWTCliente, async (req, res) => {
  const { dni } = req.params;

  console.log("📥 DNI recibido en backend:", dni);

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

module.exports = router;