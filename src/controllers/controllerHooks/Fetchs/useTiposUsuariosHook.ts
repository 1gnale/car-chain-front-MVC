import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGenericFetch } from "./useGenericFetch";
import { setTipoDocumento } from "../../../redux/tiposDocumentosSlice";
import { set } from "date-fns";
import { setTipoUsuario } from "../../../redux/tipoUsuarioSlice";

const useTiposUsuarios = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/enums/tipoUsuarios`;

  const {
    data: tiposUsuario,
    loading,
    error,
    refetch,
  } = useGenericFetch<string[]>(apiUrl);

  useEffect(() => {
    console.log("Tipos de Usuario fetched:", tiposUsuario);
    if (tiposUsuario.length > 0) {
      dispatch(setTipoUsuario(tiposUsuario));
    }
  }, [tiposUsuario, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default useTiposUsuarios;
