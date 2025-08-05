import { useEffect, useState } from "react";
import { fetchLineaCotizacionById } from "../../../models/fetchs/fetchLineaCotizacion";
import { LineaCotizacionRepository } from "../../../models/repository/Repositorys/lineaCotizacionRepository";
import type ILineaCotizacionRepository from "../../../models/repository/Irepositorys/ILineaCotizacionRepository";
import json from "../../../models/mock/id1Cotizacion.json"

const useGetPricing = (id: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [pricing, setPricing] = useState<Linea_Cotizacion | null>(null);
  const lineaCotizacionRepo: ILineaCotizacionRepository = new LineaCotizacionRepository(json);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchLineaCotizacionById(lineaCotizacionRepo, id)
      .then((data) => {
        setPricing(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { loading, error, pricing };

};

export default useGetPricing;
