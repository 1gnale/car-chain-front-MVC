import { useEffect, useState } from "react";
import { useGenericFetch } from "./useGenericFetch";

const useGetPricing = (id: string) => {
  const [pricing, setPricing] = useState<Linea_Cotizacion[] | null>(null);
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/lineas-cotizacion/`;
  
  const { data: lineasCotizacion, loading, error, refetch } = useGenericFetch<Linea_Cotizacion>(apiUrl);

  useEffect(() => {
    if (lineasCotizacion.length > 0 && id) {
      // Filtrar las líneas de cotización por el ID de cotización
      const filteredPricing = lineasCotizacion.filter(
        (linea) => linea.cotizacion?.id === Number(id)
      );
      setPricing(filteredPricing);
    }
  }, [lineasCotizacion, id]);

  return { 
    loading, 
    error: !!error, 
    pricing,
    refetch 
  };
};

export default useGetPricing;
