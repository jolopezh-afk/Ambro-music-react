import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import Index from "./pages/Index.jsx";
import Productos from "./pages/Productos.jsx";
import Categorias from "./pages/Categorias.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import Contacto from "./pages/Contacto.jsx";
import Carrito from "./pages/Carrito.jsx";
import InicioSesion from "./pages/InicioSesion.jsx";
import Vendedor from "./pages/Vendedor.jsx";
import Admin from "./pages/Admin.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/inicio-sesion" element={<InicioSesion />} />
            <Route
              path="/vendedor"
              element={<RutaProtegida roles={["vendedor"]}><Vendedor /></RutaProtegida>}
            />
            <Route
              path="/admin"
              element={<RutaProtegida roles={["admin"]}><Admin /></RutaProtegida>}
            />
            <Route
              path="*"
              element={<h2 className="text-center mt-5">Página no encontrada</h2>}
            />
          </Routes>
        </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>
);