import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import PageCasoEstudio03 from "../FuturePages/PageCasoEstudio03";
import { useState } from "react";
import ModificarModelo from "../FuturePages/PageCasoEstudio03ModificarModelo";
import { id } from "date-fns/locale";


const ModelosPage = ({ isAuth }: { isAuth: boolean }) => {
 const [currentView, setCurrentView] = useState<number>(0);
 const [currentBrand, setCurrentBrand] = useState<Marca>({id: 1});
 const [currentModel, setCurrentModel] = useState<Modelo>({id: 1, marca: currentBrand});
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
    <PageCasoEstudio03  handleCurrentView={handleCurrentView} setCurrentModel={setCurrentModel}/>,
    <ModificarModelo modelo={currentModel}  />
  ];



  return (
    <>
      <Navbar isAuth={isAuth} />
      <TitleSection title="MODELOS" />
      {views[currentView]}
    </>
  );
};

export default ModelosPage;
