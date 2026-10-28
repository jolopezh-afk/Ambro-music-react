// Cuentas de prueba. Solo sirve para desarrollo: en un sitio real el login
// debe validarse en un servidor y las contraseñas nunca van en el código.
export const usuarios = [
    { email: "admin@ambromusic.cl", password: "admin123", rol: "admin", nombre: "Administrador" },
    { email: "vendedor@ambromusic.cl", password: "vendedor123", rol: "vendedor", nombre: "Vendedor" },
    { email: "cliente@ambromusic.cl", password: "cliente123", rol: "comprador", nombre: "Cliente" },
];

// A dónde va cada rol después de iniciar sesión
export const rutaPorRol = {
    admin: "/admin",
    vendedor: "/vendedor",
    comprador: "/productos",
};

export const nombreRol = {
    admin: "Administrador",
    vendedor: "Vendedor",
    comprador: "Comprador",
};
