import Navbar from "../components/NavBar/Navbar";

export default function AyudaPage() {
  return (
    <div style={{ backgroundColor: "#1a2332", minHeight: "100vh" }}>
      <Navbar isAuth={true}></Navbar>
      {/* Hero Section */}

      <div
        className="text-center py-5"
        style={{ backgroundColor: "#013757ff" }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" style={{ color: "#99ebffff" }}>
            Centro de Ayuda
          </h1>
          <p
            className="lead"
            style={{ color: "#ffffffff", maxWidth: "700px", margin: "0 auto" }}
          >
            Aprende cómo CAR-CHAIN utiliza blockchain para proteger tu seguro
            vehicular
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {/* ¿Qué es Blockchain? */}
        <div className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#22d3ee",
                flexShrink: 0,
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a2332"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <h2 className="text-white mb-0">¿Qué es Blockchain?</h2>
          </div>

          <div
            className="card border-0 shadow-sm"
            style={{ backgroundColor: "#2d3748" }}
          >
            <div className="card-body p-4">
              <p className="text-white mb-3">
                <strong style={{ color: "#22d3ee" }}>Blockchain</strong> es una
                tecnología de registro distribuido que funciona como un libro
                contable digital inmutable y transparente. Imagina una cadena de
                bloques donde cada bloque contiene información que no puede ser
                alterada una vez registrada.
              </p>
              <p className="text-white mb-3">
                Cada transacción o dato se registra en un "bloque" que está
                conectado al bloque anterior, formando una "cadena". Esta cadena
                está distribuida en múltiples computadoras (nodos) alrededor del
                mundo, lo que hace prácticamente imposible modificar o
                falsificar la información.
              </p>
              <div
                className="alert mb-0"
                style={{
                  backgroundColor: "#1a2332",
                  border: "1px solid #22d3ee",
                }}
              >
                <p className="text-white mb-0">
                  <strong style={{ color: "#22d3ee" }}>En resumen:</strong> Es
                  como un libro de registros público, permanente y a prueba de
                  manipulaciones.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cómo se guarda el seguro */}
        <div className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#22d3ee",
                flexShrink: 0,
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a2332"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 className="text-white mb-0">
              ¿Cómo se guarda tu seguro en Blockchain?
            </h2>
          </div>

          <div
            className="card border-0 shadow-sm mb-4"
            style={{ backgroundColor: "#2d3748" }}
          >
            <div className="card-body p-4">
              <h5 className="text-white mb-3" style={{ color: "#22d3ee" }}>
                Proceso de Registro
              </h5>

              <div className="mb-4">
                <div className="d-flex align-items-start mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#22d3ee",
                      flexShrink: 0,
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#1a2332",
                    }}
                  >
                    1
                  </div>
                  <div>
                    <h6 className="text-white mb-2">Creación de la Póliza</h6>
                    <p className="text-white mb-0">
                      Cuando contratas un seguro con CAR-CHAIN, se crea un
                      contrato inteligente (smart contract) que contiene todos
                      los datos de tu póliza: número de póliza, datos del
                      vehículo, cobertura, fechas de vigencia, etc.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#22d3ee",
                      flexShrink: 0,
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#1a2332",
                    }}
                  >
                    2
                  </div>
                  <div>
                    <h6 className="text-white mb-2">
                      Despliegue en Blockchain
                    </h6>
                    <p className="text-white mb-0">
                      El contrato inteligente se despliega en la red blockchain,
                      generando una dirección única del contrato y un hash de
                      transacción que sirven como identificadores permanentes e
                      inmutables.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#22d3ee",
                      flexShrink: 0,
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#1a2332",
                    }}
                  >
                    3
                  </div>
                  <div>
                    <h6 className="text-white mb-2">
                      Verificación y Confirmación
                    </h6>
                    <p className="text-white mb-0">
                      La red blockchain valida y confirma la transacción. Una
                      vez confirmada, la información queda registrada
                      permanentemente y puede ser verificada por cualquier
                      persona con acceso al hash de transacción.
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#22d3ee",
                      flexShrink: 0,
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#1a2332",
                    }}
                  >
                    4
                  </div>
                  <div>
                    <h6 className="text-white mb-2">Acceso Permanente</h6>
                    <p className="text-white mb-0">
                      Recibes los identificadores únicos (hash de transacción y
                      dirección del contrato) que te permiten verificar tu
                      póliza en cualquier momento desde cualquier explorador de
                      blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="mb-5">
          <div className="d-flex align-items-center mb-4">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#22d3ee",
                flexShrink: 0,
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a2332"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="text-white mb-0">¿Cómo te beneficia esto?</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ backgroundColor: "#2d3748" }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#22d3ee",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a2332"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <h5 className="text-white mb-0">Seguridad Total</h5>
                  </div>
                  <p className="text-white mb-0">
                    Tu póliza no puede ser alterada, falsificada o eliminada.
                    Una vez registrada en blockchain, es permanente e inmutable.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ backgroundColor: "#2d3748" }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#22d3ee",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a2332"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <h5 className="text-white mb-0">Transparencia</h5>
                  </div>
                  <p className="text-white mb-0">
                    Puedes verificar tu póliza en cualquier momento usando el
                    hash de transacción en un explorador de blockchain público.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ backgroundColor: "#2d3748" }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#22d3ee",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a2332"
                        strokeWidth="2"
                      >
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <h5 className="text-white mb-0">Rapidez</h5>
                  </div>
                  <p className="text-white mb-0">
                    Los procesos de verificación y validación son instantáneos.
                    No necesitas esperar días para confirmar la validez de tu
                    seguro.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ backgroundColor: "#2d3748" }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#22d3ee",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a2332"
                        strokeWidth="2"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h5 className="text-white mb-0">Descentralización</h5>
                  </div>
                  <p className="text-white mb-0">
                    No dependes de un único servidor o entidad. Tu información
                    está distribuida en múltiples nodos alrededor del mundo.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ backgroundColor: "#2d3748" }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#22d3ee",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a2332"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <h5 className="text-white mb-0">Prueba Irrefutable</h5>
                  </div>
                  <p className="text-white mb-0">
                    En caso de disputas o reclamaciones, tienes una prueba
                    criptográfica e inmutable de tu cobertura y términos del
                    seguro.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card border-0 shadow-sm h-100"
                style={{ backgroundColor: "#2d3748" }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#22d3ee",
                        flexShrink: 0,
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a2332"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <h5 className="text-white mb-0">Historial Completo</h5>
                  </div>
                  <p className="text-white mb-0">
                    Todas las modificaciones, renovaciones y eventos
                    relacionados con tu póliza quedan registrados con fecha y
                    hora exactas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-5">
          <h2 className="text-white mb-4 text-center">Preguntas Frecuentes</h2>

          <div
            className="card border-0 shadow-sm mb-3"
            style={{ backgroundColor: "#2d3748" }}
          >
            <div className="card-body p-4">
              <h5 className="text-white mb-3" style={{ color: "#22d3ee" }}>
                ¿Necesito conocimientos técnicos para usar CAR-CHAIN?
              </h5>
              <p className="text-white mb-0">
                No. CAR-CHAIN maneja toda la complejidad técnica por ti. Solo
                necesitas contratar tu seguro normalmente, y nosotros nos
                encargamos de registrarlo en blockchain. Recibirás
                identificadores únicos que puedes usar para verificar tu póliza
                cuando lo desees.
              </p>
            </div>
          </div>

          <div
            className="card border-0 shadow-sm mb-3"
            style={{ backgroundColor: "#2d3748" }}
          >
            <div className="card-body p-4">
              <h5 className="text-white mb-3" style={{ color: "#22d3ee" }}>
                ¿Qué pasa si pierdo mi hash de transacción?
              </h5>
              <p className="text-white mb-0">
                No te preocupes. Puedes acceder a tu cuenta en CAR-CHAIN en
                cualquier momento para recuperar todos los identificadores de
                tus pólizas. También enviamos esta información a tu correo
                electrónico al momento de la contratación.
              </p>
            </div>
          </div>

          <div
            className="card border-0 shadow-sm mb-3"
            style={{ backgroundColor: "#2d3748" }}
          >
            <div className="card-body p-4">
              <h5 className="text-white mb-3" style={{ color: "#22d3ee" }}>
                ¿Puedo modificar mi póliza después de registrarla en blockchain?
              </h5>
              <p className="text-white mb-0">
                Sí. Cuando realizas cambios en tu póliza, se genera una nueva
                transacción en blockchain que registra la modificación. El
                historial completo de cambios queda registrado, manteniendo la
                transparencia y trazabilidad total.
              </p>
            </div>
          </div>

          <div
            className="card border-0 shadow-sm"
            style={{ backgroundColor: "#2d3748" }}
          >
            <div className="card-body p-4">
              <h5 className="text-white mb-3" style={{ color: "#22d3ee" }}>
                ¿Es seguro almacenar mi información personal en blockchain?
              </h5>
              <p className="text-white mb-0">
                Sí. Solo se almacena información encriptada y necesaria para
                validar tu póliza. Los datos sensibles personales se mantienen
                en sistemas seguros tradicionales, mientras que blockchain solo
                guarda los identificadores y términos del contrato de forma
                inmutable.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-5">
          <h3 className="text-white mb-4">¿Tienes más preguntas?</h3>
          <a
            href="/"
            className="btn btn-lg px-5 py-3"
            style={{
              backgroundColor: "#22d3ee",
              color: "#1a2332",
              border: "none",
              fontWeight: "600",
            }}
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
