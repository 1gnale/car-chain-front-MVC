import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocalidad } from "../../../redux/localidadesSlice";
import { useGenericFetch } from "./useGenericFetch";

const useLocalidadesHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/localidades/`;
  
  const { data: localidades, loading, error, refetch } = useGenericFetch<Localidad>(apiUrl);
  //("localidades", localidades);
  useEffect(() => {
    if (localidades.length > 0) {
      dispatch(setLocalidad(localidades));
    }
  }, [localidades, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useLocalidadesHook;
