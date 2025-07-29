import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchBrands from "../../../models/fetchs/fetchProvinces";
import { setProvinces } from "../../../redux/provincesSlice";
import jsonProvinces from "../../../models/mock/ProvincesInfoMock.json";
import { ProvincesRepository } from "../../../models/repositories/provincesRepository";

const useBrandHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const provincesRepo = new ProvincesRepository(jsonProvinces);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchBrands(provincesRepo)
      .then((fetchedBrands) => {
        dispatch(setProvinces(fetchedBrands));
      })
      .catch((err) => {
        console.error("Error fetching provinces:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, provincesRepo]);

  return { loading, error };
};

export default useBrandHook;
