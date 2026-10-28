import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./pages/Index.jsx";
import Productos from "./pages/Productos.jsx";
import Contacto from "./pages/Contacto.jsx";
import Carrito from "./pages/Carrito";
import Categorias from "./pages/Categorias.jsx";
import Ofertas from "./pages/Ofertas.jsx";
import InicioSesion from "./pages/InicioSesion.jsx";
import Vendedor from "./pages/Vendedor.jsx";
import Admin from "./pages/Admin.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="/Productos" element={<Productos/>} />
        <Route path="/Categorias" element={<Categorias/>} />
        <Route path="/Contacto" element={<Contacto/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/Ofertas" element={<Ofertas/>} />
        <Route path="/inicio-sesion" element={<InicioSesion/>} />
        <Route path="/vendedor" element={<RutaProtegida roles={["vendedor"]}><Vendedor/></RutaProtegida>} />
        <Route path="/admin" element={<RutaProtegida roles={["admin"]}><Admin/></RutaProtegida>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);