import Table from "../components/GeneralComponents/Table";
import Input from "../components/GeneralComponents/Input";
import GrayButton from "../components/GeneralComponents/Button";
import LabelNinfo from "../components/GeneralComponents/LabelNinfo";
import IconButton from "../components/GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";
const handleTable = (): tableContent => {
  const table: tableContent = {
    showButtom: false,
    titles: ["I", "Nombre", "Descripcion", "Recargo Por Atraso (%)", "Opciones"], 
    tableBody: [],
  };
  return table;
};

const { titles, tableBody, customIcons, showButtom } = handleTable();

function PageCasoEstudio06() {
  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center w-100 gap-2 p-3">
        <span className="form-label mb-0">Búsqueda:</span>

        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          style={{ maxWidth: "75%" }}
        />
        <IconButton icon={PlusSquare} />
      </div>
              <div className="d-flex  my-4" style={{ width: "-20px" }}>
          <Table
            titles={titles}
            tableBody={tableBody}
            customIcons={customIcons}
            showButtom={showButtom}
          />
        </div>
    </div>
  );
}

export default PageCasoEstudio06;
