import GrayButton from "../GeneralComponents/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { useState } from "react";
import { useMemo } from "react";
import SelectForm from "../GeneralComponents/SelectForm";
import Input from "../GeneralComponents/Input";
import { ModeloRepository } from "../../../models/repository/Repositorys/modelosRepository";
import useFormValidationModelo from "../../../controllers/controllerHooks/Validations/useFormModelValidation";
import { createModel } from "../../../redux/modeloSlice";
import Modal from "../GeneralComponents/Modal";

function CrearModelo({
  handleCurrentView,
}: {
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

  // UseState para el select
  const [selectedBrand, setSelectedBrand] = useState(0);

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // Formulario
  const [formModel, setformModel] = useState<Modelo>({
    id: 0,
    nombre: "",
    descripcion: "",
    marca: { id: 0, descripcion: "" },
  });

  // Handle para cargar el select
  const handleBrand = useMemo(() => {
    const result = brands.map((brand) => {
      return { id: brand.id, name: brand.nombre ?? "" };
    });
    return result;
  }, [brands]);

  // Handle state del select
  const handleStateBrand = (id: number) => {
    setSelectedBrand(id);

    const selectedBrand = brands?.find((marcas) => marcas.id === id);
    console.log(selectedBrand?.descripcion);
    setformModel((prev) => ({ ...prev, marca: selectedBrand }));

    validateField("marca", selectedBrand?.descripcion || "");
  };

  // Handle de input para rellenar el formulario
  const handleInputChange = (field: string, value: string) => {
    setformModel((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // Botones cancelar y crear
  async function crearModelo() {
    const model = {
      nombre: formModel.nombre,
      descripcion: formModel.descripcion,
      marca: formModel.marca?.descripcion,
    };
    console.log(formModel);
    if (validateForm(model)) {
      try {
        const response = await modeloRepo.createModels(formModel);

        console.log("✅ Modelo creado:", response);

        // Formateamos el usuario para Redux
        const ModeloParaRedux: Modelo = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          descripcion: response.descripcion,
          marca: formModel.marca,
        };

        // Despachamos al store
        dispatch(createModel(ModeloParaRedux));
        console.log("✅ Modelo creado en Redux:", ModeloParaRedux);
        setShowError(true);
        setTitleModalMessage("Modelo creado");
        setModalMessage("Modelo creado con exito: " + response.nombre);
        setMessageType("success");

        setformModel({ id: 0, marca: { id: 0 } });
        setSelectedBrand(0);
      } catch (error: any) {
        setTitleModalMessage("ERROR");
        setShowError(true);
        setModalMessage(error.message || "Error desconocido");
        setMessageType("error");
      }
    } else {
    }
  }
  const handleCancel = (): void => {
    handleCurrentView(false);
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
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div className="d-flex justify-content-end gap-3 mt-4">
          <GrayButton text="Cancelar" onClick={handleCancel} />
          <GrayButton text="Confirmar" onClick={crearModelo} />
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

export default CrearModelo;
