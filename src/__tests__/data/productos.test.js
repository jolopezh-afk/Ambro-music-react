import { productos, categorias, precioFinal, porcentajeDescuento } from "../../data/productos";

describe("precioFinal", () => {
    it("devuelve el precio normal cuando no hay precioOferta", () => {
        expect(precioFinal({ precio: 45000 })).toBe(45000);
    });

    it("devuelve el precioOferta cuando existe", () => {
        expect(precioFinal({ precio: 250000, precioOferta: 199000 })).toBe(199000);
    });
});

describe("porcentajeDescuento", () => {
    it("es 0 cuando no hay oferta", () => {
        expect(porcentajeDescuento({ precio: 45000 })).toBe(0);
    });

    it("calcula el porcentaje redondeado de la oferta", () => {
        expect(porcentajeDescuento({ precio: 250000, precioOferta: 199000 })).toBe(20);
        expect(porcentajeDescuento({ precio: 15000, precioOferta: 9900 })).toBe(34);
    });
});

describe("datos de productos", () => {
    it("todos los ids son únicos", () => {
        const ids = productos.map((p) => p.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("toda oferta es más barata que el precio normal", () => {
        productos
            .filter((p) => p.precioOferta)
            .forEach((p) => expect(p.precioOferta).toBeLessThan(p.precio));
    });

    it("cada producto pertenece a una categoría listada", () => {
        productos.forEach((p) => expect(categorias).toContain(p.categoria));
        expect(categorias).toEqual(["Cuerdas", "Percusión", "Equipos", "Accesorios"]);
    });
});
