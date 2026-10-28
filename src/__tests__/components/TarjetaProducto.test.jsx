import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TarjetaProducto from "../../components/TarjetaProducto";

const conOferta = {
    id: 1,
    nombre: "Guitarra Eléctrica Stratocaster",
    precio: 250000,
    precioOferta: 199000,
    imagen: "/img/guitarra.png",
    categoria: "Cuerdas",
};

const sinOferta = {
    id: 4,
    nombre: "Micrófono Dinámico Vocal",
    precio: 45000,
    imagen: "/img/microfono.png",
    categoria: "Accesorios",
};

// TarjetaProducto es "tonta": recibe todo por props, no necesita Provider ni Router
function renderTarjeta(producto, { cantidad = 0 } = {}) {
    const onAgregar = vi.fn();
    const onCambiarCantidad = vi.fn();
    render(
        <TarjetaProducto
            producto={producto}
            cantidad={cantidad}
            onAgregar={onAgregar}
            onCambiarCantidad={onCambiarCantidad}
        />
    );
    return { onAgregar, onCambiarCantidad };
}

describe("TarjetaProducto", () => {
    it("muestra nombre, imagen, categoría y precio de un producto sin oferta", () => {
        renderTarjeta(sinOferta);

        expect(screen.getByRole("heading", { name: "Micrófono Dinámico Vocal" })).toBeInTheDocument();
        expect(screen.getByAltText("Micrófono Dinámico Vocal")).toBeInTheDocument();
        expect(screen.getByText("Accesorios")).toBeInTheDocument();
        expect(screen.getByText("$45.000")).toBeInTheDocument();
        expect(screen.queryByText(/^-\d+%$/)).not.toBeInTheDocument();
    });

    it("muestra el badge, el precio original y el precio de oferta", () => {
        renderTarjeta(conOferta);

        expect(screen.getByText("-20%")).toBeInTheDocument();
        expect(screen.getByText("$250.000")).toBeInTheDocument();
        expect(screen.getByText(/\$199\.000/)).toBeInTheDocument();
    });

    it("llama a onAgregar con el producto al hacer clic en Añadir al carrito", async () => {
        const usuario = userEvent.setup();
        const { onAgregar } = renderTarjeta(conOferta);

        await usuario.click(screen.getByRole("button", { name: "Añadir al carrito" }));

        expect(onAgregar).toHaveBeenCalledTimes(1);
        expect(onAgregar).toHaveBeenCalledWith(conOferta);
    });

    it("si ya está en el carrito muestra la cantidad y los botones + y −", async () => {
        const usuario = userEvent.setup();
        const { onCambiarCantidad } = renderTarjeta(conOferta, { cantidad: 2 });

        expect(screen.getByText("2 en el carrito")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Añadir al carrito" })).not.toBeInTheDocument();

        await usuario.click(screen.getByRole("button", { name: /Agregar una unidad de/ }));
        await usuario.click(screen.getByRole("button", { name: /Quitar una unidad de/ }));

        expect(onCambiarCantidad).toHaveBeenNthCalledWith(1, 1, 1);
        expect(onCambiarCantidad).toHaveBeenNthCalledWith(2, 1, -1);
    });
});
