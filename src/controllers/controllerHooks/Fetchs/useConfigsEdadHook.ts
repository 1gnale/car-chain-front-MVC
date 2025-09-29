import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigsEdad } from "../../../redux/configEdadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useEdadHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/configuracionEdad/`;

  const {
    data: configEdad,
    loading,
    error,
    refetch,
  } = useGenericFetch<ConfigEdad>(apiUrl);

  useEffect(() => {
    if (configEdad.length > 0) {
      dispatch(setConfigsEdad(configEdad));
    }
  }, [configEdad, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default useEdadHook;
