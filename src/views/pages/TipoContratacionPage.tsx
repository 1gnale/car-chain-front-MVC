import { useState } from "react";
import ManageHiringType from "../components/ManageHiringType/ManageHiringType";
import ModificarTipoContratacion from "../components/ManageHiringType/ModificarTipoContratacion";
import CrearTipoContratacion from "../components/ManageHiringType/CrearTipoContratacion";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
const TipoContratacionPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentHiringType, setCurrentHiringType] = useState<TipoContratacion>({
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
    <ModificarTipoContratacion
      tipoContratacion={currentHiringType}
      handleCurrentView={handleCurrentView}
    />,
    <ManageHiringType
      handleCurrentView={handleCurrentView}
      setHiringType={setCurrentHiringType}
    />,
    <CrearTipoContratacion handleCurrentView={handleCurrentView} />,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Tipos de Contratacion"
        text="Administra los tipos de contratacion de seguros disponibles en el sistema"
      ></HeaderSection>

      {views[currentView]}
    </>
  );
};

export default TipoContratacionPage;
