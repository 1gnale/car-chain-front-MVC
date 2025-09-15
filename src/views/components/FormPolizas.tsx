import { useState } from "react";
import LabelNinfo from "./GeneralComponents/LabelNinfo.tsx";
import TitleForm from "./GeneralComponents/TitleForm.tsx";
import Table from "./GeneralComponents/Table.tsx";
import GrayButton from "./GeneralComponents/Button.tsx";
import ImgConfirmation from "./GeneralComponents/ImgDataConfirmation.tsx";
import { useAppSelector } from "../../redux/reduxTypedHooks.ts";

function FormPolizas() {
  const [policy, setPolicy] = useState<Poliza>({});
  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );
  function useObjectUrl(file?: File): string {
    if (!file) {
      return "";
    }
    const objectUrl = URL.createObjectURL(file);
    return objectUrl;
  }
  const handleTable = (): tableContent => {
    const table: tableContent = {
      showButtom: false,
      titles: ["ID", "Detalle", "Descripcion", "Monto asegurado"],
      tableBody: coverage_details
        .filter(
          (coverDetail) =>
            coverDetail.cobertura.id === policy.lineaContizacion?.cobertura?.id
        )
        .map((coverDetail, idx) => ({
          key: idx,
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
                return String(coverDetail.detalle.monto_fijo);
              }
              // Si tiene GNC, usamos precio_mercado_gnc
              else if (policy.lineaContizacion?.cotizacion?.vehiculo?.gnc) {
                return String(version.precio_mercado_gnc);
              } else {
                return String(version.precio_mercado);
              }
            })(),
          ],
        })),
    };
    return table;
  };
  const { titles, tableBody, showButtom } = handleTable();
  console.log("BODY DE LA TABLA");
  console.log(tableBody);
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <GrayButton
            text="Reportar Siniestro"
            style="btn btn-secondary  me-md-4"
            onClick={() => {}}
          />

          <GrayButton
            text="Reportar Siniestro"
            style="btn btn-secondary  me-md-4"
            onClick={() => {}}
          />
          <GrayButton
            text="Historial"
            style="btn btn-secondary  me-md-4"
            onClick={() => {}}
          />
          <GrayButton
            text="Paga Por Primera Vez"
            style="btn btn-secondary  me-md-4 "
            onClick={() => {}}
          />
          <div className="my-4">
            <TitleForm title="Informacion De La Poliza" />
          </div>

          <div className="row g-2">
            <div className="col-md-3">
              <LabelNinfo title="N-Poliza:" text="5" />
            </div>
            <div className="col-md-3">
              <LabelNinfo title="Fecha De" text="__/__/____" />
              <LabelNinfo title="Contratacion:" text="" />
            </div>
            <div className="col-md-3">
              <LabelNinfo title="Hora De" text="__:__" />
              <LabelNinfo title="Contratacion:" text="" />
            </div>
            <div className="col-md-3">
              <LabelNinfo title="Estado:" text="Aprobada" />
            </div>
          </div>
          <div className="my-4">
            <TitleForm title="Informacion Del Cliente" />
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <LabelNinfo title="Nombre/s:" text="Juan" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Apellido/s:" text="Carriles" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Sexo:" text="Hombre" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Fecha De" text="12/12/1999" />
              <LabelNinfo title="Nacimiento:" text="" />
            </div>

            <div className="col-md-4">
              <LabelNinfo title="Tipo de" text="DNI" />
              <LabelNinfo title="Documento:" text="" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Documento:" text="4194432" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Teléfono:" text="12345678" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Correo:" text="CorreoFalso@gmail.com" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Provincia:" text="Santa Cruz" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Localidad:" text="Rio Gallegos" />
            </div>
            <div className="col-md-4">
              <LabelNinfo title="Domicilio:" text="Ernesto Padillos 561" />
            </div>
          </div>

          <div className="my-4">
            <TitleForm title="Datos Del Vehiculo" />
          </div>

          <div className="row g-3">
            <div className="col-md-3">
              <LabelNinfo title="Matrícula: " text="SA-SA-SAA" />
            </div>
            <div className="col-md-3">
              <LabelNinfo title="Chasis:" text="assass" />
            </div>
            <div className="col-md-3">
              <LabelNinfo title="N° motor:" text="12" />
            </div>
            <div className="col-md-3 ">
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
            <div className="col-md-8">
              <div className="row g-3">
                <div className="col-md-4">
                  <LabelNinfo title="Nombre:" text="Terceros Completo" />
                </div>
                <div className="col-md-4">
                  <LabelNinfo title="Precio:" text="$1.334,45" />
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <LabelNinfo title="Tipo De" text="" />
                  <LabelNinfo title="Contratacion:" text="" />
                </div>
                <div className="col-md-4">
                  <LabelNinfo title="Periodo De" text="" />
                  <LabelNinfo title="Pago:" text="" />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="col-md-4 offset-md-3">
                <table className="table table-bordered text-center w-100">
                  <thead>
                    <tr>
                      <th colSpan={2} className="table-dark">
                        Fecha de Pago
                      </th>
                    </tr>
                    <tr>
                      <th>Inicio</th>
                      <th>Vencimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>__/__/____</td>
                      <td>__/__/____</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Table
            titles={titles}
            tableBody={tableBody}
            showButtom={showButtom}
          />
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
}

export default FormPolizas;
