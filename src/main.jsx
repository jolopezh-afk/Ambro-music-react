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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="/Productos" element={<Productos/>} />
        <Route path="/Categorias" element={<Categorias/>} />
        <Route path="/Contacto" element={<Contacto/>} />
        <Route path="/carrito" element={<Carrito/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);