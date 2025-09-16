import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCobertura } from "../../../redux/coberturaSlice";
import { useGenericFetch } from "./useGenericFetch";

const useCoberturasHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/cobertura/`;

  const { data: coberturas, loading, error, refetch } = useGenericFetch<string>(apiUrl);

  useEffect(() => {
    if (coberturas.length > 0) {
      dispatch(setCobertura(coberturas));
    }
  }, [coberturas, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useCoberturasHook;
