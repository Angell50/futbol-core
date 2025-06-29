const ValidacionesUsuario = (() => {
  const esCorreoValido = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const esContraseñaSegura = (contraseña) => {
    return contraseña && contraseña.length >= 6;
  };

  return {
    esCorreoValido,
    esContraseñaSegura,
  };
})();

export default ValidacionesUsuario;
