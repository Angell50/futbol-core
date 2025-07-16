const ValidacionesUsuario = (() => {
  const esCorreoValido = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const esContraseñaSegura = (contraseña) => {
    return contraseña && contraseña.length >= 6;
  };

  const validar = ({ correo, contraseña, rol }) => {
    if (!esCorreoValido(correo)) {
      return 'Correo inválido.';
    }
    if (!esContraseñaSegura(contraseña)) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (!rol) {
      return 'Debe seleccionar un rol.';
    }
    return null;
  };

  return {
    esCorreoValido,
    esContraseñaSegura,
    validar, // <- Aquí exportas la función
  };
})();

export default ValidacionesUsuario;
