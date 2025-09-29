import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setConfigsLocalidad } from "../../../redux/configLocalidadSlice";
import { useGenericFetch } from "./useGenericFetch";

const useLocalidadesHookByLocalityId = (localidadId?: number) => {
  const dispatch = useDispatch();
  const apiUrl =
    localidadId && localidadId > 0
      ? `${
          import.meta.env.VITE_BASEURL
        }/api/configuracionLocalidad/byLocality/${localidadId}`
      : undefined;

  const {
    data: configLocalidad,
    loading,
    error,
    refetch,
  } = useGenericFetch<ConfigLocalidad>(apiUrl);

  return {
    loading,
    configLocalidad,
    error: !!error,
    refetch,
  };
};

export default useLocalidadesHookByLocalityId;
