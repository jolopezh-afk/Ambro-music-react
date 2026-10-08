import { useCarrito } from "../context/CarritoContext";
import { precioFinal } from "../data/productos";

export const TarjetaProducto = ({ producto }) => {
    const { agregar } = useCarrito();

    return (
        <article className="tarjeta-producto" style={{ position: "relative" }}>
            {producto.descuento > 0 && (
                <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                    -{producto.descuento}%
                </span>
            )}

            <img src={producto.imagen} alt={producto.nombre} />

            <h3>{producto.nombre}</h3>

            <p className="precio">
                {producto.descuento > 0 && (
                    <small className="text-decoration-line-through text-secondary me-2">
                        ${producto.precio.toLocaleString("es-CL")}
                    </small>
                )}
                ${precioFinal(producto).toLocaleString("es-CL")}
            </p>

            <button
                onClick={() =>
                    agregar({ ...producto, precio: precioFinal(producto) })
                }
            >
                Añadir al carrito
            </button>
        </article>
    );
};