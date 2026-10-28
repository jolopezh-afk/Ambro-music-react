import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import TarjetaProducto from "./TarjetaProducto";
import { useCarrito } from "../context/CarritoContext";
import { productos, categorias, precioFinal } from "../data/productos";

const formatoPrecio = (n) => `$${n.toLocaleString("es-CL")}`;

// categoriaFija (opcional): filtra por esa categoría y oculta los botones de filtro
// soloOfertas (opcional): muestra solo los productos con precioOferta
// compacto (opcional): muestra solo 4 productos, sin buscador ni filtros (para el inicio)
function Catalogo({ categoriaFija, compacto = false, soloOfertas = false }) {
    const { carrito, totalItems, totalPrecio, agregar, cambiarCantidad, quitar, vaciar } =
        useCarrito();
    const [searchParams] = useSearchParams();
    const buscarDesdeUrl = searchParams.get("buscar") ?? "";
    const [busqueda, setBusqueda] = useState(buscarDesdeUrl);
    const [categoria, setCategoria] = useState("Todos");
    const [orden, setOrden] = useState("destacados");
    const [panelAbierto, setPanelAbierto] = useState(false);
    const [aviso, setAviso] = useState("");

    const filtroFijo = categoriaFija !== undefined;
    const categoriaActiva = filtroFijo
        ? categoriaFija === "Todas" ? "Todos" : categoriaFija
        : categoria;

    // Si la búsqueda del Navbar cambia mientras ya estás en la página, se actualiza
    const [ultimaBusquedaUrl, setUltimaBusquedaUrl] = useState(buscarDesdeUrl);
    if (ultimaBusquedaUrl !== buscarDesdeUrl) {
        setUltimaBusquedaUrl(buscarDesdeUrl);
        setBusqueda(buscarDesdeUrl);
    }

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

    const productosVisibles = useMemo(() => {
        const texto = busqueda.trim().toLowerCase();
        const lista = productos.filter(
            (p) =>
                (!soloOfertas || p.precioOferta) &&
                (categoriaActiva === "Todos" || p.categoria === categoriaActiva) &&
                p.nombre.toLowerCase().includes(texto)
        );
        if (orden === "menor") return [...lista].sort((a, b) => precioFinal(a) - precioFinal(b));
        if (orden === "mayor") return [...lista].sort((a, b) => precioFinal(b) - precioFinal(a));
        if (orden === "nombre") return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre));
        return lista;
    }, [busqueda, categoriaActiva, orden, soloOfertas]);

    const mostrados = compacto ? productosVisibles.slice(0, 4) : productosVisibles;

    const cantidadEnCarrito = (id) => carrito.find((p) => p.id === id)?.cantidad || 0;

    function agregarAlCarrito(producto) {
        agregar({ ...producto, precio: precioFinal(producto) });
        setAviso(`${producto.nombre} se agregó al carrito`);
    }

    function limpiarFiltros() {
        setBusqueda("");
        setCategoria("Todos");
        setOrden("destacados");
    }

    return (
        <>
            {!compacto && (
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
            </>
            )}

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
                    {mostrados.map((producto) => (
                        <TarjetaProducto
                            key={producto.id}
                            producto={producto}
                            cantidad={cantidadEnCarrito(producto.id)}
                            onAgregar={agregarAlCarrito}
                            onCambiarCantidad={cambiarCantidad}
                        />
                    ))}
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
                                            onClick={() => quitar(item.id)}
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

                            <button type="button" className="btn btn-outline-secondary w-100" onClick={vaciar}>
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
