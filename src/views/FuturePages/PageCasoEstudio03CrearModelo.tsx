import GrayButton from "../components/GeneralComponents/Button.tsx";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormValidation";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import SelectForm from "../components/GeneralComponents/SelectForm.tsx";
import { useLocalStorage } from "../../controllers/controllerHooks/LocalStorage/useLocalStorage";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";

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

function CrearModelo() {
  const { errors, validateField, validateForm } = useFormValidation();
  const brands: Marca[] = useAppSelector((state) => state.marcas.marca);
  const models: Modelo[] = useAppSelector((state) => state.modelos.modelo);
  const versions: Version[] = useAppSelector(
    (state) => state.versiones.version
  );
  const [model, setModel] = useState<boolean>(false);
  const [version, setVersion] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState(0);
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
  const handleBrand = useMemo(() => {
    const result = brands.map((brand) => {
      return { id: brand.id, name: brand.nombre ?? "" };
    });
    return result;
  }, [brands]);

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
  return (
    <div className="container-fluid w-75">
      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Nombre
        </label>
        <input type="text" className="form-control" />
      </div>

      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Descripción
        </label>
        <textarea className="form-control" rows={4} />
      </div>
      <div className="d-flex align-items-center mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Marca
        </label>
        <div style={{ width: "300px" }}>
          <SelectForm
            status={true}
            value={selectedBrand}
            title=""
            items={handleBrand}
            onChange={handleStateBrand}
          />
        </div>
      </div>

      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
            paddingBottom: "20px",
          }}
        >
          <GrayButton text="Cancelar" onClick={() => {}} />
        </div>
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
          }}
        >
          <GrayButton text="Confirmar" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default CrearModelo;
