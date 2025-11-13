import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSiniestro } from "../../../redux/siniestroSlice";
import { useGenericFetch } from "./useGenericFetch";

const useSiniestrosHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/poliza/getAllSiniestros`;
  console.log("apaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaiUrl");
  console.log(apiUrl);
  const {
    data: siniestros,
    loading,
    error,
    refetch,
  } = useGenericFetch<Localidad>(apiUrl);
  //("siniestros", siniestros);
  useEffect(() => {
    if (siniestros.length > 0) {
      dispatch(setSiniestro(siniestros));
    }
  }, [siniestros, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default useSiniestrosHook;
