import { useCarrito } from "../context/CarritoContext";

const catalogoSonidoVivo = [
    {
        id: 1,
        nombre: "Guitarra Eléctrica Stratocaster",
        precio: 250000,
        imagen: "/img/guitarra.png",
        categoria: "Cuerdas",
    },
    {
        id: 2,
        nombre: "Batería Acústica 5 piezas",
        precio: 550000,
        imagen: "/img/bateria.png",
        categoria: "Percusión",
    },
    {
        id: 3,
        nombre: "Amplificador de Bajo 50W",
        precio: 120000,
        imagen: "/img/amplificador.png",
        categoria: "Equipos",
    },
    {
        id: 4,
        nombre: "Micrófono Dinámico Vocal",
        precio: 45000,
        imagen: "/img/microfono.png",
        categoria: "Accesorios",
    },
];

function Catalogo() {
    const { agregar } = useCarrito();

    return (
        <div className="grid-productos">
            {catalogoSonidoVivo.map((producto) => (
                <article className="tarjeta-producto" key={producto.id}>
                    <img src={producto.imagen} alt={producto.nombre} />

                    <h3>{producto.nombre}</h3>

                    <p className="precio">
                        ${producto.precio.toLocaleString("es-CL")}
                    </p>

                    <button onClick={() => agregar(producto)}>
                        Añadir al carrito
                    </button>
                </article>
            ))}
        </div>
    );
}

export default Catalogo;