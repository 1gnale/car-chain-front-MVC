import TitleForm from "./GeneralComponents/TitleForm";
import Input from "./GeneralComponents/Input";
import GrayButton from "./GeneralComponents/Button";

function PolicyPayment() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="row" style={{ minHeight: "220px" }}>
            <div className="col-md-6">
              <Input title="Tipo de Contratación" place="Por 1 Año" />
              <div className="mt-4">
                <Input title="Periodo de Pago" place="Mensual" />
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column justify-content mt-4">
              <div>
                <h5 className="fw-bold mb-1">TOTAL A PAGAR</h5>
                <h3 className="fw-bold mb-0">$4,958.80</h3>
              </div>
            </div>
            <div className="col-12 d-flex  mt-3">
              <div
                className="d-flex gap-3"
                style={{ width: "41rem", justifyContent: "flex-end" }}
              >
                <GrayButton
                  text="Cancelar"
                  style="btn btn-secondary btn-lg"
                  onClick={() => {}}
                />
                <GrayButton
                  text="Pagar"
                  style="btn btn-primary btn-lg"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyPayment;
