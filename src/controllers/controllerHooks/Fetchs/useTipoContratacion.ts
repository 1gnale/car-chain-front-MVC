import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTipoContratacion } from "../../../redux/hiringTypesSlice";
import { useGenericFetch } from "./useGenericFetch";

const useTipoContratacion = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/tipoContratacion/`;

  const { data: tipos, loading, error, refetch } = useGenericFetch<TipoContratacion>(apiUrl);
    
  useEffect(() => {
    if (tipos.length > 0) {
      dispatch(setTipoContratacion(tipos));
    }
  }, [tipos, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useTipoContratacion;