import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonConfigAnt from "../../../models/mock/configAntiguedad.json";
import { ConfigAntiguedadRepository } from "../../../models/repository/Repositorys/configAntiguedadRepository";
import fetchConfigAntiguedades from "../../../models/fetchs/fetchConfigAntiguedades";
import { setcConfigAntiguedad } from "../../../redux/configAntiguedadSlice";

const useAntiguedadHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const configAntiguedadRepo = new ConfigAntiguedadRepository(jsonConfigAnt);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchConfigAntiguedades(configAntiguedadRepo)
      .then((fetchedConfigAntiguedad) => {
        dispatch(setcConfigAntiguedad(fetchedConfigAntiguedad));
      })
      .catch((err) => {
        console.error("Error fetching config antiguedad:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, configAntiguedadRepo]);

  return { loading, error };
};

export default useAntiguedadHook;
