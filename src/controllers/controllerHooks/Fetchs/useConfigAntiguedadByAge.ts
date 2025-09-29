import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigsAntiguedad } from "../../../redux/configAntiguedadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useAntiguedadHookByAge = (age?: number) => {
  const dispatch = useDispatch();
  const apiUrl =
    age && age > 0
      ? `${
          import.meta.env.VITE_BASEURL
        }/api/configuracionAntiguedad/byAge/${age}`
      : undefined;

  const {
    data: configAntiguedad,
    loading,
    error,
    refetch,
  } = useGenericFetch<ConfigAntiguedad>(apiUrl);

  return {
    loading,
    configAntiguedad,
    error: !!error,
    refetch,
  };
};

export default useAntiguedadHookByAge;
