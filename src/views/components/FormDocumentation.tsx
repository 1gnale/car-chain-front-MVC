import GrayButton from "./GeneralComponents/Button";
import ImgInput from "./GeneralComponents/ImgInput";
import { useState, useEffect } from "react";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormDocumetsValidation";

import TitleForm from "./GeneralComponents/TitleForm";

const FormDocumentation = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  const [fileFotoFrontal, setFileFrontal] = useState<File>();
  const [fileFotoTrasera, setFileTrasera] = useState<File>();
  const [fileFotoLateral1, setFileLateral1] = useState<File>();
  const [fileFotoLateral2, setFileLateral2] = useState<File>();
  const [fileFotoTecho, setFileTecho] = useState<File>();
  const [fileCedulaVerde, setFileCedulaVerde] = useState<File>();

  const { errors, validateField, validateForm } = useFormValidation();

  useEffect(() => {
    console.log("error ");
    console.log(errors);
  }, []);

  const handleFileFrontalChange = (file: File) => {
    setFileFrontal(file);
    validateField("fotoFrontal", file);
    console.log(file);
  };

  const handleFileTraseraChange = (file: File) => {
    setFileTrasera(file);
    validateField("fotoTrasera", file);
    console.log(file);
  };

  const handleFileLateral1Change = (file: File) => {
    setFileLateral1(file);
    validateField("fotoLateral1", file);
    console.log(file);
  };

  const handleFileLateral2Change = (file: File) => {
    setFileLateral2(file);
    validateField("fotoLateral2", file);
    console.log(file);
  };
  const handleFileTechoChange = (file: File) => {
    setFileTecho(file);
    validateField("fotoTecho", file);
    console.log(file);
  };
  const handleFileCedulaVerdeChange = (file: File) => {
    setFileCedulaVerde(file);
    validateField("cedulaVerde", file);
    console.log(file);
  };

  const handleSubmit = () => {
    const documentation: Documentacion = {
      fotoFrontal: fileFotoFrontal,
      fotoTrasera: fileFotoTrasera,
      fotoLateral1: fileFotoLateral1,
      fotoLateral2: fileFotoLateral2,
      fotoTecho: fileFotoTecho,
      cedulaVerde: fileCedulaVerde,
    };
    console.log("AAAAAAA");
    if (validateForm(documentation)) {
      console.log("Formulario válido:", documentation);
      handleCurrentView(true);
    } else {
      console.log("Formulario inválido:", errors);
    }
  };

  return (

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
          <div className="row g-3">
            <div className="col-12 col-md-6 ">
              <ImgInput
                title="Foto Frontal"
                onCharge={(file: File) => {
                  handleFileFrontalChange(file);
                }}
                error={errors.fotoFrontal}
                onBlur={() =>
                  validateField(
                    "fotoFrontal" as keyof typeof errors,
                    fileFotoFrontal
                  )
                }
              />
              <ImgInput
                title="Foto Lateral 1"
                onCharge={(file: File) => {
                  handleFileLateral1Change(file);
                }}
                error={errors.fotoLateral1}
                onBlur={() =>
                  validateField(
                    "fotoLateral1" as keyof typeof errors,
                    fileFotoLateral1
                  )
                }
              />
              <ImgInput
                title="Foto Lateral 2"
                onCharge={(file: File) => {
                  handleFileLateral2Change(file);
                }}
                error={errors.fotoLateral2}
                onBlur={() =>
                  validateField(
                    "fotoLateral2" as keyof typeof errors,
                    fileFotoLateral2
                  )
                }
              />
            </div>
            <div className="col-12 col-md-6 ">
              <ImgInput
                title="Foto Trasera"
                onCharge={(file: File) => {
                  handleFileTraseraChange(file);
                }}
                error={errors.fotoTrasera}
                onBlur={() =>
                  validateField(
                    "fotoTrasera" as keyof typeof errors,
                    fileFotoTrasera
                  )
                }
              />

              <ImgInput
                title="Foto Techo"
                onCharge={(file: File) => {
                  handleFileTechoChange(file);
                }}
                error={errors.fotoTecho}
                onBlur={() =>
                  validateField(
                    "fotoTecho" as keyof typeof errors,
                    fileFotoTecho
                  )
                }
              />
              <ImgInput
                title="Cedula Verde"
                srcUrn={""}
                onCharge={(file: File) => {
                  handleFileCedulaVerdeChange(file);
                }}
                error={errors.cedulaVerde}
                onBlur={() =>
                  validateField(
                    "cedulaVerde" as keyof typeof errors,
                    fileCedulaVerde
                  )
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <GrayButton text="Cancelar" />
            <GrayButton text="Siguiente" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormDocumentation;
