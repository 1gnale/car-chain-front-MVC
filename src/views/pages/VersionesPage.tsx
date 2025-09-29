import ManageVersion from "../components/ManageVersion/ManageVersion";
import { useState } from "react";
import ModificarVersion from "../components/ManageVersion/ModificarVersion";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
import CrearVersion from "../components/ManageVersion/CrearVersion";

const VersionesPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentBrand, setCurrentBrand] = useState<Marca>({ id: 1 });
  const [currentModel, setCurrentModel] = useState<Modelo>({
    id: 1,
    marca: currentBrand,
  });
  const [currentVersion, setCurrentVersion] = useState<Version>({ id: 1 });

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
    <ModificarVersion
      version={currentVersion}
      handleCurrentView={handleCurrentView}
    />,
    <ManageVersion
      handleCurrentView={handleCurrentView}
      setCurrentVersion={setCurrentVersion}
    />,
    <CrearVersion handleCurrentView={handleCurrentView}></CrearVersion>,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Versiones"
        text="Administra las versiones de seguros disponibles en el sistema"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default VersionesPage;
