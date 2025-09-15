import { useState } from "react";
import ConfigurarAntiguedad from "../components/ManageConfigurationAntique/ConfigurarAntiguedad";
import ModificarConfiguracionAntiguedad from "../components/ManageConfigurationAntique/ModificarConfiguracionAntiguedad";
import CrearConfiguracionAntiguedad from "../components/ManageConfigurationAntique/CrearConfiguracionAntiguedad";
const ConfiguracionAntiguedadPage = () => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentConfigAntiquity, setCurrentConfigAntiquity] =
    useState<ConfigAntiguedad>({ id: 1 });

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
    <ModificarConfiguracionAntiguedad
      configAntiguedad={currentConfigAntiquity}
      handleCurrentView={handleCurrentView}
    />,
    <ConfigurarAntiguedad
      handleCurrentView={handleCurrentView}
      setCurrentConfigAntiquity={setCurrentConfigAntiquity}
    />,
    <CrearConfiguracionAntiguedad handleCurrentView={handleCurrentView} />,
  ];

  return <>{views[currentView]}</>;
};

export default ConfiguracionAntiguedadPage;
