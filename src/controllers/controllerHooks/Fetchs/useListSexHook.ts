import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGenericFetch } from "./useGenericFetch";
import { setsexosList } from "../../../redux/sexosSlice";

const useListSex = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/enums/sexos`;

  const {
    data: tiposSexo,
    loading,
    error,
    refetch,
  } = useGenericFetch<GenericList>(apiUrl);

  useEffect(() => {
    console.log("Sexos fetched:", tiposSexo);
    if (tiposSexo.length > 0) {
      dispatch(setsexosList(tiposSexo));
    }
  }, [tiposSexo, dispatch]);

  return {
    loading,
    error: !!error,
    refetch,
  };
};

export default useListSex;
