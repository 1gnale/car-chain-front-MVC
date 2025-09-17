import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigLocalidadd } from "../../../redux/configLocalidadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useLocalidadesHookByLocalityId = (localidadId?: number) => {
  const dispatch = useDispatch();
  const apiUrl = localidadId && localidadId > 0 ? `${import.meta.env.VITE_BASEURL}/api/configuracionLocalidad/byLocality/${localidadId}` : undefined;
  
  const { data: configLocalidades, loading, error, refetch } = useGenericFetch<ConfigLocalidad>(apiUrl);
  useEffect(() => {
    if (configLocalidades) {
      dispatch(setConfigLocalidadd(configLocalidades)); 
    }
  }, [configLocalidades, dispatch]);

  return { 
    loading,  
    error: !!error, 
    refetch 
  };
};

export default useLocalidadesHookByLocalityId;
