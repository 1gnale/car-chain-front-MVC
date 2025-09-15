import { useMemo, useState } from "react";
import SelectForm from "../GeneralComponents/SelectForm";

function PolicyFristPayment() {
  const tiposContratacion: TipoContratacion[] = [
    {
      id: 4,
      nombre: "Mensual",
      cantidadMeses: 1,
      activo: true,
    },
    {
      id: 3,
      nombre: "Trimestral",
      cantidadMeses: 3,
      activo: true,
    },
    {
      id: 2,
      nombre: "Semestral",
      cantidadMeses: 6,
      activo: true,
    },
    {
      id: 1,
      nombre: "Anual",
      cantidadMeses: 12,
      activo: false,
    },
  ];
  const periodosPago: PeriodoPago[] = [
    {
      id: 1,
      nombre: "Mensaul",
      cantidadMeses: 1,
      descuento: 0,
      activo: true,
    },
    {
      id: 2,
      nombre: "Trimestral",
      cantidadMeses: 3,
      descuento: 10,
      activo: true,
    },
    {
      id: 3,
      nombre: "Semestral",
      cantidadMeses: 6,
      descuento: 15,
      activo: false,
    },
  ];

  const [selectedContratType, setSelectedContratType] = useState(0);
  const [selectedPaymentPeriod, setSelectedPaymentPeriod] = useState(0);
  //handles
  const handleTiposContratacion = useMemo(() => {
    const tiposContratacionFilt = tiposContratacion.filter(
      (line) => line.activo === true
    );
    const result = tiposContratacionFilt.map((tipoContratacion) => {
      return { id: tipoContratacion.id, name: tipoContratacion.nombre! };
    });
    return result;
  }, [tiposContratacion]);

  const handlePeriodoPago = useMemo(() => {
    const periodosPagoFilt = periodosPago.filter(
      (line) => line.activo === true
    );
    const result = periodosPagoFilt.map((periodoPago) => {
      return { id: periodoPago.id, name: periodoPago.nombre! };
    });
    return result;
  }, [periodosPago]);

  return (
    <>
      <style>{`
        .payment-card {
          max-width: 600px;
          margin: 2rem auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          padding: 0;
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #0bbfdbff 0%, #0bbfdbff 100%);
          color: white;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }

        .card-body {
          padding: 2rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          background-color: #f9fafb;
          color: #6b7280;
        }

        .total-section {
          text-align: right;
          margin: 2rem 0;
        }

        .total-label {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .total-amount {
          font-size: 2rem;
          font-weight: 700;
          color: #059669;
          margin: 0;
        }

        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .btn-cancel {
          background-color: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .btn-cancel:hover {
          background-color: #e5e7eb;
        }

        .btn-confirm {
          background-color: #0bbfdbff;
          color: white;
        }

        .btn-confirm:hover {
          background-color: #26ddeeff;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .payment-card {
            margin: 1rem;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="payment-card">
        <div className="card-header">
          <h2 className="card-title">Pagar Póliza</h2>
        </div>

        <div className="card-body">
          <div className="form-row">
            <SelectForm
              status={true}
              value={selectedContratType}
              title="Tipo contratacion"
              classNameDiv="input-field"
              classNameLabel="me-2"
              classNameSelect="flex-grow-1"
              items={handleTiposContratacion}
              onChange={setSelectedContratType}
            />

            <SelectForm
              status={true}
              value={selectedPaymentPeriod}
              title="Periodo de pago"
              classNameDiv="input-field"
              classNameLabel="me-2"
              classNameSelect="flex-grow-1"
              items={handlePeriodoPago}
              onChange={setSelectedPaymentPeriod}
            />
          </div>

          <div className="total-section">
            <div className="total-label">TOTAL A PAGAR</div>
            <h3 className="total-amount">$4,958.80</h3>
          </div>

          <div className="button-group">
            <button className="btn btn-cancel" onClick={() => {}}>
              Cancelar
            </button>
            <button className="btn btn-confirm" onClick={() => {}}>
              Pagar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PolicyFristPayment;
