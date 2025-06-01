const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cliente = require("../models/Cliente");

const loginCliente = async (req, res) => {
  console.log("📥 DNI recibido en backend:", req.body.dni);
  String(req.body.dni);
  const { dni } = req.body;

  try {
    // 1. Buscar cliente por DNI
    console.log("🔍 Buscando cliente con DNI:", dni);
    const cliente = await Cliente.findOne({ dni });
    console.log("🔎 Resultado de búsqueda:", cliente);
    if (!cliente) {
      return res.status(400).json({
        ok: false,
        msg: "Credenciales inválidas", // mensaje genérico
      });
    }

    // 2. Crear payload para el token
    const payload = {
      id: cliente._id,
      dni: cliente.dni,
      nombre: `${cliente.nombre} ${cliente.apellido}`,
      rol: "cliente", // Asignamos un rol genérico
    };

    // 3. Generar token
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "2h",
    });

    // 4. Responder con éxito
    res.status(200).json({
      ok: true,
      cliente,
      token,
      msg: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error("Error en loginCliente:", error);
    res.status(500).json({
      ok: false,
      msg: "Error interno. Contacte al administrador",
    });
  }
};

module.exports = {
  loginCliente,
};
