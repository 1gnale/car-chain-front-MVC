import { useState } from "react";
import ModificarDetalleCobertura from "../components/ManageDetails/ModificarDetalleCobertura";
import ManageDetails from "../components/ManageDetails/ManageDetails";
import CrearDetalleCobertura from "../components/ManageDetails/CrearDetalleCobertura";
import HeaderSection from "../components/GeneralComponents/HeaderSection";

const DetallesPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentDetail, setCurrentDetail] = useState<Detalle>({ id: 1 });

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
    <ModificarDetalleCobertura
      detalle={currentDetail}
      handleCurrentView={handleCurrentView}
    />,
    <ManageDetails
      handleCurrentView={handleCurrentView}
      setCurrentDetail={setCurrentDetail}
    />,
    <CrearDetalleCobertura handleCurrentView={handleCurrentView} />,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Detalles"
        text="Administra los detalles de seguros disponibles en el sistema"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default DetallesPage;
