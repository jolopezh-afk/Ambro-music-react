import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CarritoProvider } from "../../context/CarritoContext";
import Navbar from "../../components/Navbar";

// Navbar usa <Link> (necesita Router) y useCarrito (necesita el Provider)
function renderNavbar() {
    return render(
        <CarritoProvider>
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        </CarritoProvider>
    );
}

describe("Navbar", () => {
    it("muestra los enlaces principales de navegación", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "Productos" })).toHaveAttribute("href", "/productos");
        expect(screen.getByRole("link", { name: "Ofertas" })).toHaveAttribute("href", "/ofertas");
        expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "/contacto");
    });

    it("muestra el botón de iniciar sesión y el contador del carrito en 0", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: "Iniciar sesión" })).toHaveAttribute("href", "/inicio-sesion");
        expect(screen.getByText(/Carrito \(0\)/)).toBeInTheDocument();
    });
});