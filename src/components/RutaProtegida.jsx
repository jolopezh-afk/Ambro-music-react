import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// Solo deja pasar a los roles indicados; si no, redirige
function RutaProtegida({ roles, children }) {
    const { usuario } = useAuth();

    if (!usuario) return <Navigate to="/inicio-sesion" replace />;
    if (!roles.includes(usuario.rol)) return <Navigate to="/" replace />;

    return children;
}

export default RutaProtegida;
