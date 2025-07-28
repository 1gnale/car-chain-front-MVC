import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonProvincia from "../../../models/mock/provinciasMock.json";
import { ProvinciaRepository } from "../../../models/repository/Repositorys/provinciasRepository";
import fetchProvincias from "../../../models/fetchs/fetchProvincias";
import { setProvincias } from "../../../redux/provinciasSlice";

const useProvinciasHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const provinciaRepo = new ProvinciaRepository(jsonProvincia);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchProvincias(provinciaRepo)
      .then((fetchedProvincias) => {
        dispatch(setProvincias(fetchedProvincias));
      })
      .catch((err) => {
        console.error("Error fetching Provincias:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, provinciaRepo]);

  return { loading, error };
};

export default useProvinciasHook;
