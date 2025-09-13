import GrayButton from "../components/GeneralComponents/Button";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormValidation";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import SelectForm from "../components/GeneralComponents/SelectForm";
import { useLocalStorage } from "../../controllers/controllerHooks/LocalStorage/useLocalStorage";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import Input from "../components/GeneralComponents/Input.tsx";
import CheckForm from "../components/GeneralComponents/CheckForm.tsx";

function ModificarVersion({
  version,
  handleCurrentView,
}: {
  version: Version;
  handleCurrentView: (pass: boolean) => void;
}) {
  const [checkbox, setCheckbox] = useState<boolean>(version.activo!);

  // Redux selectors
  const brands: Marca[] = useAppSelector((state) => state.marcas.marca);
  const models: Modelo[] = useAppSelector((state) => state.modelos.modelo);
  
  // Estado de marca y modelo
  const [selectedBrand, setSelectedBrand] = useState<number>(version.modelo?.marca.id || 0);
  const [selectedModel, setSelectedModel] = useState<number>(version.modelo?.id || 0);

  // Estado del form con los datos de la versión
  const [formVersion, setFormVersion] = useState<Version>({
    id: version.id,
    nombre: version.nombre,
    descripcion: version.descripcion,
    precio_mercado: version.precio_mercado,
    precio_mercado_gnc: version.precio_mercado_gnc,
    modelo: version.modelo,
    activo: version.activo,
  });
console.log(brands)
console.log(models)
  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  // Opciones de marcas
  const handleBrand = useMemo(() => {
    return brands.map((brand) => ({
      id: brand.id,
      name: brand.nombre ?? "",
    }));
  }, [brands]);

  // Opciones de modelos filtrados por la marca seleccionada
  const handleModel = useMemo(() => {
    return models
      .filter((model) => model.marca.id === selectedBrand)
      .map((model) => ({
        id: model.id,
        name: model.nombre ?? "",
      }));
  }, [models, selectedBrand]);

  const handleStateBrand = (id: number) => {
    setSelectedBrand(id);
    setSelectedModel(0); // reseteamos el modelo al cambiar marca
  };

  const handleStateModel = (id: number) => {
    setSelectedModel(id);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.nombre}
      />

      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        as="textarea"
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.descripcion}
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

      <div className="col-md-4 ">
        <SelectForm
          status={true}
          value={selectedModel}
          title="Modelo"
          items={handleModel}
          onChange={handleStateModel}
          classNameDiv="d-flex align-items-start mb-3 gap-5"
          classNameSelect="ms-1"
          classNameLabel="ms-1"
        />
      </div>

      <div className="ms-1">
        <CheckForm
          text="Versión Activa"
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
      </div>

      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div className="d-flex justify-content-end gap-3 mt-4">
          <GrayButton text="Cancelar" onClick={handleCancel} />
          <GrayButton text="Confirmar" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default ModificarVersion;