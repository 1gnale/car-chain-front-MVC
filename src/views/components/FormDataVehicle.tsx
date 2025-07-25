import { useState } from "react";
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
  const brands: Brand[] = useAppSelector((state) => state.brands.brand);
  const { errors, validateField, validateForm } = useFormValidation();

  const [model, setModel] = useState<boolean>(false);
  const [version, setVersion] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState(0);

  const [form, setForm] = useState({
    matricula: "",
    marca: "",
    chasis: "",
    modelo: "",
    numeroMotor: "",
    version: "",
    gnc: false,
    anio: "",
  });

  // HANDLE STATES
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
    validateField("marca", selectedBrandName);
  };

  const handleStateModel = (id: number) => {
    setVersion(true);
    setSelectedModel(id);

    // Encontrar el nombre del modelo seleccionado
    const brand = brands.find((b) => b.id === selectedBrand);
    const selectedModelName =
      brand?.modelos.find((model) => model.id === id)?.nombre || "";
    setForm((prev) => ({ ...prev, modelo: selectedModelName }));
    validateField("modelo", selectedModelName);
  };

  const handleStateVersion = (id: number) => {
    setSelectedVersion(id);

    // Encontrar el nombre de la versión seleccionada
    const brand = brands.find((b) => b.id === selectedBrand);
    const model = brand?.modelos.find((m) => m.id === selectedModel);
    const selectedVersionName =
      model?.versiones.find((version) => version.id === id)?.nombre || "";
    setForm((prev) => ({ ...prev, version: selectedVersionName }));
    validateField("version", selectedVersionName);
  };
  // HANDLES
  const handleBrand = useMemo(() => {
    const result = brands.map((brand) => {
      return { id: brand.id, name: brand.nombre };
    });
    return result;
  }, [brands]);

  const handleModel = () => {
    if (selectedBrand === null) return [];
    const brand = brands.find((b) => b.id === selectedBrand);
    if (!brand) return [];

    console.log("2");

    return brand.modelos.map((model) => ({
      id: model.id,
      name: model.nombre,
    }));
  };

  const handleVersion = () => {
    if (selectedModel === null) return [];
    const brand = brands.find((b) => b.id === selectedBrand);
    if (!brand) return [];
    const model = brand.modelos.find((m) => m.id === selectedModel);
    if (!model) return [];
    console.log("3");
    return model.versiones.map((version) => ({
      id: version.id,
      name: version.nombre,
    }));
  };

  const handleSubmit = () => {
    if (validateForm(form)) {
      console.log("Formulario válido:", form);
      handleCurrentView(true);
    } else {
      console.log("Formulario inválido:", errors);
    }
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
              value={form.matricula}
              onChange={(value) => handleInputChange("matricula", value)}
              error={errors.matricula}
              onBlur={() => validateField("matricula", form.matricula)}
            />
            <div className="col">
              <SelectForm
                status={true}
                value={selectedBrand}
                title="Marca"
                items={handleBrand}
                onChange={handleStateBrand}
                error={errors.marca}
                onBlur={() => validateField("marca", form.marca)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input
                title="Chasis"
                place=""
                value={form.chasis}
                onChange={(value) => handleInputChange("chasis", value)}
                error={errors.chasis}
                onBlur={() => validateField("chasis", form.chasis)}
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
                onBlur={() => validateField("modelo", form.modelo)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input
                title="Numero de Motor"
                place=""
                value={form.numeroMotor}
                onChange={(value) => handleInputChange("numeroMotor", value)}
                error={errors.numeroMotor}
                onBlur={() => validateField("numeroMotor", form.numeroMotor)}
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
                onBlur={() => validateField("version", form.version)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <CheckForm
                title="GNC"
                text="Activar GNC"
                checked={form.gnc}
                onChange={(value) => handleCheckboxChange("gnc", value)}
              />
            </div>
            <div className="col">
              <Input
                title="Año"
                place="XXXX"
                value={form.anio}
                onChange={(value) => handleInputChange("anio", value)}
                error={errors.anio}
                onBlur={() => validateField("anio", form.anio)}
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
