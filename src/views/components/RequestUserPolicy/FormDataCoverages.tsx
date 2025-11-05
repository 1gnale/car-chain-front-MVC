import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import CoverageCard from "../GeneralComponents/CoverageCard";
import GrayButton from "../GeneralComponents/Button";
import { ExclamationCircle } from "react-bootstrap-icons";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import useClearLocalStorage from "../../../controllers/controllerHooks/LocalStorage/useClearLocalStorage.ts";
import { useAuth0 } from "@auth0/auth0-react";
import useCreateCotizacionComplete from "../../../controllers/controllerHooks/Mutations/useCreateCotizacionComplete.ts";
import useLocalidadesHookByLocalityId from "../../../controllers/controllerHooks/Fetchs/useConfigLocalidadesByLocalityId.ts";
import useEdadHookByAge from "../../../controllers/controllerHooks/Fetchs/useConfigEdadByAge.ts";
import useConfigAntiguedadHookByAge from "../../../controllers/controllerHooks/Fetchs/useConfigAntiguedadByAge.ts";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Spinner from "../GeneralComponents/SpinnerLoader";
import Modal from "../GeneralComponents/Modal";

const FormDataCoverages = ({
  handleCurrentView,
  Auth,
}: {
  handleCurrentView: (pass: boolean) => void;
  Auth: boolean;
}) => {
  // Navigate para volver a home en caso de guardar la cotizacion
  const navigate = useNavigate();

  // funcion para redirigir en caso de no estar logueado
  const { loginWithRedirect } = useAuth0();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();
  const [oncloseAction, setOncloseAction] = useState<string>("close");

  // Funcion que limpia todo el local storage
  const { clearAllData } = useClearLocalStorage();

  // Funcion para guardar cotizacion y sus lineas
  const {
    saveCotizacion,
    loading: savingCotizacion,
    error: savingError,
    success: savingSuccess,
  } = useCreateCotizacionComplete(); // Cargar las configuraciones necesarias

  // Vehiculo en el local storage
  const vehicleData = useLocalStorageItem<Vehiculo>("VehicleData");
  const localidadId = vehicleData?.cliente?.localidad?.id;

  // Calcular edad en base a la fecha de nacimiento
  const edad = vehicleData?.cliente?.fechaNacimiento
    ? Math.floor(
        (new Date().getTime() -
          new Date(vehicleData.cliente.fechaNacimiento).getTime()) /
          (1000 * 60 * 60 * 24 * 365.25)
      )
    : undefined;

  // Calcular antiguedad en base al año de fabricacion
  const antiguedad = vehicleData?.añoFabricacion
    ? new Date().getFullYear() - vehicleData.añoFabricacion
    : undefined;

  // Solo llamar a los hooks si tenemos valores válidos
  const { loading: loadingConfigLocalidad, configLocalidad } =
    useLocalidadesHookByLocalityId(localidadId);
  const { loading: loadingConfigEdad, configEdad } = useEdadHookByAge(edad);
  const { loading: loadingConfigAntiguedad, configAntiguedad } =
    useConfigAntiguedadHookByAge(antiguedad);

  // Cosneguir los datos del redux para calcular los montos
  const coverages: Cobertura[] = useAppSelector(
    (state) => state.coberturas.cobertura
  );
  const details: Detalle[] = useAppSelector((state) => state.detalles.detalle);
  const coverage_details: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );
  // Filtramos las coberturas a solo las activas
  const activeCoverages = coverages.filter(
    (cobertura) => cobertura.activo === true
  );

  // Array con las lineas de cotitazaciones
  const [linea_cotization, setLineaCotization] = useState<Linea_Cotizacion[]>(
    []
  );

  // Contador antes de redireccionar
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(
    null
  );

  /// FUNCIONES AUXILIARES PARA LAS LINEAS DE COBERTURA
  // Cambia el formato de la fecha a uno manejable
  const formatDate = (date: Date): string => {
    return (
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getDate().toString().padStart(2, "0") +
      "/" +
      date.getFullYear()
    );
  };

  // Handle del monto
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

    const descuentoEdad = LineCoverage.cotizacion?.ConfigEdad?.descuento ?? 0;
    multiplicador *= uno - descuentoEdad / cien;

    const gananciaLocalidad =
      LineCoverage.cotizacion?.ConfigLocalidad?.ganancia ?? 0;
    const gananciaAntiguedad =
      LineCoverage.cotizacion?.configuracionAntiguedad?.ganancia ?? 0;
    const gananciEdad = LineCoverage.cotizacion?.ConfigEdad?.ganancia ?? 0;
    multiplicador *= uno + gananciaLocalidad / cien;
    multiplicador *= uno + gananciaAntiguedad / cien;
    multiplicador *= uno + gananciEdad / cien;

    // Obtener todos los sumadores
    acumulador += LineCoverage.cotizacion?.ConfigEdad?.recargo ?? 0;
    acumulador += LineCoverage.cotizacion?.ConfigLocalidad?.recargo ?? 0;
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

  // UseEffect que calcula las lineas de cotizaciones
  useEffect(() => {
    // Creamos una cotizacion y sus lineas de cotizaciones vacias
    const NuevaCotization: Cotizacion = { activo: true }; // La id es temporal
    const NuevaLinea_cotization: Linea_Cotizacion[] = [];

    // sacamos el vehiculo del local storage
    const vehicleLocalStorage = useLocalStorageItem<Vehiculo>("VehicleData");
    if (vehicleLocalStorage !== null) {
      //("vehicleLocalStorage:", vehicleLocalStorage);

      // Sacamos las fechas de hoy y calculamos la fecha de vencimiento de la cotizacion
      const today = new Date();
      const vencimiento = new Date(today);
      vencimiento.setDate(vencimiento.getDate() + 7);

      // asignamos el vehiculo y las fechas a la cotizacion
      NuevaCotization.vehiculo = vehicleLocalStorage;
      NuevaCotization.fechaCreacion = formatDate(today);
      NuevaCotization.fechaVencimiento = formatDate(vencimiento);

      // Asignamos las configuraciones calculadas
      NuevaCotization.ConfigLocalidad = configLocalidad;
      NuevaCotization.ConfigEdad = configEdad;
      NuevaCotization.configuracionAntiguedad = configAntiguedad;

      // Por cada cobertura activa en la db creamos una linea de cotizacion
      activeCoverages.forEach((cover) => {
        const linea: Linea_Cotizacion = {
          id: 0, //La id es temporal
          cotizacion: NuevaCotization,
          cobertura: cover,
          monto: 0, // Luego se calculara
        };
        // Calculamos el monto de la linea
        linea.monto = handleAmount(linea);

        // La agregamos al array
        NuevaLinea_cotization.push(linea);
      });
      setLineaCotization(NuevaLinea_cotization);
    }
  }, [configAntiguedad, configEdad, configLocalidad]); // Ejecutar solo cuando las configuraciones hayan cargado

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
    return <Spinner title="Calculando coberturas..." text="Por favor espere" />;
  }

  /// Handles
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

  // BOTONES (CONTRATAR Y GUARDAR)
  const handleHirePolicy = (linea_cotization: Linea_Cotizacion) => {
    if (Auth) {
      const policy: Poliza = {
        numero_poliza: 1,
        lineaCotizacion: linea_cotization,
      };
      localStorage.setItem("PolicyData", JSON.stringify(policy));
      handleCurrentView(true);
    } else {
      setTitleModalMessage("ERROR");
      setShowError(true);
      setModalMessage(
        "Debe registrarse en el sistema para guardar la cotizacion"
      );
      setMessageType("error");
      setOncloseAction("auth");
      return;
    }
    return;
  };

  const handleSaveCotizacion = async () => {
    // Verificar que tenemos datos de cotización para guardar
    if (!Auth) {
      setTitleModalMessage("ERROR");
      setShowError(true);
      setModalMessage(
        "Debe registrarse en el sistema para guardar la cotizacion"
      );
      setMessageType("error");
      setOncloseAction("auth");
      return;
    }
    if (linea_cotization.length === 0) {
      setTitleModalMessage("ERROR");
      setShowError(true);
      setModalMessage(
        "Sucedio un error inesperado, por favor intentelo nuevamente mas tarde"
      );
      setMessageType("error");
      setOncloseAction("close");
      return;
    }

    try {
      // Tomar la primera cotización (asumiendo que todas comparten la misma cotización base)
      const cotizacionToSave = linea_cotization[0]?.cotizacion;
      if (!cotizacionToSave) {
        setTitleModalMessage("ERROR");
        setShowError(true);
        setModalMessage(
          "Sucedio un error inesperado, por favor intentelo nuevamente mas tarde"
        );
        setMessageType("error");
        setOncloseAction("close");
        console.error("No se encontró una cotización válida para guardar");
        return;
      }

      // Verificar que la cotización tenga todas las configuraciones necesarias
      if (!cotizacionToSave.ConfigLocalidad?.id) {
        setTitleModalMessage("ERROR");
        setShowError(true);
        setModalMessage(
          "Sucedio un error inesperado, por favor intentelo nuevamente mas tarde"
        );
        setMessageType("error");
        setOncloseAction("close");
        console.error(
          "La cotización no tiene configuración de localidad válida"
        );
        return;
      }

      // Asegurar que todas las líneas tengan montos calculados
      const lineasConMontos = linea_cotization.map((linea) => ({
        ...linea,
        monto: handleAmount(linea), // Recalcular el monto para asegurar que esté actualizado
      }));

      console.log("Guardando vehículo, cotización y líneas de cotización...");
      console.log("Líneas a guardar:", lineasConMontos);

      const result = await saveCotizacion(cotizacionToSave, lineasConMontos);
      console.log(
        "Vehículo, cotización y líneas guardados exitosamente:",
        result
      );

      // Limpiar localStorage después del guardado exitoso
      console.log("Limpiando localStorage...");
      clearAllData();

      // Iniciar cuenta regresiva
      setRedirectCountdown(3);

      // Cuenta regresiva e intervalos
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval);
            navigate("/");
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setTitleModalMessage("ERROR");
      setShowError(true);
      setModalMessage(
        "Error al guardar la cotización:" + error || "Error desconocido"
      );
      setMessageType("error");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        minHeight: "100vh",
        padding: "2rem 0",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="text-center my-4 text-white">
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
                  precio={"$ " + lineaCot.monto}
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
                ? "Guardando vehículo, cotización y líneas..."
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
            <OverlayTrigger
              placement="top" // posición: top, right, bottom, left
              overlay={
                <Tooltip id="tooltip-icono">
                  Para guardar una cotización debes estar registrado. Una vez
                  guardada, podrás contratar la póliza durante una semana; luego
                  vencerá.
                </Tooltip>
              }
            >
              <span style={{ cursor: "pointer" }}>
                <ExclamationCircle size={22} color="#404445ff" />{" "}
              </span>
            </OverlayTrigger>
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
              Serás redirigido al inicio en {redirectCountdown} segundo
              {redirectCountdown !== 1 ? "s" : ""}...
            </div>
          </div>
        )}
      </div>
      <Modal
        show={showError}
        onClose={() => {
          if (oncloseAction === "auth") {
            setShowError(false);
            loginWithRedirect();
          }
          if (oncloseAction === "close") {
            setShowError(false);
          }
        }}
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
};

export default FormDataCoverages;
