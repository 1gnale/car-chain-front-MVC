import Navbar from "../components/NavBar/Navbar";
import { useState } from "react";
import TitleSection from "../components/GeneralComponents/TitleSection";
import BreadCrumbNav from "../components/GeneralComponents/BreadCrumbNav";
import FormDataVehicle from "../components/RequestUserPolicy/FormDataVehicle";
import FormDataClient from "../components/RequestUserPolicy/FormDataClient";
import FormDataCoverages from "../components/RequestUserPolicy/FormDataCoverages";
import FormDataDocumentation from "../components/RequestUserPolicy/FormDocumentation";
import FormDataConfirmation from "../components/RequestUserPolicy/FormDataConfirmation";
import PageCasoEstudio02 from "../FuturePages/PageCasoEstudio02";
import CrearMarca from "../FuturePages/PageCasoEstudio02CrearMarca";
import ModificarMarca from "../FuturePages/PageCasoEstudio02ModificarMarca";
import PageCasoEstudio03 from "../FuturePages/PageCasoEstudio03";
import CrearModelo from "../FuturePages/PageCasoEstudio03CrearModelo";
import ModificarModelo from "../FuturePages/PageCasoEstudio03ModificarModelo";

const RequestUserPolicy = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(0);

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
    <ModificarModelo />,
    <CrearModelo />,
    <PageCasoEstudio03 />,
    <ModificarMarca />,
    <CrearMarca />,
    <PageCasoEstudio02 />,
    <FormDataClient handleCurrentView={handleCurrentView} />,
    <FormDataVehicle handleCurrentView={handleCurrentView} />,
    <FormDataCoverages handleCurrentView={handleCurrentView} Auth={isAuth} />,
    <FormDataDocumentation handleCurrentView={handleCurrentView} />,
    <FormDataConfirmation handleCurrentView={handleCurrentView} />,
  ];

  return (
    <>
      <Navbar isAuth={isAuth} />
      <TitleSection title="COTIZACIÓN DE VEHÍCULO" />
      <BreadCrumbNav items={[{ page: "Cotización del vehículo" }]} />
      {views[currentView]}
    </>
  );
};

export default RequestUserPolicy;
