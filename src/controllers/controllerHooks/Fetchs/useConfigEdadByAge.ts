import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigsEdad } from "../../../redux/configEdadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useEdadHookByAge = (age?: number) => {
  const dispatch = useDispatch();
  const apiUrl =
    age && age > 0
      ? `${import.meta.env.VITE_BASEURL}/api/configuracionEdad/byAge/${age}`
      : undefined;

  const {
    data: configEdad,
    loading,
    error,
    refetch,
  } = useGenericFetch<ConfigEdad>(apiUrl);

  return {
    loading,
    configEdad,
    error: !!error,
    refetch,
  };
};

export default useEdadHookByAge;
