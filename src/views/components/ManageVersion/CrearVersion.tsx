import GrayButton from "../GeneralComponents/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import { useMemo } from "react";
import SelectForm from "../GeneralComponents/SelectForm";
import Input from "../GeneralComponents/Input";
import { VersionRepository } from "../../../models/repository/Repositorys/versionRepository";
import { setModelo } from "../../../redux/modeloSlice";
import Modal from "../GeneralComponents/Modal";
import useFormValidationVersion from "../../../controllers/controllerHooks/Validations/useFormVersionsValidation";
import { createVersion } from "../../../redux/versionSlice";

function CrearVersion({
  handleCurrentView,
}: {
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

  // Usestates de los selects
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // form con los datos de la versión
  const [formVersion, setFormVersion] = useState<Version>({
    id: 0,
    nombre: "",
    descripcion: "",
    precio_mercado: 0,
    precio_mercado_gnc: 0,
    modelo: { id: 0, descripcion: "", marca: { id: 0, descripcion: "" } },
    activo: true,
  });

  // Handle para rellenar los selects
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

  // handle state para los selects seleccionados
  const handleStateBrand = (id: number) => {
    setSelectedBrand(id);
    setModelo(true);
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

  // Handle de input para rellenar el formulario
  const handleInputChange = (field: string, value: string) => {
    setFormVersion((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // Botones crear y cancelar
  const handleCancel = (): void => {
    handleCurrentView(false);
  };

  async function crearVersion() {
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
        const response = await versionRepo.createVersions(formVersion);

        console.log("✅ Version creada:", response);

        // Formateamos el usuario para Redux
        const VersionParaRedux: Version = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          descripcion: response.descripcion,
          precio_mercado: response.precio_mercado,
          precio_mercado_gnc: response.precio_mercado_gnc,
          modelo: formVersion.modelo,
        };

        // Despachamos al store
        dispatch(createVersion(VersionParaRedux));
        console.log("✅ Version creada en Redux:", VersionParaRedux);
        setShowError(true);
        setTitleModalMessage("Version creada");
        setModalMessage("Version creada con exito: " + response.nombre);
        setMessageType("success");

        setFormVersion({ id: 0, modelo: { id: 0 } });
        setSelectedBrand(0);
        setSelectedModel(0);
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

      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div className="d-flex justify-content-end gap-3 mt-4">
          <GrayButton text="Cancelar" onClick={handleCancel} />
          <GrayButton text={"Confirmar"} onClick={crearVersion} />
        </div>
      </div>
      <Modal
        show={showError}
        onClose={() => setShowError(false)}
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
}

export default CrearVersion;
