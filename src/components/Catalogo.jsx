import { TarjetaProducto } from "./TarjetaProducto";
import { productos } from "../data/productos";

function Catalogo() {
    return (
        <div className="grid-productos">
            {productos.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
            ))}
        </div>
    );
}

export default Catalogo;