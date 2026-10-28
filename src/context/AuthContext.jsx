import { createContext, useContext, useState } from "react";
import { usuarios } from "../data/usuarios";

const AuthContext = createContext(null);
const CLAVE = "usuarioAmbroMusic";

function leerSesion() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE));
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(leerSesion);

    // Devuelve la sesión si los datos son correctos, o null si no
    function iniciarSesion(email, password) {
        const encontrado = usuarios.find(
            (u) => u.email === email.trim().toLowerCase() && u.password === password
        );
        if (!encontrado) return null;

        const sesion = { email: encontrado.email, nombre: encontrado.nombre, rol: encontrado.rol };
        localStorage.setItem(CLAVE, JSON.stringify(sesion));
        setUsuario(sesion);
        return sesion;
    }

    function cerrarSesion() {
        localStorage.removeItem(CLAVE);
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
