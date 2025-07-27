/*import { useAppSelector } from "../../redux/reduxTypedHooks";
import CoverageCard from "./GeneralComponents/CoverageCard.tsx";
import "../../models/types.d.ts";
import GrayButton from "./GeneralComponents/Button";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useEffect, useMemo } from "react";
import { useState } from "react";

import type {
  allConfigs,
  Cobertura_AllData,
  Cobertura_Detalle,
  Cotizacion,
  Detalle_AllData,
} from "../../models/types.d.ts";

const FormDataCoverages = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  const coverages: Cobertura_AllData[] = useAppSelector(
    (state) => state.coverages.coverage
  );

  const allConfig: allConfigs = useAppSelector(
    (state) => state.allConfigs.allConfig
  );

  function calcularMonto(cobertura_detalle: Cobertura_Detalle, cotizacion: Cotizacion): number {
    let total = 0;
    let montoVehiculo = 0;
    let multiplicador = 1;
    let acumulador = 0;
    
    // Obtener el costo del vehículo
    const vehiculo = cotizacion.  ;
    montoVehiculo = vehiculo.gnc
      ? vehiculo.version.preciomercadognc
      : vehiculo.version.preciomercado;

    // Obtener el monto base a partir de los detalles
    for (const d of cobertura_detalle.detalles) {
      total += (montoVehiculo * d.porcentajemiles) / 10000;
    }

    // Obtener los multiplicadores
    const uno = 1;
    const cien = 100;

    multiplicador *= uno - cotizacion.config_localidad.descuentocl / cien;
    multiplicador *= uno - cotizacion.config_antiguedad.descuentoca / cien;
    multiplicador *= uno - cotizacion.config_edad.descuentoce / cien;

    multiplicador *= uno + cotizacion.config_localidad.gananciacl / cien;
    multiplicador *= uno + cotizacion.config_antiguedad.gananciaca / cien;
    multiplicador *= uno + cotizacion.config_edad.gananciace / cien;

    // Obtener todos los sumadores
    acumulador += cotizacion.config_edad.recargoce;
    acumulador += cotizacion.config_localidad.recargocl;
    acumulador += cotizacion.config_antiguedad.recargoca;

    // Calcular el monto final
    const monto = total * multiplicador + acumulador;

    return monto;
  }

  useEffect(() => {
    const client = localStorage.getItem("formClient");
    const vehicle = localStorage.getItem("formVehicle");
    if (client !== null && vehicle !== null) {
      coverages.map;

      allConfig.config_antiguedad?.map((config) =>
        console.log("configs: " + config.nombre)
      );
    }
  }, []);

  const handleAmount = () => {};

  const handleAppliedDetails = (details: Detalle_AllData[]) => {
    const result = details.map((detail) => {
      return {
        name: detail.nombre,
        apply: detail.aplica,
        description: detail.descripcion,
      };
    });
    return result;
  };

  return (
    <div className="container my-5">
      <div className="my-section">
        <div className="text-center my-4">
          <h2>¡Te ofrecemos estas coberturas!</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="row">
            {coverages.map((coverage, index) => (
              <div className="col" key={index}>
                <CoverageCard
                  titulo={coverage.nombre}
                  precio={"$" + "---"}
                  itemsApply={handleAppliedDetails(coverage.detalles)}
                  onContratar={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center mt-3">
            <GrayButton style="-2" text="Guardar cotizacion"></GrayButton>
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-light text-dark"
              style={{
                width: "34px",
                height: "34px",
                lineHeight: 0, // Evita desplazamientos por línea base
                marginTop: "1px", // Ajuste visual fino
              }}
            >
              <ExclamationCircleFill size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default FormDataCoverages;*/
