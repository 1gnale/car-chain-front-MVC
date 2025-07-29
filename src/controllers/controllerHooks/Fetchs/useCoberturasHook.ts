import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonCobertura from "../../../models/mock/coberturasMock.json";
import { CoberturasRepository } from "../../../models/repository/Repositorys/coberturasRepository";
import fetchCoberturas from "../../../models/fetchs/fetchCoberturas";
import { setCobertura } from "../../../redux/coberturaSlice";

const useCoberturasHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const coberturaRepo = new CoberturasRepository(jsonCobertura);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchCoberturas(coberturaRepo)
      .then((fetchedCoberturas) => {
        dispatch(setCobertura(fetchedCoberturas));
      })
      .catch((err) => {
        console.error("Error fetching coberturas:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, coberturaRepo]);

  return { loading, error };
};

export default useCoberturasHook;
