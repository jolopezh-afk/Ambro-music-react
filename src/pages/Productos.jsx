import Navbar from "../components/Navbar";
import Catalogo from "../components/Catalogo";
import "../index.css";
import { Footer } from "../components/Footer";

function Productos() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="flex-grow-1">
                <section className="container my-4">
                    <h2 className="titulo-vendedor">
                        Catálogo de Instrumentos y Equipos
                    </h2>

                    <Catalogo />
                </section>
            </main>

            <Footer />
        </div>
    );


}

export default Productos;