import imgablockchain from "../assets/Blockchain.png";
import imgagrupo from "../assets/Foto grupal.png";

import Navbar from "../components/NavBar/Navbar";

export default function QuienesSomos() {
  return (
    <div style={{ backgroundColor: "#1a2332", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Navbar isAuth={true}></Navbar>
      <div
        style={{
          backgroundColor: "#013757ff",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#99ebffff",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            Revolucionando la industria automotriz con blockchain
          </h1>
          <p
            style={{ fontSize: "1rem", color: "#ffffffff", lineHeight: "1.6" }}
          >
            En CAR-CHAIN, creemos que la tecnología blockchain puede transformar
            la manera en que gestionamos seguros vehiculares. Nuestra misión es
            proporcionar transparencia, seguridad y confianza en cada
            transacción, eliminando intermediarios y reduciendo costos para
            nuestros clientes.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div style={{ padding: "80px 20px" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2
                style={{
                  fontSize: "2rem",
                  color: "#22d3ee",
                  marginBottom: "30px",
                  fontWeight: "300",
                  fontStyle: "italic",
                }}
              >
                Nuestra historia
              </h2>
              <div
                style={{
                  color: "#e5e7eb",
                  lineHeight: "1.8",
                  fontSize: "1rem",
                }}
              >
                <p style={{ marginBottom: "20px" }}>
                  Todo comenzó como un simple trabajo universitario. Éramos un
                  grupo de estudiantes de ingeniería con una misión clara:
                  desarrollar un proyecto final que fuera realmente innovador.
                  Era el año 2022, y la tecnología blockchain estaba en pleno
                  auge. Entre cafés, pizarras llenas de ideas y largas noches de
                  código, surgió una pregunta que lo cambiaría todo: ¿Y si
                  aplicamos blockchain al mundo de los seguros?
                </p>
                <p style={{ marginBottom: "20px" }}>
                  La idea nos pareció revolucionaria. Un sistema transparente,
                  seguro y completamente digital que eliminara los trámites
                  interminables y la desconfianza en los procesos tradicionales.
                  Así nació nuestro primer prototipo: una plataforma capaz de
                  registrar pólizas de seguro de manera inmutable, verificable y
                  accesible desde cualquier dispositivo.
                </p>
                <p style={{ marginBottom: "20px" }}>
                  Lo que empezó como un experimento académico pronto se
                  transformó en una visión compartida: democratizar el acceso a
                  seguros confiables mediante la innovación tecnológica. Con
                  esfuerzo, curiosidad y pasión por aprender, logramos construir
                  algo más que un proyecto universitario: una propuesta real que
                  combina ingeniería, creatividad y un propósito claro.
                </p>
                <p>
                  Hoy seguimos siendo el mismo grupo de ingenieros —curiosos,
                  soñadores y un poco obsesivos con el detalle—, pero con una
                  meta más grande: seguir mejorando esta plataforma y demostrar
                  que la innovación también puede surgir de un aula
                  universitaria.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex flex-column gap-4">
                <div
                  style={{
                    backgroundColor: "#2d3748",
                    borderRadius: "12px",
                    padding: "30px",
                    border: "1px solid #374151",
                  }}
                >
                  <img
                    src={imgagrupo}
                    alt="Equipo CAR-CHAIN"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}
                  />
                  <h3
                    style={{
                      color: "#22d3ee",
                      fontSize: "1.25rem",
                      marginBottom: "10px",
                    }}
                  >
                    Nuestro Equipo
                  </h3>
                  <p
                    style={{ color: "#d1d5db", fontSize: "0.95rem", margin: 0 }}
                  >
                    Profesionales apasionados por la innovación y la tecnología
                    blockchain
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#2d3748",
                    borderRadius: "12px",
                    padding: "30px",
                    border: "1px solid #374151",
                  }}
                >
                  <img
                    src={imgablockchain}
                    alt="Tecnología Blockchain"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}
                  />
                  <h3
                    style={{
                      color: "#22d3ee",
                      fontSize: "1.25rem",
                      marginBottom: "10px",
                    }}
                  >
                    Nuestra Tecnología
                  </h3>
                  <p
                    style={{ color: "#d1d5db", fontSize: "0.95rem", margin: 0 }}
                  >
                    Contratos inteligentes que garantizan transparencia y
                    seguridad total
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div style={{ backgroundColor: "#0f172a", padding: "60px 20px" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <h2
            style={{
              color: "#22d3ee",
              textAlign: "center",
              fontSize: "2rem",
              marginBottom: "50px",
            }}
          >
            Nuestros Valores
          </h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#22d3ee",
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "2rem", color: "#1a2332" }}>🔒</span>
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.25rem",
                    marginBottom: "15px",
                  }}
                >
                  Seguridad
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
                  Protegemos tus datos con la tecnología blockchain más avanzada
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#22d3ee",
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "2rem", color: "#1a2332" }}>✨</span>
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.25rem",
                    marginBottom: "15px",
                  }}
                >
                  Transparencia
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
                  Cada transacción es verificable y auditable en la blockchain
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#22d3ee",
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "2rem", color: "#1a2332" }}>🚀</span>
                </div>
                <h3
                  style={{
                    color: "#fff",
                    fontSize: "1.25rem",
                    marginBottom: "15px",
                  }}
                >
                  Innovación
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
                  Constantemente mejoramos nuestra plataforma con nuevas
                  funcionalidades
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
