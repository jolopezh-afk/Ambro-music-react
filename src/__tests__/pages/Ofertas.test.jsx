import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CarritoProvider } from "../../context/CarritoContext";
import Ofertas from "../../pages/Ofertas";

function renderOfertas() {
    return render(
        <CarritoProvider>
            <MemoryRouter>
                <Ofertas />
            </MemoryRouter>
        </CarritoProvider>
    );
}

describe("Página Ofertas", () => {
    it("muestra solo los productos con descuento", () => {
        renderOfertas();

        expect(screen.getByRole("heading", { name: "Amplificador de Bajo 50W" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Guitarra Eléctrica Stratocaster" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Batería Acústica 5 piezas" })).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Micrófono Dinámico Vocal" })).not.toBeInTheDocument();
    });

    it("ordena las ofertas de mayor a menor descuento", () => {
        renderOfertas();

        const nombres = screen
            .getAllByRole("heading", { level: 3 })
            .map((h) => h.textContent);

        expect(nombres).toEqual([
            "Amplificador de Bajo 50W",
            "Guitarra Eléctrica Stratocaster",
        ]);
    });
});