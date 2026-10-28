import { Link } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";
import "../index.css";

// Panel base para vendedor y admin (prefijo = "vendedor" o "admin")
function PanelRol({ prefijo, titulo, tarjetas }) {
    const { usuario } = useAuth();

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="container my-4 flex-grow-1">
                <h2 className={`titulo-${prefijo}`}>{titulo}</h2>
                <p className="subtitulo-catalogo">Hola, {usuario?.nombre}.</p>

                <div className={`grid-${prefijo}`}>
                    {tarjetas.map(({ titulo, texto, to }) => (
                        <article className={`tarjeta-${prefijo} compacta`} key={titulo}>
                            <div>
                                <h3>{titulo}</h3>
                                <p>{texto}</p>
                            </div>

                            {to ? (
                                <Link to={to} className={`btn-${prefijo}`}>Abrir</Link>
                            ) : (
                                <button type="button" className={`btn-${prefijo}`} disabled>
                                    Próximamente
                                </button>
                            )}
                        </article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default PanelRol;
