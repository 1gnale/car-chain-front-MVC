import { useState } from "react";
import ViewPricings from "../components/AccountData/viewPricing";
import FormDocumentation from "../components/RequestUserPolicy/FormDocumentation";
import FormDataConfirmation from "../components/RequestUserPolicy/FormDataConfirmation";
import TitleSection from "../components/GeneralComponents/TitleSection";
import Navbar from "../components/NavBar/Navbar";
const ConsultarCotizacionPage = ({
  isAuth,
  lineaCotizacion,
  handleConfirmacionPoliza,
}: {
  isAuth: boolean;
  lineaCotizacion: Linea_Cotizacion[];
  handleConfirmacionPoliza: (poliza: Poliza) => void;
}) => {
  const [currentView, setCurrentView] = useState<number>(0);

  const handleCurrentView = (pass: boolean) => {
    setCurrentView((prev) => {
      if (pass && prev < views.length - 1) {
        return prev + 1;
      } else if (!pass && prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const views = [
    <ViewPricings
      Lineacotizacion={lineaCotizacion}
      Auth={isAuth}
      handleCurrentView={handleCurrentView}
    ></ViewPricings>,
    <FormDocumentation
      handleCurrentView={handleCurrentView}
    ></FormDocumentation>,
    <FormDataConfirmation
      handleCurrentView={handleCurrentView}
      handleConfirmacionPoliza={handleConfirmacionPoliza}
    ></FormDataConfirmation>,
  ];

  return (
    <>
      <Navbar isAuth={isAuth} />
      <TitleSection title="COTIZACIÓN DE VEHÍCULO" />
      {views[currentView]}
    </>
  );
};

export default ConsultarCotizacionPage;
