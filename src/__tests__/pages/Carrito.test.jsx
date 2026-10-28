import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../../context/AuthContext";
import { CarritoProvider } from "../../context/CarritoContext";
import Carrito from "../../pages/Carrito";

function renderCarrito() {
    return render(
        <AuthProvider>
            <CarritoProvider>
                <MemoryRouter>
                    <Carrito />
                </MemoryRouter>
            </CarritoProvider>
        </AuthProvider>
    );
}

function guardarCarrito(items) {
    localStorage.setItem("carritoSonidoVivo", JSON.stringify(items));
}

describe("Página Carrito", () => {
    it("muestra el mensaje de carrito vacío", () => {
        renderCarrito();

        expect(screen.getByRole("heading", { name: "Tu carrito está vacío" })).toBeInTheDocument();
    });

    it("lista los productos guardados y calcula el total", () => {
        guardarCarrito([
            { id: 1, nombre: "Guitarra", precio: 100000, cantidad: 2 },
            { id: 4, nombre: "Micrófono", precio: 45000, cantidad: 1 },
        ]);
        renderCarrito();

        expect(screen.getByRole("heading", { name: "Guitarra" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Micrófono" })).toBeInTheDocument();
        expect(screen.getByText("3 ítems en tu carrito")).toBeInTheDocument();
        expect(screen.getByText("$245.000")).toBeInTheDocument();
    });

    it("al finalizar la compra muestra el agradecimiento y vacía el carrito", async () => {
        const usuario = userEvent.setup();
        guardarCarrito([{ id: 1, nombre: "Guitarra", precio: 100000, cantidad: 1 }]);
        renderCarrito();

        await usuario.click(screen.getByRole("button", { name: "Finalizar compra" }));

        expect(screen.getByRole("heading", { name: "¡Gracias por tu compra!" })).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem("carritoSonidoVivo"))).toEqual([]);
    });
});
