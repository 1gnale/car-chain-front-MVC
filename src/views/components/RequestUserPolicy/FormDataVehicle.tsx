import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import useFormVehicleValidation from "../../../controllers/controllerHooks/Validations/useFormValidation.ts";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import { useNavigate } from "react-router-dom";
import DarkTitleForm from "../GeneralComponents/DarkTitleForm.tsx";
import DarkInput from "../GeneralComponents/DarkInput.tsx";
import DarkSelectForm from "../GeneralComponents/DarkSelect.tsx";
import DarkCheckForm from "../GeneralComponents/DarkCheckForm.tsx";
import DarkButton from "../GeneralComponents/DarkButton.tsx";

interface FormVehicleProps {
  matricula: string;
  marca: string;
  chasis: string;
  modelo: string;
  numeroMotor: string;
  version: string;
  gnc: boolean;
  anio: string;
}

const FormDataVehicle = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  // Navigate para volver a home en caso de cancel
  const navigate = useNavigate();

  // Vehiculo en el local storage
  const vehicleLocalStorage = useLocalStorageItem<Vehiculo>("VehicleData");

  // Nos traemos los datos del redux para los selects
  const brands: Marca[] = useAppSelector((state) => state.marcas.marca);
  const models: Modelo[] = useAppSelector((state) => state.modelos.modelo);
  const versions: Version[] = useAppSelector(
    (state) => state.versiones.version
  );

  // Validaciones
  const { errors, validateField, validateForm } = useFormVehicleValidation();

  // State para los selects
  const [model, setModel] = useState<boolean>(false);
  const [version, setVersion] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState(0);

  // formulario
  const [formVehicle, setFormVehicle] = useState<FormVehicleProps>({
    matricula: "",
    marca: "",
    chasis: "",
    modelo: "",
    numeroMotor: "",
    version: "",
    gnc: false,
    anio: "",
  });

  // Useeffect para carga el formulario con el local storage
  useEffect(() => {
    if (vehicleLocalStorage !== null) {
      setModel(true);
      setVersion(true);
      setSelectedBrand(vehicleLocalStorage.version.modelo?.marca!.id || 0);
      setSelectedModel(vehicleLocalStorage.version.modelo!.id);
      setSelectedVersion(vehicleLocalStorage.version.id);
      setFormVehicle(parseFormVehicle(vehicleLocalStorage));
    }
  }, []);

  // Parse para volver el local storage en formato del form
  function parseFormVehicle(vehiculo: Vehiculo): FormVehicleProps {
    return {
      matricula: vehiculo.matricula || "",
      marca: vehiculo.version.modelo?.marca?.nombre || "",
      chasis: vehiculo.chasis || "",
      modelo: vehiculo.version.modelo!.nombre || "",
      numeroMotor: vehiculo.numeroMotor || "",
      version: vehiculo.version.nombre || "",
      gnc: vehiculo.gnc || false,
      anio: String(vehiculo.añoFabricacion) || "",
    };
  }

  // HANDLE PARA CARGAR LOS SELECT
  const handleBrand = useMemo(() => {
    const result = brands.map((brand) => {
      return { id: brand.id, name: brand.nombre ?? "" };
    });
    return result;
  }, [brands]);

  const handleModel = useMemo(() => {
    const modelosFiltrados = models.filter(
      (modelo) => modelo.marca?.id === selectedBrand
    );

    const result = modelosFiltrados.map((model) => ({
      id: model.id,
      name: model.nombre ?? "",
    }));
    return result;
  }, [models, selectedBrand]);

  const handleVersion = useMemo(() => {
    const versionesFiltrados = versions.filter(
      (version) => version.modelo!.id === selectedModel
    );

    const result = versionesFiltrados.map((version) => ({
      id: version.id,
      name: version.nombre ?? "",
    }));

    return result;
  }, [versions, selectedModel]);

  // HANDLES Y HANDLESTATE PARA CARGAR EL FORMULARIO
  const handleInputChange = (field: string, value: string) => {
    setFormVehicle((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  const handleCheckboxChange = (field: string, value: boolean) => {
    setFormVehicle((prev) => ({ ...prev, [field]: value }));
  };

  const handleStateBrand = (id: number) => {
    setModel(true);
    setSelectedBrand(id);
    setVersion(false);
    setSelectedModel(0);
    setSelectedVersion(0);
    setFormVehicle((prev) => ({ ...prev, modelo: "" }));
    setFormVehicle((prev) => ({ ...prev, version: "" }));
    setFormVehicle((prev) => ({ ...prev, modeloId: 0 }));
    setFormVehicle((prev) => ({ ...prev, versionId: 0 }));

    const selectedBrandName =
      brands.find((brand) => brand.id === id)?.nombre || "";

    setFormVehicle((prev) => ({ ...prev, marca: selectedBrandName }));
    setFormVehicle((prev) => ({ ...prev, marcaId: id }));
    validateField("marca", selectedBrandName);
  };

  const handleStateModel = (id: number) => {
    setVersion(true);
    setSelectedModel(id);

    const selectedModelName =
      models.find((model) => model.id === id)?.nombre || "";
    setFormVehicle((prev) => ({ ...prev, modelo: selectedModelName }));
    setFormVehicle((prev) => ({ ...prev, modeloId: id }));
    validateField("modelo", selectedModelName);
  };

  const handleStateVersion = (id: number) => {
    setSelectedVersion(id);

    const selectedVersionName =
      versions.find((version) => version.id === id)?.nombre || "";
    setFormVehicle((prev) => ({ ...prev, version: selectedVersionName }));
    setFormVehicle((prev) => ({ ...prev, versionId: id }));
    validateField("version", selectedVersionName);
  };

  // BOTONES (cancelar y siguiente)
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

  const handleSubmit = () => {
    try {
      if (validateForm(formVehicle)) {
        try {
          const versionFiltrada: Version | undefined = versions.find(
            (version) => version.id === selectedVersion
          );
          if (versionFiltrada != undefined) {
            const vehicle: Vehiculo = {
              id: 1,
              matricula: formVehicle.matricula,
              chasis: formVehicle.chasis,
              añoFabricacion: Number(formVehicle.anio),
              numeroMotor: formVehicle.numeroMotor,
              gnc: formVehicle.gnc,
              version: versionFiltrada,
            };
            localStorage.setItem("VehicleData", JSON.stringify(vehicle));
          }
        } catch (error) {
          // Error handling
        }
        handleCurrentView(true);
      }
    } catch (error) {
      // Error handling
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            backgroundColor: "#374151",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          <DarkTitleForm title="Información Del Vehículo" />

          <div style={{ display: "grid", gap: "1.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <DarkInput
                title="Matrícula"
                place="Ingrese la matrícula"
                value={formVehicle.matricula}
                onChange={(value) => handleInputChange("matricula", value)}
                error={errors.matricula}
                onBlur={() => validateField("matricula", formVehicle.matricula)}
              />
              <DarkSelectForm
                status={true}
                value={selectedBrand}
                title="Marca"
                items={handleBrand}
                onChange={handleStateBrand}
                error={errors.marca}
                onBlur={() => validateField("marca", formVehicle.marca)}
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
                title="Chasis"
                place="Ingrese el número de chasis"
                value={formVehicle.chasis}
                onChange={(value) => handleInputChange("chasis", value)}
                error={errors.chasis}
                onBlur={() => validateField("chasis", formVehicle.chasis)}
              />
              <DarkSelectForm
                status={model}
                value={selectedModel}
                title="Modelo"
                items={handleModel}
                onChange={handleStateModel}
                error={errors.modelo}
                onBlur={() => validateField("modelo", formVehicle.modelo)}
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
                title="Número de Motor"
                place="Ingrese el número de motor"
                value={formVehicle.numeroMotor}
                onChange={(value) => handleInputChange("numeroMotor", value)}
                error={errors.numeroMotor}
                onBlur={() =>
                  validateField("numeroMotor", formVehicle.numeroMotor)
                }
              />
              <DarkSelectForm
                status={version}
                value={selectedVersion}
                title="Versiones"
                items={handleVersion}
                onChange={handleStateVersion}
                error={errors.version}
                onBlur={() => validateField("version", formVehicle.version)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <DarkCheckForm
                text="GNC"
                checked={formVehicle.gnc}
                onChange={(value) => handleCheckboxChange("gnc", value)}
              />
              <DarkInput
                title="Año"
                place="XXXX"
                value={formVehicle.anio}
                onChange={(value) => handleInputChange("anio", value)}
                error={errors.anio}
                onBlur={() => validateField("anio", formVehicle.anio)}
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

export default FormDataVehicle;
