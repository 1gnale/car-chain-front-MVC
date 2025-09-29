import { useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import Input from "../GeneralComponents/Input";
import useFormValidationMarca from "../../../controllers/controllerHooks/Validations/useFormBrandsValidation";
import { MarcaRepository } from "../../../models/repository/Repositorys/marcaRepository";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import Modal from "../GeneralComponents/Modal";
import { createBrand } from "../../../redux/marcaSlice";

function CrearMarca({
  handleCurrentView,
}: {
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

  //formulario
  const [formMarca, setFormMarca] = useState<Marca>({
    id: 0,
    nombre: "",
    descripcion: "",
  });

  // botones  ( cancelar, crear)
  const handleCancel = (): void => {
    handleCurrentView(false);
  };
  async function crearMarca() {
    const marca = {
      nombre: formMarca.nombre,
      descripcion: formMarca.descripcion,
    };
    console.log(marca);
    if (validateForm(marca)) {
      try {
        const response = await marcasRepo.createBrands(formMarca);

        console.log("✅ Marca creado:", response);

        // Formateamos el usuario para Redux
        const MarcaParaRedux: Marca = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          descripcion: response.descripcion,
        };

        // Despachamos al store
        dispatch(createBrand(MarcaParaRedux));
        console.log("✅ Marca creado en Redux:", MarcaParaRedux);
        setShowError(true);
        setTitleModalMessage("Marca creado");
        setModalMessage("Marca creado con exito: " + response.nombre);
        setMessageType("success");

        setFormMarca({ id: 0 });
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
      />{" "}
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div
          className="d-grid d-md-flex justify-content-md-end"
          style={{ padding: "10px", gap: "2rem" }}
        >
          {/* Botones */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={crearMarca} />
          </div>
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

export default CrearMarca;
