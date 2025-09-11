import { Users, Tag, Car, Shield, User, Calendar } from "lucide-react";

function DashboardWithLucideIcons() {
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
        
        .dashboard-overview {
          width: 100%;
          padding: 24px;
          background-color: #f3f4f6;
          min-height: 100vh;
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
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 12px;
          color: #3b82f6;
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
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 8px;
          flex-shrink: 0;
          color: #6b7280;
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
        
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-widgets {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .metric-card {
            flex-direction: column;
            text-align: center;
          }
          
          .dashboard-overview {
            padding: 16px;
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
            <div className="metric-icon">
              <Users size={32} />
            </div>
            <div className="metric-content">
              <h3>Usuarios Activos</h3>
              <div className="metric-number">1,247</div>
              <div className="metric-change positive">+12% este mes</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Tag size={32} />
            </div>
            <div className="metric-content">
              <h3>Marcas Registradas</h3>
              <div className="metric-number">45</div>
              <div className="metric-change positive">+3 nuevas</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Car size={32} />
            </div>
            <div className="metric-content">
              <h3>Modelos Disponibles</h3>
              <div className="metric-number">328</div>
              <div className="metric-change positive">+15 este mes</div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Shield size={32} />
            </div>
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
                <div className="activity-icon">
                  <User size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-text">
                    Nuevo usuario registrado: Juan Pérez
                  </div>
                  <div className="activity-time">Hace 2 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <Car size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-text">
                    Modelo Toyota Corolla 2024 agregado
                  </div>
                  <div className="activity-time">Hace 4 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <Shield size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-text">
                    Cobertura premium actualizada
                  </div>
                  <div className="activity-time">Hace 6 horas</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <Calendar size={20} />
                </div>
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

export default DashboardWithLucideIcons;
