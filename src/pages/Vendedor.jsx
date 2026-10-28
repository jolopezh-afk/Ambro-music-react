import PanelRol from "../components/PanelRol";

function Vendedor() {
    return (
        <PanelRol
            prefijo="vendedor"
            titulo="Panel del vendedor"
            tarjetas={[
                { titulo: "Catálogo", texto: "Revisa los productos de la tienda.", to: "/productos" },
                { titulo: "Ofertas", texto: "Mira los productos con precio rebajado.", to: "/ofertas" },
                { titulo: "Pedidos", texto: "Gestiona los pedidos de los clientes." },
            ]}
        />
    );
}

export default Vendedor;
