import GrayButton from "../components/GeneralComponents/Button";
import PruebaImg from "../assets/Prueba.jpg";

function CentroMando() {
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        
        
        <div className="col-xl-3 col-md-4 col-sm-12">
          <div className="p-3 border rounded bg-light">
            <div className="mb-2">
              <GrayButton text="Usuarios" style="w-100"/>
            </div>
            <div className="mb-2">
              <GrayButton text="Marcas" style="w-100"/>
            </div>
            <div className="mb-2">
              <GrayButton text="Modelos" style="w-100" />
            </div>
            <div className="mb-2">
              <GrayButton text="Versiones" style="w-100" />
            </div>
            <div className="mb-2">
              <GrayButton text="Detalles De Cobertura" style="w-100" />
            </div>
            <div className="mb-2">
              <GrayButton text="Coberturas" style="w-100" />
            </div>
            <div className="mb-2">
              <GrayButton text="Periodos De Pago" style="w-100" />
            </div>
            <div className="mb-2">
              <GrayButton text="Tipos De Contratacion" style="w-100" />
            </div>
            <div className="mb-2">
              <GrayButton text="Configuracion" style="w-100" />
            </div>
          </div>
        </div>

        
        <div className="col-xl-9 col-md-8 col-sm-12 d-flex align-items-center justify-content-center">
          <img
            src={PruebaImg}
            className="img-fluid"
            style={{ maxHeight: "80vh", objectFit: "contain" }}
            alt="Imagen principal"
          />
        </div>
      </div>
    </div>
  );
}

export default CentroMando;
