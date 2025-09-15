import { useState } from "react";
import ManageConfigurationAge from "../components/ManageConfigurationAge/ManageConfigurationAge";
import CrearConfiguracionEdad from "../components/ManageConfigurationAge/CrearConfiguracionEdad";
import ModificarConfiguracionEdad from "../components/ManageConfigurationAge/ModificarConfiguracionEdad";
const ConfiguracionEdadPage = () => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentConfigAge, setCurrentConfigAge] = useState<ConfigEdad>({
    id: 1,
  });

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
    <ModificarConfiguracionEdad
      configEdad={currentConfigAge}
      handleCurrentView={handleCurrentView}
    />,
    <ManageConfigurationAge
      handleCurrentView={handleCurrentView}
      setCurrentConfigAge={setCurrentConfigAge}
    />,
    <CrearConfiguracionEdad handleCurrentView={handleCurrentView} />,
  ];

  return <>{views[currentView]}</>;
};

export default ConfiguracionEdadPage;
