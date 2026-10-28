import PanelRol from "../components/PanelRol";

function Admin() {
    return (
        <PanelRol
            prefijo="admin"
            titulo="Panel de administración"
            tarjetas={[
                { titulo: "Catálogo", texto: "Revisa los productos de la tienda.", to: "/productos" },
                { titulo: "Ofertas", texto: "Mira los productos con precio rebajado.", to: "/ofertas" },
                { titulo: "Usuarios", texto: "Administra las cuentas y sus roles." },
                { titulo: "Reportes", texto: "Consulta las ventas y estadísticas." },
            ]}
        />
    );
}

export default Admin;
