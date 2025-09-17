import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setcConfigAntiguedad } from "../../../redux/configAntiguedadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useAntiguedadHookByAge = (age?: number) => {
  const dispatch = useDispatch();
  const apiUrl = age && age > 0 ? `${import.meta.env.VITE_BASEURL}/api/configuracionAntiguedad/byAge/${age}` : undefined;
  
  const { data: configAntiguedad, loading, error, refetch } = useGenericFetch<ConfigAntiguedad>(apiUrl);

  useEffect(() => {
    if (configAntiguedad) {
      dispatch(setcConfigAntiguedad(configAntiguedad));
    }
  }, [configAntiguedad, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useAntiguedadHookByAge;
