import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsuarios } from "../../../redux/usuariosSlice";
import { useGenericFetch } from "./useGenericFetch";

const useUsuariosHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/usuarios/`;

  const {
    data: usuarios,
    loading,
    error,
    refetch,
  } = useGenericFetch<Provincia>(apiUrl);

  useEffect(() => {
    if (usuarios.length > 0) {
      dispatch(setUsuarios(usuarios));
    }
  }, [usuarios, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default useUsuariosHook;
