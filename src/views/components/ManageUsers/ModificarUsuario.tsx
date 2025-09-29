import { useState, useMemo } from "react";
import useFormClientValidation from "../../../controllers/controllerHooks/Validations/useFormClientValidation.ts";
import Input from "../GeneralComponents/Input.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/reduxTypedHooks.ts";
import SelectForm from "../GeneralComponents/SelectForm.tsx";
import GrayButton from "../GeneralComponents/Button.tsx";
import DateInputDark from "../GeneralComponents/DateInputDark.tsx";
import Modal from "../GeneralComponents/Modal.tsx";
import CheckForm from "../GeneralComponents/CheckForm.tsx";
import useFormValidationUsuarios from "../../../controllers/controllerHooks/Validations/useUsersValidation.ts";
import { UsuarioRepository } from "../../../models/repository/Repositorys/UsuariosRepository.ts";
import { updateUsuario } from "../../../redux/usuariosSlice.ts";
import DateInputClear from "../GeneralComponents/DateInput.tsx";

function ModificarUsuario({
  handleCurrentView,
  usuario,
}: {
  handleCurrentView: (pass: boolean) => void;
  usuario: Usuario;
}) {
  // Repositorio para los ENDPOINTS
  const usuarioRepo = new UsuarioRepository(
    `${import.meta.env.VITE_BASEURL}/api/usuarios`
  );
  const dispatch = useAppDispatch();

  // Hook para las validaaciones
  const { errors, validateField, validateForm } = useFormValidationUsuarios();

  // Me traigo del redux los datos necesarios (Tipos de doc, provincias, localidades y una funcion que actualiza el dispach)
  const documentTypes: string[] = useAppSelector(
    (state) => state.tipoDocumentos.tipoDocumento
  );
  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );

  // Lista del select
  const listSex = [
    { id: 1, name: "Femenino" },
    { id: 2, name: "Masculino" },
  ];
  const tiposDeUsuario = [
    "ADMINISTRADOR",
    "VENDEDOR",
    "PERITO",
    "GESTOR_DE_SINIESTROS",
  ];

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // states de selects
  const sexoFiltrado = listSex.find((sex) => sex.name === usuario?.sexo);
  const tipoDocFiltrado: number | undefined = documentTypes.findIndex(
    (doc) => doc === usuario?.tipoDocumento
  );
  const rolFiltrado: number | undefined = tiposDeUsuario.findIndex(
    (doc) => doc === usuario?.tipoUsuario
  );
  const [selectedSex, setSelectedSex] = useState(sexoFiltrado?.id);
  const [selectedRol, setSelectedRol] = useState(rolFiltrado + 1);
  const [locality, setLocality] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvinces] = useState(
    usuario.localidad?.provincia?.id
  );
  const [selectedLocality, setSelectedLocality] = useState(
    usuario.localidad?.id
  );
  const [selectedDocumentType, setSelectedDocumentType] = useState(
    tipoDocFiltrado + 1
  );

  // Formulario
  const [formUser, setFormUser] = useState<Usuario>({
    id: usuario.id,
    legajo: usuario.legajo,
    nombres: usuario.nombres || "",
    correo: usuario.correo || "",
    apellido: usuario.apellido || "",
    tipoDocumento: usuario.tipoDocumento || "",
    documento: usuario.documento || "",
    fechaNacimiento: usuario.fechaNacimiento || "",
    telefono: usuario.telefono || "",
    sexo: usuario.sexo || "",
    localidad: usuario.localidad,
    domicilio: usuario.domicilio || "",
    tipoUsuario: usuario.tipoUsuario || "",
    activo: usuario.activo,
  });

  // Handles de selects
  const handleProvinces = useMemo(() => {
    const result = provinces.map((provinces) => {
      return { id: provinces.id, name: provinces.descripcion! };
    });
    return result;
  }, [provinces]);

  const handleDocumentType = useMemo(() => {
    const result = documentTypes.map((documentTypes, idx) => {
      return { id: idx + 1, name: documentTypes };
    });

    return result;
  }, [documentTypes]);

  const handleLocality = useMemo(() => {
    const localitysFiltred = localities.filter(
      (locality) => locality.provincia?.id === selectedProvince
    );

    const result = localitysFiltred.map((locality) => ({
      id: locality.id,
      name: locality.descripcion ?? "",
    }));
    return result;
  }, [localities, selectedProvince]);

  const handleRol = useMemo(() => {
    const result = tiposDeUsuario.map((tipoDeUsuario, idx) => {
      return { id: idx + 1, name: tipoDeUsuario };
    });

    return result;
  }, [tiposDeUsuario]);

  // Handles states para rellenar formulario formulario
  const handleInputChange = (field: string, value: string) => {
    setFormUser((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  const handleStateDocumentType = (id: number) => {
    setSelectedDocumentType(id);
    // Encontrar el nombre del tipo documento
    const selectedDocumentType = documentTypes[id - 1] || "";
    setFormUser((prev) => ({ ...prev, tipoDocumento: selectedDocumentType }));
    validateField("tipoDocumento", selectedDocumentType);
  };

  const handleStateRol = (id: number) => {
    setSelectedRol(id);
    // Encontrar el nombre del tipo documento
    const selectedRol = tiposDeUsuario[id - 1] || "";
    setFormUser((prev) => ({ ...prev, tipoUsuario: selectedRol }));
  };

  const handleStateSexo = (id: number) => {
    setSelectedSex(id);

    // Encontrar el nombre del sexo seleccionada
    const selectedSexName = listSex.find((sex) => sex.id === id)?.name || "";
    setFormUser((prev) => ({ ...prev, sexo: selectedSexName }));
    setFormUser((prev) => ({ ...prev, sexoId: id }));
    validateField("sexo", selectedSexName);
  };

  const handleStateProvinces = (id: number) => {
    setSelectedProvinces(id);
    setLocality(true);
    setSelectedLocality(0);

    validateField("provincia_id", String(id));
  };

  const handleStateLocality = (id: number) => {
    setSelectedLocality(id);

    setFormUser((prev) => ({ ...prev, localidad: { id } }));
    validateField("localidad_id", String(id));
  };

  // FUNCION AUXILIAR
  function formatearFecha(fecha: string) {
    if (!fecha || fecha.includes("undefined")) {
      return "";
    }
    // Si la fecha ya está en formato MM/DD/YYYY, la dejamos así
    if (fecha.includes("/")) {
      return fecha;
    }
    // Si la fecha está en formato ISO (YYYY-MM-DD), la convertimos
    if (fecha.includes("-")) {
      const [anio, mes, dia] = fecha.split("-");
      return `${mes}/${dia}/${anio}`;
    }
    return fecha;
  }

  // HANDLES BOTONES
  async function modificarUsuario() {
    const user = {
      nombres: formUser.nombres,
      apellido: formUser.apellido,
      fechaNacimiento: formatearFecha(formUser.fechaNacimiento!),
      tipoDocumento: formUser.tipoDocumento,
      documento: formUser.documento,
      domicilio: formUser.domicilio,
      correo: formUser.correo,
      telefono: formUser.telefono,
      sexo: formUser.sexo,
      localidad_id: String(selectedLocality),
      provincia_id: String(selectedProvince),
      tipoUsuario: formUser.tipoUsuario,
    };
    console.log(user);
    if (validateForm(user)) {
      if (window.confirm("¿Estás seguro de que querés modificar al usuario?")) {
        try {
          const personData = {
            localidad_id: String(selectedLocality),
            nombres: formUser.nombres,
            apellido: formUser.apellido,
            fechaNacimiento: formatearFecha(formUser.fechaNacimiento!),
            tipoDocumento: formUser.tipoDocumento,
            documento: formUser.documento,
            domicilio: formUser.domicilio,
            correo: formUser.correo,
            telefono: formUser.telefono,
            sexo: formUser.sexo,
          };
          const response = await usuarioRepo.updateUser(
            formUser.legajo!,
            personData,
            formUser.tipoUsuario!,
            formUser.activo!
          );
          console.log("✅ Usuario creado:", response);

          // Formateamos el usuario para Redux
          const usuarioParaRedux: Usuario = {
            ...response,
            nombres: response.nombres,
            apellido: response.apellido,
            correo: response.correo,
            documento: response.documento,
            tipoDocumento: response.tipoDocumento,
            activo: formUser.activo,
            legajo: response.legajo || response.id,
          };

          // Despachamos al store
          dispatch(updateUsuario(usuarioParaRedux));
          console.log("✅ Usuario creado en Redux:", usuarioParaRedux);

          setTitleModalMessage("EXITO");
          setShowError(true);
          setModalMessage("Usuario modificado con exito");
          setMessageType("success");
        } catch (error: any) {
          setTitleModalMessage("ERROR");
          setShowError(true);
          setModalMessage(error.message || "Error desconocido");
          setMessageType("error");
        }
      }
    } else {
    }
  }

  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-10">
          {/* Email y sexo */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="d-flex align-items-end mb-3">
                <div className="flex-grow-1 me-2">
                  <Input
                    classNameDiv="w-100"
                    disabled={true}
                    classNameLabel="form-label mb-2"
                    title="Email"
                    onChange={(value) => handleInputChange("correo", value)}
                    place=""
                    value={formUser.correo}
                    error={errors.correo}
                    onBlur={() =>
                      validateField("correo", formUser.correo || "")
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <SelectForm
                status={true}
                value={selectedSex || 0}
                title="Sexo"
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                classNameSelect="form-select"
                items={listSex}
                onChange={handleStateSexo}
                error={errors.sexo}
                onBlur={() => validateField("sexo", formUser.sexo || "")}
              />
            </div>
          </div>

          {/* Teléfono y Provincia */}
          <div className="row mb-4">
            <div className="col-md-6">
              <Input
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                title="Teléfono"
                place=""
                onChange={(value) => handleInputChange("telefono", value)}
                value={formUser.telefono}
                error={errors.telefono}
                onBlur={() =>
                  validateField("telefono", formUser.telefono || "")
                }
              />
            </div>
            <div className="col-md-6">
              <SelectForm
                status={true}
                value={selectedProvince || 0}
                title="Provincia"
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                classNameSelect="form-select"
                items={handleProvinces}
                onChange={handleStateProvinces}
                error={errors.provincia_id}
                onBlur={() =>
                  validateField("provincia_id", String(selectedProvince) || "")
                }
              />
            </div>
          </div>

          {/* Nombre y Localidad */}
          <div className="row mb-4">
            <div className="col-md-6">
              <Input
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                title="Nombre/s"
                place=""
                onChange={(value) => handleInputChange("nombres", value)}
                value={formUser.nombres}
                error={errors.nombres}
                onBlur={() => validateField("nombres", formUser.nombres || "")}
              />
            </div>
            <div className="col-md-6">
              <SelectForm
                status={locality}
                value={selectedLocality || 0}
                title="Localidad"
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                classNameSelect="form-select"
                items={handleLocality}
                onChange={handleStateLocality}
                error={errors.localidad_id}
                onBlur={() =>
                  validateField("localidad_id", String(selectedLocality) || "")
                }
              />
            </div>
          </div>

          {/* Apellido y Domicilio */}
          <div className="row mb-4">
            <div className="col-md-6">
              <Input
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                title="Apellido/s"
                place=""
                onChange={(value) => handleInputChange("apellido", value)}
                value={formUser.apellido}
                error={errors.apellido}
                onBlur={() =>
                  validateField("apellido", formUser.apellido || "")
                }
              />
            </div>
            <div className="col-md-6">
              <Input
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                title="Domicilio"
                place=""
                onChange={(value) => handleInputChange("domicilio", value)}
                value={formUser.domicilio}
                error={errors.domicilio}
                onBlur={() =>
                  validateField("domicilio", formUser.domicilio || "")
                }
              />
            </div>
          </div>

          {/* Tipo Documento y Documento */}
          <div className="row mb-4">
            <div className="col-md-6">
              <SelectForm
                status={true}
                value={selectedDocumentType || 0}
                title="Tipo Documento"
                items={handleDocumentType}
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                classNameSelect="form-select"
                onChange={handleStateDocumentType}
                error={errors.tipoDocumento}
                onBlur={() =>
                  validateField("tipoDocumento", formUser.tipoDocumento || "")
                }
              />
            </div>
            <div className="col-md-6">
              <Input
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                title="Documento"
                place=""
                onChange={(value) => handleInputChange("documento", value)}
                value={formUser.documento}
                error={errors.documento}
                onBlur={() =>
                  validateField("documento", formUser.documento || "")
                }
              />
            </div>
          </div>

          {/* Rol y Fecha */}
          <div className="row mb-4">
            <div className="col-md-6">
              <SelectForm
                status={true}
                value={selectedRol || 0}
                title="Rol"
                classNameDiv="mb-3"
                classNameLabel="form-label mb-2"
                classNameSelect="form-select"
                items={handleRol}
                onChange={handleStateRol}
                error={errors.tipoUsuario}
                onBlur={() =>
                  validateField("tipoUsuario", formUser.tipoUsuario || "")
                }
              />
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <DateInputClear
                  title="Fecha de nacimiento"
                  value={formUser.fechaNacimiento || ""}
                  labelClassName="form-label mb-2"
                  inputClassName="form-control"
                  className=""
                  onChange={(value) =>
                    handleInputChange("fechaNacimiento", value)
                  }
                  error={errors.fechaNacimiento}
                  onBlur={() =>
                    validateField(
                      "fechaNacimiento",
                      formUser.fechaNacimiento || ""
                    )
                  }
                  showFormat={false}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <CheckForm
                text="Usuario activo"
                checked={formUser.activo}
                onChange={() =>
                  setFormUser((prev) => ({
                    ...prev,
                    ["activo"]: !formUser.activo,
                  }))
                }
              />
            </div>{" "}
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Modificar" onClick={modificarUsuario} />
          </div>
        </div>
        <div className="col-xl-1"></div>
      </div>
      <Modal
        show={showError}
        onClose={() => {
          setShowError(false);
          handleCurrentView(true);
        }}
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
}

export default ModificarUsuario;
