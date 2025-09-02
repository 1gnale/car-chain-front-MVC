
import Table from "../components/GeneralComponents/Table";
import IconButton from "../components/GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";

const handleTable = (): tableContent => {
  const table: tableContent = {
    showButtom: false,
    titles: [
      "ID",
      "Nombre",
      "Antiguedad Minima",
      "Antiguedad Maxima",
      "Descuento",
      "Ganancia",
      "Recargo",
      ".",
    ],
    tableBody: [],
  };
  return table;
};

const { titles, tableBody, customIcons, showButtom } = handleTable();

function ConfigurarAntiguedad() {
  return (
    <div className="col-xl-9">
      <div className="row">
        
        <div className="col-xl-9 col-md-8 col-sm-12">
          <div className="d-flex flex-column gap-3">
            
            <div className="d-flex align-items-center w-100 gap-2 p-3 border rounded bg-light">
              <span className="form-label mb-0">Búsqueda:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                style={{ maxWidth: "75%" }}
              />
              <IconButton icon={PlusSquare} />
            </div>

            
            <div className="d-flex justify-content-center">
              <Table
                titles={titles}
                tableBody={tableBody}
                customIcons={customIcons}
                showButtom={showButtom}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigurarAntiguedad;
