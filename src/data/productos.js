export const productos = [
    {
        id: 1,
        nombre: "Guitarra Eléctrica Stratocaster",
        precio: 250000,
        imagen: "/img/guitarra.png",
        categoria: "Cuerdas",
        descuento: 15,
    },
    {
        id: 2,
        nombre: "Batería Acústica 5 piezas",
        precio: 550000,
        imagen: "/img/bateria.png",
        categoria: "Percusión",
        descuento: 0,
    },
    {
        id: 3,
        nombre: "Amplificador de Bajo 50W",
        precio: 120000,
        imagen: "/img/amplificador.png",
        categoria: "Equipos",
        descuento: 20,
    },
    {
        id: 4,
        nombre: "Micrófono Dinámico Vocal",
        precio: 45000,
        imagen: "/img/microfono.png",
        categoria: "Accesorios",
        descuento: 0,
    },
];

export const categorias = ["Cuerdas", "Percusión", "Equipos", "Accesorios"];

// Precio con descuento aplicado (si descuento es 0, queda igual)
export function precioFinal(producto) {
    return Math.round(producto.precio * (1 - producto.descuento / 100));
}