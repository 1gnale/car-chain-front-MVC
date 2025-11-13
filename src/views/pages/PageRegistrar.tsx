import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import Input from "../components/GeneralComponents/Input";
import SelectForm from "../components/GeneralComponents/SelectForm";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormClientValidation";
import getFromLocalStorage from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook";
import { createClient } from "../../models/fetchs/fetchCreateClient";
import { useAuth0 } from "@auth0/auth0-react";
import DateInputClear from "../components/GeneralComponents/DateInput";
import CarChainRegisterLogo from "../assets/CarChainRegisterLogo.jpg";
import { useNavigate } from "react-router-dom";
const PageRegistrar = () => {
  // Hook de validación
  const {
    errors,
    isValid,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  } = useFormValidation();

  const navigate = useNavigate();
  const { logout } = useAuth0();

  const [locality, setLocality] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvinces] = useState(0);
  const [selectedLocality, setSelectedLocality] = useState(0);
  const [selectedSex, setSelectedSex] = useState(0);
  const [selectedDocumentType, setSelectedDocumentType] = useState(0);
  const { user } = useAuth0();

  // Estado adaptado para trabajar con el hook de validación
  const [formData, setFormData] = useState({
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

  const documentTypes: string[] = useAppSelector(
    (state) => state.tipoDocumentos.tipoDocumento
  );
  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );

  // Lista de sexos para el select
  const sexoOptions: GenericList[] = useAppSelector(
    (state) => state.sexo.sexosList
  );

  // Efecto para cargar datos del localStorage al montar el componente
  useEffect(() => {
    const loadClientDataFromStorage = () => {
      try {
        const clientData = getFromLocalStorage<any>("ClientData");
        if (clientData) {
          //("Datos encontrados en localStorage:", clientData);

          // Auto-rellenar el formulario con los datos existentes
          const updatedFormData = {
            nombre: clientData.nombres || clientData.nombre || "",
            apellido: clientData.apellido || "",
            tipoDocumento: clientData.tipoDocumento || "DNI",
            documento: clientData.documento || "",
            fechaNacimiento: clientData.fechaNacimiento || "",
            telefono: clientData.telefono || "",
            sexo: clientData.sexo || "",
            provincia: clientData.localidad.provincia.descripcion || "",
            localidad: clientData.localidad.descripcion || "",
            domicilio: clientData.domicilio || "",
          };

          setFormData(updatedFormData);

          // También actualizar los selects de provincia si existe el dato
          if (clientData.localidad.provincia && provinces.length > 0) {
            const foundProvince = provinces.find(
              (p) =>
                p.descripcion?.toLowerCase() ===
                clientData.localidad.provincia.descripcion.toLowerCase()
            );
            if (foundProvince) {
              setSelectedProvinces(foundProvince.id);
            }
          }

          // También actualizar los selects de localidad si existe el dato
          if (clientData.localidad && localities.length > 0) {
            const foundLocality = localities.find(
              (p) =>
                p.descripcion?.toLowerCase() ===
                clientData.localidad.descripcion.toLowerCase()
            );
            if (foundLocality) {
              setSelectedLocality(foundLocality.id);
              setLocality(true);
            }
          }

          // También actualizar los selects de tipo documento si existe el dato
          if (clientData.tipoDocumento && documentTypes.length > 0) {
            const tipoDocFiltrado: number | undefined = documentTypes.findIndex(
              (doc) => doc === clientData?.tipoDocumento
            );
            if (tipoDocFiltrado != undefined) {
              setSelectedDocumentType(tipoDocFiltrado + 1);
            }
          }

          if (clientData.tipoDocumento && documentTypes.length > 0) {
            const sexoFiltrado = sexoOptions.find(
              (sex) => sex.name === clientData?.sexo
            );
            if (sexoFiltrado != undefined) {
              setSelectedSex(sexoFiltrado.id);
            }
          }

          //("Formulario auto-rellenado con datos del localStorage");
        }
      } catch (error) {
        console.error("Error al cargar datos del localStorage:", error);
      }
    };

    // Cargar datos solo si hay provincias disponibles (para evitar problemas de timing)
    if (provinces.length > 0) {
      loadClientDataFromStorage();
    }
  }, [provinces]); // Dependencia en provinces para ejecutar cuando estén disponibles

  const handleProvinces = useMemo(() => {
    const result = provinces.map((province) => {
      return { id: province.id, name: province.descripcion! };
    });
    return result;
  }, [provinces]);

  const handleStateProvinces = (id: number) => {
    setSelectedProvinces(id);
    setSelectedLocality(0);
    setLocality(true);
    setFormData((prev) => ({
      ...prev,
      ["provincia"]: id.toString(),
    }));
  };

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

  const handleStateLocality = (id: number) => {
    setSelectedLocality(id);

    const selectedLocalityName =
      localities?.find((localidad) => localidad.id === id)?.descripcion || "";
    setFormData((prev) => ({ ...prev, localidad: String(id) }));
    validateField("localidad", selectedLocalityName);
  };

  // Mapeo de IDs a valores string
  const sexoMap: { [key: number]: string } = {
    1: "Masculino",
    2: "Femenino",
  };

  // Función para obtener ID por valor
  const getSexoId = (value: string): number => {
    return Number.parseInt(
      Object.keys(sexoMap).find(
        (key) => sexoMap[Number.parseInt(key)] === value
      ) || "0"
    );
  };

  // Handlers para los selects
  const handleSexoChange = (id: number) => {
    const sexoValue = sexoMap[id] || "";
    setFormData((prev) => ({ ...prev, sexo: sexoValue }));
    validateField("sexo", sexoValue);
  };

  const handleTipoDocumentoChange = (id: number) => {
    const tipoDocValue = documentTypes[id - 1];
    setFormData((prev) => ({ ...prev, tipoDocumento: tipoDocValue }));
    setSelectedDocumentType(id);
    validateField("tipoDocumento", tipoDocValue);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validar el campo usando el hook
    validateField(field as any, field === "fechaNacimiento" ? value : value);
  };

  const handleSubmit = async () => {
    if (validateForm(formData)) {
      try {
        const client = await createClient({
          personaData: {
            nombres: formData.nombre,
            apellido: formData.apellido,
            fechaNacimiento: formData.fechaNacimiento,
            tipoDocumento: formData.tipoDocumento,
            documento: formData.documento,
            domicilio: formData.domicilio,
            correo: user?.email,
            telefono: formData.telefono,
            sexo: formData.sexo,
            localidad_id: selectedLocality,
          },
        });

        alert("Persona registrada exitosamente");
        Object.keys(localStorage).forEach((key) => {
          if (
            !key.startsWith("@@auth0") &&
            !key.includes("auth0") &&
            !key.includes("VehicleData")
          ) {
            localStorage.removeItem(key);
          }
        });
        navigate(`/`);
      } catch (error) {
        console.error("Error en createClient:", error);
        alert("ERROR: " + error);
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm("¿Estás seguro de que querés cancelar el registro?")) {
      // Limpiar formulario
      setFormData({
        nombre: "",
        apellido: "",
        tipoDocumento: "DNI",
        documento: "",
        fechaNacimiento: "",
        telefono: "",
        sexo: "",
        provincia: "",
        localidad: "",
        domicilio: "",
      });

      // Limpiar errores
      clearErrors();

      // Resetear selects
      setSelectedProvinces(0);
      setSelectedLocality(0);

      // Cerrar Auth0
      navigate(`/`);
      logout();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#6b7280",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "40px",
          width: "100%",
          maxWidth: "700px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <img
            src={CarChainRegisterLogo}
            height="120"
            alt="Car-Chain"
            loading="lazy"
            style={{ marginTop: "-1px" }}
          />
          <h2
            style={{
              color: "#1f2937",
              marginBottom: "8px",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Registro en Car-Chain
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              margin: "0",
            }}
          >
            Complete sus datos para continuar
          </p>
        </div>

        <form>
          <div style={{ display: "grid", gap: "16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <Input
                title="Nombre"
                place="Ingrese su nombre"
                value={formData.nombre}
                onChange={(value) => handleInputChange("nombre", value)}
                error={errors.nombre}
                onBlur={() => validateField("nombre", formData.nombre)}
              />
              <Input
                title="Teléfono"
                place="Ingrese su teléfono"
                value={formData.telefono}
                onChange={(value) => handleInputChange("telefono", value)}
                error={errors.telefono}
                onBlur={() => validateField("telefono", formData.telefono)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <Input
                title="Apellido"
                place="Ingrese su apellido"
                value={formData.apellido}
                onChange={(value) => handleInputChange("apellido", value)}
                error={errors.apellido}
                onBlur={() => validateField("apellido", formData.apellido)}
              />
              <SelectForm
                title="Sexo"
                items={sexoOptions}
                onChange={handleSexoChange}
                status={true}
                value={getSexoId(formData.sexo || "")}
                error={errors.sexo}
                onBlur={() => validateField("sexo", formData.sexo)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <SelectForm
                title="Tipo Documento"
                items={documentTypes.map((docType, index) => ({
                  id: index + 1,
                  name: docType,
                }))}
                onChange={handleTipoDocumentoChange}
                status={true}
                value={selectedDocumentType}
                error={errors.tipoDocumento}
                onBlur={() =>
                  validateField("tipoDocumento", formData.tipoDocumento)
                }
              />
              <SelectForm
                status={true}
                value={selectedProvince}
                title="Provincia"
                items={handleProvinces}
                onChange={handleStateProvinces}
                error={errors.provincia}
                onBlur={() => validateField("provincia", formData.provincia)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <Input
                title="Documento"
                place="Ingrese su número de documento"
                value={formData.documento}
                onChange={(value) => handleInputChange("documento", value)}
                error={errors.documento}
                onBlur={() => validateField("documento", formData.documento)}
              />
              <SelectForm
                status={locality}
                value={selectedLocality}
                title="Localidad"
                items={handleLocality}
                onChange={handleStateLocality}
                error={errors.localidad}
                onBlur={() => validateField("localidad", formData.localidad)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <DateInputClear
                title="Fecha de nacimiento"
                value={formData.fechaNacimiento}
                onChange={(value) =>
                  handleInputChange("fechaNacimiento", value)
                }
                onBlur={(value) => validateField("fechaNacimiento", value)}
                error={errors.fechaNacimiento}
                showFormat={false}
              />
              <Input
                title="Domicilio"
                place="Ingrese su domicilio"
                value={formData.domicilio}
                onChange={(value) => handleInputChange("domicilio", value)}
                error={errors.domicilio}
                onBlur={() => validateField("domicilio", formData.domicilio)}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "32px",
              flexDirection: "column",
            }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#9ca3af",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#6b7280")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#9ca3af")
              }
            >
              Confirmar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "transparent",
                color: "#6b7280",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.borderColor = "#9ca3af";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "#d1d5db";
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageRegistrar;
