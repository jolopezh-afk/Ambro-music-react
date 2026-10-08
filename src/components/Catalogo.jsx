import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

const productos = [
    { id: 1, nombre: "Guitarra Eléctrica Stratocaster", precio: 250000, imagen: "/img/guitarra.png", categoria: "Cuerdas" },
    { id: 2, nombre: "Batería Acústica 5 piezas", precio: 550000, imagen: "/img/bateria.png", categoria: "Percusión" },
    { id: 3, nombre: "Amplificador de Bajo 50W", precio: 120000, imagen: "/img/amplificador.png", categoria: "Equipos" },
    { id: 4, nombre: "Micrófono Dinámico Vocal", precio: 45000, imagen: "/img/microfono.png", categoria: "Accesorios" },
];

const categorias = [...new Set(productos.map((p) => p.categoria))];

const formatoPrecio = (n) => `$${n.toLocaleString("es-CL")}`;

function leerCarrito() {
    try {
        return JSON.parse(localStorage.getItem("carritoSonidoVivo")) || [];
    } catch {
        return [];
    }
}

// categoriaFija (opcional): si se entrega, filtra por esa categoría y oculta los botones de filtro
function Catalogo({ categoriaFija }) {
    const [carrito, setCarrito] = useState(leerCarrito);
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("Todos");
    const [orden, setOrden] = useState("destacados");
    const [panelAbierto, setPanelAbierto] = useState(false);
    const [aviso, setAviso] = useState("");

    const filtroFijo = categoriaFija !== undefined;
    const categoriaActiva = filtroFijo
        ? categoriaFija === "Todas" ? "Todos" : categoriaFija
        : categoria;

    useEffect(() => {
        localStorage.setItem("carritoSonidoVivo", JSON.stringify(carrito));
    }, [carrito]);

    // Cerrar el panel con Escape
    useEffect(() => {
        if (!panelAbierto) return;
        const alPresionar = (e) => e.key === "Escape" && setPanelAbierto(false);
        window.addEventListener("keydown", alPresionar);
        return () => window.removeEventListener("keydown", alPresionar);
    }, [panelAbierto]);

    // Aviso temporal (reemplaza al alert)
    useEffect(() => {
        if (!aviso) return;
        const t = setTimeout(() => setAviso(""), 2200);
        return () => clearTimeout(t);
    }, [aviso]);

    const totalItems = carrito.reduce((t, p) => t + p.cantidad, 0);
    const totalPrecio = carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);

    const productosVisibles = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();
        const lista = productos.filter(
            (p) =>
                (categoriaActiva === "Todos" || p.categoria === categoriaActiva) &&
                p.nombre.toLowerCase().includes(texto)
        );
        if (orden === "menor") return [...lista].sort((a, b) => a.precio - b.precio);
        if (orden === "mayor") return [...lista].sort((a, b) => b.precio - a.precio);
        if (orden === "nombre") return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
        return lista;
    }, [busqueda, categoriaActiva, orden]);

    const cantidadEnCarrito = (id) => carrito.find((p) => p.id === id)?.cantidad || 0;

    function agregarAlCarrito(productoSeleccionado) {
        setCarrito((carritoActual) => {
            const productoExiste = carritoActual.find((p) => p.id === productoSeleccionado.id);

            if (productoExiste) {
                return carritoActual.map((p) =>
                    p.id === productoSeleccionado.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }

            return [
                ...carritoActual,
                {
                    id: productoSeleccionado.id,
                    nombre: productoSeleccionado.nombre,
                    precio: productoSeleccionado.precio,
                    imagen: productoSeleccionado.imagen,
                    cantidad: 1,
                },
            ];
        });

        setAviso(`${productoSeleccionado.nombre} se agregó al carrito`);
    }

    function cambiarCantidad(id, delta) {
        setCarrito((actual) =>
            actual
                .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + delta } : p))
                .filter((p) => p.cantidad > 0)
        );
    }

    function quitarDelCarrito(id) {
        setCarrito((actual) => actual.filter((p) => p.id !== id));
    }

    function limpiarFiltros() {
        setBusqueda("");
        setCategoria("Todos");
        setOrden("destacados");
    }

    return (
        <>
            {/* Buscador, orden y botón del carrito */}
            <div className="cat-barra d-flex flex-wrap gap-2 align-items-center mt-3">
                <input
                    type="search"
                    className="form-control flex-grow-1 cat-buscador"
                    placeholder="Buscar instrumento o equipo"
                    aria-label="Buscar productos"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <select
                    className="form-select cat-orden"
                    aria-label="Ordenar productos"
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                >
                    <option value="destacados">Destacados</option>
                    <option value="menor">Precio: menor a mayor</option>
                    <option value="mayor">Precio: mayor a menor</option>
                    <option value="nombre">Nombre (A–Z)</option>
                </select>

                <button
                    type="button"
                    className="btn btn-ambromusic d-flex align-items-center gap-2"
                    onClick={() => setPanelAbierto(true)}
                    aria-label={`Abrir carrito, ${totalItems} ítems`}
                >
                    🛒 Carrito
                    <span className="cat-contador">{totalItems}</span>
                </button>
            </div>

            {/* Filtros por categoría */}
            {!filtroFijo && (
            <div className="d-flex flex-wrap gap-2 mt-3" role="group" aria-label="Filtrar por categoría">
                {["Todos", ...categorias].map((c) => (
                    <button
                        key={c}
                        type="button"
                        className={`btn btn-sm cat-chip ${categoria === c ? "activo" : ""}`}
                        aria-pressed={categoria === c}
                        onClick={() => setCategoria(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>
            )}

            <p className="cat-resultados mt-3 mb-0" aria-live="polite">
                {productosVisibles.length} {productosVisibles.length === 1 ? "producto" : "productos"}
            </p>

            {/* Grilla de productos */}
            {productosVisibles.length === 0 ? (
                <div className="cat-vacio">
                    <p>No encontramos productos con esos filtros.</p>
                    <button type="button" className="btn btn-ambromusic" onClick={limpiarFiltros}>
                        Limpiar filtros
                    </button>
                </div>
            ) : (
                <div className="grid-productos">
                    {productosVisibles.map((producto) => {
                        const cantidad = cantidadEnCarrito(producto.id);

                        return (
                            <article className="tarjeta-producto" key={producto.id}>
                                <img src={producto.imagen} alt={producto.nombre} loading="lazy" />

                                <span className="cat-etiqueta">{producto.categoria}</span>

                                <h3>{producto.nombre}</h3>

                                <p className="precio">{formatoPrecio(producto.precio)}</p>

                                {cantidad === 0 ? (
                                    <button type="button" onClick={() => agregarAlCarrito(producto)}>
                                        Añadir al carrito
                                    </button>
                                ) : (
                                    <div className="cat-cantidad" role="group" aria-label="Cantidad en el carrito">
                                        <button
                                            type="button"
                                            onClick={() => cambiarCantidad(producto.id, -1)}
                                            aria-label={`Quitar una unidad de ${producto.nombre}`}
                                        >
                                            −
                                        </button>
                                        <span>{cantidad} en el carrito</span>
                                        <button
                                            type="button"
                                            onClick={() => cambiarCantidad(producto.id, 1)}
                                            aria-label={`Agregar una unidad de ${producto.nombre}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}

            {/* Panel lateral del carrito */}
            <div
                className={`cat-fondo ${panelAbierto ? "visible" : ""}`}
                onClick={() => setPanelAbierto(false)}
                aria-hidden="true"
            />

            <aside
                className={`cat-panel ${panelAbierto ? "abierto" : ""}`}
                role="dialog"
                aria-label="Carrito de compras"
                aria-hidden={!panelAbierto}
            >
                <header className="cat-panel-cabecera">
                    <h3>Tu carrito</h3>
                    <button type="button" onClick={() => setPanelAbierto(false)} aria-label="Cerrar carrito">
                        ✕
                    </button>
                </header>

                {carrito.length === 0 ? (
                    <div className="cat-panel-vacio">
                        <p>Tu carrito está vacío.</p>
                        <button type="button" className="btn btn-ambromusic" onClick={() => setPanelAbierto(false)}>
                            Ver productos
                        </button>
                    </div>
                ) : (
                    <>
                        <ul className="cat-panel-lista">
                            {carrito.map((item) => (
                                <li key={item.id}>
                                    {item.imagen && <img src={item.imagen} alt="" />}

                                    <div className="cat-item-info">
                                        <strong>{item.nombre}</strong>
                                        <span>{formatoPrecio(item.precio)} c/u</span>

                                        <div className="cat-cantidad pequeno">
                                            <button
                                                type="button"
                                                onClick={() => cambiarCantidad(item.id, -1)}
                                                aria-label={`Quitar una unidad de ${item.nombre}`}
                                            >
                                                −
                                            </button>
                                            <span>{item.cantidad}</span>
                                            <button
                                                type="button"
                                                onClick={() => cambiarCantidad(item.id, 1)}
                                                aria-label={`Agregar una unidad de ${item.nombre}`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cat-item-derecha">
                                        <strong>{formatoPrecio(item.precio * item.cantidad)}</strong>
                                        <button
                                            type="button"
                                            className="cat-quitar"
                                            onClick={() => quitarDelCarrito(item.id)}
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <footer className="cat-panel-pie">
                            <div className="cat-total">
                                <span>Total</span>
                                <strong>{formatoPrecio(totalPrecio)}</strong>
                            </div>

                            <Link to="/carrito" className="btn btn-ambromusic w-100 mb-2">
                                Ver carrito completo
                            </Link>

                            <button type="button" className="btn btn-outline-secondary w-100" onClick={() => setCarrito([])}>
                                Vaciar carrito
                            </button>
                        </footer>
                    </>
                )}
            </aside>

            {/* Aviso al agregar */}
            <div className={`cat-aviso ${aviso ? "visible" : ""}`} role="status" aria-live="polite">
                {aviso}
            </div>
        </>
    );
}

export default Catalogo;