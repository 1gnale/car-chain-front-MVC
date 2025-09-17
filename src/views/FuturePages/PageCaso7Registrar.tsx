import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import Input from "../components/GeneralComponents/Input";
import SelectForm from "../components/GeneralComponents/SelectForm";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormClientValidation";
import getFromLocalStorage from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook";
import DateInput from "../components/GeneralComponents/DateInput";
import { createClient } from "../../models/fetchs/fetchCreateClient";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "react-router-dom";

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
    const result = provinces.map((provinces) => {
      return { id: provinces.id, name: provinces.descripcion! };
    });
    return result;
  }, [provinces]);

  const handleStateProvinces = (id: number) => {
    setSelectedProvinces(id);
    setSelectedLocality(0);
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

  // Opciones para los selects
  const sexoOptions = [
    { id: 1, name: "Masculino" },
    { id: 2, name: "Femenino" },
  ];

  // Mapeo de IDs a valores string
  const sexoMap: { [key: number]: string } = {
    1: "Masculino",
    2: "Femenino",
  };

  // Función para obtener ID por valor
  const getSexoId = (value: string): number => {
    return parseInt(
      Object.keys(sexoMap).find((key) => sexoMap[parseInt(key)] === value) ||
        "0"
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
    //(id);
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
  const a = {
    nombres: formData.nombre,
    apellido: formData.apellido,
    fechaNacimiento: "1999-01-01",
    tipoDocumento: formData.tipoDocumento,
    documento: formData.documento,
    domicilio: formData.domicilio,
    correo: user?.email,
    telefono: formData.telefono,
    sexo: formData.sexo,
    contraseña: "PEPEPEPEPEPEPE",
    localidad_id: selectedLocality,
  };
  //(a);
  const handleSubmit = async () => {
    if (validateForm(formData)) {
      try {
        const a = await createClient({
          personaData: {
            nombres: formData.nombre,
            apellido: formData.apellido,
            fechaNacimiento: "1999-01-01",
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
        redirect("/");
      } catch (error) {
        console.error("Error en createClient:", error);
        alert("ERROR: " + error);
      }
    }
  };

  const handleCancel = () => {
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

    // Opcional: también limpiar localStorage
    // localStorage.removeItem("ClientData");

    //("Formulario reiniciado");
  };

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">
          <h4 className="mb-0">Registro de Persona</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3">
              {/* Primera fila: Nombre y Teléfono */}
              <div className="col-md-6">
                <Input
                  title="Nombre"
                  place="Ingrese su nombre"
                  value={formData.nombre}
                  onChange={(value) => handleInputChange("nombre", value)}
                  error={errors.nombre}
                  onBlur={() => validateField("nombre", formData.nombre)}
                />
              </div>
              <div className="col-md-6">
                <Input
                  title="Teléfono"
                  place="Ingrese su teléfono"
                  value={formData.telefono}
                  onChange={(value) => handleInputChange("telefono", value)}
                  error={errors.telefono}
                  onBlur={() => validateField("telefono", formData.telefono)}
                />
              </div>

              {/* Segunda fila: Apellido y Sexo */}
              <div className="col-md-6">
                <Input
                  title="Apellido"
                  place="Ingrese su apellido"
                  value={formData.apellido}
                  onChange={(value) => handleInputChange("apellido", value)}
                  error={errors.apellido}
                  onBlur={() => validateField("apellido", formData.apellido)}
                />
              </div>
              <div className="col-md-6">
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

              {/* Tercera fila: Tipo Documento y Provincia */}
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
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

              {/* Cuarta fila: Documento y Localidad */}
              <div className="col-md-6">
                <Input
                  title="Documento"
                  place="Ingrese su número de documento"
                  value={formData.documento}
                  onChange={(value) => handleInputChange("documento", value)}
                  error={errors.documento}
                  onBlur={() => validateField("documento", formData.documento)}
                />
              </div>
              <div className="col-md-6">
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

              {/* Quinta fila: Fecha de Nacimiento y Domicilio */}
              <div className="col-md-6">
                <DateInput
                  title="Fecha de nacimiento"
                  value={formData.fechaNacimiento}
                  onChange={(value) =>
                    handleInputChange("fechaNacimiento", value)
                  }
                  onBlur={(value) => validateField("fechaNacimiento", value)}
                  error={errors.fechaNacimiento}
                  showFormat={false}
                />
              </div>
              <div className="col-md-6">
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

            {/* Botones */}
            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={handleSubmit}
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageRegistrar;
