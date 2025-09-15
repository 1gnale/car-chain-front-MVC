import Navbar from "../components/NavBar/Navbar";
import { useState } from "react";
import TitleSection from "../components/GeneralComponents/TitleSection";
import BreadCrumbNav from "../components/GeneralComponents/BreadCrumbNav";
import FormDataVehicle from "../components/RequestUserPolicy/FormDataVehicle";
import FormDataClient from "../components/RequestUserPolicy/FormDataClient";
import FormDataCoverages from "../components/RequestUserPolicy/FormDataCoverages";
import FormDataDocumentation from "../components/RequestUserPolicy/FormDocumentation";
import FormDataConfirmation from "../components/RequestUserPolicy/FormDataConfirmation";

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
    <FormDataVehicle handleCurrentView={handleCurrentView} />,
    <FormDataClient handleCurrentView={handleCurrentView} />,
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
