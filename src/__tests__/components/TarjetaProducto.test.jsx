import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CarritoProvider } from "../../context/CarritoContext";
import { TarjetaProducto } from "../../components/TarjetaProducto";

const conDescuento = {
    id: 1,
    nombre: "Guitarra Eléctrica Stratocaster",
    precio: 250000,
    imagen: "/img/guitarra.png",
    categoria: "Cuerdas",
    descuento: 15,
};

const sinDescuento = {
    id: 4,
    nombre: "Micrófono Dinámico Vocal",
    precio: 45000,
    imagen: "/img/microfono.png",
    categoria: "Accesorios",
    descuento: 0,
};

function renderTarjeta(producto) {
    return render(
        <CarritoProvider>
            <TarjetaProducto producto={producto} />
        </CarritoProvider>
    );
}

describe("TarjetaProducto", () => {
    it("muestra nombre, imagen y precio de un producto sin descuento", () => {
        renderTarjeta(sinDescuento);

        expect(screen.getByRole("heading", { name: "Micrófono Dinámico Vocal" })).toBeInTheDocument();
        expect(screen.getByAltText("Micrófono Dinámico Vocal")).toBeInTheDocument();
        expect(screen.getByText("$45.000")).toBeInTheDocument();
        expect(screen.queryByText(/^-\d+%$/)).not.toBeInTheDocument();
    });

    it("muestra el badge, el precio original tachado y el precio final cuando hay descuento", () => {
        renderTarjeta(conDescuento);

        expect(screen.getByText("-15%")).toBeInTheDocument();
        expect(screen.getByText("$250.000")).toBeInTheDocument();
        expect(screen.getByText(/\$212\.500/)).toBeInTheDocument();
    });

    it("guarda el producto en el carrito con el precio con descuento al hacer clic", async () => {
        const usuario = userEvent.setup();
        renderTarjeta(conDescuento);

        await usuario.click(screen.getByRole("button", { name: "Añadir al carrito" }));

        const guardado = JSON.parse(localStorage.getItem("carritoSonidoVivo"));
        expect(guardado).toHaveLength(1);
        expect(guardado[0]).toMatchObject({ id: 1, precio: 212500, cantidad: 1 });
    });
});