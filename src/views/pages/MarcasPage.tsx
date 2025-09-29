import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import ManageMarcas from "../components/ManageBrands/ManageMarcas";
import { useState } from "react";
import ModificarMarca from "../components/ManageBrands/ModificarMarca";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
import CrearMarca from "../components/ManageBrands/CrearMarca";

const MarcasPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentBrand, setCurrentBrand] = useState<Marca>({ id: 1 });
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
    <ModificarMarca
      marca={currentBrand}
      handleCurrentView={handleCurrentView}
    />,
    <ManageMarcas
      handleCurrentView={handleCurrentView}
      setCurrentBrand={setCurrentBrand}
    />,
    <CrearMarca handleCurrentView={handleCurrentView}></CrearMarca>,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Marcas"
        text="Administra las marcas de seguros disponibles en el sistema"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default MarcasPage;
