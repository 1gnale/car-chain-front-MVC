import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTipoDocumento } from "../../../redux/tiposDocumentosSlice";
import { useGenericFetch } from "./useGenericFetch";

const useTiposDocumentos = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/tipos-documento/values`;

  const { data: tiposDocumento, loading, error, refetch } = useGenericFetch<string[]>(apiUrl);

  useEffect(() => {
    if (tiposDocumento.length > 0) {
      dispatch(setTipoDocumento(tiposDocumento));
    }
  }, [tiposDocumento, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useTiposDocumentos;
