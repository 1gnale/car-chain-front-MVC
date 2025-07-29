import LabelNinfo from "./GeneralComponents/LabelNinfo";
import TitleForm from "./GeneralComponents/TitleForm";
import ImgConfirmation from "./GeneralComponents/ImgDataConfirmation";
import src from "../assets/Prueba.jpg";
import Table from "./GeneralComponents/Table";

const FormDataConfirmation = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  return (
  <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        <TitleForm title="Información Del Cliente" />

        <div className="row g-3">
          <div className="col-md-3">
            <LabelNinfo title="Nombre/s:" text="Nombre" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Apellido/s:" text="Apellido" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Sexo:" text="Sexo" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Fecha de Nacimiento:" text="04/10/1998" />
          </div>

          <div className="col-md-3">
            <LabelNinfo title="Tipo de" text="DNI" />
            <LabelNinfo title="Documento:" text="" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Documento:" text="3456780" />
          </div>
          <div className="col-md-3">
            
            <LabelNinfo title="Teléfono:" text="Telefono" />
          </div>
          <div className="col-md-3">
            
            <LabelNinfo title="Correo:" text="jua***@gmail.com" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Provincia:" text="Santa Cruz" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Localidad:" text="Rio Gallegos" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Domicilio:" text="Ernesto Padilla 561" />
          </div>
        </div>

        <div className="my-4">
          <TitleForm title="Información Del Vehículo" />
        </div>

        <div className="row g-3">
          <div className="col-md-3">
            <LabelNinfo title="Matrícula: " text="SA-SA-SAA " />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Chasis:" text="assass" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="N-otor:" text="12" />
          </div>
          <div className="col-md-3 " >
            <LabelNinfo title="GNC:" text="Si Tiene" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Marca:" text="Ford" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Modelo:" text="Kuga" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Version:" text="1.2" />
          </div>
          <div className="col-md-3">
            <LabelNinfo title="Año:" text="2003" />
          </div>
        </div>
        <div className="my-4">
          <TitleForm title="Documentacion" />
        </div>

          <div className="row g-3">
          <div className="col-md-2">
            <ImgConfirmation src={src}  alt="" text="Foto Frontal"/>
          </div>
            <div className="col-md-2">
            <ImgConfirmation src={src}  alt="" text="Foto Trasera"/>
          </div>
          <div className="col-md-2">
            <ImgConfirmation src={src}  alt="" text="Foto Lateral 1"/>
          </div>
          <div className="col-md-2">
            <ImgConfirmation src={src}  alt="" text="Foto Lateral 2"/>
          </div>
          <div className="col-md-2">
            <ImgConfirmation src={src}  alt="" text="Foto Techo"/>
          </div>
          <div className="col-md-2">
            <ImgConfirmation src={src}  alt="" text="Cedula Verde"/>
          </div>
          </div>

          <div className="my-4">
          <TitleForm title="Cobertura Contratada" />
        </div>
        <div className="row g-3">
          <div className="col-md-3">
            <LabelNinfo title="Nombre:" text="Terceros Completo" />
          </div>
          </div>

          <div className="row g-3">
          <div className="col-md-3">
            <LabelNinfo title="Precio:" text="$4.958,80" />
          </div>

          <Table />
          </div>
          </div>
      </div>
    </div>
);
}
  


export default FormDataConfirmation