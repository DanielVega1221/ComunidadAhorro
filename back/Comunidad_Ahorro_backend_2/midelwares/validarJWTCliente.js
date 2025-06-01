const jwt = require('jsonwebtoken');

const validarJWTCliente = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);

    if (payload.rol !== 'cliente') {
      return res.status(403).json({
        ok: false,
        msg: 'Acceso denegado: Solo usuarios con rol cliente pueden acceder.',
      });
    }

    req.id = payload.id;
    req.dni = payload.dni;
    req.rol = payload.rol;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido o expirado.',
    });
  }
};

module.exports = {
  validarJWTCliente
};
