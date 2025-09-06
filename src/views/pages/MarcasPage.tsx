import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import PageCasoEstudio02 from "../FuturePages/PageCasoEstudio02";
import { useState } from "react";
import ModificarMarca from "../FuturePages/PageCasoEstudio02ModificarMarca";
const MarcasPage = ({ isAuth }: { isAuth: boolean }) => {
 const [currentView, setCurrentView] = useState<number>(0);
 const [currentBrand, setCurrentBrand] = useState<Marca>({id: 1});
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
    <PageCasoEstudio02  handleCurrentView={handleCurrentView} setCurrentBrand={setCurrentBrand}/>,
    <ModificarMarca marca={currentBrand}  />
  ];


  return (
    <>
      <Navbar isAuth={isAuth} />
      <TitleSection title="MARCAS" />
      {views[currentView]}
    </>
  );
};

export default MarcasPage;
