import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { useCarrito } from "../context/CarritoContext";
import { Footer } from "../components/Footer";

function Carrito() {
    const { carrito, totalPrecio, cambiarCantidad, quitar, vaciar } = useCarrito();

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="container my-4 flex-grow-1">
                <h2 className="mb-4">Tu carrito</h2>

                {carrito.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-secondary">Tu carrito está vacío.</p>
                        <Link to="/productos" className="btn btn-ambromusic">
                            Ver productos
                        </Link>
                    </div>
                ) : (
                    <>
                        <ul className="list-group mb-4">
                            {carrito.map((p) => (
                                <li
                                    key={p.id}
                                    className="list-group-item bg-dark text-white d-flex align-items-center gap-3"
                                >
                                    {p.imagen && (
                                        <img
                                            src={p.imagen}
                                            alt={p.nombre}
                                            style={{ width: 60, height: 60, objectFit: "contain", background: "#fff" }}
                                        />
                                    )}
                                    <div className="flex-grow-1">
                                        <div className="fw-semibold">{p.nombre}</div>
                                        <div className="text-warning">
                                            ${p.precio.toLocaleString("es-CL")}
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-light"
                                            onClick={() => cambiarCantidad(p.id, -1)}
                                        >
                                            −
                                        </button>
                                        <span>{p.cantidad}</span>
                                        <button
                                            className="btn btn-sm btn-outline-light"
                                            onClick={() => cambiarCantidad(p.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div style={{ width: 110 }} className="text-end fw-bold">
                                        ${(p.precio * p.cantidad).toLocaleString("es-CL")}
                                    </div>

                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => quitar(p.id)}
                                    >
                                        Quitar
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-outline-secondary" onClick={vaciar}>
                                Vaciar carrito
                            </button>
                            <h4 className="mb-0">
                                Total:{" "}
                                <span className="text-warning">
                                    ${totalPrecio.toLocaleString("es-CL")}
                                </span>
                            </h4>
                        </div>
                    </>
                )}
            </main>

           <Footer/>
        </div>
    );
}

export default Carrito;