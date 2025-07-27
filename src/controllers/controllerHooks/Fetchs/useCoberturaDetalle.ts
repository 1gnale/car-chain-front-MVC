import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonCoberturaDetalle from "../../../models/mock/coberturaDetalleMock.json";
import fetchCoberturasDetalles from "../../../models/fetchCoberturasDetalle";
import { CoberturasDetalleRepository } from "../../../models/repository/Repositorys/coberturasDetalleRepository";
import { setCoberturaDetalle } from "../../../redux/coberturaDetalleSlice";

const useCoberturasDetalleHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const coberturaDetalleRepo = new CoberturasDetalleRepository(
    jsonCoberturaDetalle
  );

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchCoberturasDetalles(coberturaDetalleRepo)
      .then((fetchedCoberturasDetalle) => {
        dispatch(setCoberturaDetalle(fetchedCoberturasDetalle));
      })
      .catch((err) => {
        console.error("Error fetching coberturas detalle:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, coberturaDetalleRepo]);

  return { loading, error };
};

export default useCoberturasDetalleHook;
