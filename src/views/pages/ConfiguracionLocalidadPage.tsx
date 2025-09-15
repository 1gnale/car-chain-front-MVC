import { useState } from "react";
import ConfigurarLocalidad from "../components/ManageConfigurationLocality/ManageConfigurationLocality";
import ModificarConfiguracionLocalidad from "../components/ManageConfigurationLocality/ModificarConfiguracionLocalidad";
import CrearConfiguracionLocalidad from "../components/ManageConfigurationLocality/CrearConfiguracionLocalidad";

const ConfiguracionLocalidadPage = () => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentConfigLocality, setCurrentConfigLocality] =
    useState<ConfigLocalidad>({
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
    <ModificarConfiguracionLocalidad
      configLocalidad={currentConfigLocality}
      handleCurrentView={handleCurrentView}
    />,
    <ConfigurarLocalidad
      handleCurrentView={handleCurrentView}
      setCurrentConfigLocality={setCurrentConfigLocality}
    />,
    <CrearConfiguracionLocalidad handleCurrentView={handleCurrentView} />,
  ];

  return <>{views[currentView]}</>;
};

export default ConfiguracionLocalidadPage;
