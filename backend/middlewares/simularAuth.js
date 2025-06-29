// Simula un usuario autenticado leyendo de headers
module.exports = (req, res, next) => {
  const correo = req.header('x-user');
  const rol = req.header('x-role');

  if (!correo || !rol) {
    return res.status(401).json({ mensaje: 'No autenticado' });
  }

  req.usuario = { correo, rol }; // Guarda en req para usar luego
  next();
};
