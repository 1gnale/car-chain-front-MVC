import Navbar from "../components/NavBar/Navbar";
import { useState } from "react";
import TitleSection from "../components/GeneralComponents/TitleSection";
import PolicyProfile from "../components/ManagePolicyData/DataPolicy";

import PolicyFristPayment from "../components/PaymentViews/FormPolicyPayment";
import PolicyHistoryData from "../components/ManagePolicyData/PolicyHistory";
import PaymentHistoryData from "../components/ManagePolicyData/PaymentHistory";
import ReportAccident from "../components/ManagePolicyData/ReportAccident";
import PolicyBlockchain from "../components/ManagePolicyData/policyBlockchain";
const ManagePolicyData = ({
  isAuth,
  policy,
}: {
  isAuth: boolean;
  policy: Poliza;
}) => {
  const [currentView, setCurrentView] = useState<ViewName>("PolicyProfile");

  const handleCurrentView = (viewName: ViewName) => {
    setCurrentView(viewName!);
  };
  const views: any = {
    PolicyProfile: (
      <PolicyProfile
        handleCurrentView={handleCurrentView}
        policy={policy}
      ></PolicyProfile>
    ),
    pagarPolizaPorPrimeraVez: (
      <PolicyFristPayment
        poliza={policy}
        isFirstPayment={true}
        handleCurrentView={handleCurrentView}
      />
    ),
    pagarPoliza: (
      <PolicyFristPayment
        poliza={policy}
        isFirstPayment={false}
        handleCurrentView={handleCurrentView}
      />
    ),
    historialPoliza: (
      <PolicyHistoryData handleCurrentView={handleCurrentView} />
    ),
    historialPago: (
      <PaymentHistoryData
        handleCurrentView={handleCurrentView}
      ></PaymentHistoryData>
    ),
    ReportAccident: (
      <ReportAccident
        handleCurrentView={handleCurrentView}
        idPolicy={policy.numero_poliza!}
      ></ReportAccident>
    ),
    PolicyBlockchain: (
      <PolicyBlockchain
        handleCurrentView={handleCurrentView}
        policyId={policy.numero_poliza!}
      ></PolicyBlockchain>
    ),
  };

  return (
    <>
      <Navbar isAuth={isAuth} />
      <TitleSection title="PÓLIZA" />
      {views[currentView]}
    </>
  );
};

export default ManagePolicyData;
