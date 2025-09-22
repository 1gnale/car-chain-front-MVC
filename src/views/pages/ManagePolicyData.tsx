import Navbar from "../components/NavBar/Navbar";
import { useState } from "react";
import TitleSection from "../components/GeneralComponents/TitleSection";
import PolicyProfile from "../components/ManagrePolicyData/DataPolicy";
import PolicyFristPayment from "../components/PaymentViews/FormPolicyPayment";
const ManagePolicyData = ({
  isAuth,
  policy,
}: {
  isAuth: boolean;
  policy: Poliza;
}) => {
  // Definimos las keys válidas
  type ViewName = "PolicyProfile" | "pagarPolizaPorPrimeraVez";

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
    pagarPolizaPorPrimeraVez: <PolicyFristPayment poliza={policy} />,
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
