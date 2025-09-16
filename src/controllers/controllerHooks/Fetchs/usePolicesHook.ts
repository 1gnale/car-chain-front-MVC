import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPoliza } from "../../../redux/policeSlice";
import { useGenericFetch } from "./useGenericFetch";

const usePolicesHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/polizas/`;
  
  const { data: polizas, loading, error, refetch } = useGenericFetch<Poliza>(apiUrl);

  useEffect(() => {
    if (polizas.length > 0) {
      dispatch(setPoliza(polizas));
    }
  }, [polizas, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default usePolicesHook;
