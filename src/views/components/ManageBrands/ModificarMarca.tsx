import GrayButton from "../GeneralComponents/Button";
import CheckForm from "../GeneralComponents/CheckForm";
import { useState } from "react";
import Input from "../GeneralComponents/Input";
import { MarcaRepository } from "../../../models/repository/Repositorys/marcaRepository";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import useFormValidationMarca from "../../../controllers/controllerHooks/Validations/useFormBrandsValidation";
import Modal from "../GeneralComponents/Modal";
import { setMarcas, updateMarca } from "../../../redux/marcaSlice";
// 1: La informacion que sale en const marca aparezca en cada textarea,select,checkbos, etc
// 2: Agregar un checkbox para saber si la marca esta inactivo o no.

function ModificarMarca({
  marca,
  handleCurrentView,
}: {
  marca: Marca;
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const marcasRepo = new MarcaRepository(
    `${import.meta.env.VITE_BASEURL}/api/marcas`
  );

  // Redux datos y dispatch
  const dispatch = useAppDispatch();

  // validacion
  const { errors, validateField, validateForm } = useFormValidationMarca();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // formulario
  const [formMarca, setFormMarca] = useState<Marca>({
    id: marca.id,
    nombre: marca.nombre,
    descripcion: marca.descripcion,
    activo: marca.activo,
  });

  // Botones cancelar modificar
  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  async function modificarMarca() {
    const marca = {
      nombre: formMarca.nombre,
      descripcion: formMarca.descripcion,
    };
    console.log(marca);
    if (validateForm(marca)) {
      try {
        const response = await marcasRepo.updateBrands(formMarca);

        console.log("✅ Marca modifiado:", response);

        // Formateamos el usuario para Redux
        const MarcaParaRedux: Marca = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          descripcion: response.descripcion,
        };

        // Despachamos al store
        dispatch(updateMarca(MarcaParaRedux));
        console.log("✅ Marca modifiado en Redux:", MarcaParaRedux);
        setShowError(true);
        setTitleModalMessage("Marca modifiado");
        setModalMessage("Marca modifiado con exito: " + response.nombre);
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

  // HANDLE PARA RELLENAR FORMULARIO
  const handleInputChange = (field: string, value: string) => {
    setFormMarca((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };
  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formMarca.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() => validateField("nombre", String(formMarca.nombre!))}
      />
      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formMarca.descripcion}
        as="textarea"
        onChange={(value) => handleInputChange("descripcion", value)}
        error={errors.descripcion}
        onBlur={() =>
          validateField("descripcion", String(formMarca.descripcion!))
        }
      />
      <CheckForm
        text="Marca Activa"
        checked={formMarca.activo}
        onChange={() =>
          setFormMarca((prev) => ({
            ...prev,
            ["activo"]: !formMarca.activo,
          }))
        }
      />
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div
          className="d-grid d-md-flex justify-content-md-end"
          style={{ padding: "10px", gap: "2rem" }}
        >
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={modificarMarca} />
          </div>
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

export default ModificarMarca;
