import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonModelos from "../../../models/mock/modelosMock.json";
import { ModeloRepository } from "../../../models/repository/Repositorys/modelosRepository";
import fetchModelos from "../../../models/fetchModelos";
import { setModelo } from "../../../redux/modeloSlice";

const useModelosHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const modeloRepo = new ModeloRepository(jsonModelos);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchModelos(modeloRepo)
      .then((fetchedModelos) => {
        dispatch(setModelo(fetchedModelos));
      })
      .catch((err) => {
        console.error("Error fetching modelos:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, modeloRepo]);

  return { loading, error };
};

export default useModelosHook;
