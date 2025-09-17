import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPoliza } from "../../../redux/policeSlice";
import { useGenericFetch } from "./useGenericFetch";

const usePolicesHook = ({mail}: {mail: string}) => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/poliza/getAllPolizasByClientId/${mail}`;
  
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
