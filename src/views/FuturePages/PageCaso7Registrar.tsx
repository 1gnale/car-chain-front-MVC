
import { useState, useMemo, useEffect } from "react";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import Input from "../components/GeneralComponents/Input";
import SelectForm from "../components/GeneralComponents/SelectForm";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormClientValidation";
import getFromLocalStorage from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook";

const PageRegistrar = () => {
  // Hook de validación
  const { errors, isValid, validateField, validateForm, clearErrors, clearFieldError } = useFormValidation();
  const [locality, setLocality] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvinces] = useState(0);
  const [selectedLocality, setSelectedLocality] = useState(0);

  // Estado adaptado para trabajar con el hook de validación
  const [formData, setFormData] = useState({
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
          console.log("Datos encontrados en localStorage:", clientData);
          
          // Auto-rellenar el formulario con los datos existentes
          const updatedFormData = {
            nombre: clientData.nombres || clientData.nombre || "",
            apellido: clientData.apellido || "",
            tipoDocumento: clientData.tipoDocumento || "DNI",
            documento: clientData.documento || "",
            fechaNacimiento: clientData.fechaNacimiento || "",
            telefono: clientData.telefono || "",
            sexo: clientData.sexo || "",
            provincia: clientData.localidad.provincia.id || "",
            localidad: clientData.localidad.id || "0",
            domicilio: clientData.domicilio || "",
          };

          setFormData(updatedFormData);

          // También actualizar los selects de provincia si existe el dato
          if (clientData.provincia && provinces.length > 0) {
            const foundProvince = provinces.find(p => 
              p.descripcion?.toLowerCase() === clientData.provincia.toLowerCase()
            );
            if (foundProvince) {
              setSelectedProvinces(foundProvince.id);
            }
          }

          console.log("Formulario auto-rellenado con datos del localStorage");
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
    { id: 3, name: "Otro" },
  ];



  // Mapeo de IDs a valores string
  const sexoMap: { [key: number]: string } = {
    1: "masculino",
    2: "femenino",
    3: "otro",
  };
  const tipoDocumentoMap: { [key: number]: string } = {
    1: "DNI",
    2: "pasaporte",
    3: "cedula",
  };

  // Función para obtener ID por valor
  const getSexoId = (value: string): number => {
    return parseInt(
      Object.keys(sexoMap).find((key) => sexoMap[parseInt(key)] === value) ||
      "0"
    );
  };
  const getTipoDocumentoId = (value: string): number => {
    return parseInt(
      Object.keys(tipoDocumentoMap).find(
        (key) => tipoDocumentoMap[parseInt(key)] === value
      ) || "1"
    );
  };

  // Handlers para los selects
  const handleSexoChange = (id: number) => {
    const sexoValue = sexoMap[id] || "";
    setFormData((prev) => ({ ...prev, sexo: sexoValue }));
    validateField("sexo", sexoValue);
  };

  const handleTipoDocumentoChange = (id: number) => {
    const tipoDocValue = tipoDocumentoMap[id] || "DNI";
    setFormData((prev) => ({ ...prev, tipoDocumento: tipoDocValue }));
    validateField("tipoDocumento", tipoDocValue);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validar el campo usando el hook
    validateField(field as any, value);
  };

  const handleSubmit = () => {
    if (validateForm(formData)) {
      try {
        // Guardar datos en localStorage para futuras sesiones
        localStorage.setItem("ClientData", JSON.stringify(formData));
        console.log("Datos guardados en localStorage:", formData);
        
        console.log("Datos del formulario:", formData);
        alert("Persona registrada exitosamente");
      } catch (error) {
        console.error("Error al guardar en localStorage:", error);
        // Aún así proceder con el registro
        console.log("Datos del formulario:", formData);
        alert("Persona registrada exitosamente");
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
    
    console.log("Formulario reiniciado");
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
                  items={documentTypes.map((docType, index) => ({ id: index + 1, name: docType }))}
                  onChange={handleTipoDocumentoChange}
                  status={true}
                  value={getTipoDocumentoId(formData.tipoDocumento || "DNI")}
                  error={errors.tipoDocumento}
                  onBlur={() => validateField("tipoDocumento", formData.tipoDocumento)}
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
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    className={`form-control ${errors.fechaNacimiento ? "is-invalid" : ""}`}
                    value={formData.fechaNacimiento}
                    onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    min="1900-01-01"
                    placeholder="MM/DD/AAAA"
                    onBlur={() => validateField("fechaNacimiento", formData.fechaNacimiento)}
                  />
                  {errors.fechaNacimiento && (
                    <div className="invalid-feedback">
                      {errors.fechaNacimiento}
                    </div>
                  )}
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
