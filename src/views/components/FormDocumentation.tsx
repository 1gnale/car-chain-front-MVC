import GrayButton from "./GeneralComponents/Button";

const FormDocumentation = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-9">
          <div className="row " style={{ padding: "2px;" }}>
            <div className="row " style={{ padding: "2px;" }}>
              <h5>
                <strong>Informacóin del vehículo</strong>
              </h5>
            </div>
            <div className="row " style={{ padding: "2px;" }}>
              <div className="col">
                <label htmlFor="exampleInputEmail1">Foto frontal</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFileLang"
                    lang="es"
                  />
                </div>
              </div>
              <div className="col">
                <label htmlFor="exampleInputEmail1">Foto trasera</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFileLang"
                    lang="es"
                  />
                </div>
              </div>
            </div>

            <div className="row " style={{ padding: "2px;" }}>
              <div className="col">
                <label htmlFor="exampleInputEmail1">Foto trasera 1</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFileLang"
                    lang="es"
                  />
                </div>
              </div>
              <div className="col">
                <label htmlFor="exampleInputEmail1">Foto techo</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFileLang"
                    lang="es"
                  />
                </div>
              </div>
            </div>
            <div className="row " style={{ padding: "2px;" }}>
              <div className="col">
                <label htmlFor={"exampleInputEmail1"}>Foto trasera 2</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFileLang"
                    lang="es"
                  />
                </div>
              </div>
              <div className="col">
                <label htmlFor="exampleInputEmail1">Cedula Verde</label>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFileLang"
                    lang="es"
                  />
                </div>
              </div>
            </div>
            <div className="row " style={{ padding: "2px;" }}>
              <div className="col"></div>

              <div
                className="d-grid gap-2 d-md-flex justify-content-md-end"
                style={{ padding: "10px;" }}
              >
                <button className="btn btn-secondary me-md-2" type="button">
                  Cancelar
                </button>
                <button className="btn btn-secondary" type="button">
                  Siguiente
                </button>
              </div>
            </div>

            <div className="row" style={{ padding: "10px;" }}></div>
            <div className="row" style={{ padding: "10px;" }}></div>
          </div>
          <div className="col-xl-1"></div>
        </div>
      </div>
    </div>
  );
};

export default FormDocumentation;
