import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMarcas } from "../../../redux/marcaSlice";
import { useGenericFetch } from "./useGenericFetch";

const useMarcasHookV2 = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/marcas/`;
  
  const { data: marcas, loading, error, refetch } = useGenericFetch<Marca>(apiUrl);

  useEffect(() => {
    if (marcas.length > 0) {
      dispatch(setMarcas(marcas));
    }
  }, [marcas, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useMarcasHookV2;