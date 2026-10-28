import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../../context/AuthContext";
import { CarritoProvider } from "../../context/CarritoContext";
import Navbar from "../../components/Navbar";

// Navbar usa <Link> (Router), useCarrito (CarritoProvider) y useAuth (AuthProvider)
function renderNavbar() {
    return render(
        <AuthProvider>
            <CarritoProvider>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </CarritoProvider>
        </AuthProvider>
    );
}

describe("Navbar", () => {
    it("muestra los enlaces principales de navegación", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "Categorías" })).toHaveAttribute("href", "/categorias");
        expect(screen.getByRole("link", { name: "Productos" })).toHaveAttribute("href", "/productos");
        expect(screen.getByRole("link", { name: "Ofertas" })).toHaveAttribute("href", "/ofertas");
        expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "/contacto");
    });

    it("sin sesión muestra Iniciar sesión y el contador del carrito en 0", () => {
        renderNavbar();

        expect(screen.getByRole("link", { name: "Iniciar sesión" })).toHaveAttribute("href", "/inicio-sesion");
        expect(screen.getByRole("link", { name: /Carrito \(0\)/ })).toHaveAttribute("href", "/carrito");
        expect(screen.queryByRole("button", { name: "Cerrar sesión" })).not.toBeInTheDocument();
    });

    it("muestra la cantidad de ítems guardados en el carrito", () => {
        localStorage.setItem(
            "carritoSonidoVivo",
            JSON.stringify([{ id: 1, nombre: "Guitarra", precio: 1000, cantidad: 3 }])
        );
        renderNavbar();

        expect(screen.getByRole("link", { name: /Carrito \(3\)/ })).toBeInTheDocument();
    });

    it("con sesión de vendedor muestra el saludo, Mi panel y Cerrar sesión", () => {
        localStorage.setItem(
            "usuarioAmbroMusic",
            JSON.stringify({ email: "vendedor@ambromusic.cl", nombre: "Vendedor", rol: "vendedor" })
        );
        renderNavbar();

        expect(screen.getByText("Hola, Vendedor")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Mi panel" })).toHaveAttribute("href", "/vendedor");
        expect(screen.getByRole("button", { name: "Cerrar sesión" })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: "Iniciar sesión" })).not.toBeInTheDocument();
    });
});
