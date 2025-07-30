import { useEffect, useState } from "react";
import LabelNinfo from "./GeneralComponents/LabelNinfo";
import TitleForm from "./GeneralComponents/TitleForm";
import Table from "./GeneralComponents/Table";
import ImgConfirmation from "./GeneralComponents/ImgDataConfirmation";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";

const FormDataConfirmation = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  const [policy, setPolicy] = useState<Poliza>({});

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
    const policyStorage = useLocalStorageItem<Poliza>("PolicyData");
    if (policyStorage != null && documentaciontext != null) {
      const documentacionJson = JSON.parse(documentaciontext);
      const documentacionJsonFiles =
        convertBase64FieldsToFile(documentacionJson);
      const document = documentacionJsonFiles as Documentacion;
      policyStorage.documentacion = document;
      setPolicy(policyStorage);
    }
  }, []);

  function useObjectUrl(file?: File): string {
    if (!file) {
      return "";
    }
    const objectUrl = URL.createObjectURL(file);
    return objectUrl;
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <TitleForm title="Información Del Cliente" />

          <div className="row g-3">
            <div className="col-md-3">
              <LabelNinfo
                title="Nombre/s:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.nombres
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Apellido/s:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.apellido
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Sexo:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente?.sexo
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Fecha de Nacimiento:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.fechaNacimiento
                }
              />
            </div>

            <div className="col-md-3">
              <LabelNinfo
                title="Tipo de"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.tipoDocumento
                }
              />
              <LabelNinfo title="Documento:" text="" />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Documento:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.documento
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Teléfono:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.telefono
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Correo:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente?.correo
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Provincia:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.localidad.provincia?.descripcion
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Localidad:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.localidad.descripcion
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Domicilio:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.domicilio
                }
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-3">
              <LabelNinfo
                title="Matrícula: "
                text={policy.lineaContizacion?.cotizacion?.vehiculo?.matricula}
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Chasis:"
                text={policy.lineaContizacion?.cotizacion?.vehiculo?.chasis}
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="N° motor:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.numeroMotor
                }
              />
            </div>
            <div className="col-md-3 ">
              <LabelNinfo
                title="GNC:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.gnc
                    ? "Sí"
                    : "No"
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Marca:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.version.modelo
                    .marca.nombre
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Modelo:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.version.modelo
                    .nombre
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Version:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.version.nombre
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Año:"
                text={String(
                  policy.lineaContizacion?.cotizacion?.vehiculo?.añoFabricacion
                )}
              />
            </div>
          </div>

          <div className="my-4">
            <TitleForm title="Documentacion" />
          </div>

          <div className="row g-3">
            <div className="col-md-2">
              <ImgConfirmation
                src={useObjectUrl(policy.documentacion?.fotoFrontal)}
                alt=""
                text="Foto Frontal"
              />
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={useObjectUrl(policy.documentacion?.fotoTrasera)}
                alt=""
                text="Foto Trasera"
              />
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={useObjectUrl(policy.documentacion?.fotoFrontal)}
                alt=""
                text="Foto Lateral 1"
              />
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={useObjectUrl(policy.documentacion?.fotoLateral2)}
                alt=""
                text="Foto Lateral 2"
              />
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={useObjectUrl(policy.documentacion?.fotoTecho)}
                alt=""
                text="Foto Techo"
              />
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={useObjectUrl(policy.documentacion?.cedulaVerde)}
                alt=""
                text="Cedula Verde"
              />
            </div>
          </div>

          <div className="my-4">

            <TitleForm title="Cobertura Contratada" />
          </div>
          <div className="row g-3">
            <div className="col-md-3">
              <LabelNinfo
                title="Nombre:"
                text={policy.lineaContizacion?.cobertura?.nombre}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-3">
              <LabelNinfo
                title="Precio:"
                text={String(policy.lineaContizacion?.monto)}
              />
            </div>

            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDataConfirmation;
