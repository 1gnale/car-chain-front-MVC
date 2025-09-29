import { useState } from "react";
import ManageCoverage from "../components/ManageCoverage/ManageCoverage";
import CrearCobertura from "../components/ManageCoverage/CrearCobertura";
import ModificarCobertura from "../components/ManageCoverage/ModificarCobertura";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
const CoberturasPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentCoverage, setCurrentCoverage] = useState<Cobertura>({ id: 1 });

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
    <ModificarCobertura
      cobertura={currentCoverage}
      handleCurrentView={handleCurrentView}
    />,
    <ManageCoverage
      handleCurrentView={handleCurrentView}
      setCurrentCoverage={setCurrentCoverage}
    />,
    <CrearCobertura handleCurrentView={handleCurrentView} />,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Coberturas"
        text="Administra las coberturas de seguros disponibles en el sistema"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default CoberturasPage;
