import { useState, useMemo } from "react";
import useFormClientValidation from "../../../controllers/controllerHooks/Validations/useFormClientValidation.ts";
import Input from "../GeneralComponents/Input.tsx";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import SelectForm from "../GeneralComponents/SelectForm.tsx";
import GrayButton from "../GeneralComponents/Button.tsx";
import { Search } from "react-bootstrap-icons";
import DateInput from "../GeneralComponents/DateInput.tsx";
import IconButton from "../GeneralComponents/IconButton.tsx";
import useFormValidationUsuarios from "../../../controllers/controllerHooks/Validations/useUsersValidation.ts";
import { setProvinces } from "../../../redux/provincesSlice.ts";
import { setDocumentTypes } from "../../../redux/documentTypeSlice.ts";
import { createUser } from "../../../redux/usuariosSlice.ts";

function CrearUsuario({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) {
  const { errors, validateField, validateForm } = useFormValidationUsuarios();

  const documentTypes: string[] = useAppSelector(
    (state) => state.tipoDocumentos.tipoDocumento
  );
  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );
  const dispatch = useAppDispatch();
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

  const [selectedSex, setSelectedSex] = useState<number>();
  const [selectedRol, setSelectedRol] = useState<number>();
  const [locality, setLocality] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvinces] = useState<number>();
  const [selectedLocality, setSelectedLocality] = useState<number>();
  const [selectedDocumentType, setSelectedDocumentType] = useState<number>();

  const [formUser, setFormUser] = useState<Usuario>({
    id: 0,
    legajo: 0,
    nombres: "",
    correo: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    fechaNacimiento: "",
    telefono: "",
    sexo: "",
    localidad: { id: 0 },
    domicilio: "",
    tipoUsuario: "",
  });

  const handleCancel = (): void => {
    handleCurrentView(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormUser((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };
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

  const handleStateDocumentType = (id: number) => {
    setSelectedDocumentType(id);
    // Encontrar el nombre del tipo documento
    const selectedDocumentType = documentTypes[id - 1] || "";
    setFormUser((prev) => ({ ...prev, tipoDocumento: selectedDocumentType }));
    validateField("tipoDocumento", selectedDocumentType);
  };

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

  const handleStateRol = (id: number) => {
    setSelectedRol(id);
    // Encontrar el nombre del tipo documento
    const selectedRol = tiposDeUsuario[id - 1] || "";
    setFormUser((prev) => ({ ...prev, tipoUsuario: selectedRol }));
    //   validateField("tipoDeUsuario", selectedRol);
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

  async function handleSearchPerson() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASEURL}/api/usuarios/get-person-by-email/${
          formUser.correo
        }`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al obtener la persona");
      }

      setFormUser(data.data);

      const sexoFiltrado = listSex.find((sex) => sex.name === data.data?.sexo);
      const tipoDocFiltrado = handleDocumentType.findIndex(
        (doc) => doc.name === data.data?.tipoDocumento
      );

      setSelectedProvinces(data.data.localidad.provincia.id);
      setSelectedLocality(data.data.localidad.id);
      setSelectedDocumentType(tipoDocFiltrado + 1);
      setSelectedSex(sexoFiltrado?.id);

      alert(`Persona encontrada: ${data.data.nombres}`);
    } catch (error: any) {
      alert(`Hubo un error: ${error.message}`);
      console.error("❌ Error en la petición:", error.message);
      throw error;
    }
  }

  function formatearFecha(fecha: string) {
    if (!fecha || fecha.includes('undefined')) {
      return '';
    }
    // Si la fecha ya está en formato MM/DD/YYYY, la dejamos así
    if (fecha.includes('/')) {
      return fecha;
    }
    // Si la fecha está en formato ISO (YYYY-MM-DD), la convertimos
    if (fecha.includes('-')) {
      const [anio, mes, dia] = fecha.split("-");
      return `${mes}/${dia}/${anio}`;
    }
    return fecha;
  }

  async function crearUsuario() {
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
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASEURL}/api/usuarios/create-user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              personaData: {
                localidad_id: selectedLocality,
                nombres: formUser.nombres,
                apellido: formUser.apellido,
                fechaNacimiento: formUser.fechaNacimiento,
                tipoDocumento: formUser.tipoDocumento,
                documento: formUser.documento,
                domicilio: formUser.domicilio,
                correo: formUser.correo,
                telefono: formUser.telefono,
                sexo: formUser.sexo,
              },
              tipoUsuario: formUser.tipoUsuario,
            }),
          }
        );
        const data = await response.json(); // leer siempre la respuesta

        if (!response.ok) {
          console.error("❌ Backend devolvió error:", data);
          throw new Error(data.message || "Error en validación");
        } else {
          console.log("✅ Usuario creado:", data);
          alert(`Usuario  ${formUser.tipoUsuario} creado exitosamente`);
          handleCurrentView(false);
        }
        dispatch(createUser(data.data))
        console.log("✅ Usuario creado en Redux:", data.data);
          return data;
      } catch (error: any) {
        console.error("❌ Error en la creación:", error);
        alert(`Hubo un error: ${error.message}`);
      }
    } else {
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-10">
          {/* Email y sexo */}
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <Input
                  labelStyle={{ width: "100px" }}
                  classNameDiv="d-flex align-items-center flex-grow-1 me-2"
                  title="Email"
                  onChange={(value) => handleInputChange("correo", value)}
                  place=""
                  value={formUser.correo}
                  error={errors.correo}
                  onBlur={() => validateField("correo", formUser.correo || "")}
                />
                <IconButton icon={Search} onClick={handleSearchPerson} />
              </div>
            </div>

            <div className="col-md-6">
              <SelectForm
                status={true}
                value={selectedSex || 0}
                title="Sexo"
                classNameDiv="d-flex align-items-center gap-2 mb-3"
                classNameLabel="me-2"
                classNameSelect="flex-grow-1"
                items={listSex}
                onChange={handleStateSexo}
                error={errors.sexo}
                onBlur={() => validateField("sexo", formUser.sexo || "")}
              />
            </div>
          </div>

          {/* Teléfono y Provincia */}
          <div className="row mb-3">
            <div className="col-md-6">
              <Input
                labelStyle={{ width: "100px" }}
                classNameDiv="d-flex align-items-start mb-3"
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
                classNameDiv="d-flex align-items-center gap-2 mb-3"
                classNameLabel="me-2"
                classNameSelect="flex-grow-1"
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
          <div className="row mb-3">
            <div className="col-md-6">
              <Input
                labelStyle={{ width: "100px" }}
                classNameDiv="d-flex align-items-start mb-3"
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
                classNameDiv="d-flex align-items-center gap-2 mb-3"
                classNameLabel="me-2"
                classNameSelect="flex-grow-1"
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
          <div className="row mb-3">
            <div className="col-md-6">
              <Input
                labelStyle={{ width: "100px" }}
                classNameDiv="d-flex align-items-start mb-3"
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
                labelStyle={{ width: "100px" }}
                classNameDiv="d-flex align-items-start mb-3"
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
          <div className="row mb-3">
            <div className="col-md-6">
              <SelectForm
                status={true}
                value={selectedDocumentType || 0}
                title="Tipo Documento"
                items={handleDocumentType}
                classNameDiv="d-flex align-items-center gap-2 mb-3"
                classNameLabel="me-2"
                classNameSelect="flex-grow-1"
                onChange={handleStateDocumentType}
                error={errors.tipoDocumento}
                onBlur={() =>
                  validateField("tipoDocumento", formUser.tipoDocumento || "")
                }
              />
            </div>
            <div className="col-md-6">
              <Input
                labelStyle={{ width: "100px" }}
                classNameDiv="d-flex align-items-start mb-3"
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
          <div className="row mb-3">
            <div className="col-md-6">
              <SelectForm
                status={true}
                value={selectedRol || 0}
                title="Rol"
                classNameDiv="d-flex align-items-center gap-2 mb-3"
                classNameLabel="me-2"
                classNameSelect="flex-grow-1"
                items={handleRol}
                onChange={handleStateRol}
                error={errors.tipoUsuario}
                onBlur={() =>
                  validateField("tipoUsuario", formUser.tipoUsuario || "")
                }
              />
            </div>
            <div className="col-md-6">
              <DateInput
                title="Fecha de nacimiento"
                value={formUser.fechaNacimiento || ""}
                labelClassName="me-2 align-self-center"
                inputClassName="w-auto d-inline-block"
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

          {/* Botones */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={crearUsuario} />
          </div>
        </div>
        <div className="col-xl-1"></div>
      </div>
    </div>
  );
}

export default CrearUsuario;
