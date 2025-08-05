import { useAppSelector } from "../../../redux/reduxTypedHooks";
import CoverageCard from "./../GeneralComponents/CoverageCard.tsx";
import GrayButton from "./../GeneralComponents/Button";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useEffect } from "react";
import { useState } from "react";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import { useAuth0 } from "@auth0/auth0-react";

const FormDataCoverages = ({
  handleCurrentView,
  Auth,
}: {
  handleCurrentView: (pass: boolean) => void;
  Auth: boolean;
}) => {
  // States de la DB
  const coverages: Cobertura[] = useAppSelector(
    (state) => state.coberturas.cobertura
  );
  const details: Detalle[] = useAppSelector((state) => state.detalles.detalle);
  const { loginWithRedirect } = useAuth0();
  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );

  const config_antiguedad: ConfigAntiguedad = useAppSelector(
    (state) => state.configAntiguedades.configAntiguedad
  );
  const config_localidad: ConfigLocalidad = useAppSelector(
    (state) => state.configLocalidades.configLocalidad
  );
  const config_edad: ConfigEdad = useAppSelector(
    (state) => state.configEdades.configEdad
  );

  const [linea_cotization, setLineaCotization] = useState<Linea_Cotizacion[]>(
    []
  );

  const formatDate = (date: Date): string => {
    return (
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getDate().toString().padStart(2, "0") +
      "/" +
      date.getFullYear()
    );
  };

  // UseEffect
  useEffect(() => {
    const NuevaCotization: Cotizacion = {};
    const NuevaLinea_cotization: Linea_Cotizacion[] = [];

    const vehicleLocalStorage = useLocalStorageItem<Vehiculo>("VehicleData");
    if (vehicleLocalStorage !== null) {
      const today = new Date();
      const vencimiento = new Date(today);
      vencimiento.setDate(vencimiento.getDate() + 7);

      NuevaCotization.vehiculo = vehicleLocalStorage;
      NuevaCotization.fechaCreacion = formatDate(today);
      NuevaCotization.fechaVencimiento = formatDate(vencimiento);

      NuevaCotization.configuaracionLocalidad = config_localidad;
      NuevaCotization.configudacionEdad = config_edad;
      NuevaCotization.configuracionAntiguedad = config_antiguedad;

      coverages.forEach((cover) => {
        const linea: Linea_Cotizacion = {
          id: 0, //ID will be assigned by the backend
          cotizacion: NuevaCotization,
          cobertura: cover,
          monto: 0,
        };
        NuevaLinea_cotization.push(linea);

        setLineaCotization(NuevaLinea_cotization);
      });
    }
  }, []);

  /// Handles
  const handleAmount = (LineCoverage: Linea_Cotizacion) => {
    let total = 0;
    let montoVehiculo = 0;
    let multiplicador = 1;
    let acumulador = 0;

    // Obtener el costo del vehículo
    const vehiculo = LineCoverage.cotizacion?.vehiculo;
    montoVehiculo =
      (vehiculo?.gnc
        ? vehiculo.version.precio_mercado_gnc
        : vehiculo?.version.precio_mercado) || 0;

    //Obtener los detalles de cobertura
    const coberturaDetalles = coverage_details.filter(
      (covDetail) =>
        LineCoverage.cobertura?.id_cobertura ===
        covDetail.cobertura.id_cobertura
    );

    // Obtener el monto base a partir de los detalles
    for (const d of coberturaDetalles) {
      if (d?.detalle.porcentaje_miles != undefined) {
        if (d.aplica) {
          total =
            total + (montoVehiculo * d?.detalle?.porcentaje_miles) / 10000;
        }
      }
    }

    // Obtener los multiplicadores
    const uno = 1;
    const cien = 100;

    const descuentoLocalidad =
      LineCoverage.cotizacion?.configuaracionLocalidad?.descuento ?? 0;
    multiplicador *= uno - descuentoLocalidad / cien;

    const descuentoAntiguedad =
      LineCoverage.cotizacion?.configuracionAntiguedad?.descuento ?? 0;
    multiplicador *= uno - descuentoAntiguedad / cien;

    const descuentoEdad =
      LineCoverage.cotizacion?.configudacionEdad?.descuento ?? 0;
    multiplicador *= uno - descuentoEdad / cien;

    const gananciaLocalidad =
      LineCoverage.cotizacion?.configuaracionLocalidad?.ganancia ?? 0;
    const gananciaAntiguedad =
      LineCoverage.cotizacion?.configuracionAntiguedad?.ganancia ?? 0;
    const gananciEdad =
      LineCoverage.cotizacion?.configudacionEdad?.ganancia ?? 0;
    multiplicador *= uno + gananciaLocalidad / cien;
    multiplicador *= uno + gananciaAntiguedad / cien;
    multiplicador *= uno + gananciEdad / cien;

    // Obtener todos los sumadores
    acumulador += LineCoverage.cotizacion?.configudacionEdad?.recargo ?? 0;
    acumulador +=
      LineCoverage.cotizacion?.configuaracionLocalidad?.recargo ?? 0;
    acumulador +=
      LineCoverage.cotizacion?.configuracionAntiguedad?.recargo ?? 0;
    // Calcular el monto final
    const monto = Math.round(total * multiplicador + acumulador);
    console.log("total FINAL: " + total);
    console.log("multiplicador: " + multiplicador);
    console.log("acumulador: " + acumulador);
    LineCoverage.monto = monto;

    return monto;
  };

  const handleAppliedDetails = (id_cobertura?: number) => {
    console.log(details);
    return details.map((detalle) => {
      const found = coverage_details.find(
        (cd) =>
          cd.cobertura.id_cobertura === id_cobertura &&
          cd.detalle.id === detalle.id
      );

      return {
        name: detalle.nombre || "",
        apply: found?.aplica === true, // true si se encontró y aplica, false si no
        description: detalle.descripcion || "",
      };
    });
  };

  const handleHirePolicy = (linea_cotization: Linea_Cotizacion) => {
    if (Auth) {
      const policy: Poliza = {
        numero_poliza: 1,
        lineaContizacion: linea_cotization,
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
        {linea_cotization.map((lineaCot, index) => (
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
                precio={"$ " + handleAmount(lineaCot)}
                itemsApply={handleAppliedDetails(
                  lineaCot.cobertura?.id_cobertura
                )}
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
          <GrayButton style="-2" text="Guardar cotización" />
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-light text-dark"
            style={{
              width: "34px",
              height: "34px",
              lineHeight: 0,
              marginLeft: "8px",
              marginTop: "2px",
            }}
          >
            <ExclamationCircleFill size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDataCoverages;
