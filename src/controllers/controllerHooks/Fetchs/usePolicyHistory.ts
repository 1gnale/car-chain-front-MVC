import { useEffect } from "react";
import { useGenericFetch } from "./useGenericFetch";
import { setHistorial } from "../../../redux/historySlice";
import { useDispatch } from "react-redux";

const usePolicyHistoryByIdHook = (idPoliza: string) => {
  const dispatch = useDispatch();
  const apiUrl = `${
    import.meta.env.VITE_BASEURL
  }/api/poliza/getAllSiniestrosYRevisiones/${idPoliza}`;

  const {
    data: history,
    loading,
    error,
    refetch,
  } = useGenericFetch<any>(apiUrl);

  useEffect(() => {
    if (history) {
      dispatch(setHistorial(history));
    }
  }, [history, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default usePolicyHistoryByIdHook;
