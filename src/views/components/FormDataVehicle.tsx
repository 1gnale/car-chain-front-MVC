import { useEffect, useState } from "react";
import { useMemo } from "react";
import Input from "./GeneralComponents/Input";
import CheckForm from "./GeneralComponents/CheckForm";
import SelectForm from "./GeneralComponents/SelectForm";
import GrayButton from "./GeneralComponents/Button";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormValidation.ts";
import "../../models/types.d.ts";

const FormDataVehicle = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  // States MODELO DATOS
  const brands: Marca[] = useAppSelector((state) => state.marcas.marca);
  const models: Modelo[] = useAppSelector((state) => state.modelos.modelo);
  const versions: Version[] = useAppSelector(
    (state) => state.versiones.version
  );

  // State de validacion de datos
  const { errors, validateField, validateForm } = useFormValidation();

  // Statates de Selects
  const [model, setModel] = useState<boolean>(false);
  const [version, setVersion] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState(0);

  // State formulario
  const [formVehicle, setForm] = useState({
    matricula: "",
    marca: "",
    marcaId: 0,
    chasis: "",
    modelo: "",
    modeloId: 0,
    numeroMotor: "",
    version: "",
    versionId: 0,
    gnc: false,
    anio: "",
  });
  // UseEffect
  useEffect(() => {
    // localStorage.removeItem("formVehicle");
    const vehicle = localStorage.getItem("formVehicle");
    if (vehicle !== null) {
      const vehicleStorage = JSON.parse(vehicle);
      const formVehicleResult = parseFormVehicle(vehicleStorage);
      setModel(true);
      setVersion(true);
      setForm(formVehicleResult);
      setSelectedBrand(formVehicleResult.marcaId);
      setSelectedModel(formVehicleResult.modeloId);
      setSelectedVersion(formVehicleResult.versionId);
    }
  }, []);
  function parseFormVehicle(json: any): any {
    return {
      matricula: json.matricula || "",
      marca: json.marca || "",
      marcaId: Number(json.marcaId) || 0,
      chasis: json.chasis || "",
      modelo: json.modelo || "",
      modeloId: Number(json.modeloId) || 0,
      numeroMotor: json.numeroMotor || "",
      version: json.version || "",
      versionId: Number(json.versionId) || 0,
      gnc: json.gnc || false,
      anio: json.anio || "",
    };
  }

  // Handles
  const handleBrand = useMemo(() => {
    const result = brands.map((brand) => {
      return { id: brand.id, name: brand.nombre ?? "" };
    });
    return result;
  }, [brands]);

  const handleModel = () => {
    const modelosFiltrados = models.filter(
      (modelo) => modelo.marca.id === selectedBrand
    );

    return modelosFiltrados.map((model) => ({
      id: model.id,
      name: model.nombre ?? "",
    }));
  };

  const handleVersion = () => {
    const versionesFiltrados = versions.filter(
      (version) => version.modelo.id === selectedModel
    );

    return versionesFiltrados.map((version) => ({
      id: version.id,
      name: version.nombre ?? "",
    }));
  };

  const handleSubmit = () => {
    if (validateForm(formVehicle)) {
      console.log("Formulario válido:", formVehicle);
      try {
        localStorage.setItem("formVehicle", JSON.stringify(formVehicle));
      } catch (error) {
        console.log("ERROR");
      }
      handleCurrentView(true);
    } else {
      console.log("Formulario inválido:", errors);
    }
  };

  // HandleStates
  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  const handleCheckboxChange = (field: string, value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStateBrand = (id: number) => {
    setModel(true);
    setSelectedBrand(id);
    setVersion(false);
    setSelectedModel(0);
    setSelectedVersion(0);
    // Encontrar el nombre de la marca seleccionada
    const selectedBrandName =
      brands.find((brand) => brand.id === id)?.nombre || "";
    setForm((prev) => ({ ...prev, marca: selectedBrandName }));
    setForm((prev) => ({ ...prev, marcaId: id }));
    validateField("marca", selectedBrandName);
  };

  const handleStateModel = (id: number) => {
    setVersion(true);
    setSelectedModel(id);

    // Encontrar el nombre del modelo seleccionado
    const brand = brands.find((b) => b.id === selectedBrand);
    const selectedModelName =
      models.find((model) => model.id === id)?.nombre || "";
    setForm((prev) => ({ ...prev, modelo: selectedModelName }));
    setForm((prev) => ({ ...prev, modeloId: id }));
    validateField("modelo", selectedModelName);
  };

  const handleStateVersion = (id: number) => {
    setSelectedVersion(id);

    const selectedVersionName =
      versions.find((version) => version.id === id)?.nombre || "";
    setForm((prev) => ({ ...prev, version: selectedVersionName }));
    setForm((prev) => ({ ...prev, versionId: id }));
    validateField("version", selectedVersionName);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-9">
          <div className="row " style={{ padding: "2px" }}>
            <div className="row " style={{ padding: "2px" }}>
              <h5>
                <strong>Información del vehículo</strong>
              </h5>
            </div>
            <Input
              title="Matricula"
              place=""
              value={formVehicle.matricula}
              onChange={(value) => handleInputChange("matricula", value)}
              error={errors.matricula}
              onBlur={() => validateField("matricula", formVehicle.matricula)}
            />
            <div className="col">
              <SelectForm
                status={true}
                value={selectedBrand}
                title="Marca"
                items={handleBrand}
                onChange={handleStateBrand}
                error={errors.marca}
                onBlur={() => validateField("marca", formVehicle.marca)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input
                title="Chasis"
                place=""
                value={formVehicle.chasis}
                onChange={(value) => handleInputChange("chasis", value)}
                error={errors.chasis}
                onBlur={() => validateField("chasis", formVehicle.chasis)}
              />
            </div>
            <div className="col">
              <SelectForm
                status={model}
                value={selectedModel}
                title="Modelo"
                items={handleModel()}
                onChange={handleStateModel}
                error={errors.modelo}
                onBlur={() => validateField("modelo", formVehicle.modelo)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input
                title="Numero de Motor"
                place=""
                value={formVehicle.numeroMotor}
                onChange={(value) => handleInputChange("numeroMotor", value)}
                error={errors.numeroMotor}
                onBlur={() =>
                  validateField("numeroMotor", formVehicle.numeroMotor)
                }
              />
            </div>
            <div className="col">
              <SelectForm
                status={version}
                value={selectedVersion}
                title="Versiones"
                items={handleVersion()}
                onChange={handleStateVersion}
                error={errors.version}
                onBlur={() => validateField("version", formVehicle.version)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <CheckForm
                title="GNC"
                text="Activar GNC"
                checked={formVehicle.gnc}
                onChange={(value) => handleCheckboxChange("gnc", value)}
              />
            </div>
            <div className="col">
              <Input
                title="Año"
                place="XXXX"
                value={formVehicle.anio}
                onChange={(value) => handleInputChange("anio", value)}
                error={errors.anio}
                onBlur={() => validateField("anio", formVehicle.anio)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col"></div>

            <div
              className="d-grid gap-2 d-md-flex justify-content-md-end"
              style={{ padding: "10px" }}
            >
              <GrayButton text="Cancelar" style="me-md-2" onClick={() => {}} />
              <GrayButton text="Siguiente" onClick={handleSubmit} />
            </div>
          </div>
          <div className="row" style={{ padding: "10px" }}></div>
          <div className="row" style={{ padding: "10px" }}></div>
        </div>
        <div className="col-xl-1"></div>
      </div>
    </div>
  );
};

export default FormDataVehicle;
