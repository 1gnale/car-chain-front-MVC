import { useState } from "react";
import GrayButton from "../components/GeneralComponents/Button";
import useFormValidationPayementPeriod from "../../controllers/controllerHooks/Validations/usePayementPeriodsValidation";
import Input from "../components/GeneralComponents/Input";
import CheckForm from "../components/GeneralComponents/CheckForm";

function PageDashboardDefault({}: {}) {
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
          transition: transform 0.3s ease;
        }
        
        /* Added responsive styles for sidebar */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
          
          .sidebar.mobile-open {
            transform: translateX(0);
          }
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
        
        /* Added responsive styles for main content */
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
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
        
        /* Added breadcrumb styles */
        .breadcrumb-container {
          display: none;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
        }
        
        @media (max-width: 768px) {
          .breadcrumb-container {
            display: flex;
          }
        }
        
        .mobile-menu-button {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 6px;
          background-color: #f3f4f6;
          color: #374151;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .mobile-menu-button:hover {
          background-color: #e5e7eb;
        }
        
        @media (max-width: 768px) {
          .mobile-menu-button {
            display: flex;
          }
        }
        
        .breadcrumb-text {
          color: #374151;
          font-size: 16px;
          font-weight: 500;
        }
        
        .breadcrumb-separator {
          color: #9ca3af;
          font-size: 14px;
        }
        
        /* Added mobile overlay */
        .mobile-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        
        @media (max-width: 768px) {
          .mobile-overlay.show {
            display: block;
          }
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

        .dashboard-overview {
          width: 100%;
        }
        
        .dashboard-header {
          margin-bottom: 32px;
        }
        
        .dashboard-header h1 {
          color: #1f2937;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .dashboard-header p {
          color: #6b7280;
          font-size: 16px;
          margin: 0;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .metric-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .metric-icon {
          font-size: 32px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 12px;
        }
        
        .metric-content h3 {
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .metric-number {
          color: #1f2937;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        
        .metric-change {
          font-size: 14px;
          font-weight: 500;
        }
        
        .metric-change.positive {
          color: #10b981;
        }
        
        .metric-change.neutral {
          color: #6b7280;
        }
        
        .dashboard-widgets {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .widget-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }
        
        .widget-card h3 {
          color: #1f2937;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        
        .activity-icon {
          font-size: 20px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 8px;
          flex-shrink: 0;
        }
        
        .activity-content {
          flex: 1;
        }
        
        .activity-text {
          color: #1f2937;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .activity-time {
          color: #6b7280;
          font-size: 12px;
        }
        
        .system-status {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .status-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
        }
        
        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        .status-indicator.online {
          background: #10b981;
        }
        
        .status-indicator.warning {
          background: #f59e0b;
        }
        
        .status-item span:nth-child(2) {
          flex: 1;
          color: #1f2937;
          font-weight: 500;
          font-size: 14px;
        }
        
        .status-text {
          color: #6b7280;
          font-size: 14px;
        }
        
        .quick-actions h3 {
          color: #1f2937;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .action-button {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }
        
        .action-button:hover {
          background: #f9fafb;
          border-color: #3b82f6;
          transform: translateY(-1px);
        }
        
        .action-icon {
          font-size: 20px;
        }
        
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-widgets {
            grid-template-columns: 1fr;
          }
          
          .actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .actions-grid {
            grid-template-columns: 1fr;
          }
          
          .metric-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="dashboard-overview">
        <div className="dashboard-header">
          <h1>Dashboard Administrativo</h1>
          <p>Resumen general del sistema Car-Chain</p>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">👥</div>
            <div className="metric-content">
              <h3>Usuarios Activos</h3>
              <div className="metric-number">1,247</div>
              <div className="metric-change positive">+12% este mes</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🏷️</div>
            <div className="metric-content">
              <h3>Marcas Registradas</h3>
              <div className="metric-number">45</div>
              <div className="metric-change positive">+3 nuevas</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🚗</div>
            <div className="metric-content">
              <h3>Modelos Disponibles</h3>
              <div className="metric-number">328</div>
              <div className="metric-change positive">+15 este mes</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🛡️</div>
            <div className="metric-content">
              <h3>Coberturas Vigentes</h3>
              <div className="metric-number">892</div>
              <div className="metric-change neutral">Sin cambios</div>
            </div>
          </div>
        </div>

        <div className="dashboard-widgets">
          <div className="widget-card">
            <h3>Actividad Reciente</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">👤</div>
                <div className="activity-content">
                  <div className="activity-text">
                    Nuevo usuario registrado: Juan Pérez
                  </div>
                  <div className="activity-time">Hace 2 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🚗</div>
                <div className="activity-content">
                  <div className="activity-text">
                    Modelo Toyota Corolla 2024 agregado
                  </div>
                  <div className="activity-time">Hace 4 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🛡️</div>
                <div className="activity-content">
                  <div className="activity-text">
                    Cobertura premium actualizada
                  </div>
                  <div className="activity-time">Hace 6 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📅</div>
                <div className="activity-content">
                  <div className="activity-text">
                    Nuevo período de pago configurado
                  </div>
                  <div className="activity-time">Hace 1 día</div>
                </div>
              </div>
            </div>
          </div>

          <div className="widget-card">
            <h3>Estado del Sistema</h3>
            <div className="system-status">
              <div className="status-item">
                <div className="status-indicator online"></div>
                <span>Base de Datos</span>
                <span className="status-text">Operativo</span>
              </div>
              <div className="status-item">
                <div className="status-indicator online"></div>
                <span>API Services</span>
                <span className="status-text">Operativo</span>
              </div>
              <div className="status-item">
                <div className="status-indicator warning"></div>
                <span>Cache Redis</span>
                <span className="status-text">Lento</span>
              </div>
              <div className="status-item">
                <div className="status-indicator online"></div>
                <span>Backup System</span>
                <span className="status-text">Operativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageDashboardDefault;
