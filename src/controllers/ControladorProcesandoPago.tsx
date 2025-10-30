import { useState } from "react";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import { useParams, useNavigate } from "react-router-dom";
import { useEffectOnce } from "react-use";
import ErrorPage from "../views/components/GeneralComponents/errorPage";

const ControladorProcesandoPago = () => {
  const [error, setError] = useState(false);
  const { numero_poliza, pagoId } = useParams();
  const navigate = useNavigate();

  useEffectOnce(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/pago/sucessPago/${numero_poliza}/${pagoId}`
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const responsePoliza = await fetch(
          `http://localhost:3000/api/poliza/getPolizaById/${numero_poliza}`
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
        setError(true);
      }
    };

    fetchData();
  });

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <Spinner
      title="Procesando pago..."
      text="Por favor, espere mientras procesamos su solicitud..."
    />
  );
};

export default ControladorProcesandoPago;
