import { useState } from "react";
import Spinner from "../views/components/GeneralComponents/SpinnerLoader";
import { useParams, useNavigate } from "react-router-dom";
import { useEffectOnce } from "react-use";
import ErrorPage from "../views/components/GeneralComponents/ErrorPage";

const ControladorFalloPago = () => {
  const [error, setError] = useState(false);

  const { pagoId } = useParams();
  const navigate = useNavigate();

  useEffectOnce(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL;

        const response = await fetch(
          `${baseUrl}/api/pago/failedPago/${pagoId}`
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const responsePoliza = await fetch(
          `${baseUrl}/api/poliza/getPolizaById/${pagoId}`
        );

        if (!responsePoliza.ok)
          throw new Error(`HTTP error! status: ${responsePoliza.status}`);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchData();
  });

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return <ErrorPage></ErrorPage>;
};

export default ControladorFalloPago;
