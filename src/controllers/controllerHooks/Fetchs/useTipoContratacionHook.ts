import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTipoContratacion } from "../../../redux/hiringTypesSlice";
import { useGenericFetch } from "./useGenericFetch";

const useTipoContratacionHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/tipoContratacion/`;
  
  const { data: tiposContratacion, loading, error, refetch } = useGenericFetch<TipoContratacion>(apiUrl);

  useEffect(() => {
    if (tiposContratacion.length > 0) {
      dispatch(setTipoContratacion(tiposContratacion));
    }
  }, [tiposContratacion, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useTipoContratacionHook;
