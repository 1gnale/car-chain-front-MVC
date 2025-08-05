import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonLineaCotizacion from "../../../models/mock/lineaCotizacionesMock.json";
import { LineaCotizacionRepository } from "../../../models/repository/Repositorys/lineaCotizacionRepository";

import fetchLinesPricings from "../../../models/fetchs/fetchLineaCotizacion";
import { setLineaCotizacion } from "../../../redux/lineaCotizacionSlice";

const useLineaCotizacionHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const lineaCotizacionRepo = new LineaCotizacionRepository(
    jsonLineaCotizacion
  );
  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchLinesPricings(lineaCotizacionRepo)
      .then((fetchedLineaCotizacion) => {
        dispatch(setLineaCotizacion(fetchedLineaCotizacion));
      })
      .catch((err) => {
        console.error("Error fetching lineas:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, lineaCotizacionRepo]);

  return { loading, error };
};

export default useLineaCotizacionHook;
