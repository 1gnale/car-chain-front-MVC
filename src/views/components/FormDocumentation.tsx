import GrayButton from "./GeneralComponents/Button";
import ImgInput from "./GeneralComponents/ImgInput";
import { useState, useEffect } from "react";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormDocumetsValidation";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import useDocumentationToJsonString from "../../controllers/controllerHooks/LocalStorage/useDocumentationToJsonString.ts";
import TitleForm from "./GeneralComponents/TitleForm";
import getFromLocalStorage from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";

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

  // FUNCIONES PARA CONVERTIR TEXTO BASE6 A JSON
  function base64ToFile(base64: string, filename: string, type: string): File {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || type;
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);

    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], filename, { type: mime });
  }

  function convertBase64FieldsToFile(
    obj: any,
    prefix = "file",
    filetypeFallback = "application/octet-stream"
  ): any {
    let fileCounter = 0;

    function traverseAndConvert(current: any): any {
      if (Array.isArray(current)) {
        return current.map(traverseAndConvert);
      }

      if (typeof current === "object" && current !== null) {
        const newObj: any = {};
        for (const key in current) {
          const value = current[key];

          // Detecta si es base64 válido de imagen/documento
          if (
            typeof value === "string" &&
            value.startsWith("data:") &&
            value.includes("base64")
          ) {
            const extension = value.substring(
              value.indexOf("/") + 1,
              value.indexOf(";")
            );
            const filename = `${prefix}_${fileCounter++}.${extension}`;
            newObj[key] = base64ToFile(value, filename, filetypeFallback);
          } else {
            newObj[key] = traverseAndConvert(value);
          }
        }
        return newObj;
      }

      return current;
    }

    return traverseAndConvert(obj);
  }

  useEffect(() => {
    const documentaciontext = localStorage.getItem("Documentation");

    if (documentaciontext != null) {
      const documentacionJson = JSON.parse(documentaciontext);
      const documentacionJSONFile =
        convertBase64FieldsToFile(documentacionJson);
      setFileFrontal(documentacionJSONFile.fotoFrontal);
      setFileTrasera(documentacionJSONFile.fotoTrasera);
      setFileLateral1(documentacionJSONFile.fotoLateral1);
      setFileLateral2(documentacionJSONFile.fotoLateral2);
      setFileTecho(documentacionJSONFile.fotoTecho);
      setFileCedulaVerde(documentacionJSONFile.cedulaVerde);
    }
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

    if (validateForm(documentation)) {
      const jsonDocumentation = useDocumentationToJsonString(documentation);

      jsonDocumentation.then((resultado) => {
        try {
          console.log("Funco?");
          console.log(resultado);
          localStorage.setItem("Documentation", resultado);
          handleCurrentView(true);
        } catch (err) {
          console.error("Error serializando policy:", err);
        }
      });
    } else {
      console.log("Formulario inválido:", errors);
    }
  };

  function useObjectUrl(file?: File): string {
    if (!file) {
      return "";
    }
    const objectUrl = URL.createObjectURL(file);
    console.log("PUTA NO SE Q CARAJOS ES ESE FILE");
    console.log(objectUrl);
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
