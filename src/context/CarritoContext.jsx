import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("carritoSonidoVivo")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("carritoSonidoVivo", JSON.stringify(carrito));
    }, [carrito]);

    const totalItems = carrito.reduce((t, p) => t + p.cantidad, 0);
    const totalPrecio = carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);

    function agregar(producto) {
        setCarrito((actual) => {
            const existe = actual.find((p) => p.id === producto.id);
            if (existe) {
                return actual.map((p) =>
                    p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
                );
            }
            return [
                ...actual,
                {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    cantidad: 1,
                },
            ];
        });
    }

    function cambiarCantidad(id, delta) {
        setCarrito((actual) =>
            actual
                .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + delta } : p))
                .filter((p) => p.cantidad > 0)
        );
    }

    function quitar(id) {
        setCarrito((actual) => actual.filter((p) => p.id !== id));
    }

    function vaciar() {
        setCarrito([]);
    }

    return (
        <CarritoContext.Provider
            value={{ carrito, totalItems, totalPrecio, agregar, cambiarCantidad, quitar, vaciar }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    return useContext(CarritoContext);
}