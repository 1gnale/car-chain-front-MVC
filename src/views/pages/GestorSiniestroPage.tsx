import { useState } from "react";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
import ManageSiniestro from "../components/ApproveSiniestro/ManageSiniestro";
import DataPolicyApprove from "../components/ApprovePolicy/DataPolicyApprove";

const GestorSiniestroPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(0);

  const [currentPolicy, setCurrentPolicy] = useState<number>();
  const [currentSiniestro, setCurrentSiniestro] = useState<Siniestro>();

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
    <ManageSiniestro
      handleCurrentView={handleCurrentView}
      setCurrentPolicy={setCurrentPolicy}
      setCurrentSiniestro={setCurrentSiniestro}
    ></ManageSiniestro>,
    <DataPolicyApprove
      numberPolicy={currentPolicy}
      currentSiniestro={currentSiniestro}
      handleCurrentView={handleCurrentView}
    ></DataPolicyApprove>,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Siniestros"
        text="Administra los siniestros de seguros solicitadas por clientes"
        classname="text-center"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default GestorSiniestroPage;
