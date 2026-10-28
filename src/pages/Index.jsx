import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Catalogo from "../components/Catalogo";
import IconoCategoria from "../components/IconoCategoria";
import Footer from "../components/Footer";
import "../index.css";

const banners = ["/img/banner1.png", "/img/banner2.png", "/img/banner3.png"];

const categorias = [
    { nombre: "Cuerdas", descripcion: "Guitarras, bajos y más." },
    { nombre: "Percusión", descripcion: "Baterías y accesorios de ritmo." },
    { nombre: "Equipos", descripcion: "Amplificadores y sonido en vivo." },
    { nombre: "Accesorios", descripcion: "Micrófonos, cables y complementos." },
];

function Index() {
    return (
        <>
            <Navbar />

            <main className="container my-4">
                {/* Carrusel */}
                <div
                    id="carruselInicio"
                    className="carousel slide shadow rounded overflow-hidden bg-dark"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators">
                        {banners.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                data-bs-target="#carruselInicio"
                                data-bs-slide-to={i}
                                className={i === 0 ? "active" : ""}
                                aria-current={i === 0 ? "true" : undefined}
                                aria-label={`Slide ${i + 1}`}
                            ></button>
                        ))}
                    </div>

                    <div className="carousel-inner">
                        {banners.map((src, i) => (
                            <div
                                key={src}
                                className={`carousel-item ${i === 0 ? "active" : ""}`}
                                data-bs-interval="4000"
                            >
                                <Link to="/productos">
                                    <img
                                        src={src}
                                        className="d-block w-100"
                                        alt={`Banner ${i + 1}`}
                                        style={{ height: "400px", objectFit: "contain", cursor: "pointer" }}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carruselInicio"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carruselInicio"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                </div>

                {/* Categorías destacadas */}
                <section className="seccion-inicio">
                    <div className="seccion-cabecera">
                        <div>
                            <span className="encabezado-etiqueta">Explora</span>
                            <h2 className="seccion-titulo">Compra por categoría</h2>
                        </div>
                        <Link to="/categorias" className="seccion-enlace">Ver todas →</Link>
                    </div>

                    <div className="grid-categorias">
                        {categorias.map(({ nombre, descripcion }) => (
                            <Link
                                key={nombre}
                                to={`/categorias?categoria=${encodeURIComponent(nombre)}`}
                                className="tarjeta-categoria"
                            >
                                <span className="categoria-icono" aria-hidden="true">
                                    <IconoCategoria nombre={nombre} />
                                </span>
                                <span className="categoria-nombre">{nombre}</span>
                                <span className="categoria-descripcion">{descripcion}</span>
                                <span className="categoria-enlace">
                                    Ver productos{" "}
                                    <span className="categoria-flecha" aria-hidden="true">→</span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Productos destacados */}
                <section className="seccion-inicio">
                    <div className="seccion-cabecera">
                        <div>
                            <span className="encabezado-etiqueta">Lo más buscado</span>
                            <h2 className="seccion-titulo">Productos destacados</h2>
                        </div>
                        <Link to="/productos" className="seccion-enlace">Ver todo el catálogo →</Link>
                    </div>

                    <Catalogo compacto />
                </section>

                {/* Banner de ofertas */}
                <section className="banner-ofertas">
                    <div>
                        <h2>Descubre nuestras ofertas</h2>
                        <p>Precios especiales en instrumentos y equipos seleccionados.</p>
                    </div>
                    <Link to="/ofertas" className="btn btn-light fw-semibold px-4">
                        Ver ofertas
                    </Link>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Index;
