import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPoliza } from "../../../redux/policeSlice";
import { useGenericFetch } from "./useGenericFetch";

const useAllPolizas = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/poliza/getAllPolizas`;
  const adaptarPoliza = (p: any): Poliza => ({
    numero_poliza: p.numeroPoliza,
    fechaContratacion: p.fechaContratacion,
    estadoPoliza: p.estado,
    lineaCotizacion: {
      cotizacion: {
        vehiculo: {
          id: 0,
          cliente: { idClient: 0, nombres: p.titular },
          version: { id: 0, nombre: p.vehiculo },
        },
      },
      cobertura: {
        id: 0,
        nombre: p.cobertura,
      },
    },
  });

  const {
    data: polizas,
    loading,
    error,
    refetch,
  } = useGenericFetch<string>(apiUrl);

  useEffect(() => {
    if (polizas.length > 0) {
      const polizasAdaptadas: Poliza[] = polizas.map(adaptarPoliza);
      console.log(polizasAdaptadas);
      dispatch(setPoliza(polizasAdaptadas));
    }
  }, [polizas, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default useAllPolizas;
