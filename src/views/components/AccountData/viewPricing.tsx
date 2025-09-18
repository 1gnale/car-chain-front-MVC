import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import CoverageCard from "../GeneralComponents/CoverageCard.tsx";
import GrayButton from "../GeneralComponents/Button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ViewPricings = ({
  Lineacotizacion,
  Auth,
  handleCurrentView,
}: {
  Lineacotizacion: Linea_Cotizacion[];
  Auth: boolean;
  handleCurrentView: (pass: boolean) => void;
}) => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  // States de la DB
  const details: Detalle[] = useAppSelector((state) => state.detalles.detalle);

  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );

  /// Handles
  const handleAppliedDetails = (id_cobertura?: number) => {
    return details
      .filter((detalle) => detalle.activo)
      .map((detalle) => {
        const found = coverage_details.find(
          (cd) =>
            cd.cobertura.id === id_cobertura && cd.detalle.id === detalle.id
        );

        return {
          name: detalle.nombre || "",
          apply: found?.aplica === true, // true si se encontró y aplica
          description: detalle.descripcion || "",
        };
      });
  };

  const handleHirePolicy = (linea_cotization: Linea_Cotizacion) => {
    if (Auth) {
      const policy: Poliza = {
        numero_poliza: 1,
        lineaCotizacion: linea_cotization,
      };
      localStorage.setItem("PolicyData", JSON.stringify(policy));
      handleCurrentView(true);
    } else {
      loginWithRedirect();
    }
    return null;
  };

  return (
    <div className="container my-5">
      <div className="text-center my-4">
        <h2>¡Te ofrecemos estas coberturas!</h2>
      </div>

      {/* Flex container responsive */}
      <div
        className="d-flex flex-wrap justify-content-center gap-4"
        style={{ rowGap: "2rem" }}
      >
        {Lineacotizacion.map((lineaCot, index) => (
          <div
            key={index}
            className="d-flex"
            style={{
              flex: "1 1 300px",
              maxWidth: "350px",
              minWidth: "280px",
            }}
          >
            <div className="w-100 d-flex flex-column">
              <CoverageCard
                titulo={lineaCot.cobertura?.nombre || ""}
                precio={"$ " + lineaCot.monto}
                itemsApply={handleAppliedDetails(lineaCot.cobertura?.id)}
                onContratar={() => {
                  handleHirePolicy(lineaCot);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Botón inferior */}
      <div className="row">
        <div className="col d-flex justify-content-center mt-4">
          <GrayButton
            style="-2"
            text="Volver"
            onClick={() => navigate(`/perfil`)}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPricings;
