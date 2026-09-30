import { useEffect, useState } from "react";

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
const [carrito, setCarrito] = useState(() => {
return JSON.parse(localStorage.getItem("carritoSonidoVivo")) || [];
});

useEffect(() => {
    localStorage.setItem(
        "carritoSonidoVivo",
        JSON.stringify(carrito)
    );
}, [carrito]);

const totalItems = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
);

function agregarAlCarrito(productoSeleccionado) {
    setCarrito((carritoActual) => {
        const productoExiste = carritoActual.find(
            (producto) => producto.id === productoSeleccionado.id
        );

        if (productoExiste) {
            return carritoActual.map((producto) =>
                producto.id === productoSeleccionado.id
                    ? {
                          ...producto,
                          cantidad: producto.cantidad + 1,
                      }
                    : producto
            );
        }

        return [
            ...carritoActual,
            {
                id: productoSeleccionado.id,
                nombre: productoSeleccionado.nombre,
                precio: productoSeleccionado.precio,
                cantidad: 1,
            },
        ];
    });

    alert(
        `Se agregó ${productoSeleccionado.nombre} al carrito.`
    );
}

return (
    <>
        <div className="container text-end mt-3">
            🛒 Carrito: <span>{totalItems}</span> ítems
        </div>

        <div className="grid-productos">
            {catalogoSonidoVivo.map((producto) => (
                <article
                    className="tarjeta-producto"
                    key={producto.id}
                >
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                    />

                    <h3>{producto.nombre}</h3>

                    <p className="precio">
                        $
                        {producto.precio.toLocaleString(
                            "es-CL"
                        )}
                    </p>

                    <button
                        onClick={() =>
                            agregarAlCarrito(producto)
                        }
                    >
                        Añadir al carrito
                    </button>
                </article>
            ))}
        </div>
    </>
);


}

export default Catalogo;