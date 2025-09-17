import { useState, useMemo } from "react";
import useFormClientValidation from "../../../controllers/controllerHooks/Validations/useFormClientValidation.ts";
import Input from "../GeneralComponents/Input.tsx";
import { useAppSelector } from "../../../redux/reduxTypedHooks.ts";
import SelectForm from "../GeneralComponents/SelectForm.tsx";
import GrayButton from "../GeneralComponents/Button.tsx";
import DateInput from "../GeneralComponents/DateInput.tsx";

function ModificarUsuario({
  handleCurrentView,
  usuario,
}: {
  handleCurrentView: (pass: boolean) => void;
  usuario: Usuario;
}) {
  //(usuario);
  const documentTypes: string[] = useAppSelector(
    (state) => state.tipoDocumentos.tipoDocumento
  );
  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );
  const listSex = [
    { id: 1, name: "Femenino" },
    { id: 2, name: "Masculino" },
  ];
  const tiposDeUsuario = [
    "Administrador",
    "Vendedor",
    "Perito",
    "Gestor de Siniestros",
  ];
  const sexoFiltrado = listSex.find((sex) => sex.name === usuario?.sexo);
  const tipoDocFiltrado: number | undefined = documentTypes.findIndex(
    (doc) => doc === usuario?.tipoDocumento
  );
  const rolFiltrado: number | undefined = tiposDeUsuario.findIndex(
    (doc) => doc === usuario?.tipoUsuario
  );
  //(rolFiltrado);
  const { errors, validateField, validateForm } = useFormClientValidation();
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
  const [formUser, setFormUser] = useState({
    nombre: usuario.nombres || "",
    correo: usuario.correo || "",
    apellido: usuario.apellido || "",
    tipoDocumento: usuario.tipoDocumento || "",
    documento: usuario.documento || "",
    fechaNacimiento: usuario.fechaNacimiento || "",
    telefono: usuario.telefono || "",
    sexo: usuario.sexo || "",
    provincia: usuario.localidad?.provincia?.descripcion || "",
    localidad: usuario.localidad?.descripcion || "",
    domicilio: usuario.domicilio || "",
    tipoDeUsuario: usuario.tipoUsuario || "",
  });

  const handleCancel = (): void => {
    handleCurrentView(true);
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
    setFormUser((prev) => ({ ...prev, tipoDeUsuario: selectedRol }));
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

    // Encontrar el nombre de la provincia seleccionado
    const selectedProvinceName =
      provinces.find((province) => province.id === id)?.descripcion || "";
    setFormUser((prev) => ({ ...prev, provincia: selectedProvinceName }));
    setFormUser((prev) => ({ ...prev, provinciaId: id }));
    validateField("provincia", selectedProvinceName);
  };
  const handleStateLocality = (id: number) => {
    setSelectedLocality(id);

    const selectedLocalityName =
      localities?.find((localidad) => localidad.id === id)?.descripcion || "";
    setFormUser((prev) => ({ ...prev, localidad: selectedLocalityName }));
    validateField("localidad", selectedLocalityName);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-10">
          {/* Email y sexo */}
          <div className="row mb-3">
            <div className="col-md-6">
              <Input
                labelStyle={{ width: "100px" }}
                classNameDiv="d-flex align-items-start mb-3"
                title="Email"
                onChange={(value) => handleInputChange("correo", value)}
                place=""
                value={formUser.correo}
              />
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
                onBlur={() => validateField("sexo", formUser.sexo)}
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
                error={errors.provincia}
                onBlur={() => validateField("provincia", formUser.provincia)}
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
                onChange={(value) => handleInputChange("nombre", value)}
                value={formUser.nombre}
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
                error={errors.localidad}
                onBlur={() => validateField("localidad", formUser.localidad)}
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
                  validateField("tipoDocumento", formUser.tipoDocumento)
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
              />
            </div>
            <div className="col-md-6">
              <DateInput
                title="Fecha de nacimiento"
                value={formUser.fechaNacimiento}
                labelClassName="me-2 align-self-center"
                inputClassName="w-auto d-inline-block"
                onChange={(value) =>
                  handleInputChange("fechaNacimiento", value)
                }
                onBlur={(value) => validateField("fechaNacimiento", value)}
                error={errors.fechaNacimiento}
                showFormat={false}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={() => {}} />
          </div>
        </div>
        <div className="col-xl-1"></div>
      </div>
    </div>
  );
}

export default ModificarUsuario;
