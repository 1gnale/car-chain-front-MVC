import { useState } from "react";
import { CotizacionRepository } from "../../../models/repository/Repositorys/cotizacionRepository";
import { VehiculoRepository } from "../../../models/repository/Repositorys/vehiculoRepository";
import { LineaCotizacionRepository } from "../../../models/repository/Repositorys/lineaCotizacionRepository";
import type ICotizacionRepository from "../../../models/repository/Irepositorys/ICotizacionRepository";
import type IVehiculoRepository from "../../../models/repository/Irepositorys/IVehiculoRepository";
import type ILineaCotizacionRepository from "../../../models/repository/Irepositorys/ILineaCotizacionRepository";
import { useAuth0 } from "@auth0/auth0-react";
import useLocalStorageItem from "../LocalStorage/getFromLocalStorageHook";

interface UseCreateCotizacionResult {
  saveCotizacion: (
    cotizacionData: Cotizacion,
    lineasCotizacion?: Linea_Cotizacion[]
  ) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useCreateCotizacion = (): UseCreateCotizacionResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { user, getAccessTokenSilently } = useAuth0();

  // Crear instancias de los repositories
  const cotizacionRepo: ICotizacionRepository = new CotizacionRepository(
    `${import.meta.env.VITE_BASEURL}/api/vehiculoCotizacion`
  );

  const vehiculoRepo: IVehiculoRepository = new VehiculoRepository(
    `${import.meta.env.VITE_BASEURL}/api/vehiculoCotizacion`
  );

  const lineaCotizacionRepo: ILineaCotizacionRepository =
    new LineaCotizacionRepository(
      `${import.meta.env.VITE_BASEURL}/api/vehiculoCotizacion`
    );

  const saveCotizacion = async (
    cotizacionData: Cotizacion,
    lineasCotizacion?: Linea_Cotizacion[]
  ): Promise<any> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Transformar los datos para que coincidan con el formato esperado por el backend
      console.log("Datos de cotización recibidos:", cotizacionData);
      console.log("Vehiculo:", cotizacionData.vehiculo);
      console.log("Config Localidad:", cotizacionData.ConfigLocalidad);
      console.log("Config Edad:", cotizacionData.ConfigEdad);
      console.log("Config Antigüedad:", cotizacionData.configuracionAntiguedad);
      console.log("version:", cotizacionData.vehiculo?.version.id);

      // Obtener datos del localStorage para complementar los IDs faltantes
      const vehicleLocalStorage = useLocalStorageItem<Vehiculo>("VehicleData");
      //("Vehicle from localStorage:", vehicleLocalStorage);

      // PASO 1: Crear el vehículo primero
      const vehiculoData = cotizacionData.vehiculo || vehicleLocalStorage;
      if (!vehiculoData) {
        throw new Error("No se encontraron datos del vehículo para crear");
      }

      // Preparar payload para crear vehículo
      const vehiculoPayload = {
        mail: user?.email,
        matricula: vehiculoData.matricula,
        chasis: vehiculoData.chasis,
        añoFabricacion: vehiculoData.añoFabricacion,
        numeroMotor: vehiculoData.numeroMotor,
        gnc: vehiculoData.gnc,
        version_id: vehiculoData.version.id,
        // cliente_id se puede omitir si el backend lo asigna automáticamente o si no es requerido
        // cliente_id: vehiculoData.cliente?.idClient
      };

      console.log("Creando vehículo:", vehiculoPayload);

      const vehiculoCreado = await vehiculoRepo.createVehicle(vehiculoPayload);
      //("Vehículo creado exitosamente:", vehiculoCreado);

      // PASO 2: Usar el ID del vehículo creado para la cotización
      const vehiculo_id = vehiculoCreado.id;

      // Para configuraciones que no tienen ID, usar valores por defecto temporales
      let configuracionLocalidad_id = cotizacionData.ConfigLocalidad?.id;
      let configuracionEdad_id = cotizacionData.ConfigEdad?.id;
      let configuracionAntiguedad_id =
        cotizacionData.configuracionAntiguedad?.id;
      console.log(configuracionLocalidad_id);
      // Si config_localidad es un array vacío o sin ID, usar un valor por defecto basado en la localidad
      if (!configuracionLocalidad_id) {
        // Usar la localidad del vehículo como ID de configuración
        const vehiculoLocalidadId = vehiculoData?.cliente?.localidad?.id;
        configuracionLocalidad_id = vehiculoLocalidadId || 1; // Fallback a 1
        console.warn(
          "Usando localidad del vehículo como configuración:",
          configuracionLocalidad_id
        );
      }

      // Si no tenemos IDs de configuración, usar valores por defecto
      // (Esto debería ser mejorado para obtener configuraciones reales del backend)
      if (!configuracionEdad_id) {
        configuracionEdad_id = 1; // Usar configuración por defecto
        console.warn(
          "Usando configuración de edad por defecto:",
          configuracionEdad_id
        );
      }

      if (!configuracionAntiguedad_id) {
        configuracionAntiguedad_id = 1; // Usar configuración por defecto
        console.warn(
          "Usando configuración de antigüedad por defecto:",
          configuracionAntiguedad_id
        );
      }

      const cotizacionPayload = {
        fechaCreacion: cotizacionData.fechaCreacion,
        fechaVencimiento: cotizacionData.fechaVencimiento,
        vehiculo_id,
        configuracionLocalidad_id,
        configuracionEdad_id,
        configuracionAntiguedad_id,
      };

      //("Payload generado:", cotizacionPayload);

      // Validar que todos los IDs requeridos estén presentes
      if (!cotizacionPayload.vehiculo_id) {
        console.error(
          "Falta vehiculo_id. Vehículo:",
          cotizacionData.vehiculo,
          "LocalStorage:",
          vehicleLocalStorage
        );
        throw new Error("ID del vehículo es requerido");
      }
      if (!cotizacionPayload.configuracionLocalidad_id) {
        console.error(
          "Falta configuracionLocalidad_id. Config Localidad:",
          cotizacionData.ConfigLocalidad
        );
        throw new Error("ID de configuración de localidad es requerido");
      }
      if (!cotizacionPayload.configuracionEdad_id) {
        console.error(
          "Falta configuracionEdad_id. Config Edad:",
          cotizacionData.ConfigEdad
        );
        throw new Error("ID de configuración de edad es requerido");
      }
      if (!cotizacionPayload.configuracionAntiguedad_id) {
        console.error(
          "Falta configuracionAntiguedad_id. Config Antigüedad:",
          cotizacionData.configuracionAntiguedad
        );
        throw new Error("ID de configuración de antigüedad es requerido");
      }

      //("Enviando cotización:", cotizacionPayload);

      const cotizacionCreada = await cotizacionRepo.createCotizacion(
        cotizacionPayload
      );

      //("Cotización guardada exitosamente:", cotizacionCreada);

      // PASO 3: Crear las líneas de cotización usando el ID de la cotización creada
      if (lineasCotizacion) {
        const cotizacion_id = cotizacionCreada.id;

        if (!cotizacion_id) {
          throw new Error("No se pudo obtener el ID de la cotización creada");
        }

        console.log(
          "Creando líneas de cotización para cotización ID:",
          cotizacion_id
        );

        // Obtener token para autorización
        const token = await getAccessTokenSilently();

        const lineasCreadas = [];
        for (const lineaCotizacion of lineasCotizacion) {
          // Validar que tenemos los datos necesarios
          if (!lineaCotizacion.cobertura?.id) {
            console.warn(
              "Línea de cotización sin cobertura válida, saltando:",
              lineaCotizacion
            );
            continue;
          }

          const lineaPayload = {
            monto: lineaCotizacion.monto || 0,
            cotizacion_id: cotizacion_id,
            cobertura_id: lineaCotizacion.cobertura.id,
          };

          console.log("Creando línea de cotización:", lineaPayload);
          const lineaCreada = await lineaCotizacionRepo.createLineaCotizacion(
            lineaPayload,
            token
          );
          lineasCreadas.push(lineaCreada);
          console.log("Línea de cotización creada:", lineaCreada);
        }
      }

      setSuccess(true);
      setLoading(false);

      // Retornar el vehículo, la cotización y las líneas creadas
      return {
        vehiculo: vehiculoCreado,
        cotizacion: cotizacionCreada,
      };
    } catch (err: any) {
      console.error("Error al guardar la cotización:", err);
      setError(err.message || "Error al guardar la cotización");
      setSuccess(false);
      setLoading(false);
      throw err;
    }
  };

  return {
    saveCotizacion,
    loading,
    error,
    success,
  };
};

export default useCreateCotizacion;
