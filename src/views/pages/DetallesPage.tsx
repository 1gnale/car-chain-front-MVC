import Navbar from "../components/NavBar/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import { useState } from "react";
import ModificarDetalleCobertura from "../FuturePages/PageCasoEstudio05ModificarDetalle";
import PageCasoEstudio05 from "../FuturePages/PageCasoEstudio05";
import CrearDetalleCobertura from "../FuturePages/PageCasoEstudio05CrearDetalle";
import BreadCrumbNav from "../components/GeneralComponents/BreadCrumbNav";

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
    <PageCasoEstudio05
      handleCurrentView={handleCurrentView}
      setCurrentDetail={setCurrentDetail}
    />,
    <CrearDetalleCobertura handleCurrentView={handleCurrentView} />,
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

export default DetallesPage;
