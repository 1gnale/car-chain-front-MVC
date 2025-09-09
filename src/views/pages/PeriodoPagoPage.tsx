import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import { useState } from "react";
import PageCasoUso15 from "../FuturePages/PageCasoUso15";
import PageCasoUso15CrearPeriodo from "../FuturePages/PageCasoUso15CrearPeriodoPago";
import PageCasoUso15ModificarPeriodo from "../FuturePages/PageCasoUso15ModificarPeriodoPago";

const PeriodoPagoPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentPeriodoPago, setCurrentPeriodoPago] = useState<PeriodoPago>({
    id: 1,
  });
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
    <PageCasoUso15ModificarPeriodo
      periodoPago={currentPeriodoPago}
      handleCurrentView={handleCurrentView}
    />,
    <PageCasoUso15
      handleCurrentView={handleCurrentView}
      setCurrentPeriodoPago={setCurrentPeriodoPago}
    />,
    <PageCasoUso15CrearPeriodo handleCurrentView={handleCurrentView} />,
  ];

  return <>{views[currentView]}</>;
};

export default PeriodoPagoPage;
