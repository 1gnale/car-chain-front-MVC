import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ControladorProcesandoPago = () => {
  const { numero_poliza, pagoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let isFetching = false;
    const fetchData = async () => {
      if (isFetching) return;
      isFetching = true;
      try {
        const response = await fetch(
          `http://localhost:3000/api/pago/sucessPago/${numero_poliza}/${pagoId}`,
          { signal }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const responsePoliza = await fetch(
          `http://localhost:3000/api/poliza/getPolizaById/${numero_poliza}`,
          { signal }
        );

        if (!responsePoliza.ok)
          throw new Error(`HTTP error! status: ${responsePoliza.status}`);
        const dataPoliza = await responsePoliza.json();

        navigate("/pago-exitoso", {
          state: {
            contratoData: {
              numero_poliza,
              hash_transaccion: data.data.hashContrato,
              direccion_contrato: "0xaAe2E8b80E9eDFf62E8D1B7127249aBbed43daE0",
              fecha_despliegue: data.data.fechaContratacion,
              estado: data.data.estadoPoliza,
              fecha_vencimiento: data.data.fechaVencimiento,
              cobertura: dataPoliza.data.lineaCotizacion.cobertura.nombre,
              cliente: {
                nombre:
                  dataPoliza.data.lineaCotizacion.cotizacion.vehiculo.cliente
                    .nombres,
                email:
                  dataPoliza.data.lineaCotizacion.cotizacion.vehiculo.cliente
                    .correo,
                documento:
                  dataPoliza.data.lineaCotizacion.cotizacion.vehiculo.cliente
                    .documento,
              },
              vehiculo: {
                marca:
                  dataPoliza.data.lineaCotizacion.cotizacion.vehiculo.version
                    .modelo.marca.nombre,
                modelo:
                  dataPoliza.data.lineaCotizacion.cotizacion.vehiculo.version
                    .modelo.nombre,
                monto: data.data.montoAsegurado,
                patente:
                  dataPoliza.data.lineaCotizacion.cotizacion.vehiculo.matricula,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        isFetching = false;
      }
    };

    fetchData();

    // Cleanup: si el componente se desmonta o cambia alguna dep, aborta
    return () => controller.abort();
  }, [numero_poliza, pagoId, navigate]);

  return (
    <Spinner
      title="Procesando pago..."
      text="Por favor, espere mientras procesamos su solicitud..."
    />
  );
};

export default ControladorProcesandoPago;
