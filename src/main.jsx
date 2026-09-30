import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Index from "./pages/index.jsx";
import Productos from "./pages/Productos.jsx";
import Contacto from "./pages/Contacto.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Index />} />
        <Route path="/Productos" element={<Productos/>} />
        <Route path="/Contacto" element={<Contacto/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);