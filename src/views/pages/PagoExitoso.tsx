import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ContratoData {
  numero_poliza?: string;
  hash_transaccion?: string;
  direccion_contrato?: string;
  fecha_despliegue?: string;
  estado?: string;
  monto?: number;
  cobertura?: string;
  cliente?: {
    nombre?: string;
    email?: string;
  };
  vehiculo?: {
    marca?: string;
    modelo?: string;
    año?: number;
    patente?: string;
  };
}

const PagoExitoso: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Los datos pueden venir del state de la navegación o ser hardcodeados para demo
  const contratoData: ContratoData = location.state?.contratoData || {
    numero_poliza: "POL-2025-001234",
    hash_transaccion: "0xf4d2b1a8c7e9f3d2b1a8c7e9f3d2b1a8c7e9f3d2b1a8c7e9f3d2b1a8c7e9f3d2",
    direccion_contrato: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    fecha_despliegue: new Date().toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    estado: "Activo",
    monto: 25000,
    cobertura: "Cobertura Total Premium",
    cliente: {
      nombre: "Juan Pérez",
      email: "juan.perez@email.com"
    },
    vehiculo: {
      marca: "Toyota",
      modelo: "Corolla",
      año: 2022,
      patente: "ABC-123"
    }
  };

  const handleDownloadContract = () => {
    // Lógica para descargar el contrato
    alert('Descargando contrato...');
  };

  const handleViewInBlockchain = () => {
    // Abrir en explorador de blockchain
    window.open(`https://etherscan.io/tx/${contratoData.hash_transaccion}`, '_blank');
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header de éxito */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 text-center">
            <div className="card shadow-lg border-0 mb-4">
              <div className="card-body py-5">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                </div>
                <h1 className="display-4 text-success fw-bold mb-3">
                  ¡Contrato Desplegado Exitosamente!
                </h1>
                <p className="lead text-muted">
                  Su póliza ha sido registrada en la blockchain de forma segura e inmutable
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Información del contrato */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row g-4">
              
              {/* Datos principales del contrato */}
              <div className="col-md-6">
                <div className="card shadow border-0 h-100">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-file-earmark-text me-2"></i>
                      Datos del Contrato
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span className="text-muted">N° Póliza:</span>
                          <span className="fw-bold text-primary">{contratoData.numero_poliza}</span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span className="text-muted">Estado:</span>
                          <span className="badge bg-success">{contratoData.estado}</span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span className="text-muted">Fecha Despliegue:</span>
                          <span className="fw-bold">{contratoData.fecha_despliegue}</span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span className="text-muted">Monto:</span>
                          <span className="fw-bold text-success">
                            ${contratoData.monto?.toLocaleString('es-AR')}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted">Cobertura:</span>
                          <span className="fw-bold">{contratoData.cobertura}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información Blockchain */}
              <div className="col-md-6">
                <div className="card shadow border-0 h-100">
                  <div className="card-header bg-info text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-diagram-3 me-2"></i>
                      Información Blockchain
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="text-muted small">Hash de Transacción:</label>
                        <div className="input-group">
                          <input 
                            type="text" 
                            className="form-control form-control-sm font-monospace" 
                            value={contratoData.hash_transaccion} 
                            readOnly 
                          />
                          <button 
                            className="btn btn-outline-secondary btn-sm" 
                            onClick={() => navigator.clipboard.writeText(contratoData.hash_transaccion || '')}
                          >
                            <i className="bi bi-clipboard"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="text-muted small">Dirección del Contrato:</label>
                        <div className="input-group">
                          <input 
                            type="text" 
                            className="form-control form-control-sm font-monospace" 
                            value={contratoData.direccion_contrato} 
                            readOnly 
                          />
                          <button 
                            className="btn btn-outline-secondary btn-sm" 
                            onClick={() => navigator.clipboard.writeText(contratoData.direccion_contrato || '')}
                          >
                            <i className="bi bi-clipboard"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <button 
                          className="btn btn-info w-100"
                          onClick={handleViewInBlockchain}
                        >
                          <i className="bi bi-box-arrow-up-right me-2"></i>
                          Ver en Explorador de Blockchain
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del Cliente y Vehículo */}
              <div className="col-md-6">
                <div className="card shadow border-0 h-100">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">
                      <i className="bi bi-person me-2"></i>
                      Cliente
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span className="text-muted">Nombre:</span>
                          <span className="fw-bold">{contratoData.cliente?.nombre}</span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted">Email:</span>
                          <span className="fw-bold">{contratoData.cliente?.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow border-0 h-100">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="mb-0">
                      <i className="bi bi-car-front me-2"></i>
                      Vehículo Asegurado
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span className="text-muted">Vehículo:</span>
                          <span className="fw-bold">
                            {contratoData.vehiculo?.marca} {contratoData.vehiculo?.modelo}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span className="text-muted">Año:</span>
                          <span className="fw-bold">{contratoData.vehiculo?.año}</span>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted">Patente:</span>
                          <span className="fw-bold">{contratoData.vehiculo?.patente}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card shadow border-0">
              <div className="card-body text-center py-4">
                <h5 className="mb-4">¿Qué desea hacer ahora?</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <button 
                      className="btn btn-primary btn-lg w-100"
                      onClick={handleDownloadContract}
                    >
                      <i className="bi bi-download me-2"></i>
                      Descargar Contrato
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button 
                      className="btn btn-outline-primary btn-lg w-100"
                      onClick={() => navigate('/mis-polizas')}
                    >
                      <i className="bi bi-list-ul me-2"></i>
                      Ver Mis Pólizas
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button 
                      className="btn btn-outline-secondary btn-lg w-100"
                      onClick={() => navigate('/')}
                    >
                      <i className="bi bi-house me-2"></i>
                      Ir al Inicio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PagoExitoso;
