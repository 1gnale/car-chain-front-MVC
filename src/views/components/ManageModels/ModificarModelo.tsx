import GrayButton from "../GeneralComponents/Button.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/reduxTypedHooks.ts";
import { useState } from "react";
import { useMemo } from "react";
import SelectForm from "../GeneralComponents/SelectForm.tsx";
import CheckForm from "../GeneralComponents/CheckForm.tsx";
import Input from "../GeneralComponents/Input.tsx";
import useFormValidationModelo from "../../../controllers/controllerHooks/Validations/useFormModelValidation.ts";
import { ModeloRepository } from "../../../models/repository/Repositorys/modelosRepository.ts";
import Modal from "../GeneralComponents/Modal.tsx";
import { updateModelo } from "../../../redux/modeloSlice.ts";

function ModificarModelo({
  modelo,
  handleCurrentView,
}: {
  modelo: Modelo;
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const modeloRepo = new ModeloRepository(
    `${import.meta.env.VITE_BASEURL}/api/modelos`
  );

  // validacion
  const { errors, validateField, validateForm } = useFormValidationModelo();

  // Redux datos y dispatch
  const dispatch = useAppDispatch();
  const brandsTotals: Marca[] = useAppSelector((state) => state.marcas.marca);
  const brands = brandsTotals.filter((m: any) => m.activo === true);

  // useState para el select marca
  const [selectedBrand, setSelectedBrand] = useState<number>(
    modelo.marca?.id || 0
  );

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // formulario
  const [formModel, setFormModel] = useState<Modelo>({
    id: modelo.id,
    nombre: modelo.nombre,
    descripcion: modelo.descripcion,
    marca: modelo.marca,
    activo: modelo.activo,
  });

  // botones cancelar y modificar
  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  async function modificarModelo() {
    const model = {
      nombre: formModel.nombre,
      descripcion: formModel.descripcion,
      marca: formModel.marca?.descripcion,
    };
    console.log(formModel);
    if (validateForm(model)) {
      try {
        const response = await modeloRepo.updateModels(formModel);

        console.log("✅ Modelo modificado:", response);

        // Formateamos el usuario para Redux
        const ModeloParaRedux: Modelo = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          descripcion: response.descripcion,
          marca: formModel.marca,
        };

        // Despachamos al store
        dispatch(updateModelo(ModeloParaRedux));
        console.log("✅ Modelo modificado en Redux:", ModeloParaRedux);
        setShowError(true);
        setTitleModalMessage("Modelo modificado");
        setModalMessage("Modelo modificado con exito: " + response.nombre);
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

  // handle que carga las marcas en la marca
  const handleBrand = useMemo(() => {
    return brands.map((brand) => ({
      id: brand.id,
      name: brand.nombre ?? "",
    }));
  }, [brands]);

  // Handle state del select
  const handleStateBrand = (id: number) => {
    setSelectedBrand(id);

    const selectedBrand = brands?.find((marcas) => marcas.id === id);
    console.log(selectedBrand?.descripcion);
    setFormModel((prev) => ({ ...prev, marca: selectedBrand }));

    validateField("marca", selectedBrand?.descripcion || "");
  };

  // Handle de input para rellenar el formulario
  const handleInputChange = (field: string, value: string) => {
    setFormModel((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formModel.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() => validateField("nombre", String(formModel.nombre!))}
      />

      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        as="textarea"
        classNameDiv="d-flex align-items-start mb-3"
        value={formModel.descripcion}
        onChange={(value) => handleInputChange("descripcion", value)}
        error={errors.descripcion}
        onBlur={() =>
          validateField("descripcion", String(formModel.descripcion!))
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
            validateField("marca", String(formModel.marca?.descripcion!))
          }
        />
      </div>
      <div className="ms-1">
        <CheckForm
          text="Modelo Activa"
          checked={formModel.activo}
          onChange={() =>
            setFormModel((prev) => ({
              ...prev,
              ["activo"]: !formModel.activo,
            }))
          }
        />
      </div>
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div className="d-flex justify-content-end gap-3 mt-4">
          <GrayButton text="Cancelar" onClick={handleCancel} />
          <GrayButton text="Confirmar" onClick={modificarModelo} />
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

export default ModificarModelo;
