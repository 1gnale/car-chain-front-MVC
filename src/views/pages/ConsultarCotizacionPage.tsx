import { useState } from "react";
import ViewPricings from "../components/AccountData/viewPricing";
import FormDocumentation from "../components/RequestUserPolicy/FormDocumentation";
import FormDataConfirmation from "../components/RequestUserPolicy/FormDataConfirmation";
import TitleSection from "../components/GeneralComponents/TitleSection";
import BreadCrumbNav from "../components/GeneralComponents/BreadCrumbNav";
import Navbar from "../components/NavBar/Navbar";
const ConsultarCotizacionPage = ({
  isAuth,
  lineaCotizacion,
}: {
  isAuth: boolean;
  lineaCotizacion: Linea_Cotizacion[];
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
    ></FormDataConfirmation>,
  ];

  return (
    <>
      <Navbar isAuth={isAuth} />
      <TitleSection title="COTIZACIÓN DE VEHÍCULO" />
      <BreadCrumbNav items={[{ page: "Cotización del vehículo" }]} />
      {views[currentView]}
    </>
  );
};

export default ConsultarCotizacionPage;
