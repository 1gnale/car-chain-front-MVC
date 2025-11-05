import GrayButton from "../GeneralComponents/Button";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/reduxTypedHooks.ts";
import useFormValidation from "../../../controllers/controllerHooks/Validations/useFormValidation.ts";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import SelectForm from "../GeneralComponents/SelectForm";
import { useLocalStorage } from "../../../controllers/controllerHooks/LocalStorage/useLocalStorage.ts";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";
import useUpdateVersion from "../../../controllers/controllerHooks/Mutations/useUpdateVersionHook.ts";
import useFormValidationVersion from "../../../controllers/controllerHooks/Validations/useFormVersionsValidation.ts";
import { VersionRepository } from "../../../models/repository/Repositorys/versionRepository.ts";
import Modal from "../GeneralComponents/Modal";
import {
  updateVersion,
  updateVersionState,
} from "../../../redux/versionSlice.ts";

function ModificarVersion({
  version,
  handleCurrentView,
}: {
  version: Version;
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const versionRepo = new VersionRepository(
    `${import.meta.env.VITE_BASEURL}/api/versiones`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const modelsTotals: Modelo[] = useAppSelector(
    (state) => state.modelos.modelo
  );
  const brandsTotals: Marca[] = useAppSelector((state) => state.marcas.marca);

  const brands = brandsTotals.filter((m: any) => m.activo === true);
  const models = modelsTotals.filter((m: any) => m.activo === true);

  // validacion
  const { errors, validateField, validateForm } = useFormValidationVersion();

  // Estado de marca y modelo
  const [selectedBrand, setSelectedBrand] = useState<number>(
    version.modelo?.marca?.id || 0
  );
  const [selectedModel, setSelectedModel] = useState<number>(
    version.modelo?.id || 0
  );

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // form con los datos de la versión
  const [formVersion, setFormVersion] = useState<Version>({
    id: version.id,
    nombre: version.nombre,
    descripcion: version.descripcion,
    precio_mercado: version.precio_mercado,
    precio_mercado_gnc: version.precio_mercado_gnc,
    modelo: version.modelo,
    activo: version.activo,
  });

  // Manejadores de cambio para los inputs
  const handleInputChange = (field: keyof Version, value: string | number) => {
    setFormVersion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // HANDLES PARA CARGAR SELECTS
  const handleBrand = useMemo(() => {
    return brands.map((brand) => ({
      id: brand.id,
      name: brand.nombre ?? "",
    }));
  }, [brands]);

  const handleModel = useMemo(() => {
    return models
      .filter((model) => model.marca?.id === selectedBrand)
      .map((model) => ({
        id: model.id,
        name: model.nombre ?? "",
      }));
  }, [models, selectedBrand]);

  // handle state para los selects seleccionados
  const handleStateBrand = (id: number) => {
    setSelectedBrand(id);
    setSelectedModel(0);

    // Encontrar la marca seleccionado
    const selectedBrand = brands.find((Brand) => Brand.id === id);

    const modelo = formVersion.modelo;
    if (modelo) {
      modelo.marca = selectedBrand;
    }

    setFormVersion((prev) => ({
      ...prev,
      modelo: modelo,
    }));

    validateField("marca", formVersion.modelo?.marca?.nombre || "");
  };
  const handleStateModel = (id: number) => {
    setSelectedModel(id);

    const selectedModel = models?.find((model) => model.id === id);

    setFormVersion((prev) => ({ ...prev, modelo: selectedModel }));

    validateField("modelo", selectedModel?.nombre || "");
  };

  // BOTONES MODIFICAR CANCELAR

  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  async function modificarVersion() {
    const version = {
      nombre: formVersion.nombre,
      descripcion: formVersion.descripcion,
      precio_mercado: formVersion.precio_mercado,
      precio_mercado_gnc: formVersion.precio_mercado_gnc,
      modelo: formVersion.modelo?.descripcion,
      marca: formVersion.modelo?.marca?.descripcion,
    };
    console.log(formVersion);
    if (validateForm(version)) {
      try {
        const response = await versionRepo.updateVersions(formVersion);

        console.log("✅ Version modificada:", response);

        // Formateamos el usuario para Redux
        const VersionParaRedux: Version = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          descripcion: response.descripcion,
          precio_mercado: response.precio_mercado,
          precio_mercado_gnc: response.precio_mercado_gnc,
          modelo: formVersion.modelo,
          activo: response.activo,
        };

        // Despachamos al store
        dispatch(updateVersion(VersionParaRedux));
        console.log("✅ Version modificada en Redux:", VersionParaRedux);
        setShowError(true);
        setTitleModalMessage("Version modificada");
        setModalMessage("Version modificada con exito: " + response.nombre);
        setMessageType("success");
      } catch (error: any) {
        setTitleModalMessage("ERROR");
        setShowError(true);
        setModalMessage(error.message || "Error desconocido");
        setMessageType("error");
      }
    } else {
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() => validateField("nombre", String(formVersion.nombre!))}
      />

      <Input
        title="Precio Mercado"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.precio_mercado?.toString() || ""}
        onChange={(value) => handleInputChange("precio_mercado", value)}
        error={errors.precio_mercado}
        onBlur={() =>
          validateField("precio_mercado", String(formVersion.precio_mercado!))
        }
      />

      <Input
        title="Precio Mercado GNC"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.precio_mercado_gnc?.toString() || ""}
        onChange={(value) => handleInputChange("precio_mercado_gnc", value)}
        error={errors.precio_mercado_gnc}
        onBlur={() =>
          validateField(
            "precio_mercado_gnc",
            String(formVersion.precio_mercado_gnc!)
          )
        }
      />

      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        as="textarea"
        classNameDiv="d-flex align-items-start mb-3"
        value={formVersion.descripcion}
        onChange={(value) => handleInputChange("descripcion", value)}
        error={errors.descripcion}
        onBlur={() =>
          validateField("descripcion", String(formVersion.descripcion!))
        }
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
          error={errors.marca}
          onBlur={() =>
            validateField("marca", String(formVersion.modelo?.marca?.nombre!))
          }
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
          error={errors.modelo}
          onBlur={() =>
            validateField("modelo", String(formVersion.modelo?.nombre!))
          }
        />
      </div>
      <CheckForm
        text="Version Activa"
        checked={formVersion.activo}
        onChange={() =>
          setFormVersion((prev) => ({
            ...prev,
            ["activo"]: !formVersion.activo,
          }))
        }
      />
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div className="d-flex justify-content-end gap-3 mt-4">
          <GrayButton text="Cancelar" onClick={handleCancel} />
          <GrayButton text={"Confirmar"} onClick={modificarVersion} />
        </div>
      </div>
      <Modal
        show={showError}
        onClose={
          messageType == "success"
            ? () => {
                setShowError(false);
                handleCurrentView(true);
              }
            : () => {
                setShowError(false);
              }
        }
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
}

export default ModificarVersion;
