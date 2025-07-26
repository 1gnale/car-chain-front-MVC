import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchAllConfigs from "../../../models/fetchAllConfigs";
import { setAllConfigs } from "../../../redux/allConfigsSlice";
import jsonConfigs from "../../../models/mock/ConfigurationsDataMock.json";
import { allConfigsRepository } from "../../../models/repositories/allConfigsRepository";

const useAllConfigsHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const allConfigsRepo = new allConfigsRepository(jsonConfigs);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchAllConfigs(allConfigsRepo)
      .then((fetchedBrands) => {
        dispatch(setAllConfigs(fetchedBrands));
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, allConfigsRepo]);

  return { loading, error };
};

export default useAllConfigsHook;
