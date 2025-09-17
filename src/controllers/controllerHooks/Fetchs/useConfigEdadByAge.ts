import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigEdad } from "../../../redux/configEdadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useEdadHookByAge = (age?: number) => {
  const dispatch = useDispatch();
  const apiUrl = age && age > 0 ? `${import.meta.env.VITE_BASEURL}/api/configuracionEdad/byAge/${age}` : undefined;
  
  const { data: configEdad, loading, error, refetch } = useGenericFetch<ConfigEdad>(apiUrl);

  useEffect(() => {
    if (configEdad) {
      dispatch(setConfigEdad(configEdad));
    }
  }, [configEdad, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useEdadHookByAge;
