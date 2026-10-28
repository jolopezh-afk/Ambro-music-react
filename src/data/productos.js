// Para agregar un producto nuevo, suma un objeto a esta lista.
// "categoria" debe ser una de: Cuerdas, Percusión, Equipos, Accesorios.
// Para poner un producto en oferta, agrega "precioOferta" (el precio rebajado).
// "precio" sigue siendo el precio normal. Para quitar la oferta, borra esa propiedad.
export const productos = [
    { id: 1, nombre: "Guitarra Eléctrica Stratocaster", precio: 250000, precioOferta: 199000, imagen: "/img/guitarra.png", categoria: "Cuerdas" },
    { id: 2, nombre: "Batería Acústica 5 piezas", precio: 550000, precioOferta: 440000, imagen: "/img/bateria.png", categoria: "Percusión" },
    { id: 3, nombre: "Amplificador de Bajo 50W", precio: 120000, imagen: "/img/amplificador.png", categoria: "Equipos" },
    { id: 4, nombre: "Micrófono Dinámico Vocal", precio: 45000, imagen: "/img/microfono.png", categoria: "Accesorios" },
    { id: 5, nombre: "Teclado Digital 61 teclas", precio: 180000, precioOferta: 149000, imagen: "/img/teclado.png", categoria: "Equipos" },
    { id: 6, nombre: "Guitarra Clásica de Nylon", precio: 85000, imagen: "/img/guitarra-clasica.png", categoria: "Cuerdas" },
    { id: 7, nombre: "Bajo Eléctrico 4 Cuerdas", precio: 210000, precioOferta: 168000, imagen: "/img/bajo-electrico.png", categoria: "Cuerdas" },
    { id: 8, nombre: "Ukelele Soprano", precio: 35000, precioOferta: 27000, imagen: "/img/ukelele.png", categoria: "Cuerdas" },
    { id: 9, nombre: "Guitarra Eléctrica Doble Corte", precio: 180000, imagen: "/img/guitarra-doble-corte.png", categoria: "Cuerdas" },
    { id: 10, nombre: "Cajón Peruano", precio: 65000, imagen: "/img/cajon.png", categoria: "Percusión" },
    { id: 11, nombre: "Set de Platillos 3 piezas", precio: 140000, precioOferta: 99000, imagen: "/img/platillos.png", categoria: "Percusión" },
    { id: 12, nombre: "Bongós", precio: 38000, imagen: "/img/bongos.png", categoria: "Percusión" },
    { id: 13, nombre: "Pedal de Bombo", precio: 75000, imagen: "/img/pedal-bombo.png", categoria: "Percusión" },
    { id: 14, nombre: "Baquetas 5A (par)", precio: 9000, imagen: "/img/baquetas.png", categoria: "Percusión" },
    { id: 15, nombre: "Amplificador de Guitarra 30W", precio: 95000, imagen: "/img/amplificador-guitarra.png", categoria: "Equipos" },
    { id: 16, nombre: "Interfaz de Audio USB", precio: 110000, precioOferta: 85000, imagen: "/img/interfaz-audio.png", categoria: "Equipos" },
    { id: 17, nombre: "Parlante Activo 12\"", precio: 280000, precioOferta: 219000, imagen: "/img/parlante.png", categoria: "Equipos" },
    { id: 18, nombre: "Mezcladora 8 Canales", precio: 160000, imagen: "/img/mezcladora.png", categoria: "Equipos" },
    { id: 19, nombre: "Cable de Instrumento 3 m", precio: 8000, precioOferta: 5900, imagen: "/img/cable.png", categoria: "Accesorios" },
    { id: 20, nombre: "Afinador Digital de Pinza", precio: 12000, imagen: "/img/afinador.png", categoria: "Accesorios" },
    { id: 21, nombre: "Correa para Guitarra", precio: 15000, precioOferta: 9900, imagen: "/img/correa.png", categoria: "Accesorios" },
    { id: 22, nombre: "Soporte de Micrófono con Boom", precio: 22000, imagen: "/img/soporte-microfono.png", categoria: "Accesorios" },
    { id: 23, nombre: "Set de Cuerdas para Guitarra Acústica", precio: 9000, imagen: "/img/cuerdas.png", categoria: "Accesorios" },
];

export const categorias = [...new Set(productos.map((p) => p.categoria))];
