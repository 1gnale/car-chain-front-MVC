"use client";

import { useState } from "react";
import ControladorCoberturas from "../../controllers/ControladorCobertura";
import ControladorDetalles from "../../controllers/ControladorDetalles";
import ControladorMarcas from "../../controllers/ControladorMarcas";
import ControladorModelos from "../../controllers/ControladorModelos";
import ControladorVersiones from "../../controllers/ControladorVersiones";
import { useAuth0 } from "@auth0/auth0-react";
import PeriodoPagoPage from "./PeriodoPagoPage";
import ControladorPeriodoPago from "../../controllers/ControladorPeriodoPago";

export default function Home() {
  const [activeSection, setActiveSection] = useState("");
  const { logout } = useAuth0();
  const navigationItems = [
    { id: "usuarios", label: "Usuarios", emoji: "👥" },
    { id: "marcas", label: "Marcas", emoji: "🏷️" },
    { id: "modelos", label: "Modelos", emoji: "🚗" },
    { id: "versiones", label: "Versiones", emoji: "📄" },
    { id: "detalles-cobertura", label: "Detalles De Cobertura", emoji: "🛡️" },
    { id: "coberturas", label: "Coberturas", emoji: "🔒" },
    { id: "periodos-pago", label: "Períodos De Pago", emoji: "📅" },
    { id: "tipos-contratacion", label: "Tipos De Contratación", emoji: "💳" },
    { id: "configuraciones", label: "Configuraciónes", emoji: "⚙️" },
    {
      id: "cerrarSesion",
      label: "Cerrar Sesion",
      emoji: "⛔",
      action: () => {
        if (window.confirm("¿Estás seguro de que querés cerrar sesión?")) {
          logout();
        }
      },
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "usuarios":
        return (
          <div>
            <h1>Gestión de Usuarios</h1>
            <p>Aquí puedes agregar tu contenido para usuarios</p>
            {/* Aquí agregas tus componentes de usuarios */}
          </div>
        );
      case "marcas":
        return <ControladorMarcas></ControladorMarcas>;
      case "modelos":
        return <ControladorModelos></ControladorModelos>;
      case "versiones":
        return <ControladorVersiones></ControladorVersiones>;
      case "detalles-cobertura":
        return <ControladorDetalles></ControladorDetalles>;
      case "coberturas":
        return <ControladorCoberturas></ControladorCoberturas>;
      case "periodos-pago":
        return <ControladorPeriodoPago />;
      case "tipos-contratacion":
        return (
          <div>
            <h1>Tipos de Contratación</h1>
            <p>Aquí puedes agregar tu contenido para tipos de contratación</p>
            {/* Aquí agregas tus componentes de tipos de contratación */}
          </div>
        );
      case "configuraciones":
        return (
          <div>
            <h1>Tipos de Contratación</h1>
            <p>Aquí puedes agregar tu contenido para tipos de contratación</p>
            {/* Aquí agregas tus componentes de tipos de contratación */}
          </div>
        );
      default:
        return <div>Selecciona una sección</div>;
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .dashboard-container {
          display: flex;
          height: 100vh;
          width: 100vw;
        }
        
        .sidebar {
          width: 260px;
          background-color: #1f2937;
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          z-index: 1000;
        }
        
        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid #374151;
        }
        
        .sidebar-title {
          font-size: 20px;
          font-weight: bold;
          color: white;
        }
        
        .nav-container {
          padding: 16px;
          flex: 1;
        }
        
        .nav-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          margin-bottom: 4px;
          border: none;
          border-radius: 8px;
          background: none;
          color: #d1d5db;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        
        .nav-button:hover {
          background-color: #374151;
          color: white;
        }
        
        .nav-button.active {
          background-color: #3b82f6;
          color: white;
        }
        
        .nav-emoji {
          font-size: 18px;
        }
        
        .main-content {
          flex: 1;
          background-color: #f3f4f6;
          display: flex;
          flex-direction: column;
          margin-left: 260px;
          height: 100vh;
          overflow-y: auto;
        }
        
        .main-header {
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 24px;
        }
        
        .header-text {
          color: #6b7280;
          font-size: 16px;
        }
        
        .content-area {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        
        .content-area h1 {
          color: #1f2937;
          font-size: 24px;
          margin-bottom: 16px;
        }
        
        .content-area p {
          color: #6b7280;
          font-size: 16px;
          margin-bottom: 24px;
        }
      `}</style>

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2
              className="sidebar-title"
              onClick={() => {
                setActiveSection("default");
              }}
              style={{ cursor: "pointer" }}
            >
              Admin Panel
            </h2>
          </div>

          <nav className="nav-container">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveSection(item.id);
                  }
                }}
                className={`nav-button ${
                  activeSection === item.id ? "active" : ""
                }`}
              >
                <span className="nav-emoji">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="main-header">
            <span className="header-text">Sistema de Gestión Car-Chain</span>
          </header>

          <main className="content-area">{renderContent()}</main>
        </div>
      </div>
    </>
  );
}
