import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonTiposContratacion from "../../../models/mock/tipoContratacionMock.json";
import { TipoContratacionRepository } from "../../../models/repository/Repositorys/tipoContratacionRepository";
import fetchTiposContratacion from "../../../models/fetchs/fetchTipoContratacion";
import { setTipoContratacion } from "../../../redux/hiringTypesSlice";

const useTipoContratacionHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const tipoContratacionRepo = new TipoContratacionRepository(
    jsonTiposContratacion
  );

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchTiposContratacion(tipoContratacionRepo)
      .then((fetchedTipoContratacion) => {
        dispatch(setTipoContratacion(fetchedTipoContratacion));
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return { loading, error };
};

export default useTipoContratacionHook;
