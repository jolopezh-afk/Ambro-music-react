import { useState } from "react";
import { Navigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { usuarios, rutaPorRol, nombreRol } from "../data/usuarios";
import "../index.css";

function InicioSesion() {
    const { usuario, iniciarSesion } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Si ya hay sesión, lo manda a su panel según el rol
    if (usuario) return <Navigate to={rutaPorRol[usuario.rol]} replace />;

    function enviar(e) {
        e.preventDefault();
        if (!iniciarSesion(email, password)) {
            setError("Correo o contraseña incorrectos.");
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="container d-flex justify-content-center align-items-center flex-grow-1 py-4">
                <div className="login-card p-4">
                    <h1 className="login-titulo h3 text-center mb-4">Iniciar sesión</h1>

                    <form onSubmit={enviar}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="correo@ejemplo.com"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Tu contraseña"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                required
                            />
                        </div>

                        {error && <p className="login-error" role="alert">{error}</p>}

                        <button type="submit" className="btn btn-ambromusic w-100">
                            Ingresar
                        </button>
                    </form>

                    {/* Cuentas de prueba: borrar este bloque en la versión final */}
                    <div className="login-demo">
                        <p>Cuentas de prueba</p>
                        {usuarios.map((u) => (
                            <button
                                type="button"
                                key={u.email}
                                onClick={() => { setEmail(u.email); setPassword(u.password); setError(""); }}
                            >
                                <strong>{nombreRol[u.rol]}</strong>
                                <span>{u.email}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default InicioSesion;
