import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import { useState } from "react";
import ModificarDetalleCobertura from "../FuturePages/PageCasoEstudio05ModificarDetalle";
import CrearDetalleCobertura from "../FuturePages/PageCasoEstudio05CrearDetalle";
import BreadCrumbNav from "../components/GeneralComponents/BreadCrumbNav";
import PageCasoEstudio06 from "../FuturePages/PageCasoEstudio06";
import CrearCobertura from "../FuturePages/PageCasoEstudio06CrearCobertura";
import ModificarCobertura from "../FuturePages/PageCasoEstudio06ModificarCobertura";

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
    <PageCasoEstudio06
      handleCurrentView={handleCurrentView}
      setCurrentCoverage={setCurrentCoverage}
    />,
    <CrearCobertura handleCurrentView={handleCurrentView} />,
  ];

  return (
    <>
      <Navbar isAuth={isAuth} />
      <TitleSection title="DETALLES" />
      <BreadCrumbNav items={[{ page: "Detalles" }]} />
      {views[currentView]}
    </>
  );
};

export default CoberturasPage;
