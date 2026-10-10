import { precioFinal } from "../../data/productos";

describe("precioFinal", () => {
    it("devuelve el mismo precio cuando el descuento es 0", () => {
        const producto = { precio: 45000, descuento: 0 };

        expect(precioFinal(producto)).toBe(45000);
    });

    it("aplica un descuento del 15% a la guitarra", () => {
        const producto = { precio: 250000, descuento: 15 };

        expect(precioFinal(producto)).toBe(212500);
    });

    it("aplica un descuento del 20% al amplificador", () => {
        const producto = { precio: 120000, descuento: 20 };

        expect(precioFinal(producto)).toBe(96000);
    });
}); 