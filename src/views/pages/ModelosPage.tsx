import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import ManageModelos from "../components/ManageModels/ManageModelos";
import { useState } from "react";
import ModificarModelo from "../components/ManageModels/ModificarModelo";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
import { id } from "date-fns/locale";
import CrearModelo from "../components/ManageModels/CrearModelo";

const ModelosPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentBrand, setCurrentBrand] = useState<Marca>({ id: 1 });
  const [currentModel, setCurrentModel] = useState<Modelo>({
    id: 1,
    marca: currentBrand,
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
    <ModificarModelo
      modelo={currentModel}
      handleCurrentView={handleCurrentView}
    />,
    <ManageModelos
      handleCurrentView={handleCurrentView}
      setCurrentModel={setCurrentModel}
    />,
    <CrearModelo handleCurrentView={handleCurrentView}></CrearModelo>,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Modelos"
        text="Administra los modelos de seguros disponibles en el sistema"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default ModelosPage;
