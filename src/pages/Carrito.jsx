import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";

const formatoPrecio = (n) => `$${n.toLocaleString("es-CL")}`;

function leerCarrito() {
    try {
        return JSON.parse(localStorage.getItem("carritoSonidoVivo")) || [];
    } catch {
        return [];
    }
}

function Carrito() {
    const [carrito, setCarrito] = useState(leerCarrito);
    const [compraRealizada, setCompraRealizada] = useState(false);

    useEffect(() => {
        localStorage.setItem("carritoSonidoVivo", JSON.stringify(carrito));
    }, [carrito]);

    const totalItems = carrito.reduce((t, p) => t + p.cantidad, 0);
    const total = carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);
    const neto = Math.round(total / 1.19);
    const iva = total - neto;

    function cambiarCantidad(id, delta) {
        setCarrito((actual) =>
            actual
                .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + delta } : p))
                .filter((p) => p.cantidad > 0)
        );
    }

    function quitarDelCarrito(id) {
        setCarrito((actual) => actual.filter((p) => p.id !== id));
    }

    function finalizarCompra() {
        // Compra simulada: aquí iría la conexión con el pago o el backend
        setCarrito([]);
        setCompraRealizada(true);
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="flex-grow-1">
                <section className="container my-4">
                    <h2 className="titulo-vendedor">Tu carrito</h2>
                    <p className="subtitulo-catalogo">
                        {carrito.length > 0
                            ? `${totalItems} ${totalItems === 1 ? "ítem" : "ítems"} en tu carrito`
                            : "Revisa lo que agregaste antes de comprar."}
                    </p>

                    {compraRealizada ? (
                        <div className="carrito-mensaje">
                            <span className="carrito-icono">✅</span>
                            <h3>¡Gracias por tu compra!</h3>
                            <p>Recibimos tu pedido. Pronto nos pondremos en contacto contigo.</p>
                            <Link to="/productos" className="btn btn-ambromusic">
                                Seguir comprando
                            </Link>
                        </div>
                    ) : carrito.length === 0 ? (
                        <div className="carrito-mensaje">
                            <span className="carrito-icono">🛒</span>
                            <h3>Tu carrito está vacío</h3>
                            <p>Agrega instrumentos y equipos desde el catálogo.</p>
                            <Link to="/productos" className="btn btn-ambromusic">
                                Ver productos
                            </Link>
                        </div>
                    ) : (
                        <div className="carrito-layout">
                            <ul className="carrito-lista">
                                {carrito.map((item) => (
                                    <li className="carrito-item" key={item.id}>
                                        {item.imagen ? (
                                            <img src={item.imagen} alt={item.nombre} />
                                        ) : (
                                            <div className="carrito-sin-imagen">🎸</div>
                                        )}

                                        <div className="carrito-detalle">
                                            <h3>{item.nombre}</h3>
                                            <p>{formatoPrecio(item.precio)} c/u</p>

                                            <div className="cat-cantidad pequeno" role="group" aria-label="Cantidad">
                                                <button
                                                    type="button"
                                                    onClick={() => cambiarCantidad(item.id, -1)}
                                                    aria-label={`Quitar una unidad de ${item.nombre}`}
                                                >
                                                    −
                                                </button>
                                                <span>{item.cantidad}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => cambiarCantidad(item.id, 1)}
                                                    aria-label={`Agregar una unidad de ${item.nombre}`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="carrito-lado">
                                            <strong className="carrito-subtotal">
                                                {formatoPrecio(item.precio * item.cantidad)}
                                            </strong>
                                            <button
                                                type="button"
                                                className="cat-quitar"
                                                onClick={() => quitarDelCarrito(item.id)}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <aside className="carrito-resumen">
                                <h3>Resumen</h3>

                                <div className="carrito-fila">
                                    <span>Productos ({totalItems})</span>
                                    <span>{formatoPrecio(neto)}</span>
                                </div>
                                <div className="carrito-fila">
                                    <span>IVA (19%)</span>
                                    <span>{formatoPrecio(iva)}</span>
                                </div>

                                <div className="cat-total carrito-total">
                                    <span>Total</span>
                                    <strong>{formatoPrecio(total)}</strong>
                                </div>

                                <button type="button" className="btn btn-ambromusic w-100" onClick={finalizarCompra}>
                                    Finalizar compra
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-100 mt-2"
                                    onClick={() => setCarrito([])}
                                >
                                    Vaciar carrito
                                </button>
                                <Link to="/productos" className="carrito-seguir">
                                    Seguir comprando
                                </Link>
                            </aside>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Carrito;