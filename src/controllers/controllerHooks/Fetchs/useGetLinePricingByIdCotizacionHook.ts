import { useEffect, useState } from "react";
import { useGenericFetch } from "./useGenericFetch";

const useGetLinePricingByIdCotizacionHook = (idCotizacion: string) => {
  const [LinePricing, setPricing] = useState<Linea_Cotizacion[] | null>(null);
  const apiUrl = `${
    import.meta.env.VITE_BASEURL
  }/api/vehiculoCotizacion/getLineasCotizacion/${idCotizacion}`;

  const {
    data: lineaCotizacion,
    loading,
    error,
    refetch,
  } = useGenericFetch<Linea_Cotizacion>(apiUrl);

  useEffect(() => {
    if (lineaCotizacion) {
      setPricing(lineaCotizacion);
    }
  }, [lineaCotizacion, idCotizacion]);

  return {
    loading,
    error: !!error,
    LinePricing,
    refetch,
  };
};

export default useGetLinePricingByIdCotizacionHook;
