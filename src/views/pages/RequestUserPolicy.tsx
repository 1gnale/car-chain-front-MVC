import Navbar from "../components/Navbar";
import { useState } from "react";
import TitleSection from "../components/GeneralComponents/TitleSection";
import BreadCrumbNav from "../components/GeneralComponents/BreadCrumbNav";
import FormDataVehicle from "../components/FormDataVehicle";
import FormDataClient from "../components/FormDataClient";

const RequestUserPolicy = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(0);
  const handleCurrentView = () => {
    setCurrentView((prev) => prev + 1);
  };

  const views = [
    <FormDataVehicle handleCurrentView={handleCurrentView} />,
    <FormDataClient handleCurrentView={handleCurrentView} />,
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
