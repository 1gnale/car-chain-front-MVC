import { useMemo, useState } from "react";
import SelectForm from "../GeneralComponents/SelectForm";
import { useAppSelector } from "../../../redux/reduxTypedHooks";

function PolicyPayment({ poliza, isFirstPayment }: { poliza: Poliza, isFirstPayment: boolean }) {
  const tiposContratacion: TipoContratacion[] = useAppSelector(
    (state) => state.tiposContratacion.tipoContratacion
  );
  const periodosPago: PeriodoPago[] = useAppSelector(
    (state) => state.periodosPago.periodoPago
  );

  console.log("poliza en pagar poliza", poliza.lineaCotizacion?.monto);

  //states
  const [selectedContratType, setSelectedContratType] = useState(0);
  const [selectedPaymentPeriod, setSelectedPaymentPeriod] = useState(0);
  //handles
  const handleTiposContratacion = useMemo(() => {
    const tiposContratacionFilt = tiposContratacion.filter(
      (line) => line.activo === true
    );
    const result = tiposContratacionFilt.map((tipoContratacion) => {
      return { id: tipoContratacion.id, name: tipoContratacion.nombre!, cantidadMeses: tipoContratacion.cantidadMeses };
    });
    return result;
  }, [tiposContratacion]);

  const handlePeriodoPago = useMemo(() => {
    const periodosPagoFilt = periodosPago.filter(
      (line) => line.activo === true && line.cantidadMeses! <= handleTiposContratacion.find(e => e.id === selectedContratType)?.cantidadMeses!
    );

    const result = periodosPagoFilt.map((periodoPago) => {
      return { id: periodoPago.id, name: periodoPago.nombre!, descuento: periodoPago.descuento, cantidadMeses: periodoPago.cantidadMeses };
    });
    return result;
  }, [periodosPago, handleTiposContratacion, selectedContratType]);

  const handleTotalAmount = useMemo(() => {
    const total = poliza.lineaCotizacion?.monto! * handlePeriodoPago.find(e => e.id === selectedPaymentPeriod)?.cantidadMeses!;
    const descuento = total * handlePeriodoPago.find(e => e.id === selectedPaymentPeriod)?.descuento!;
    return total - descuento;
  }, [handleTiposContratacion, selectedContratType, handlePeriodoPago, selectedPaymentPeriod]);
  const handleSubmit = async () => {

    const endPoint = `${import.meta.env.VITE_BASEURL}/api/pago/${isFirstPayment ? 'crearPrimerPago' : 'crearPago'}`

    try {
      const res = await fetch(endPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          poliza_numero: poliza.numero_poliza,
          total: poliza.montoAsegurado || handleTotalAmount,
          descripcion: poliza.lineaCotizacion?.cobertura?.nombre,
          payer_email: poliza.lineaCotizacion?.cotizacion?.vehiculo?.cliente?.correo,
          payer_name: poliza.lineaCotizacion?.cotizacion?.vehiculo?.cliente?.nombres,
          payer_surname: poliza.lineaCotizacion?.cotizacion?.vehiculo?.cliente?.apellido,
          payer_phone: poliza.lineaCotizacion?.cotizacion?.vehiculo?.cliente?.telefono,
          payer_identification: poliza.lineaCotizacion?.cotizacion?.vehiculo?.cliente?.documento,
          back_urls: {
            //   success: "https://4bb0c22b9817.ngrok-free.app/sucess",
            //   failure: "https://4bb0c22b9817.ngrok-free.app/failure",
            //   pending: "https://4bb0c22b9817.ngrok-free.app/pending",
          },
          external_reference: "REF-12345",
          idTipoContratacion: 1,
          idPeriodoPago: 1,
        }),
      });

      if (!res.ok) {
        // Intentar obtener el error detallado del backend
        let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          console.error("Backend Error Details:", errorData);
        } catch (parseError) {
          console.error("Could not parse error res:", parseError);
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      const initPoint = data.init_point;
      window.location.href = initPoint; // Redirige al Checkout Pro
      //("Pago exitoso");
    } catch (error) {
      console.error("Error iniciando pago:", error);
    }
  };

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
          {isFirstPayment && (
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
          )}

          <div className="total-section">
            <div className="total-label">TOTAL A PAGAR</div>
            <h3 className="total-amount">${(selectedPaymentPeriod && selectedContratType) ? handleTotalAmount : poliza.montoAsegurado || poliza.lineaCotizacion?.monto}</h3>
          </div>

          <div className="button-group">
            <button className="btn btn-cancel" onClick={() => { }}>
              Cancelar
            </button>
            <button className="btn btn-confirm" onClick={handleSubmit}>
              Pagar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PolicyPayment;
