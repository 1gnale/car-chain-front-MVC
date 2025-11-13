import { useState, FormEvent } from "react";
import Modal from "../components/GeneralComponents/Modal";
import Navbar from "../components/NavBar/Navbar";

type ModalType = "success" | "error" | "warning" | "info";

interface FormMail {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

export default function ContactanosPage() {
  // --- Estados del Modal ---
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>("info");
  const [messageTitle, setMessageTitle] = useState<string>("");

  // --- Estado del formulario ---
  const [formMail, setFormMail] = useState<FormMail>({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  // --- Manejar cambios en inputs ---
  const handleInputChange = (field: keyof FormMail, value: string) => {
    setFormMail((prev) => ({ ...prev, [field]: value }));
  };

  // --- Validar campos ---
  const validarCampos = (): boolean => {
    if (!formMail.nombre.trim()) {
      setMessageTitle("Faltan datos");
      setModalMessage("Por favor, ingresá tu nombre.");
      setMessageType("warning");
      setShowModal(true);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formMail.email)) {
      setMessageTitle("Correo inválido");
      setModalMessage("Por favor, ingresá un correo electrónico válido.");
      setMessageType("warning");
      setShowModal(true);
      return false;
    }
    if (!formMail.mensaje.trim()) {
      setMessageTitle("Mensaje vacío");
      setModalMessage("Por favor, escribí un mensaje antes de enviar.");
      setMessageType("warning");
      setShowModal(true);
      return false;
    }
    return true;
  };

  // --- Enviar formulario ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validarCampos()) return;

    // Dentro de handleSubmit:
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASEURL}/api/enviar-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formMail.nombre,
            email: formMail.email,
            mensaje:
              formMail.asunto +
              "  ----  " +
              formMail.mensaje +
              "  ----  Telefono de contacto: " +
              formMail.telefono,
          }),
        }
      );

      if (response.ok) {
        setMessageTitle("Mensaje enviado");
        setModalMessage(
          `Tu mensaje fue enviado con éxito. ¡Gracias por contactarnos, ${formMail.nombre}!`
        );
        setMessageType("success");
        setShowModal(true);
        setFormMail({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: "",
        });
      } else {
        setMessageTitle("Error");
        setModalMessage(`Ocurrio un error desconocido, intentelo mas tarde`);
        setMessageType("error");
        setShowModal(true);
      }
    } catch (error) {
      setMessageTitle("Error");
      setModalMessage(`${error}`);
      setMessageType("error");
      setShowModal(true);
    }
  };

  return (
    <div style={{ backgroundColor: "#1a2332", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar isAuth={true} />

      {/* Hero */}
      <div
        className="text-center py-5"
        style={{ backgroundColor: "#013757ff" }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{ color: "#99ebffff" }}>
            Contáctanos
          </h1>
          <p
            className="lead"
            style={{ color: "#ffffffff", maxWidth: "700px", margin: "0 auto" }}
          >
            Estamos aquí para ayudarte. Ponte en contacto con nosotros y te
            responderemos lo antes posible.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="container py-5">
        <div className="row g-4">
          {/* --- Información de contacto --- */}
          <div className="col-lg-5">
            <div className="mb-5">
              <h2 className="h3 fw-bold mb-4" style={{ color: "#22d3ee" }}>
                Información de Contacto
              </h2>
              <p className="text-white-50 mb-4">
                Nuestro equipo está disponible para responder tus consultas
                sobre seguros vehiculares en blockchain.
              </p>
            </div>

            {/* Email */}
            <div className="d-flex align-items-start gap-3 mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "rgba(34, 211, 238, 0.1)",
                  border: "2px solid #22d3ee",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 className="h6 fw-bold mb-1" style={{ color: "#22d3ee" }}>
                  Email
                </h3>
                <p className="text-white-50 mb-0">contacto@car-chain.com</p>
                <p className="text-white-50 mb-0">soporte@car-chain.com</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="d-flex align-items-start gap-3 mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "rgba(34, 211, 238, 0.1)",
                  border: "2px solid #22d3ee",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="h6 fw-bold mb-1" style={{ color: "#22d3ee" }}>
                  Teléfono
                </h3>
                <p className="text-white-50 mb-0">+34 900 123 456</p>
                <p className="text-white-50 mb-0">Lun - Vie: 9:00 - 18:00</p>
              </div>
            </div>

            {/* Ubicación */}
            <div className="d-flex align-items-start gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "rgba(34, 211, 238, 0.1)",
                  border: "2px solid #22d3ee",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="h6 fw-bold mb-1" style={{ color: "#22d3ee" }}>
                  Oficina
                </h3>
                <p className="text-white-50 mb-0">Calle Blockchain 123</p>
                <p className="text-white-50 mb-0">28001 Madrid, España</p>
              </div>
            </div>
          </div>

          {/* --- Formulario de contacto --- */}
          <div className="col-lg-7">
            <div
              className="p-4 rounded-3"
              style={{ backgroundColor: "#2d3748" }}
            >
              <h2 className="h3 fw-bold mb-4" style={{ color: "#22d3ee" }}>
                Envíanos un Mensaje
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-white">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        backgroundColor: "#1a2332",
                        border: "1px solid #4a5568",
                        color: "#fff",
                      }}
                      placeholder="Tu nombre"
                      value={formMail.nombre}
                      onChange={(e) =>
                        handleInputChange("nombre", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-white">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      style={{
                        backgroundColor: "#1a2332",
                        border: "1px solid #4a5568",
                        color: "#fff",
                      }}
                      placeholder="tu@email.com"
                      value={formMail.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-white">Teléfono</label>
                    <input
                      type="tel"
                      className="form-control"
                      style={{
                        backgroundColor: "#1a2332",
                        border: "1px solid #4a5568",
                        color: "#fff",
                      }}
                      placeholder="+34 600 000 000"
                      value={formMail.telefono}
                      onChange={(e) =>
                        handleInputChange("telefono", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-white">Asunto</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        backgroundColor: "#1a2332",
                        border: "1px solid #4a5568",
                        color: "#fff",
                      }}
                      placeholder="¿En qué podemos ayudarte?"
                      value={formMail.asunto}
                      onChange={(e) =>
                        handleInputChange("asunto", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-white">Mensaje</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      style={{
                        backgroundColor: "#1a2332",
                        border: "1px solid #4a5568",
                        color: "#fff",
                      }}
                      placeholder="Escribe tu mensaje aquí..."
                      value={formMail.mensaje}
                      onChange={(e) =>
                        handleInputChange("mensaje", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-lg w-100 fw-semibold"
                      style={{
                        backgroundColor: "#22d3ee",
                        color: "#1a2332",
                        border: "none",
                      }}
                    >
                      Enviar Mensaje
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        type={messageType}
        title={messageTitle}
        message={modalMessage || "Error inesperado. Intente más tarde."}
      />
    </div>
  );
}
