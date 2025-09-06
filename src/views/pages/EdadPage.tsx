  import { useState } from "react";
import GrayButton from "../components/GeneralComponents/Button";
import ConfigurarEdad from "../FuturePages/PageCaso13ConfigurarEdad";
import ConfigurarAntiguedad from "../FuturePages/PageCaso14ConfiguracionAntiguedad";
import ConfigurarLocalidad from "../FuturePages/PageCaso15ConfigLocalidad";

const EdadPage = () => {
  const [currentView, setCurrentView] = useState<number>(0);

  const views = [
    <ConfigurarEdad/>,
    <ConfigurarAntiguedad />,
    <ConfigurarLocalidad />,
  ]

  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-3">
          <div className="row" style={{ padding: "10px" }}>
            <GrayButton text="Configurar Edad" onClick={() => setCurrentView(0)} />
          </div>
          <div className="row" style={{ padding: "10px" }}>
            <GrayButton text="Configurar Antiguedad" onClick={() => setCurrentView(1)} />
          </div>
          <div className="row" style={{ padding: "10px" }}>
            <GrayButton text="Configurar Localidad" onClick={() => setCurrentView(2)} />
          </div >
        </div>
        {views[currentView]}
      </div>
    </div>
  );
};

export default EdadPage;