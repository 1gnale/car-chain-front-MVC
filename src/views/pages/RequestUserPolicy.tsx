import Navbar from "../components/Navbar";
import { useState } from "react";
import TitleSection from "../components/GeneralComponents/TitleSection";
import BreadCrumbNav from "../components/GeneralComponents/BreadCrumbNav";
import FormDataVehicle from "../components/FormDataVehicle";
import FormDataClient from "../components/FormDataClient";
import FormDataCoverages from "../components/FormDataCoverages";
import FormDataDocumentation from "../components/FormDocumentation";

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
    <FormDataCoverages handleCurrentView={handleCurrentView} />,
    <FormDataClient handleCurrentView={handleCurrentView} />,
    <FormDataVehicle handleCurrentView={handleCurrentView} />,
    <FormDataDocumentation handleCurrentView={handleCurrentView} />,
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
