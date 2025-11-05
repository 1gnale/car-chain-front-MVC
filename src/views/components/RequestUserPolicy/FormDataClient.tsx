import { useState, useEffect, useMemo } from "react";
import useFormClientValidation from "../../../controllers/controllerHooks/Validations/useFormClientValidation.ts";
import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import { ClienteRepository } from "../../../models/repository/Repositorys/clienteRepository.ts";
import { useNavigate } from "react-router-dom";
import DarkTitleForm from "../GeneralComponents/DarkTitleForm";
import DarkInput from "../GeneralComponents/DarkInput";
import DarkSelectForm from "../GeneralComponents/DarkSelect";
import DarkButton from "../GeneralComponents/DarkButton";

const FormDataClient = ({
  handleCurrentView,
  userMail,
}: {
  handleCurrentView: (pass: boolean, hardValue?: number) => void;
  userMail: string | null;
}) => {
  // Navigate para volver a home en caso de cancel
  const navigate = useNavigate();

  // Vehiculo en el local storage
  const documentTypes: string[] = useAppSelector(
    (state) => state.tipoDocumentos.tipoDocumento
  );

  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );

  // Validaciones
  const { errors, validateField, validateForm } = useFormClientValidation();

  // Lista de sexos para el select
  const listSex: GenericList[] = useAppSelector(
    (state) => state.sexo.sexosList
  );

  // Funcion: si el cliente esta autenticado se saltea esta vista
  const clientAuth = async () => {
    const clienteRepository = new ClienteRepository(
      `${
        import.meta.env.VITE_BASEURL
      }/api/clientes/get-cliente-by-email/${userMail}`
    );
    try {
      const client = await clienteRepository.getClientByMail();
      const vehicleLocalStorage = useLocalStorageItem<Vehiculo>("VehicleData");
      if (vehicleLocalStorage != null) {
        vehicleLocalStorage.cliente = client || undefined;
        localStorage.setItem("ClientData", JSON.stringify(client));
        localStorage.setItem(
          "VehicleData",
          JSON.stringify(vehicleLocalStorage)
        );
      }
      handleCurrentView(false, 2);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
    }
  };

  // State para los selects
  const [locality, setLocality] = useState<boolean>(false);
  const [selectedSex, setSelectedSex] = useState(0);
  const [selectedProvince, setSelectedProvinces] = useState(0);
  const [selectedLocality, setSelectedLocality] = useState(0);
  const [selectedDocumentType, setSelectedDocumentType] = useState(0);

  // formulario
  const [formClient, setFormClient] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    fechaNacimiento: "",
    telefono: "",
    sexo: "",
    provincia: "",
    localidad: "",
    domicilio: "",
  });

  // Vehiculo y cliente en el local storage
  const vehicleLocalStorage = useLocalStorageItem<Vehiculo>("VehicleData"); // Move hook call to top level
  const clientStorage = useLocalStorageItem<Cliente>("ClientData"); // Move hook call to top level

  // Useeffect para carga el formulario con el local storage
  useEffect(() => {
    if (userMail != null) {
      clientAuth();
    }
    const sexoFiltrado = listSex.find(
      (sex) => sex.name === clientStorage?.sexo
    );
    const tipoDocFiltrado: number | undefined = documentTypes.findIndex(
      (doc) => doc === clientStorage?.tipoDocumento
    );
    if (
      clientStorage != null &&
      sexoFiltrado !== undefined &&
      tipoDocFiltrado !== undefined
    ) {
      setLocality(true);
      setSelectedProvinces(clientStorage.localidad?.provincia?.id || 0);
      setSelectedLocality(clientStorage.localidad?.id || 0);
      setSelectedSex(sexoFiltrado.id);
      setSelectedDocumentType(tipoDocFiltrado + 1);
      setFormClient(parseFormClient(clientStorage));
    }
    console.log("clientStorage");
    console.log(clientStorage);
  }, [userMail]);

  // Parse para adaptar al cliente en local storage al formulario
  function parseFormClient(client: Cliente): any {
    return {
      nombre: client.nombres || "",
      apellido: client.apellido || "",
      tipoDocumento: client.tipoDocumento || "",
      documento: client.documento || "",
      fechaNacimiento: client.fechaNacimiento || "",
      telefono: client.telefono || "",
      sexo: client.sexo || "",
      provincia: client.localidad?.provincia?.descripcion || "",
      localidad: client.localidad?.descripcion || "",
      domicilio: client.domicilio || "",
    };
  }

  // Handles para cargar los selects
  const handleDocumentType = useMemo(() => {
    const result = documentTypes.map((documentType, idx) => {
      return { id: idx + 1, name: documentType };
    });
    return result;
  }, [documentTypes]);

  const handleProvinces = useMemo(() => {
    const result = provinces.map((province) => {
      return { id: province.id, name: province.descripcion! };
    });
    return result;
  }, [provinces]);

  const handleLocality = useMemo(() => {
    const localitysFiltred = localities.filter(
      (locality) => locality.provincia?.id === selectedProvince
    );

    const result = localitysFiltred.map((locality) => ({
      id: locality.id,
      name: locality.descripcion ?? "",
    }));
    return result;
  }, [localities, selectedProvince]);

  // Handle states para cargar los selects y el formulario
  const handleStateDocumentType = (id: number) => {
    setSelectedDocumentType(id);
    const selectedDocumentType = documentTypes[id - 1] || "";
    setFormClient((prev) => ({ ...prev, tipoDocumento: selectedDocumentType }));
    validateField("tipoDocumento", selectedDocumentType);
  };

  const handleStateSexo = (id: number) => {
    setSelectedSex(id);
    const selectedSexName = listSex.find((sex) => sex.id === id)?.name || "";
    setFormClient((prev) => ({ ...prev, sexo: selectedSexName }));
    setFormClient((prev) => ({ ...prev, sexoId: id }));
    validateField("sexo", selectedSexName);
  };

  const handleStateProvinces = (id: number) => {
    setSelectedProvinces(id);
    setLocality(true);
    setSelectedLocality(0);

    const selectedProvinceName =
      provinces.find((province) => province.id === id)?.descripcion || "";
    setFormClient((prev) => ({ ...prev, provincia: selectedProvinceName }));
    setFormClient((prev) => ({ ...prev, provinciaId: id }));
    validateField("provincia", selectedProvinceName);
  };

  const handleStateLocality = (id: number) => {
    setSelectedLocality(id);

    const selectedLocalityName =
      localities?.find((localidad) => localidad.id === id)?.descripcion || "";
    setFormClient((prev) => ({ ...prev, localidad: selectedLocalityName }));
    validateField("localidad", selectedLocalityName);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormClient((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // BOTONES (volver, cancelar, siguiente)
  const handleSubmit = () => {
    if (validateForm(formClient)) {
      try {
        const localidadFiltrada: Localidad | undefined = localities.find(
          (locality) => locality.id === selectedLocality
        );
        if (localidadFiltrada != undefined) {
          const client: Cliente = {
            idClient: 1,
            id: 1,
            nombres: formClient.nombre,
            apellido: formClient.apellido,
            fechaNacimiento: formClient.fechaNacimiento,
            tipoDocumento: formClient.tipoDocumento,
            documento: formClient.documento,
            domicilio: formClient.domicilio,
            correo: "",
            telefono: formClient.telefono,
            sexo: formClient.sexo,
            contraseña: "",
            localidad: localidadFiltrada,
          };

          if (vehicleLocalStorage != null) {
            vehicleLocalStorage.cliente = client;
            localStorage.setItem("ClientData", JSON.stringify(client));
            localStorage.setItem(
              "VehicleData",
              JSON.stringify(vehicleLocalStorage)
            );
          }
        }
      } catch (error) {
        console.log("ERROR");
      }
      handleCurrentView(true);
    } else {
      console.log("Formulario inválido:", errors);
    }
  };

  const handleCancel = () => {
    if (window.confirm("¿Estás seguro de que querés cancelar la solicitud?")) {
      Object.keys(localStorage).forEach((key) => {
        if (!key.startsWith("@@auth0") && !key.includes("auth0")) {
          localStorage.removeItem(key);
        }
      });
      navigate(`/`);
    }
  };

  const handleBack = () => {
    handleCurrentView(false);
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            backgroundColor: "#374151",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "2rem",
          }}
        >
          <DarkTitleForm title="Información Del Cliente" />

          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <DarkInput
                title="Nombre"
                place="Ingrese su nombre"
                value={formClient.nombre}
                onChange={(value) => handleInputChange("nombre", value)}
                error={errors.nombre}
                onBlur={() => validateField("nombre", formClient.nombre)}
              />
              <DarkInput
                title="Teléfono"
                place="Ingrese su teléfono"
                value={formClient.telefono}
                onChange={(value) => handleInputChange("telefono", value)}
                error={errors.telefono}
                onBlur={() => validateField("telefono", formClient.telefono)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <DarkInput
                title="Apellido"
                place="Ingrese su apellido"
                value={formClient.apellido}
                onChange={(value) => handleInputChange("apellido", value)}
                error={errors.apellido}
                onBlur={() => validateField("apellido", formClient.apellido)}
              />
              <DarkSelectForm
                status={true}
                value={selectedSex}
                title="Sexo"
                items={listSex}
                onChange={handleStateSexo}
                error={errors.sexo}
                onBlur={() => validateField("sexo", formClient.sexo)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <DarkSelectForm
                status={true}
                value={selectedDocumentType}
                title="Tipo Documento"
                items={handleDocumentType}
                onChange={handleStateDocumentType}
                error={errors.tipoDocumento}
                onBlur={() =>
                  validateField("tipoDocumento", formClient.tipoDocumento)
                }
              />
              <DarkSelectForm
                status={true}
                value={selectedProvince}
                title="Provincia"
                items={handleProvinces}
                onChange={handleStateProvinces}
                error={errors.provincia}
                onBlur={() => validateField("provincia", formClient.provincia)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <DarkInput
                title="Documento"
                place="Ingrese su documento"
                value={formClient.documento}
                onChange={(value) => handleInputChange("documento", value)}
                error={errors.documento}
                onBlur={() => validateField("documento", formClient.documento)}
              />
              <DarkSelectForm
                status={locality}
                value={selectedLocality}
                title="Localidad"
                items={handleLocality}
                onChange={handleStateLocality}
                error={errors.localidad}
                onBlur={() => validateField("localidad", formClient.localidad)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <DarkInput
                title="Fecha de nacimiento"
                place=""
                type="date"
                value={formClient.fechaNacimiento}
                onChange={(value) =>
                  handleInputChange("fechaNacimiento", value)
                }
                onBlur={() =>
                  validateField("fechaNacimiento", formClient.fechaNacimiento)
                }
                error={errors.fechaNacimiento}
              />
              <DarkInput
                title="Domicilio"
                place="Ingrese su domicilio"
                value={formClient.domicilio}
                onChange={(value) => handleInputChange("domicilio", value)}
                error={errors.domicilio}
                onBlur={() => validateField("domicilio", formClient.domicilio)}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "2rem",
                paddingTop: "1rem",
                borderTop: "1px solid #4b5563",
              }}
            >
              <DarkButton
                text="Cancelar"
                onClick={handleCancel}
                variant="secondary"
              />
              <DarkButton
                text="Anterior"
                onClick={handleBack}
                variant="secondary"
              />
              <DarkButton
                text="Siguiente"
                onClick={handleSubmit}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDataClient;
