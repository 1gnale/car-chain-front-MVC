import { useAppSelector } from "../../redux/reduxTypedHooks";
import CoverageCard from "./GeneralComponents/CoverageCard.tsx";
import "../../models/types.d.ts";
import GrayButton from "./GeneralComponents/Button";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useMemo } from "react";

const FormDataCoverages = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  const coverages: Cobertura_AllData[] = useAppSelector(
    (state) => state.coverages.coverage
  );

  console.log("COBERS" + coverages);

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
        {/* Cards */}
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

export default FormDataCoverages;
