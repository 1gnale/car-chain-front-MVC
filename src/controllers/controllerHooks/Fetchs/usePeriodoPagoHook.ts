import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPeriodoPago } from "../../../redux/periodoPagosSlice";
import jsonPeriodosPago from "../../../models/mock/periodoPagosMock.json";
import { PeriodosPagoRepository } from "../../../models/repository/Repositorys/periodosPagoRepository";
import fetchPeriodosPago from "../../../models/fetchs/fetchPeriodosPago";

const usePeriodosPagoHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const periodosRepo = new PeriodosPagoRepository(jsonPeriodosPago);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchPeriodosPago(periodosRepo)
      .then((fetchedPeriodosPago) => {
        dispatch(setPeriodoPago(fetchedPeriodosPago));
      })
      .catch((err) => {
        console.error("Error fetching payment period:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, periodosRepo]);

  return { loading, error };
};

export default usePeriodosPagoHook;
