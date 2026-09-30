import { Link } from "react-router";

function Navbar() {
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

                <div
                    className="collapse navbar-collapse"
                    id="navbarAmbroMusic"
                >
                    <form
                        className="d-flex mx-lg-4 my-3 my-lg-0 flex-grow-1"
                        role="search"
                    >
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar equipos de música..."
                            aria-label="Buscar"
                        />

                        <button
                            className="btn btn-ambromusic"
                            type="submit"
                        >
                            Buscar
                        </button>
                    </form>

                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/"
                            >
                                Inicio
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/categorias"
                            >
                                Categorías
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/productos"
                            >
                                Productos
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/ofertas"
                            >
                                Ofertas
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/contacto"
                            >
                                Contacto
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/carrito"
                            >
                                🛒 Carrito
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="btn btn-ambromusic ms-lg-2 mt-2 mt-lg-0"
                                to="/inicio-sesion"
                            >
                                Iniciar sesión
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;