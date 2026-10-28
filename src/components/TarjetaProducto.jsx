import { porcentajeDescuento } from "../data/productos";

const formatoPrecio = (n) => `$${n.toLocaleString("es-CL")}`;

function TarjetaProducto({ producto, cantidad, onAgregar, onCambiarCantidad }) {
    const { id, nombre, precio, precioOferta, imagen, categoria } = producto;
    const descuento = porcentajeDescuento(producto);

    return (
        <article className="tarjeta-producto">
            {precioOferta && <span className="badge-oferta">-{descuento}%</span>}

            <img src={imagen} alt={nombre} loading="lazy" />

            <span className="cat-etiqueta">{categoria}</span>

            <h3>{nombre}</h3>

            <p className="precio">
                {precioOferta && <small className="precio-antes">{formatoPrecio(precio)}</small>}
                {formatoPrecio(precioOferta ?? precio)}
            </p>

            {cantidad === 0 ? (
                <button type="button" onClick={() => onAgregar(producto)}>
                    Añadir al carrito
                </button>
            ) : (
                <div className="cat-cantidad" role="group" aria-label="Cantidad en el carrito">
                    <button
                        type="button"
                        onClick={() => onCambiarCantidad(id, -1)}
                        aria-label={`Quitar una unidad de ${nombre}`}
                    >
                        −
                    </button>
                    <span>{cantidad} en el carrito</span>
                    <button
                        type="button"
                        onClick={() => onCambiarCantidad(id, 1)}
                        aria-label={`Agregar una unidad de ${nombre}`}
                    >
                        +
                    </button>
                </div>
            )}
        </article>
    );
}

export default TarjetaProducto;
