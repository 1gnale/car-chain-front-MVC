import GrayButton from "./GeneralComponents/Button";
import InputFormulario from "./GeneralComponents/ImgInput";
import ImgInput from "./GeneralComponents/ImgInput";
import TitleForm from "./GeneralComponents/TitleForm";

const FormDocumentation = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  return (
    <div className="container-fluid">
  <div className="row justify-content-center">
    <div className="col-12 col-xl-10">
    <TitleForm title="Informacion Del Vehiculo" />

      <div className="row g-3">
        {/* Cada ImgInput ocupa toda la fila en xs, mitad en md, un cuarto en xl */}
        <div className="col-12 col-md-6 ">
          <ImgInput title="Foto Frontal" />
          <ImgInput title="Foto Lateral 1" />
          <ImgInput title="Foto Lateral 2" />
        </div>
        <div className="col-12 col-md-6 ">
          <ImgInput title="Foto Trasera" />
          <ImgInput title="Foto Techo" />
          <ImgInput title="Cedula Verde" />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <GrayButton text="Cancelar" />
        <GrayButton text="Siguiente" />
      </div>
    </div>
  </div>
</div>

  );
};
export default FormDocumentation;
