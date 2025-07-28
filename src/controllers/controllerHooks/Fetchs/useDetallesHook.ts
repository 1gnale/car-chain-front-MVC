import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonDetalles from "../../../models/mock/detallesMock.json";
import { DetallesRepository } from "../../../models/repository/Repositorys/DetallesRepository";
import fetchDetalles from "../../../models/fetchs/fetchDetalles";
import { setDetalles } from "../../../redux/detallesSlice";

const useDetallesHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const detallesRepo = new DetallesRepository(jsonDetalles);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchDetalles(detallesRepo)
      .then((fetchedDetalle) => {
        dispatch(setDetalles(fetchedDetalle));
      })
      .catch((err) => {
        console.error("Error fetching detalles:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, detallesRepo]);

  return { loading, error };
};

export default useDetallesHook;
