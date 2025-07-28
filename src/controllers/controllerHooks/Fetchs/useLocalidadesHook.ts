import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonLocalidades from "../../../models/mock/localidadesMock.json";
import { LocalidadRepository } from "../../../models/repository/Repositorys/localidadRepository";
import fetchLocalidades from "../../../models/fetchs/fetchLocalidades";
import { setLocalidad } from "../../../redux/localidadesSlice";

const useLocalidadesHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const localidadRepo = new LocalidadRepository(jsonLocalidades);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchLocalidades(localidadRepo)
      .then((fetchedLocalidades) => {
        dispatch(setLocalidad(fetchedLocalidades));
      })
      .catch((err) => {
        console.error("Error fetching localidades:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, localidadRepo]);

  return { loading, error };
};

export default useLocalidadesHook;
