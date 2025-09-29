import { useState } from "react";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
import ManagePolizas from "../components/ApprovePolicy/ManagePolicy";
import DataPolicyApprove from "../components/ApprovePolicy/DataPolicyApprove";

const VendedorPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(0);

  const [currentPolicy, setCurrentPolicy] = useState<number>();

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
    <ManagePolizas
      handleCurrentView={handleCurrentView}
      setCurrentPolicy={setCurrentPolicy}
    ></ManagePolizas>,
    <DataPolicyApprove
      numberPolicy={currentPolicy}
      handleCurrentView={handleCurrentView}
    ></DataPolicyApprove>,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Polizas"
        text="Administra las polizas de seguros solicitadas por clientes"
        classname="text-center"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default VendedorPage;
