import { renderHook, act } from "@testing-library/react";
import { CarritoProvider, useCarrito } from "../../context/CarritoContext";

const guitarra = { id: 1, nombre: "Guitarra", precio: 100000, imagen: "/img/guitarra.png" };
const microfono = { id: 4, nombre: "Micrófono", precio: 45000, imagen: "/img/microfono.png" };

// Renderiza el hook useCarrito dentro del Provider, igual que en la app
function renderCarrito() {
    return renderHook(() => useCarrito(), { wrapper: CarritoProvider });
}

describe("CarritoContext", () => {
    it("parte con el carrito vacío", () => {
        const { result } = renderCarrito();

        expect(result.current.carrito).toEqual([]);
        expect(result.current.totalItems).toBe(0);
        expect(result.current.totalPrecio).toBe(0);
    });

    it("agrega un producto nuevo con cantidad 1", () => {
        const { result } = renderCarrito();

        act(() => result.current.agregar(guitarra));

        expect(result.current.carrito).toHaveLength(1);
        expect(result.current.carrito[0]).toMatchObject({ id: 1, cantidad: 1 });
    });

    it("suma la cantidad si el producto ya estaba en el carrito", () => {
        const { result } = renderCarrito();

        act(() => result.current.agregar(guitarra));
        act(() => result.current.agregar(guitarra));

        expect(result.current.carrito).toHaveLength(1);
        expect(result.current.carrito[0].cantidad).toBe(2);
    });

    it("calcula totalItems y totalPrecio", () => {
        const { result } = renderCarrito();

        act(() => result.current.agregar(guitarra));
        act(() => result.current.agregar(guitarra));
        act(() => result.current.agregar(microfono));

        expect(result.current.totalItems).toBe(3);
        expect(result.current.totalPrecio).toBe(100000 * 2 + 45000);
    });

    it("elimina el producto cuando la cantidad llega a 0", () => {
        const { result } = renderCarrito();

        act(() => result.current.agregar(guitarra));
        act(() => result.current.cambiarCantidad(1, -1));

        expect(result.current.carrito).toEqual([]);
    });

    it("quita un producto y vacía el carrito", () => {
        const { result } = renderCarrito();

        act(() => result.current.agregar(guitarra));
        act(() => result.current.agregar(microfono));
        act(() => result.current.quitar(1));

        expect(result.current.carrito.map((p) => p.id)).toEqual([4]);

        act(() => result.current.vaciar());

        expect(result.current.carrito).toEqual([]);
    });

    it("guarda el carrito en localStorage", () => {
        const { result } = renderCarrito();

        act(() => result.current.agregar(guitarra));

        const guardado = JSON.parse(localStorage.getItem("carritoSonidoVivo"));
        expect(guardado).toHaveLength(1);
        expect(guardado[0].nombre).toBe("Guitarra");
    });
});