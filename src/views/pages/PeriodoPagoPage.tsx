import { useState } from "react";
import ManagePaymentPeriod from "../components/ManagePaymentPeriod/ManagePaymentPeriod";
import CrearPeriodoPago from "../components/ManagePaymentPeriod/CrearPeriodoPago";
import ModificarPeriodoPago from "../components/ManagePaymentPeriod/ModificarPeriodoPago";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
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
    <ModificarPeriodoPago
      periodoPago={currentPeriodoPago}
      handleCurrentView={handleCurrentView}
    />,
    <ManagePaymentPeriod
      handleCurrentView={handleCurrentView}
      setCurrentPeriodoPago={setCurrentPeriodoPago}
    />,
    <CrearPeriodoPago handleCurrentView={handleCurrentView} />,
  ];

  return (
    <>
      {" "}
      <HeaderSection
        title="Gestión de Periodo de pago"
        text="Administra los tipos de contratacion de seguros disponibles en el sistema"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default PeriodoPagoPage;
