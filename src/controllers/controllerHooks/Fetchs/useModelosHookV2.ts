import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setModelo } from "../../../redux/modeloSlice";
import { useGenericFetch } from "./useGenericFetch";

const useModelosHookV2 = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/modelos/`;
  
  const { data: modelos, loading, error, refetch } = useGenericFetch<Modelo>(apiUrl);

  useEffect(() => {
    if (modelos.length > 0) {
      dispatch(setModelo(modelos));
    }
  }, [modelos, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useModelosHookV2;