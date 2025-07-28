import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonConfigEdad from "../../../models/mock/configEdad.json";
import { ConfigEdadRepository } from "../../../models/repository/Repositorys/configEdadRepository";
import fetchConfigEdades from "../../../models/fetchs/fetchConfigEdades";
import { setcConfigEdad } from "../../../redux/configEdadSlice";

const useEdadHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const configEdadRepo = new ConfigEdadRepository(jsonConfigEdad);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchConfigEdades(configEdadRepo)
      .then((fetchedConfigAntiguedad) => {
        dispatch(setcConfigEdad(fetchedConfigAntiguedad));
      })
      .catch((err) => {
        console.error("Error fetching config edad:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, configEdadRepo]);

  return { loading, error };
};

export default useEdadHook;
