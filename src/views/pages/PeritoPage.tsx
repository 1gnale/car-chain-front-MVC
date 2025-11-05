import { useState } from "react";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
import ManageReview from "../components/ApproveReview/ManageReview";
import DataPolicyApprove from "../components/ApprovePolicy/DataPolicyApprove";

const PeritoPage = ({ isAuth }: { isAuth: boolean }) => {
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
    <ManageReview
      handleCurrentView={handleCurrentView}
      setCurrentPolicy={setCurrentPolicy}
    ></ManageReview>,
    <DataPolicyApprove
      numberPolicy={currentPolicy}
      handleCurrentView={handleCurrentView}
    ></DataPolicyApprove>,
  ];

  return (
    <>
      <HeaderSection
        title="Gestión de Revisiones"
        text="Administra las revisiones de seguros solicitadas por clientes"
        classname="text-center"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default PeritoPage;
