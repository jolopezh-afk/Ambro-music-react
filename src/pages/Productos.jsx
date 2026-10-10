import Navbar from "../components/Navbar";
import Catalogo from "../components/Catalogo";
import "../index.css";
import Footer from "../components/Footer";

function Productos() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <header className="encabezado-pagina">
                <div className="container">
                    <span className="encabezado-etiqueta">Tienda</span>
                    <h1 className="encabezado-titulo">
                        Catálogo de Instrumentos y Equipos
                    </h1>
                    <p className="encabezado-texto">
                        Busca, filtra por categoría y arma tu carrito.
                    </p>
                </div>
            </header>

            <main className="flex-grow-1">
                <section className="container my-4">
                    <Catalogo />
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Productos;