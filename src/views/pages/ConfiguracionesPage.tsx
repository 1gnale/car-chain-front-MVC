import { useState } from "react";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
import ConfiguracionAntiguedadPage from "./ConfiguracionAntiguedadPage";
import ConfiguracionEdadPage from "./ConfiguracionEdadPage";
import ConfiguracionLocalidadPage from "./ConfiguracionLocalidadPage";
const ConfiguracionesPage = ({ isAuth }: { isAuth: boolean }) => {
  const [activeSection, setActiveSection] = useState("Antiguedad");

  const renderContent = () => {
    switch (activeSection) {
      case "Antiguedad":
        return <ConfiguracionAntiguedadPage />;
      case "Edad":
        return <ConfiguracionEdadPage />;
      case "Localidad":
        return <ConfiguracionLocalidadPage />;
    }
  };

  return (
    <>
      <HeaderSection
        title="Gestión de Configuraciones"
        text="Administra las canfiguraciones de seguros disponibles en el sistema"
      ></HeaderSection>
      <div className="h-100 w-100 d-flex flex-column">
        {/* Barra superior con 3 botones tipo tabs */}
        <div className="d-flex border-bottom">
          <button
            className={`flex-fill py-2 text-sm font-medium transition 
        ${
          activeSection === "Antiguedad"
            ? "bg-dark text-white border-b-2 border-blue-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
            onClick={() => setActiveSection("Antiguedad")}
          >
            Antigüedad
          </button>
          <button
            className={`flex-fill py-2 text-sm font-medium transition 
        ${
          activeSection === "Edad"
            ? "bg-dark text-white border-b-2 border-blue-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
            onClick={() => setActiveSection("Edad")}
          >
            Edad
          </button>
          <button
            className={`flex-fill py-2 text-sm font-medium transition 
        ${
          activeSection === "Localidad"
            ? "bg-dark text-white border-b-2 border-blue-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
            onClick={() => setActiveSection("Localidad")}
          >
            Localidad
          </button>
        </div>

        {/* Área de contenido */}
        <div className="flex-grow bg-white p-4 overflow-auto rounded-b">
          <div className="content-area h-100">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default ConfiguracionesPage;
