import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { TarjetaProducto } from "../components/TarjetaProducto";
import { productos } from "../data/productos";
import Footer from "../components/Footer";

function Ofertas() {
    const ofertas = productos
        .filter((p) => p.descuento > 0)
        .sort((a, b) => b.descuento - a.descuento);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="container my-4 flex-grow-1">
                <h2 className="titulo-vendedor">Ofertas</h2>
                <p className="text-secondary">
                    Los mayores descuentos primero.
                </p>

                {ofertas.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-secondary">
                            No hay ofertas por ahora.
                        </p>
                        <Link to="/productos" className="btn btn-ambromusic">
                            Ver productos
                        </Link>
                    </div>
                ) : (
                    <div className="grid-productos">
                        {ofertas.map((producto) => (
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

export default Ofertas;