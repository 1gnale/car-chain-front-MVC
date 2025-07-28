import { useAppSelector } from "../../redux/reduxTypedHooks";
import CoverageCard from "./GeneralComponents/CoverageCard.tsx";
import "../../models/types.d.ts";
import GrayButton from "./GeneralComponents/Button";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";

const FormDataCoverages = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  // States de la DB
  const coverages: Cobertura[] = useAppSelector(
    (state) => state.coberturas.cobertura
  );
  const details: Detalle[] = useAppSelector((state) => state.detalles.detalle);

  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );

  const config_antiguedad: ConfigAntiguedad = {
    id: 1,
    nombre: "Cuando el Auto es nuevo",
    minima: 0,
    maxima: 3,
    descuento: 10.0,
    ganancia: 0.0,
    recargo: 0.0,
    activo: true,
  };

  const config_localidad: ConfigLocalidad = {
    id: 3,
    nombre: "Bahía Blanca",
    descuento: 2.0,
    ganancia: 8.0,
    recargo: 1.5,
    activo: true,
    localidad: {
      id: 3,
      descripcion: "Bahía Blanca",
      codigoPostal: "8000",
    },
  };

  const config_edad: ConfigEdad = {
    id: 1,
    nombre: "Adultos",
    minima: 25,
    maxima: 50,
    descuento: 5.0,
    ganancia: 10.0,
    recargo: 0.0,
    activo: true,
  };

  // States del modelo creados aqui
  // //CREO Q DEBERIA BORRAR EL COTIZACION NO SIRVE XD
  const [cotization, setCotization] = useState<Cotizacion>({});
  const [linea_cotization, setLineaCotization] = useState<Linea_Cotizacion[]>(
    []
  );

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
      NuevaCotization.fechaCreacion = today;
      NuevaCotization.fechaVencimiento = vencimiento;

      NuevaCotization.configuaracionLocalidad = config_localidad;
      NuevaCotization.configudacionEdad = config_edad;
      NuevaCotization.configuracionAntiguedad = config_antiguedad;

      coverages.forEach((cover) => {
        const linea: Linea_Cotizacion = {
          cotizacion: NuevaCotization,
          cobertura: cover,
          monto: 0,
        };
        NuevaLinea_cotization.push(linea);

        setCotization(NuevaCotization);
        setLineaCotization(NuevaLinea_cotization);
      });
    }
    console.log("...........");
    console.log(NuevaLinea_cotization);
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

    console.log("Monto vehiculo");
    console.log(montoVehiculo);
    // Obtener el monto base a partir de los detalles
    for (const d of coberturaDetalles) {
      if (d?.detalle.porcentaje_miles != undefined) {
        if (d.aplica) {
          if (d?.detalle?.monto_fijo != 0) {
            total += d?.detalle?.monto_fijo ?? 0;
          } else {
            total += (montoVehiculo * d?.detalle?.porcentaje_miles) / 10000;
          }
        }
      }
    }
    console.log(LineCoverage.cobertura?.nombre);
    console.log(total);
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
    console.log("Multiplicador1: " + multiplicador);
    const gananciaLocalidad =
      LineCoverage.cotizacion?.configuaracionLocalidad?.ganancia ?? 0;
    const gananciaAntiguedad =
      LineCoverage.cotizacion?.configuracionAntiguedad?.ganancia ?? 0;
    const gananciEdad =
      LineCoverage.cotizacion?.configudacionEdad?.ganancia ?? 0;
    multiplicador *= uno + gananciaLocalidad / cien;
    multiplicador *= uno + gananciaAntiguedad / cien;
    multiplicador *= uno + gananciEdad / cien;
    console.log("Multiplicador2: " + multiplicador);

    // Obtener todos los sumadores
    acumulador += LineCoverage.cotizacion?.configudacionEdad?.recargo ?? 0;
    acumulador +=
      LineCoverage.cotizacion?.configuaracionLocalidad?.recargo ?? 0;
    acumulador +=
      LineCoverage.cotizacion?.configuracionAntiguedad?.recargo ?? 0;
    console.log("Acumulador: " + LineCoverage);
    // Calcular el monto final
    const monto = Math.round(total * multiplicador + acumulador);

    LineCoverage.monto = monto;

    return monto;
  };

  const handleAppliedDetails = (id_cobertura?: number) => {
    console.log("IDSSS: " + id_cobertura);
    const result = coverage_details
      .map((covDetail) => {
        if (id_cobertura == covDetail.cobertura.id_cobertura) {
          return {
            name: covDetail.detalle.nombre || "",
            apply: covDetail.aplica || false,
            description: covDetail.detalle.descripcion || "",
          };
        } else {
          return {};
        }
      })
      .filter((item) => Object.keys(item).length > 0);
    return result;
  };

  const handleHirePolicy = () => {
    //const policy: Poliza()= {}

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
                  console.log(lineaCot);
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
