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
import useUpdateVersion from "../../controllers/controllerHooks/Mutations/useUpdateVersionHook.ts";

function ModificarVersion({
  version,
  handleCurrentView,
}: {
  version: Version;
  handleCurrentView: (pass: boolean) => void;
}) {
  const [checkbox, setCheckbox] = useState<boolean>(version.activo!);
  
  // Hook para actualizar versión
  const { updateVersion, loading, error, success } = useUpdateVersion();

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

  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  // Función para manejar la actualización
  const handleUpdate = async (): Promise<void> => {
    try {
      // Buscar el modelo seleccionado
      const selectedModelData = models.find(model => model.id === selectedModel);
      
      if (!selectedModelData) {
        alert('Por favor selecciona un modelo válido');
        return;
      }

      const updatedVersionData: Partial<Version> = {
        nombre: formVersion.nombre,
        descripcion: formVersion.descripcion,
        precio_mercado: formVersion.precio_mercado,
        precio_mercado_gnc: formVersion.precio_mercado_gnc,
        modelo: selectedModelData,
        activo: checkbox,
      };

      await updateVersion(version.id!, updatedVersionData);
      
      if (success) {
        alert('Versión actualizada exitosamente');
        handleCurrentView(true);
      }
    } catch (err) {
      alert(`Error al actualizar la versión: ${error || 'Error desconocido'}`);
    }
  };

  // Manejadores de cambio para los inputs
  const handleInputChange = (field: keyof Version, value: string | number) => {
    setFormVersion(prev => ({
      ...prev,
      [field]: value
    }));
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
    // Actualizar el modelo en formVersion
    const selectedModelData = models.find(model => model.id === id);
    if (selectedModelData) {
      setFormVersion(prev => ({
        ...prev,
        modelo: selectedModelData
      }));
    }
  };

  // Efecto para actualizar el modelo cuando cambien los selects
  useEffect(() => {
    const selectedModelData = models.find(model => model.id === selectedModel);
    if (selectedModelData) {
      setFormVersion(prev => ({
        ...prev,
        modelo: selectedModelData
      }));
    }
  }, [selectedModel, models]);

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.nombre}
        onChange={(value) => handleInputChange('nombre', value)}
      />

      <Input
        title="Precio Mercado"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.precio_mercado?.toString() || ''}
        onChange={(value) => handleInputChange('precio_mercado', parseFloat(value) || 0)}
      />

      <Input
        title="Precio Mercado GNC"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.precio_mercado_gnc?.toString() || ''}
        onChange={(value) => handleInputChange('precio_mercado_gnc', parseFloat(value) || 0)}
      />

      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        as="textarea"
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.descripcion}
        onChange={(value) => handleInputChange('descripcion', value)}
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

      {/* Mostrar errores */}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          Error: {error}
        </div>
      )}

      {/* Mostrar éxito */}
      {success && (
        <div className="alert alert-success mt-3" role="alert">
          Versión actualizada exitosamente
        </div>
      )}

      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div className="d-flex justify-content-end gap-3 mt-4">
          <GrayButton text="Cancelar" onClick={handleCancel} />
          <GrayButton 
            text={loading ? "Actualizando..." : "Confirmar"} 
            onClick={handleUpdate}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ModificarVersion;