import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGenericFetch } from "./useGenericFetch";
import { setClient } from "../../../redux/clientSlice";

const useClientByMailHook = (email: string) => {
  const dispatch = useDispatch();
  const apiUrl = `${
    import.meta.env.VITE_BASEURL
  }/api/clientes/get-cliente-by-email/${email}`;

  const {
    data: client,
    loading,
    error,
    refetch,
  } = useGenericFetch<Cliente>(apiUrl);

  useEffect(() => {
    if (client) {
      dispatch(setClient(client));
    }
  }, [client, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default useClientByMailHook;
