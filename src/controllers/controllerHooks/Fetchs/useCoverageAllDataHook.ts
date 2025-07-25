import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCoveragesAllData } from "../../../redux/coverageAllDataSlice";
import jsonCoverageAllData from "../../../models/mock/CoverageDataMock.json";
import { CoverageAllDataRepository } from "../../../models/repositories/CoverageAllDataRepository";
import fetchCoverageAllData from "../../../models/fetchCoverageAllData";

const useCoverageAllDataHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const coverageAllDataRepo = new CoverageAllDataRepository(
    jsonCoverageAllData
  );

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchCoverageAllData(coverageAllDataRepo)
      .then((fetchCoverageAllData) => {
        dispatch(setCoveragesAllData(fetchCoverageAllData));
      })
      .catch((err) => {
        console.error("Error fetching coverages:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, coverageAllDataRepo]);

  return { loading, error };
};

export default useCoverageAllDataHook;
