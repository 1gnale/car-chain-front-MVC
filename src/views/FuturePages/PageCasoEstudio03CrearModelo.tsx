import GrayButton from "../components/GeneralComponents/Button.tsx";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormValidation";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import SelectForm from "../components/GeneralComponents/SelectForm.tsx";
import { useLocalStorage } from "../../controllers/controllerHooks/LocalStorage/useLocalStorage";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import Input from "../components/GeneralComponents/Input.tsx";
import CheckForm from "../components/GeneralComponents/CheckForm.tsx";
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
   <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value=""
      />

      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        as="textarea"
        classNameDiv="d-flex align-items-start mb-3"
        value=""
      />

      <div className="col-md-4 ">
        <SelectForm
          status={true}
          value={selectedBrand}
          title="Marca"
          items={handleBrand}
          onChange={handleStateBrand}
          classNameDiv="d-flex align-items-start mb-3 gap-5"
          classNameSelect="ms-1"
          classNameLabel="ms-1"
        />
      </div>
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div className="d-flex justify-content-end gap-3 mt-4">
          <GrayButton text="Cancelar"  />
          <GrayButton text="Confirmar" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default CrearModelo;
