import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import CoverageCard from "../GeneralComponents/CoverageCard.tsx";
import GrayButton from "../GeneralComponents/Button.tsx";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import useClearLocalStorage from "../../../controllers/controllerHooks/LocalStorage/useClearLocalStorage.ts";
import { useAuth0 } from "@auth0/auth0-react";
import useCreateCotizacionComplete from "../../../controllers/controllerHooks/Mutations/useCreateCotizacionCompleteHook";
import useLocalidadesHookByLocalityId from "../../../controllers/controllerHooks/Fetchs/useConfigLocalidadesByLocalityId.ts";
import useEdadHookByAge from "../../../controllers/controllerHooks/Fetchs/useConfigEdadByAge.ts";
import useConfigAntiguedadHookByAge from "../../../controllers/controllerHooks/Fetchs/useConfigAntiguedadByAge.ts";

const FormDataCoverages = ({
  handleCurrentView,
  Auth,
}: {
  handleCurrentView: (pass: boolean) => void;
  Auth: boolean;
}) => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const { clearAllData } = useClearLocalStorage();
  const { saveCotizacion, loading: savingCotizacion, error: savingError, success: savingSuccess } = useCreateCotizacionComplete();  // Cargar las configuraciones necesarias
  const vehicleData = useLocalStorageItem<Vehiculo>("VehicleData");
  const localidadId = vehicleData?.cliente?.localidad?.id; 
  console.log("=== DEBUG LOCALIDAD ===");
  console.log("vehicleData:", vehicleData);
  console.log("localidadId extraído:", localidadId);
  
  const edad = vehicleData?.cliente?.fechaNacimiento ? Math.floor((new Date().getTime() - new Date(vehicleData.cliente.fechaNacimiento).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : undefined;
  const antiguedad = vehicleData?.añoFabricacion ? new Date().getFullYear() - vehicleData.añoFabricacion : undefined;
  
  console.log("=== DEBUG VALORES CALCULADOS ===");
  console.log("edad calculada:", edad);
  console.log("antiguedad calculada:", antiguedad);
  console.log("fechaNacimiento:", vehicleData?.cliente?.fechaNacimiento);
  console.log("añoFabricacion:", vehicleData?.añoFabricacion);
  
  // Solo llamar a los hooks si tenemos valores válidos
  const { loading: loadingConfigLocalidad } = useLocalidadesHookByLocalityId(localidadId);
  const { loading: loadingConfigEdad } = useEdadHookByAge(edad);
  const { loading: loadingConfigAntiguedad } = useConfigAntiguedadHookByAge(antiguedad);
  // Estados de la DB - obtener arrays de configuraciones desde los slices correspondientes  
  const coverages: Cobertura[] = useAppSelector(
    (state) => state.coberturas.cobertura
  );
  const details: Detalle[] = useAppSelector((state) => state.detalles.detalle);
  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );
  
  // Obtener configuraciones desde Redux (manejar tanto objetos como arrays)
  const config_antiguedad_data = useAppSelector(
    (state) => state.configAntiguedades.configAntiguedad
  );
  const config_localidad_data = useAppSelector(
    (state) => state.configLocalidades.configLocalidad
  );
  const config_edad_data = useAppSelector(
    (state) => state.configEdades.configEdad
  );

  //console.log("=== DEBUG CONFIGURACIONES ===");
  //console.log("config_antiguedad_data:", config_antiguedad_data)
  //console.log("config_localidad_data:", config_localidad_data)
  //console.log("config_edad_data:", config_edad_data)

  const [linea_cotization, setLineaCotization] = useState<Linea_Cotizacion[]>(
    []
  );
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

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
      //("vehicleLocalStorage:", vehicleLocalStorage);
      
      const today = new Date();
      const vencimiento = new Date(today);
      vencimiento.setDate(vencimiento.getDate() + 7);

      NuevaCotization.vehiculo = vehicleLocalStorage;
      NuevaCotization.fechaCreacion = formatDate(today);
      NuevaCotization.fechaVencimiento = formatDate(vencimiento);

      NuevaCotization.ConfigLocalidad = config_localidad_data;
      NuevaCotization.ConfigEdad = config_edad_data;
      NuevaCotization.configuracionAntiguedad = config_antiguedad_data;

      //("NuevaCotization creada:", NuevaCotization);

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
  }, [config_localidad_data, config_antiguedad_data, config_edad_data]); // Ejecutar solo cuando las configuraciones hayan cargado

  // Limpiar intervalos al desmontar el componente
  useEffect(() => {
    return () => {
      // Este cleanup se ejecutará cuando el componente se desmonte
      if (redirectCountdown !== null) {
        setRedirectCountdown(null);
      }
    };
  }, []);


  // Mostrar loading mientras se cargan las configuraciones
  if (loadingConfigLocalidad || loadingConfigEdad || loadingConfigAntiguedad) {
    return <div className="container my-5 text-center">Cargando configuraciones...</div>;
  }
  /// Handles
  const handleAmount = (LineCoverage: Linea_Cotizacion) => {
    let total = 0;
    let montoVehiculo = 0;
    let multiplicador = 1;
    let acumulador = 0;
    //console.log(LineCoverage)
    // Obtener el costo del vehículo
    const vehiculo = LineCoverage.cotizacion?.vehiculo;
    montoVehiculo =
      (vehiculo?.gnc
        ? vehiculo.version.precio_mercado_gnc
        : vehiculo?.version.precio_mercado) || 0;

    //Obtener los detalles de cobertura
    const coberturaDetalles = coverage_details.filter(
      (covDetail) =>
        LineCoverage.cobertura?.id === covDetail.cobertura.id &&
        covDetail.detalle.activo
    );
    //("Cobertura Detalles Filtrados Vehiculo: ", montoVehiculo);
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
      LineCoverage.cotizacion?.ConfigLocalidad?.descuento ?? 0;
    multiplicador *= uno - descuentoLocalidad / cien;

    const descuentoAntiguedad =
      LineCoverage.cotizacion?.configuracionAntiguedad?.descuento ?? 0;
    multiplicador *= uno - descuentoAntiguedad / cien;

    const descuentoEdad =
      LineCoverage.cotizacion?.ConfigEdad?.descuento ?? 0;
    multiplicador *= uno - descuentoEdad / cien;

    const gananciaLocalidad =
      LineCoverage.cotizacion?.ConfigLocalidad?.ganancia ?? 0;
    const gananciaAntiguedad =
      LineCoverage.cotizacion?.configuracionAntiguedad?.ganancia ?? 0;
    const gananciEdad =
      LineCoverage.cotizacion?.ConfigEdad?.ganancia ?? 0;
    multiplicador *= uno + gananciaLocalidad / cien;
    multiplicador *= uno + gananciaAntiguedad / cien;
    multiplicador *= uno + gananciEdad / cien;

    // Obtener todos los sumadores
    acumulador += LineCoverage.cotizacion?.ConfigEdad?.recargo ?? 0;
    acumulador +=
      LineCoverage.cotizacion?.ConfigLocalidad?.recargo ?? 0;
    acumulador +=
      LineCoverage.cotizacion?.configuracionAntiguedad?.recargo ?? 0;
    // Calcular el monto final
    const monto = Math.round(total * multiplicador + acumulador);
    //("total FINAL: " + total);
    //("multiplicador: " + multiplicador);
    //("acumulador: " + acumulador);
    LineCoverage.monto = monto;

    return monto;
  };

  const handleAppliedDetails = (id_cobertura?: number) => {
    return details
      .filter((detalle) => detalle.activo) // 👈 solo deja pasar los activos
      .map((detalle) => {
        const found = coverage_details.find(
          (cd) =>
            cd.cobertura.id === id_cobertura && cd.detalle.id === detalle.id
        );
        //("Found coverage detail:", found);
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
        lineaContizacion: linea_cotization,
      };
      localStorage.setItem("PolicyData", JSON.stringify(policy));
      handleCurrentView(true);
    } else {
      loginWithRedirect();
    }
    return null;
  };

  const handleSaveCotizacion = async () => {
    // Verificar que tenemos datos de cotización para guardar
    if (linea_cotization.length === 0) {
      console.error("No hay cotizaciones para guardar");
      return;
    }

    try {
      // Tomar la primera cotización (asumiendo que todas comparten la misma cotización base)
      const cotizacionToSave = linea_cotization[0]?.cotizacion;
      
      if (!cotizacionToSave) {
        console.error("No se encontró una cotización válida para guardar");
        return;
      }

      // Verificar que la cotización tenga todas las configuraciones necesarias
      if (!cotizacionToSave.ConfigLocalidad?.id) {
        console.error("La cotización no tiene configuración de localidad válida");
        return;
      }

      // Asegurar que todas las líneas tengan montos calculados
      const lineasConMontos = linea_cotization.map(linea => ({
        ...linea,
        monto: handleAmount(linea) // Recalcular el monto para asegurar que esté actualizado
      }));

      console.log("Guardando vehículo, cotización, líneas de cotización, documentación y póliza...");
      console.log("Líneas a guardar:", lineasConMontos);
      
      const result = await saveCotizacion(cotizacionToSave, lineasConMontos);
      console.log("Vehículo, cotización, líneas, documentación y póliza guardados exitosamente:", result);
      
      // Limpiar localStorage después del guardado exitoso
      console.log("Limpiando localStorage...");
      clearAllData();
      
      // Iniciar cuenta regresiva
      setRedirectCountdown(3);
      
      // Cuenta regresiva e intervalos
      const countdownInterval = setInterval(() => {
        setRedirectCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval);
            navigate("/");
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
      // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
    }
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
        {linea_cotization.map((lineaCot, index) =>
          lineaCot.cobertura?.activo ? (
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
                  itemsApply={handleAppliedDetails(lineaCot.cobertura?.id)}
                  onContratar={() => {
                    handleHirePolicy(lineaCot);
                  }}
                />
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Botón inferior */}
      <div className="row">
        <div className="col d-flex justify-content-center mt-4">
          <GrayButton 
            style="-2" 
            text={
              redirectCountdown 
                ? `Redirigiendo en ${redirectCountdown}...` 
                : savingCotizacion 
                ? "Guardando vehículo, cotización, líneas, documentación y póliza..." 
                : "Guardar cotización"
            } 
            onClick={handleSaveCotizacion}
            disabled={savingCotizacion || redirectCountdown !== null}
          />
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
        
        {/* Mostrar mensajes de estado */}
        {savingError && (
          <div className="col-12 d-flex justify-content-center mt-2">
            <div className="alert alert-danger" role="alert">
              Error al guardar la cotización: {savingError}
            </div>
          </div>
        )}
        
        {savingSuccess && !redirectCountdown && (
          <div className="col-12 d-flex justify-content-center mt-2">
            <div className="alert alert-success" role="alert">
              ¡Cotización guardada exitosamente!
            </div>
          </div>
        )}

        {redirectCountdown && (
          <div className="col-12 d-flex justify-content-center mt-2">
            <div className="alert alert-success" role="alert">
              <strong>¡Cotización guardada exitosamente!</strong>
              <br />
              Serás redirigido al inicio en {redirectCountdown} segundo{redirectCountdown !== 1 ? 's' : ''}...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDataCoverages;
