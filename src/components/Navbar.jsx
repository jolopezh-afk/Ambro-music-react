import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import { rutaPorRol } from "../data/usuarios";

const enlaces = [
    { to: "/", texto: "Inicio" },
    { to: "/categorias", texto: "Categorías" },
    { to: "/productos", texto: "Productos" },
    { to: "/ofertas", texto: "Ofertas" },
    { to: "/contacto", texto: "Contacto" },
];

function Navbar() {
    const [texto, setTexto] = useState("");
    const navigate = useNavigate();
    const { usuario, cerrarSesion } = useAuth();
    const { totalItems } = useCarrito();

    function salir() {
        cerrarSesion();
        navigate("/");
    }

    function buscar(e) {
        e.preventDefault();
        const consulta = texto.trim();
        navigate(consulta ? `/productos?buscar=${encodeURIComponent(consulta)}` : "/productos");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-ambromusic">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/img/logo_barra_inicio.png"
                        alt="AmbroMusic"
                        className="logo-ambromusic"
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarAmbroMusic"
                    aria-controls="navbarAmbroMusic"
                    aria-expanded="false"
                    aria-label="Mostrar navegación"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarAmbroMusic">
                    <form
                        className="d-flex mx-lg-4 my-3 my-lg-0 flex-grow-1"
                        role="search"
                        onSubmit={buscar}
                    >
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar equipos de música..."
                            aria-label="Buscar"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                        />

                        <button className="btn btn-ambromusic" type="submit">
                            Buscar
                        </button>
                    </form>

                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {enlaces.map(({ to, texto }) => (
                            <li className="nav-item" key={to}>
                                {/* "end" en Inicio evita que quede activo en todas las páginas */}
                                <NavLink className="nav-link" to={to} end={to === "/"}>
                                    {texto}
                                </NavLink>
                            </li>
                        ))}

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/carrito">
                                🛒 Carrito ({totalItems})
                            </NavLink>
                        </li>

                        {usuario ? (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text ms-lg-2">Hola, {usuario.nombre}</span>
                                </li>

                                {usuario.rol !== "comprador" && (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={rutaPorRol[usuario.rol]}>
                                            Mi panel
                                        </NavLink>
                                    </li>
                                )}

                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="btn btn-outline-light ms-lg-2 mt-2 mt-lg-0"
                                        onClick={salir}
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link
                                    className="btn btn-ambromusic ms-lg-2 mt-2 mt-lg-0"
                                    to="/inicio-sesion"
                                >
                                    Iniciar sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
