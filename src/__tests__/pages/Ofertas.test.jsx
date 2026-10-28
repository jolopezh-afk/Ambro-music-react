import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AuthProvider } from "../../context/AuthContext";
import { CarritoProvider } from "../../context/CarritoContext";
import Ofertas from "../../pages/Ofertas";
import { productos } from "../../data/productos";

function renderOfertas() {
    return render(
        <AuthProvider>
            <CarritoProvider>
                <MemoryRouter>
                    <Ofertas />
                </MemoryRouter>
            </CarritoProvider>
        </AuthProvider>
    );
}

const cantidadOfertas = productos.filter((p) => p.precioOferta).length;

describe("Página Ofertas", () => {
    it("muestra solo los productos con precio de oferta", () => {
        renderOfertas();

        // Con oferta
        expect(screen.getByRole("heading", { name: "Guitarra Eléctrica Stratocaster" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Batería Acústica 5 piezas" })).toBeInTheDocument();
        // Sin oferta
        expect(screen.queryByRole("heading", { name: "Amplificador de Bajo 50W" })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Micrófono Dinámico Vocal" })).not.toBeInTheDocument();
        expect(screen.getByText(`${cantidadOfertas} productos`)).toBeInTheDocument();
    });

    it("muestra en el título el mayor descuento disponible", () => {
        renderOfertas();

        // La Correa para Guitarra ($15.000 → $9.900) tiene el mayor descuento: 34%
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hasta 34% OFF");
    });
});
