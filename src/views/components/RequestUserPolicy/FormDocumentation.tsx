import GrayButton from "../GeneralComponents/Button";
import ImgInput from "../GeneralComponents/ImgInput";
import { useState, useEffect } from "react";
import useFormValidation from "../../../controllers/controllerHooks/Validations/useFormDocumetsValidation";
import TitleForm from "../GeneralComponents/TitleForm";
import useCheckFirstLogin from "../../../controllers/controllerHooks/Fetchs/useCheckFirstLogin";

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
  useCheckFirstLogin();

  const { errors, validateField, validateForm } = useFormValidation();

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

    if (validateForm(documentation)) {
      // Guardamos los paths/nombres de archivo en localStorage
      const documentationPaths = {
        fotoFrontal: fileFotoFrontal?.name || null,
        fotoTrasera: fileFotoTrasera?.name || null,
        fotoLateral1: fileFotoLateral1?.name || null,
        fotoLateral2: fileFotoLateral2?.name || null,
        fotoTecho: fileFotoTecho?.name || null,
        cedulaVerde: fileCedulaVerde?.name || null,
      };

      // Guardamos las imágenes como URLs de objeto en sessionStorage
      const saveImageToSession = (file: File | undefined, key: string) => {
        if (file) {
          const objectUrl = URL.createObjectURL(file);
          sessionStorage.setItem(`image_${key}`, objectUrl);
        } else {
          sessionStorage.removeItem(`image_${key}`);
        }
      };

      saveImageToSession(fileFotoFrontal, 'fotoFrontal');
      saveImageToSession(fileFotoTrasera, 'fotoTrasera');
      saveImageToSession(fileFotoLateral1, 'fotoLateral1');
      saveImageToSession(fileFotoLateral2, 'fotoLateral2');
      saveImageToSession(fileFotoTecho, 'fotoTecho');
      saveImageToSession(fileCedulaVerde, 'cedulaVerde');

      try {
        console.log("Guardando paths de documentación:", documentationPaths);
        localStorage.setItem("Documentation", JSON.stringify(documentationPaths));
        handleCurrentView(true);
      } catch (err) {
        console.error("Error guardando paths de documentación:", err);
      }
    } else {
      console.log("Formulario inválido:", errors);
    }
  };

  function useObjectUrl(file?: File): string {
    if (!file) {
      return "";
    }
    const objectUrl = URL.createObjectURL(file);
    return objectUrl;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-9">
          <TitleForm title="Informacion Del Vehiculo" />

          <div className="row g-3">
            <div className="col-12 col-md-6 ">
              <ImgInput
                title="Foto Frontal"
                srcUrl={useObjectUrl(fileFotoFrontal)}
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
                srcUrl={useObjectUrl(fileFotoLateral1)}
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
                srcUrl={useObjectUrl(fileFotoLateral2)}
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
                srcUrl={useObjectUrl(fileFotoTrasera)}
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
                srcUrl={useObjectUrl(fileFotoTecho)}
                onBlur={() =>
                  validateField(
                    "fotoTecho" as keyof typeof errors,
                    fileFotoTecho
                  )
                }
              />
              <ImgInput
                title="Cedula Verde"
                onCharge={(file: File) => {
                  handleFileCedulaVerdeChange(file);
                }}
                error={errors.cedulaVerde}
                srcUrl={useObjectUrl(fileCedulaVerde)}
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
