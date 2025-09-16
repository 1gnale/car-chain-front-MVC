import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProvincias } from "../../../redux/provinciasSlice";
import { useGenericFetch } from "./useGenericFetch";

const useProvinciasHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/provincias/`;
  
  const { data: provincias, loading, error, refetch } = useGenericFetch<Provincia>(apiUrl);

  useEffect(() => {
    if (provincias.length > 0) {
      dispatch(setProvincias(provincias));
    }
  }, [provincias, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useProvinciasHook;
