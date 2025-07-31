import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonPoliza from "../../../models/mock/polizasMock.json";
import { PolizasRepository } from "../../../models/repository/Repositorys/polizasRepository";

import { setModelo } from "../../../redux/modeloSlice";
import fetchPolices from "../../../models/fetchs/fetchPolices";
import { setPoliza } from "../../../redux/policeSlice";

const useModelosHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const polizaRepo = new PolizasRepository(jsonPoliza);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchPolices(polizaRepo)
      .then((fetchedPolizas) => {
        dispatch(setPoliza(fetchedPolizas));
      })
      .catch((err) => {
        console.error("Error fetching polizas:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, polizaRepo]);

  return { loading, error };
};

export default useModelosHook;
