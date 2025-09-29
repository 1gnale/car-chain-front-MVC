"use client";
import AccountDataInputs from "../components/AccountData/AccountDataInputs";
import AccountPolicy from "../components/AccountData/AccountPolicy";
import AccountPricings from "../components/AccountData/AccountPricings";
import { useState } from "react";
import { User, Calculator, LogOut, Settings, Shield } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "../../redux/reduxTypedHooks";

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("datos");

  const { logout } = useAuth0();
  const menuItems = [
    { id: "datos", label: "Datos", icon: User },
    { id: "polizas", label: "Pólizas", icon: Shield },
    { id: "cotizaciones", label: "Cotizaciones", icon: Calculator },
  ];
  const logOut = () => {
    if (window.confirm("¿Estás seguro de que querés cerrar sesión?")) {
      logout();
    }
  };
  const client = useAppSelector((state) => state.cliente.client) as Cliente;

  console.log("client:", client);

  const renderContent = () => {
    switch (activeTab) {
      case "datos":
        return <AccountDataInputs user={client}></AccountDataInputs>;

      case "polizas":
        return <AccountPolicy></AccountPolicy>;

      case "cotizaciones":
        return <AccountPricings></AccountPricings>;

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
                          ? "nav-item-active  bg-dark"
                          : "nav-item-inactive  bg-dark"
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
