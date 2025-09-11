import { useEffect, useState } from "react";
import { useMemo } from "react";
import Input from "./../GeneralComponents/Input";
import CheckForm from "./../GeneralComponents/CheckForm";
import SelectForm from "./../GeneralComponents/SelectForm";
import GrayButton from "./../GeneralComponents/Button";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import useFormValidation from "../../../controllers/controllerHooks/Validations/useFormValidation.ts";
import "../../../models/types.d.ts";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import TitleForm from "./../GeneralComponents/TitleForm.tsx";

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

  // UseEffect
  useEffect(() => {
    //localStorage.removeItem("ClientData");
    //  localStorage.removeItem("VehicleData");
    const vehicleLocalStorage = useLocalStorageItem<Vehiculo>("VehicleData");

    if (vehicleLocalStorage !== null) {
      setModel(true);
      setVersion(true);
      setSelectedBrand(vehicleLocalStorage.version.modelo.marca.id);
      setSelectedModel(vehicleLocalStorage.version.modelo.id);
      setSelectedVersion(vehicleLocalStorage.version.id);
      setFormVehicle(parseFormVehicle(vehicleLocalStorage));
    }
  }, []);

  function parseFormVehicle(vehiculo: Vehiculo): FormVehicleProps {
    return {
      matricula: vehiculo.matricula || "",
      marca: vehiculo.version.modelo.marca.nombre || "",
      chasis: vehiculo.chasis || "",
      modelo: vehiculo.version.modelo.nombre || "",
      numeroMotor: vehiculo.numeroMotor || "",
      version: vehiculo.version.nombre || "",
      gnc: vehiculo.gnc || false,
      anio: String(vehiculo.añoFabricacion) || "",
    };
  }

  // Handles
  const handleBrand = useMemo(() => {
    const result = brands.map((brand) => {
      return { id: brand.id, name: brand.nombre ?? "" };
    });
    return result;
  }, [brands]);

  const handleModel = useMemo(() => {
    const modelosFiltrados = models.filter(
      (modelo) => modelo.marca.id === selectedBrand
    );

    const result = modelosFiltrados.map((model) => ({
      id: model.id,
      name: model.nombre ?? "",
    }));
    return result;
  }, [models, selectedBrand]);

  const handleVersion = useMemo(() => {
    const versionesFiltrados = versions.filter(
      (version) => version.modelo.id === selectedModel
    );

    const result = versionesFiltrados.map((version) => ({
      id: version.id,
      name: version.nombre ?? "",
    }));

    return result;
  }, [versions, selectedModel]);

  const handleSubmit = () => {
    console.log(formVehicle);
    try {
      if (validateForm(formVehicle)) {
        console.log("Formulario válido:", formVehicle);
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
          console.log("ERROR");
        }
        handleCurrentView(true);
      } else {
        console.log("Formulario inválido:", errors);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  // HandleStates
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
    // Encontrar el nombre de la marca seleccionada
    const selectedBrandName =
      brands.find((brand) => brand.id === id)?.nombre || "";

    setFormVehicle((prev) => ({ ...prev, marca: selectedBrandName }));
    setFormVehicle((prev) => ({ ...prev, marcaId: id }));
    validateField("marca", selectedBrandName);
  };

  const handleStateModel = (id: number) => {
    setVersion(true);
    setSelectedModel(id);

    // Encontrar el nombre del modelo seleccionado
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
    console.log(selectedVersionName);
    setFormVehicle((prev) => ({ ...prev, version: selectedVersionName }));
    setFormVehicle((prev) => ({ ...prev, versionId: id }));
    validateField("version", selectedVersionName);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-9">
          <div className="row " style={{ padding: "2px" }}>
            <div className="row " style={{ padding: "2px" }}>
              <TitleForm title="Informacion Del Vehiculo" />
            </div>
            <Input
              title="Matricula"
              place=""
              value={formVehicle.matricula}
              onChange={(value) => {
                handleInputChange("matricula", value);
              }}
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
                items={handleModel}
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
                items={handleVersion}
                onChange={handleStateVersion}
                error={errors.version}
                onBlur={() => validateField("version", formVehicle.version)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <CheckForm
                text="GNC"
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
