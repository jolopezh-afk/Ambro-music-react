import { useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TarjetaProducto } from "../components/TarjetaProducto";
import { productos, categorias } from "../data/productos";

function Categorias() {
    const [seleccionada, setSeleccionada] = useState("Todas");

    const visibles =
        seleccionada === "Todas"
            ? productos
            : productos.filter((p) => p.categoria === seleccionada);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="container my-4 flex-grow-1">
                <h2 className="titulo-vendedor">Categorías</h2>

                <div className="d-flex flex-wrap gap-2 my-3">
                    {["Todas", ...categorias].map((categoria) => (
                        <button
                            key={categoria}
                            className={`btn ${
                                seleccionada === categoria
                                    ? "btn-ambromusic"
                                    : "btn-outline-light"
                            }`}
                            onClick={() => setSeleccionada(categoria)}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>

                {visibles.length === 0 ? (
                    <p className="text-secondary">
                        No hay productos en esta categoría todavía.
                    </p>
                ) : (
                    <div className="grid-productos">
                        {visibles.map((producto) => (
                            <TarjetaProducto
                                key={producto.id}
                                producto={producto}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Categorias;