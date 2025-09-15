import { useEffect, useState } from "react";
import LabelNinfo from "../GeneralComponents/LabelNinfo.tsx";
import TitleForm from "../GeneralComponents/TitleForm.tsx";
import Table from "../GeneralComponents/Table.tsx";
import GrayButton from "../GeneralComponents/Button.tsx";
import ImgConfirmation from "../GeneralComponents/ImgDataConfirmation.tsx";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";

const FormDataConfirmation = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  const [policy, setPolicy] = useState<Poliza>({});
  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );
  const formato = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  // Estado para almacenar los paths de documentación
  const [documentationPaths, setDocumentationPaths] = useState<any>({});
  // Estado para almacenar las imágenes como URLs de objeto
  const [documentationImages, setDocumentationImages] = useState<any>({});

  // Función para cargar imágenes desde sessionStorage
  const loadImagesFromSession = () => {
    const imageKeys = [
      "fotoFrontal",
      "fotoTrasera",
      "fotoLateral1",
      "fotoLateral2",
      "fotoTecho",
      "cedulaVerde",
    ];
    const images: any = {};

    imageKeys.forEach((key) => {
      const imageData = sessionStorage.getItem(`image_${key}`);
      if (imageData) {
        images[key] = imageData;
      }
    });

    setDocumentationImages(images);
  };

  useEffect(() => {
    const documentaciontext = localStorage.getItem("Documentation");
    const policyStorage = useLocalStorageItem<Poliza>("PolicyData");

    if (policyStorage != null) {
      if (documentaciontext != null) {
        const paths = JSON.parse(documentaciontext);
        setDocumentationPaths(paths);
        console.log("Paths de documentación cargados:", paths);
      }
      setPolicy(policyStorage);
    }

    // Cargar las imágenes desde sessionStorage
    loadImagesFromSession();

    // Cleanup function para liberar las URLs de objeto
    return () => {
      Object.values(documentationImages).forEach((url: any) => {
        if (typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  // Función auxiliar para mostrar información de archivos cuando solo tenemos paths
  function getFileDisplayName(filePath?: string): string {
    return filePath || "No seleccionado";
  }

  // Función para obtener la URL de la imagen
  function getImageUrl(imageKey: string): string {
    return documentationImages[imageKey] || "";
  }

  const handleTable = (): tableContent => {
    console.log("policy");
    console.log(policy);
    return {
      showButtom: false,
      titles: ["ID", "Detalle", "Descripcion", "Monto asegurado"],
      tableBody: coverage_details
        .filter(
          (covDetail) =>
            policy.lineaContizacion?.cobertura?.id === covDetail.cobertura.id &&
            covDetail.detalle.activo &&
            covDetail.aplica
        )
        .map((coverDetail, idx) => ({
          key: idx,
          value: idx,
          rowContent: [
            String(coverDetail.detalle.id),
            String(coverDetail.detalle.nombre),
            String(coverDetail.detalle.descripcion),
            (() => {
              const version =
                policy.lineaContizacion?.cotizacion?.vehiculo?.version;

              if (!version) return "N/A";

              // Si tiene valor
              if (coverDetail.detalle.monto_fijo != 0) {
                return String(
                  formato.format(coverDetail.detalle.monto_fijo ?? 0)
                );
              }
              // Si tiene GNC, usamos precio_mercado_gnc
              else if (policy.lineaContizacion?.cotizacion?.vehiculo?.gnc) {
                return String(formato.format(version.precio_mercado_gnc ?? 0));
              } else {
                return String(formato.format(version.precio_mercado));
              }
            })(),
          ],
        })),
    };
  };
  const { titles, tableBody, customIcons, showButtom } = handleTable();
  console.log("BODY DE LA TABLA");
  console.log(tableBody);
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
                    ?.localidad?.provincia?.descripcion
                }
              />
            </div>
            <div className="col-md-3">
              <LabelNinfo
                title="Localidad:"
                text={
                  policy.lineaContizacion?.cotizacion?.vehiculo?.cliente
                    ?.localidad?.descripcion
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
          <div className="my-4">
            <TitleForm title="Información Del Vehiculo" />
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
                src={getImageUrl("fotoFrontal")}
                alt="Foto Frontal"
                text="Foto Frontal"
              />
              <small className="text-muted d-block mt-1">
                {getFileDisplayName(documentationPaths.fotoFrontal)}
              </small>
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={getImageUrl("fotoTrasera")}
                alt="Foto Trasera"
                text="Foto Trasera"
              />
              <small className="text-muted d-block mt-1">
                {getFileDisplayName(documentationPaths.fotoTrasera)}
              </small>
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={getImageUrl("fotoLateral1")}
                alt="Foto Lateral 1"
                text="Foto Lateral 1"
              />
              <small className="text-muted d-block mt-1">
                {getFileDisplayName(documentationPaths.fotoLateral1)}
              </small>
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={getImageUrl("fotoLateral2")}
                alt="Foto Lateral 2"
                text="Foto Lateral 2"
              />
              <small className="text-muted d-block mt-1">
                {getFileDisplayName(documentationPaths.fotoLateral2)}
              </small>
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={getImageUrl("fotoTecho")}
                alt="Foto Techo"
                text="Foto Techo"
              />
              <small className="text-muted d-block mt-1">
                {getFileDisplayName(documentationPaths.fotoTecho)}
              </small>
            </div>
            <div className="col-md-2">
              <ImgConfirmation
                src={getImageUrl("cedulaVerde")}
                alt="Cedula Verde"
                text="Cedula Verde"
              />
              <small className="text-muted d-block mt-1">
                {getFileDisplayName(documentationPaths.cedulaVerde)}
              </small>
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
                title="Precio: "
                text={String(formato.format(policy.lineaContizacion?.monto!))}
              />
            </div>
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
            className="d-grid gap-2 d-md-flex justify-content-md-end"
            style={{ padding: "10px" }}
          >
            <GrayButton text="Cancelar" style="me-md-2" onClick={() => {}} />
            <GrayButton text="Confirmar" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDataConfirmation;
