import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { CarritoProvider } from "../../context/CarritoContext";
import Catalogo from "../../components/Catalogo";

function renderCatalogo() {
    return render(
        <CarritoProvider>
            <MemoryRouter>
                <Catalogo />
            </MemoryRouter>
        </CarritoProvider>
    );
}

describe("Catalogo", () => {
    it("muestra todos los productos al inicio", () => {
        renderCatalogo();

        expect(screen.getByText("4 productos")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Guitarra Eléctrica Stratocaster" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Micrófono Dinámico Vocal" })).toBeInTheDocument();
    });

    it("filtra los productos por categoría", async () => {
        const usuario = userEvent.setup();
        renderCatalogo();

        await usuario.click(screen.getByRole("button", { name: "Percusión" }));

        expect(screen.getByText("1 producto")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Batería Acústica 5 piezas" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Guitarra Eléctrica Stratocaster" })).not.toBeInTheDocument();
    });

    it("busca por nombre y muestra un mensaje si no hay resultados", async () => {
        const usuario = userEvent.setup();
        renderCatalogo();

        await usuario.type(screen.getByLabelText("Buscar productos"), "piano");

        expect(screen.getByText("No encontramos productos con esos filtros.")).toBeInTheDocument();
    });

    it("actualiza el contador del carrito al añadir un producto", async () => {
        const usuario = userEvent.setup();
        renderCatalogo();

        const botones = screen.getAllByRole("button", { name: "Añadir al carrito" });
        await usuario.click(botones[0]);

        expect(screen.getByRole("button", { name: "Abrir carrito, 1 ítems" })).toBeInTheDocument();
        expect(screen.getByText("1 en el carrito")).toBeInTheDocument();
    });
});