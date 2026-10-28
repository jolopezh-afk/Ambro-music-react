import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { CarritoProvider } from "../../context/CarritoContext";
import Catalogo from "../../components/Catalogo";
import { productos } from "../../data/productos";

// Catalogo usa useCarrito (Provider) y useSearchParams (Router)
function renderCatalogo(props = {}, ruta = "/") {
    return render(
        <CarritoProvider>
            <MemoryRouter initialEntries={[ruta]}>
                <Catalogo {...props} />
            </MemoryRouter>
        </CarritoProvider>
    );
}

const total = productos.length;
const enPercusion = productos.filter((p) => p.categoria === "Percusión").length;

describe("Catalogo", () => {
    it("muestra todos los productos al inicio", () => {
        renderCatalogo();

        expect(screen.getByText(`${total} productos`)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Guitarra Eléctrica Stratocaster" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Micrófono Dinámico Vocal" })).toBeInTheDocument();
    });

    it("filtra los productos por categoría", async () => {
        const usuario = userEvent.setup();
        renderCatalogo();

        await usuario.click(screen.getByRole("button", { name: "Percusión" }));

        expect(screen.getByText(`${enPercusion} productos`)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Batería Acústica 5 piezas" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Guitarra Eléctrica Stratocaster" })).not.toBeInTheDocument();
    });

    it("busca por nombre y muestra un mensaje si no hay resultados", async () => {
        const usuario = userEvent.setup();
        renderCatalogo();

        await usuario.type(screen.getByLabelText("Buscar productos"), "piano");

        expect(screen.getByText("No encontramos productos con esos filtros.")).toBeInTheDocument();
    });

    it("usa la búsqueda que viene en la URL (?buscar=)", () => {
        renderCatalogo({}, "/productos?buscar=ukelele");

        expect(screen.getByLabelText("Buscar productos")).toHaveValue("ukelele");
        expect(screen.getByText("1 producto")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Ukelele Soprano" })).toBeInTheDocument();
    });

    it("con soloOfertas muestra únicamente productos con precioOferta", () => {
        renderCatalogo({ soloOfertas: true });

        const ofertas = productos.filter((p) => p.precioOferta).length;
        expect(screen.getByText(`${ofertas} productos`)).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Micrófono Dinámico Vocal" })).not.toBeInTheDocument();
    });

    it("en modo compacto muestra 4 productos y no muestra el buscador", () => {
        renderCatalogo({ compacto: true });

        expect(screen.getAllByRole("button", { name: "Añadir al carrito" })).toHaveLength(4);
        expect(screen.queryByLabelText("Buscar productos")).not.toBeInTheDocument();
    });

    it("actualiza el contador del carrito al añadir un producto", async () => {
        const usuario = userEvent.setup();
        renderCatalogo();

        const botones = screen.getAllByRole("button", { name: "Añadir al carrito" });
        await usuario.click(botones[0]);

        expect(screen.getByRole("button", { name: "Abrir carrito, 1 ítems" })).toBeInTheDocument();
        expect(screen.getByText("1 en el carrito")).toBeInTheDocument();
    });

    it("guarda en el carrito el precio de oferta, no el precio normal", async () => {
        const usuario = userEvent.setup();
        renderCatalogo();

        // El primer producto es la Stratocaster: $250.000 normal, $199.000 en oferta
        await usuario.click(screen.getAllByRole("button", { name: "Añadir al carrito" })[0]);

        const guardado = JSON.parse(localStorage.getItem("carritoSonidoVivo"));
        expect(guardado).toHaveLength(1);
        expect(guardado[0]).toMatchObject({ id: 1, precio: 199000, cantidad: 1 });
    });
});
