import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMarcas } from "../../../redux/marcaSlice";
import jsonMarcas from "../../../models/mock/marcasMock.json";
import { MarcaRepository } from "../../../models/repository/Repositorys/marcaRepository";
import fetchMarcas from "../../../models/fetchs/fetchMarcas";

const useMarcasHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const marcaRepo = new MarcaRepository(jsonMarcas);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchMarcas(marcaRepo)
      .then((fetchedMarcas) => {
        dispatch(setMarcas(fetchedMarcas));
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, marcaRepo]);

  return { loading, error };
};

export default useMarcasHook;
