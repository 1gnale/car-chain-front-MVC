"use client";
import AccountDataInputs from "../components/AccountData/AccountDataInputs";
import AccountPolicy from "../components/AccountData/AccountPolicy";
import AccountPricings from "../components/AccountData/AccountPricings";
import { useState } from "react";
import { User, Calculator, LogOut, Settings, Shield } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("datos");
  const { logout } = useAuth0();
  const menuItems = [
    { id: "datos", label: "Datos", icon: User },
    { id: "polizas", label: "Pólizas", icon: Shield },
    { id: "cotizaciones", label: "Cotizaciones", icon: Calculator },
  ];
  const mockUsuario: Cliente = {
    idClient: 1,
    id: 101,
    nombres: "Juan Carlos",
    apellido: "Pérez",
    fechaNacimiento: "1990-05-12",
    tipoDocumento: "LC",
    documento: "30123456",
    domicilio: "Calle Falsa 123",
    correo: "juan.perez@example.com",
    telefono: "+54 9 381 4567890",
    sexo: "Masculino",
    contraseña: "1234Segura!",
    localidad: {
      id: 15,
      descripcion: "San Miguel de Tucumán",
      codigoPostal: "4000",
      provincia: {
        id: 2,
        descripcion: "Tucumán",
      },
    },
  };
  const logOut = () => {
    if (window.confirm("¿Estás seguro de que querés cerrar sesión?")) {
      logout();
    }
  };
  const polizasMock: Poliza[] = [
    {
      numero_poliza: 1001234,
      fechaContratacion: "01/01/2024 - 31/12/2024",
      estadoPoliza: "Activa" as const,
    },
    {
      numero_poliza: 1005678,
      fechaContratacion: "01/03/2024",
      estadoPoliza: "Pendiente" as const,
    },
    {
      numero_poliza: 1009876,
      fechaContratacion: "15/02/2024",
      estadoPoliza: "Inactiva" as const,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "datos":
        return <AccountDataInputs user={mockUsuario}></AccountDataInputs>;

      case "polizas":
        return <AccountPolicy></AccountPolicy>;

      case "cotizaciones":
        return <AccountPricings></AccountPricings>;

      case "configuracion":
        return (
          <div className="card bg-dark border-info">
            <div className="card-header bg-transparent border-info">
              <h5 className="card-title text-info mb-0 d-flex align-items-center">
                <Settings className="me-2" size={20} />
                Configuración
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-light mb-1">
                        Notificaciones por email
                      </h6>
                      <small className="text-muted">
                        Recibir actualizaciones sobre pólizas y cotizaciones
                      </small>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-light mb-1">Notificaciones SMS</h6>
                      <small className="text-muted">
                        Recibir alertas importantes por mensaje de texto
                      </small>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <style>{`
        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        .bg-car-chain {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        .text-car-chain {
          color: #22d3ee !important;
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
        }
        
        .btn-car-chain {
          background: linear-gradient(135deg, #06b6d4, #4ade80);
          border: none;
          color: #000;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .btn-car-chain:hover {
          background: linear-gradient(135deg, #22d3ee, #6ee7b7);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 211, 238, 0.3);
        }
        
        /* Fixed contrast by using solid dark background with cyan border */
        .nav-item-active {
          background: #1e293b !important;
          border: 2px solid #22d3ee !important;
          color: #22d3ee !important;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
        }
        
        .nav-item-inactive {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(71, 85, 105, 0.3);
          color: #cbd5e1;
        }
        
        .nav-item-inactive:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(34, 211, 238, 0.2);
          color: #22d3ee;
        }

        .form-control:focus, .form-select:focus {
          border-color: #22d3ee;
          box-shadow: 0 0 0 0.2rem rgba(34, 211, 238, 0.25);
        }
        
        .card {
          backdrop-filter: blur(10px);
        }
        
        .btn-logout {
          background: rgba(127, 29, 29, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
        }
        
        .btn-logout:hover {
          background: rgba(127, 29, 29, 0.4);
          border-color: rgba(239, 68, 68, 0.5);
          color: #fca5a5;
        }
      `}</style>

      <div className="bg-car-chain min-vh-100">
        {/* Main Content */}
        <div className="container-fluid py-4">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="d-grid gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`btn text-start d-flex align-items-center ${
                        activeTab === item.id
                          ? "nav-item-active"
                          : "nav-item-inactive"
                      }`}
                    >
                      <Icon className="me-2" size={20} />
                      {item.label}
                    </button>
                  );
                })}

                <button
                  className="btn btn-logout text-start d-flex align-items-center mt-3"
                  onClick={logOut}
                >
                  <LogOut className="me-2" size={20} />
                  Cerrar Sesión
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="col-lg-9 col-md-8">
              <div className="card bg-dark border-info">
                <div className="card-header bg-transparent border-info text-center">
                  <h2 className="text-car-chain mb-0">
                    {menuItems.find((item) => item.id === activeTab)?.label ||
                      "Datos"}
                  </h2>
                </div>
                <div className="card-body">{renderContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
