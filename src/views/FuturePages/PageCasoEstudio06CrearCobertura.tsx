import GrayButton from "../components/GeneralComponents/Button";
import IconButton from "../components/GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";
import Table from "../components/GeneralComponents/Table";

const handleTable = (): tableContent => {
  const table: tableContent = {
    showButtom: false,
    titles: ["ID", "Nombre", "Descripcion", "Porcentaje En Miles", "Monto Fijo", "-"], 
    tableBody: [],
  };
  return table;
};

const { titles, tableBody, customIcons, showButtom } = handleTable();

function CrearCobertura() {
  return (
    <div className="container-fluid w-75">
      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Nombre:
        </label>
        <input type="text" className="form-control" />
      </div>

      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Descripción:
        </label>
        <textarea className="form-control" rows={4} />
      </div>

      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "110px" }}>
          Recargo Por Atraso:
        </label>
        <input
          type="text"
          value={"%"}
          className="form-control ms-2"
          style={{ width: "200px" }}
        />
      </div>

      <div className="d-flex align-items-center w-100 gap-2 p-3">
        <span className="form-label mb-0">Búsqueda:</span>

        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          style={{ maxWidth: "75%" }}
        />
        <IconButton icon={Search} />
        
      </div>
                    <div className="d-flex  my-4" style={{ width: "-20px" }}>
          <Table
            titles={titles}
            tableBody={tableBody}
            customIcons={customIcons}
            showButtom={showButtom}
          />
        </div>
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
            paddingBottom: "20px",
          }}
        >
          <GrayButton text="Cancelar" onClick={() => {}} />
        </div>
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
          }}
        >
          <GrayButton text="Confirmar" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default CrearCobertura;
