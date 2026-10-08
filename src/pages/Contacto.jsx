import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../index.css";

function Contacto() {
return (
<div className="d-flex flex-column min-vh-100">
<Navbar />

        <main className="container my-5">

            {/* CABECERA */}
            <div className="mb-4">
                <h1 className="fw-bold fs-2 text-white mb-1">
                    Contacto y Atención al Cliente
                </h1>

                <p className="text-secondary mb-0">
                    ¿Tienes alguna consulta sobre nuestros productos o
                    envíos? Escríbenos y te responderemos a la brevedad.
                </p>
            </div>

            {/* GRID PRINCIPAL */}
            <div className="row g-4">

                {/* FORMULARIO */}
                <div className="col-lg-7">
                    <div className="contacto-card">
                        <h2 className="h4 fw-bold text-white mb-4">
                            Envíanos un mensaje
                        </h2>

                        <form>
                            <div className="row g-3">

                                <div className="col-md-6 mb-3">
                                    <label
                                        htmlFor="nombre"
                                        className="form-label"
                                    >
                                        Nombre completo
                                    </label>

                                    <input
                                        type="text"
                                        id="nombre"
                                        className="form-control"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Correo electrónico
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="correo@ejemplo.com"
                                        required
                                    />
                                </div>

                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="telefono"
                                    className="form-label"
                                >
                                    Teléfono de contacto
                                </label>

                                <input
                                    type="tel"
                                    id="telefono"
                                    className="form-control"
                                    placeholder="+56 9 1234 5678"
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="asunto"
                                    className="form-label"
                                >
                                    Asunto
                                </label>

                                <input
                                    type="text"
                                    id="asunto"
                                    className="form-control"
                                    placeholder="¿En qué podemos ayudarte?"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="mensaje"
                                    className="form-label"
                                >
                                    Mensaje
                                </label>

                                <textarea
                                    id="mensaje"
                                    className="form-control"
                                    rows="5"
                                    placeholder="Escribe tu mensaje aquí..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-ambromusic w-100 py-2 fw-bold"
                            >
                                Enviar mensaje
                            </button>
                        </form>
                    </div>
                </div>

                {/* INFORMACIÓN */}
                <div className="col-lg-5">
                    <div className="d-flex flex-column gap-3">

                        <div className="info-box">
                            <span className="info-box-icon">
                                📞
                            </span>

                            <h3>Llámanos</h3>

                            <p className="info-highlight mb-1">
                                +56 9 12345678
                            </p>

                            <p className="small text-secondary">
                                Atención telefónica directa de nuestro
                                equipo.
                            </p>
                        </div>

                        <div className="info-box">
                            <span className="info-box-icon">
                                🕐
                            </span>

                            <h3>Horario de atención</h3>

                            <p className="text-white mb-1">
                                Lunes a Viernes:{" "}
                                <strong>10:00 a 18:30 hrs.</strong>
                            </p>

                            <p className="small text-secondary">
                                Sábados y Domingos:{" "}
                                <span className="text-danger fw-bold">
                                    Cerrado
                                </span>
                            </p>
                        </div>

                        <div className="info-box">
                            <span className="info-box-icon">
                                💬
                            </span>

                            <h3>WhatsApp directo</h3>

                            <p className="small text-secondary mb-3">
                                ¿Necesitas ayuda rápida con un pedido o
                                cotización?
                            </p>

                            <a
                                href="https://wa.me/56943519040"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-ambromusic w-100 py-2 text-decoration-none"
                            >
                                Contactar por WhatsApp
                            </a>
                        </div>

                    </div>
                </div>

            </div>

            {/* BENEFICIOS */}
            <div className="mt-5 pt-3">

                <h2 className="h4 fw-bold text-white text-center mb-4">
                    ¿Por qué comprar en AmbroMusic?
                </h2>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">

                    <div className="col">
                        <div className="info-box h-100">
                            <span className="info-box-icon">
                                🚚
                            </span>

                            <h4>Despacho a todo Chile</h4>

                            <p className="small text-secondary">
                                Envíos con seguimiento en línea.
                            </p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="info-box h-100">
                            <span className="info-box-icon">
                                🛡️
                            </span>

                            <h4>Productos garantizados</h4>

                            <p className="small text-secondary">
                                Garantía oficial en todos tus
                                instrumentos.
                            </p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="info-box h-100">
                            <span className="info-box-icon">
                                🎧
                            </span>

                            <h4>Atención personalizada</h4>

                            <p className="small text-secondary">
                                Asesoría de especialistas en música.
                            </p>
                        </div>
                    </div>

                    <div className="col">
                        <div className="info-box h-100">
                            <span className="info-box-icon">
                                🔒
                            </span>

                            <h4>Compra 100% segura</h4>

                            <p className="small text-secondary">
                                Pagos cifrados mediante Webpay.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </main>

        <Footer />
    </div>
);


}

export default Contacto;