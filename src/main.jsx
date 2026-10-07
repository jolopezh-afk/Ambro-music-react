import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import Index from "./pages/Index.jsx";
import Productos from "./pages/Productos.jsx";
import Contacto from "./pages/Contacto.jsx";
import Carrito from "./pages/Carrito.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  </StrictMode>
);