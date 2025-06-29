// Verifica si el usuario es admin
module.exports = (req, res, next) => {
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso restringido solo para administradores' });
  }
  next();
};
