import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setcConfigAntiguedad } from "../../../redux/configAntiguedadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useAntiguedadHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/configuracionAntiguedad/`;
  
  const { data: configAntiguedad, loading, error, refetch } = useGenericFetch<ConfigAntiguedad>(apiUrl);

  useEffect(() => {
    if (configAntiguedad.length > 0) {
      dispatch(setcConfigAntiguedad(configAntiguedad));
    }
  }, [configAntiguedad, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useAntiguedadHook;
