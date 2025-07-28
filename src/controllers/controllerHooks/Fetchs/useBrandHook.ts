import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchBrands from "../../../models/fetchBrands";
import { setBrands } from "../../../redux/brandSlice";
import json from "../../../models/mock/VehiclesInfoMock.json";
import { BrandRepository } from "../../../models/repositories/brandRepository";

const useBrandHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const brandRepo = new BrandRepository(json);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchBrands(brandRepo)
      .then((fetchedBrands) => {
        dispatch(setBrands(fetchedBrands));
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, brandRepo]);

  return { loading, error };
};

export default useBrandHook;
