import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCoberturaDetalle } from "../../../redux/coberturaDetalleSlice";
import { useGenericFetch } from "./useGenericFetch";

const useCoberturaDetalle = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/coberturaDetalle/`;
  
  const { data: coberturaDetalle, loading, error, refetch } = useGenericFetch<string>(apiUrl);

  useEffect(() => {
    if (coberturaDetalle.length > 0) {
      dispatch(setCoberturaDetalle(coberturaDetalle));
    }
  }, [coberturaDetalle, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useCoberturaDetalle;
