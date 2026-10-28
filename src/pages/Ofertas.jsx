import Navbar from "../components/Navbar";
import Catalogo from "../components/Catalogo";
import Footer from "../components/Footer";
import { productos, porcentajeDescuento } from "../data/productos";
import "../index.css";

const ofertas = productos.filter((p) => p.precioOferta);
const mayorDescuento = ofertas.length
    ? Math.max(...ofertas.map(porcentajeDescuento))
    : 0;

function Ofertas() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <header className="hero-ofertas">
                <div className="container">
                    <span className="hero-ofertas-etiqueta">Ofertas AmbroMusic</span>
                    <h1 className="hero-ofertas-titulo">
                        Hasta <span>{mayorDescuento}% OFF</span>
                    </h1>
                    <p className="hero-ofertas-texto">
                        {ofertas.length} productos seleccionados con precio rebajado en
                        instrumentos y equipos.
                    </p>
                </div>
            </header>

            <main className="flex-grow-1">
                <section className="container my-4">
                    <Catalogo soloOfertas />
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Ofertas;
