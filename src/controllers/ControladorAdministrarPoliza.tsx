import { useParams } from "react-router-dom";
import useGetPricing from "./controllerHooks/Fetchs/useGetPricingHook";
import { useAuth0 } from "@auth0/auth0-react";
import useCoberturasDetalleHook from "./controllerHooks/Fetchs/useCoberturaDetalleHook";
import useDetallesHook from "./controllerHooks/Fetchs/useDetallesHook";
import ManagrePolicyData from "../views/pages/ManagePolicyData";

const ControladorAdministrarPoliza = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const convertirBufferAFile = (name: string, fotoFrontal: any): File => {
    const uint8Array = new Uint8Array(fotoFrontal.data);
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    return new File([blob], name, { type: "image/jpeg" });
  };
  // Crear un hook parecido a este xd
  //const { loading, error, pricing } = useGetPricing(String(id));
  const policy: Poliza = {
    numero_poliza: 1,
    precioPolizaActual: 15000,
    montoAsegurado: 3500000,
    fechaContratacion: "2024-01-31",
    horaContratacion: "10:30:00",
    fechaVencimiento: "2025-01-31",
    fechaCancelacion: undefined,
    renovacionAutomatica: true,
    estadoPoliza: "APROBADO",
    usuario: {
      legajo: 1,
      id: 1,
      nombres: "Juan Carlos",
      apellido: "García López",
      fechaNacimiento: "1985-03-14",
      tipoDocumento: "DNI",
      documento: "20123456789",
      domicilio: "Av. Corrientes 1234",
      correo: "juan.garcia@email.com",
      telefono: "11-4555-1234",
      sexo: "Masculino",
    },
    documentacion: {
      id: 1,
      fotoFrontal: convertirBufferAFile(
        "foto_frontal.jpg",
        [
          102, 97, 107, 101, 45, 112, 104, 111, 116, 111, 45, 102, 114, 111,
          110, 116, 97, 108, 45, 49,
        ]
      ),

      fotoTrasera: convertirBufferAFile(
        "foto_trasera.jpg",
        [
          102, 97, 107, 101, 45, 112, 104, 111, 116, 111, 45, 116, 114, 97, 115,
          101, 114, 97, 45, 49,
        ]
      ),
      fotoLateral1: convertirBufferAFile(
        "foto_lateral1.jpg",
        [
          102, 97, 107, 101, 45, 112, 104, 111, 116, 111, 45, 108, 97, 116, 101,
          114, 97, 108, 49, 45, 49,
        ]
      ),
      fotoLateral2: convertirBufferAFile(
        "foto_lateral2.jpg",
        [
          102, 97, 107, 101, 45, 112, 104, 111, 116, 111, 45, 108, 97, 116, 101,
          114, 97, 108, 50, 45, 49,
        ]
      ),
      fotoTecho: convertirBufferAFile(
        "foto_techo.jpg",
        [
          102, 97, 107, 101, 45, 112, 104, 111, 116, 111, 45, 116, 101, 99, 104,
          111, 45, 49,
        ]
      ),
      cedulaVerde: convertirBufferAFile(
        "cedulaVerde.jpg",
        [
          102, 97, 107, 101, 45, 99, 101, 100, 117, 108, 97, 45, 118, 101, 114,
          100, 101, 45, 49,
        ]
      ),
    },
    periodoPago: {
      id: 1,
      nombre: "Contado",
      cantidadMeses: 1,
      descuento: 0,
      activo: true,
    },
    tipoContratacion: {
      id: 1,
      nombre: "Anual",
      cantidadMeses: 12,
      activo: true,
    },
    lineaContizacion: {
      id: 1,
      monto: 15000,
      cotizacion: {
        id: 1,
        fechaCreacion: "2024-01-14",
        fechaVencimiento: "2024-02-14",
        vehiculo: {
          id: 1,
          chasis: "9BWZZZ377VT004251",
          matricula: "ABC123",
          añoFabricacion: 2020,
          numeroMotor: "2TR001234",
          gnc: false,
          version: {
            id: 1,
            nombre: "XLI",
            descripcion: "XLI 1.8 MT",
            precio_mercado: 3500000,
            precio_mercado_gnc: 3700000,
            modelo: {
              id: 1,
              nombre: "Corolla",
              descripcion: "Sedán compacto",
              marca: {
                id: 1,
                nombre: "Toyota",
                descripcion: "Toyota Motor Corporation",
              },
            },
          },
          cliente: {
            idClient: 1,
            id: 1,
            nombres: "Juan Carlos",
            apellido: "García López",
            fechaNacimiento: "1985-03-14",
            tipoDocumento: "DNI",
            documento: "20123456789",
            domicilio: "Av. Corrientes 1234",
            correo: "juan.garcia@email.com",
            telefono: "11-4555-1234",
            sexo: "Masculino",
            localidad: {
              id: 1,
              descripcion: "La Plata",
              codigoPostal: "1900",
              provincia: {
                id: 1,
                descripcion: "Buenos Aires",
              },
            },
          },
        },
      },
      cobertura: {
        id: 1,
        nombre: "Responsabilidad Civil",
        descripcion: "Cobertura por daños a terceros",
        recargoPorAtraso: 0,
      },
    },
  };

  const { id } = useParams<{ id: string }>();
  const { loading, error, pricing } = useGetPricing(String(id));
  const { loading: LoadingLine, error: ErrorLine } = useDetallesHook();
  const { loading: LoadingCD, error: ErrorCD } = useCoberturasDetalleHook();
  if (isLoading || loading || LoadingLine || LoadingCD) {
    return <div>Loading...</div>;
  }

  if (error || ErrorLine || ErrorCD) {
    return <div>Error loading pricing information.</div>;
  }
  if (!pricing) {
    return <div>No pricing data found.</div>;
  }
  return <ManagrePolicyData policy={policy} isAuth={isAuthenticated} />;
};

export default ControladorAdministrarPoliza;
