import { useState } from "react";
import Navbar from "../components/Navbar";
import Catalogo from "../components/Catalogo";
import Footer from "../components/Footer";
import IconoCategoria from "../components/IconoCategoria";
import "../index.css";

// Mismas categorías que usa el catálogo
const categorias = [
    { nombre: "Cuerdas", descripcion: "Guitarras, bajos y más." },
    { nombre: "Percusión", descripcion: "Baterías y accesorios de ritmo." },
    { nombre: "Equipos", descripcion: "Amplificadores y sonido en vivo." },
    { nombre: "Accesorios", descripcion: "Micrófonos, cables y complementos." },
    { nombre: "Todas", titulo: "Todo el catálogo", descripcion: "Mira todo el catálogo completo." },
];

function Categorias() {
    // null = se muestran las categorías; con un valor = se muestran sus productos
    const [seleccionada, setSeleccionada] = useState(null);

    function elegir(nombre) {
        setSeleccionada(nombre);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="container my-4 flex-grow-1">
                {seleccionada === null ? (
                    <>
                        <h2 className="titulo-vendedor">Categorías</h2>
                        <p className="subtitulo-catalogo">
                            Elige una categoría para ver sus productos.
                        </p>

                        <div className="grid-categorias">
                            {categorias.map(({ nombre, titulo, descripcion }) => (
                                <button
                                    type="button"
                                    className="tarjeta-categoria"
                                    key={nombre}
                                    onClick={() => elegir(nombre)}
                                >
                                    <span className="categoria-icono" aria-hidden="true">
                                        <IconoCategoria nombre={nombre} />
                                    </span>
                                    <span className="categoria-nombre">{titulo ?? nombre}</span>
                                    <span className="categoria-descripcion">{descripcion}</span>
                                    <span className="categoria-enlace">
                                        Ver productos{" "}
                                        <span className="categoria-flecha" aria-hidden="true">→</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            type="button"
                            className="btn btn-outline-light btn-sm mb-3"
                            onClick={() => setSeleccionada(null)}
                        >
                            ← Volver a categorías
                        </button>

                        <h2 className="titulo-vendedor">
                            {seleccionada === "Todas" ? "Todos los productos" : seleccionada}
                        </h2>

                        <Catalogo categoriaFija={seleccionada} />
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Categorias;