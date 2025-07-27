import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonConfigLocalidad from "../../../models/mock/configLocalidad.json";
import { setcConfigEdad } from "../../../redux/configEdadSlice";
import { ConfigLocalidadesRepository } from "../../../models/repository/Repositorys/configLocalidadRepository";
import fetchConfigLocalidades from "../../../models/fetchConfigLocalidades";

const useLocalidadesHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const configLocalidadRepo = new ConfigLocalidadesRepository(
    jsonConfigLocalidad
  );

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchConfigLocalidades(configLocalidadRepo)
      .then((fetchedConfigLocalidades) => {
        dispatch(setcConfigEdad(fetchedConfigLocalidades));
      })
      .catch((err) => {
        console.error("Error fetching config localidades:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, configLocalidadRepo]);

  return { loading, error };
};

export default useLocalidadesHook;
