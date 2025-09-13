import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import PageCasoEstudio03 from "../FuturePages/PageCasoEstudio03";
import PageCasoEstudio04 from "../FuturePages/PageCasoEstudio04";
import { useState } from "react";
import ModificarVersion from "../FuturePages/PageCasoEstudio04ModificarVersion";
import HeaderSection from "../components/GeneralComponents/headerSection";

const VersionesPage = ({ isAuth }: { isAuth: boolean }) => {
const [currentView, setCurrentView] = useState<number>(1);
const [currentBrand, setCurrentBrand] = useState<Marca>({ id: 1 });
const [currentModel, setCurrentModel] = useState<Modelo>({
  id: 1,
  marca: currentBrand,
});
const [currentVersion, setCurrentVersion] = useState<Version>({id: 1});


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
  <ModificarVersion version={currentVersion}
    handleCurrentView={handleCurrentView} />,
  <PageCasoEstudio04
      handleCurrentView={handleCurrentView}
    setCurrentVersion={setCurrentVersion}
  />,
  ];

  return <>
            <HeaderSection
        title="Gestión de Versiones"
        text="Administra las versiones de seguros disponibles en el sistema"
      ></HeaderSection>
  {views[currentView]}</>;
};


export default VersionesPage;