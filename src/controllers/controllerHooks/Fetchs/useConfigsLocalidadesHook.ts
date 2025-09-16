import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigLocalidadd } from "../../../redux/configLocalidadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useLocalidadesHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/configuracionLocalidad/`;
  
  const { data: configLocalidades, loading, error, refetch } = useGenericFetch<ConfigLocalidad>(apiUrl);

  useEffect(() => {
    if (configLocalidades.length > 0) {
      dispatch(setConfigLocalidadd(configLocalidades)); 
    }
  }, [configLocalidades, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useLocalidadesHook;
