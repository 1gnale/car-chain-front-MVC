import { useEffect, useState, useMemo } from "react";
import Input from "../GeneralComponents/Input";
import TitleForm from "../GeneralComponents/TitleForm";
import GrayButton from "../GeneralComponents/Button";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import useFormClientValidation from "../../../controllers/controllerHooks/Validations/useFormClientValidation";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook";
import SelectForm from "../GeneralComponents/SelectForm";
import { User, Shield, MapPin } from "lucide-react";
const AccountDataInputs = ({ user }: { user: Cliente }) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [selectedDocumentType, setSelectedDocumentType] = useState(0);

  const [formClient, setFormClient] = useState<Cliente>({
    idClient: user.idClient || 0,
    id: user.id || 0,
    nombres: user.nombres || "",
    apellido: user.apellido || "",
    fechaNacimiento: user.fechaNacimiento || "",
    tipoDocumento: user.tipoDocumento || "",
    documento: user.documento || "",
    domicilio: user.domicilio || "",
    correo: user.correo || "",
    telefono: user.telefono || "",
    sexo: user.sexo || "",
    contraseña: "",
    localidad: {
      id: user.localidad?.id || 0,
      descripcion: user.localidad?.descripcion || "",
      codigoPostal: user.localidad?.codigoPostal || "",
      provincia: {
        id: user.localidad?.provincia?.id || 0,
        descripcion: user.localidad?.provincia?.descripcion || "",
      },
    },
  });

  console.log(formClient)

  const documentTypes: string[] = useAppSelector(
    (state) => state.tipoDocumentos.tipoDocumento
  );
  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const listSex = [
    { id: 1, name: "Femenino" },
    { id: 2, name: "Masculino" },
  ];

  const handleDocumentType = useMemo(() => {
    const result = documentTypes.map((documentTypes, idx) => {
      return { id: idx + 1, name: documentTypes };
    });

    return result;
  }, [documentTypes]);

  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );
  const { errors, validateField, validateForm } = useFormClientValidation();

  const [selectedSex, setSelectedSex] = useState(0);
  const [locality, setLocality] = useState<boolean>(false);
  const [selectedLocality, setSelectedLocality] = useState(0);
  const [selectedProvince, setSelectedProvinces] = useState(
    user.localidad?.provincia?.id || 0
  );

  useEffect(() => {

    setFormClient(user);
    setSelectedLocality(user.localidad?.id || 0);
    setSelectedProvinces(user.localidad?.provincia?.id || 0);
    const indexDocType = documentTypes.findIndex(
      (doc) => doc === user.tipoDocumento
    );
    setSelectedDocumentType(indexDocType + 1);
  }, [user]);

  const handleProvinces = useMemo(() => {
    const result = provinces.map((provinces) => {
      return { id: provinces.id, name: provinces.descripcion! };
    });
    return result;
  }, [provinces]);

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

  const handleStateDisabled = () => {
    setDisabled(!disabled);
    setLocality(false);
  };

  // HANDLE STATE
  const handleStateDocumentType = (id: number) => {
    setSelectedDocumentType(id);
    // Encontrar el nombre del tipo documento
    const selectedDocumentType = documentTypes[id - 1] || "";
    setFormClient((prev) => ({ ...prev, tipoDocumento: selectedDocumentType }));
    validateField("tipoDocumento", selectedDocumentType);
  };

  const handleStateSexo = (id: number) => {
    setSelectedSex(id);

    // Encontrar el nombre del sexo seleccionada
    const selectedSexName = listSex.find((sex) => sex.id === id)?.name || "";
    setFormClient((prev) => ({ ...prev, sexo: selectedSexName }));
    setFormClient((prev) => ({ ...prev, sexoId: id }));
    validateField("sexo", selectedSexName);
  };

  const handleStateProvinces = (id: number) => {
    setSelectedProvinces(id);
    setLocality(true);
    setSelectedLocality(0);

    // Encontrar el nombre de la provincia seleccionado
    const selectedProvinceName =
      provinces.find((province) => province.id === id)?.descripcion || "";
    setFormClient((prev) => ({ ...prev, provincia: selectedProvinceName }));
    setFormClient((prev) => ({ ...prev, provinciaId: id }));
    validateField("provincia", selectedProvinceName);
  };

  const handleStateLocality = (id: number) => {
    setSelectedLocality(id);

    const selectedLocalityName =
      localities?.find((localidad) => localidad.id === id) || undefined;
    setFormClient((prev) => ({ ...prev, localidad: selectedLocalityName }));
    validateField("localidad", selectedLocalityName?.descripcion || "");
  };

  const handleInputChange = (path: string, value: string) => {
    const keys = path.split(".");
    setFormClient((prev) => {
      const newForm = { ...prev };
      let current: any = newForm;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return newForm;
    });
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="card bg-dark border-info">
          <div className="card-header bg-transparent border-info">
            <h5 className="card-title text-info mb-0 d-flex align-items-center">
              <User className="me-2" size={20} />
              Información Personal
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <Input
                title="Nombre/s"
                place=""
                classNameLabel={"form-label text-light"}
                classNameDiv="col-md-4"
                style="form-control bg-dark text-light border-secondary"
                onChange={(value) => {
                  handleInputChange("nombres", value);
                }}
                value={formClient.nombres}
                disabled={disabled}
              ></Input>

              <Input
                title="Apellido/s"
                place=""
                classNameLabel={"form-label text-light"}
                classNameDiv="col-md-4"
                style="form-control bg-dark text-light border-secondary"
                onChange={(value) => {
                  handleInputChange("apellido", value);
                }}
                value={formClient.apellido}
                disabled={disabled}
              ></Input>
              <div className="col-md-4">
                <SelectForm
                  status={!disabled}
                  value={selectedSex}
                  title="Sexo"
                  items={listSex}
                  onChange={handleStateSexo}
                  classNameLabel={"form-label text-light"}
                  classNameSelect={
                    "form-select bg-dark text-light border-secondary"
                  }
                />
              </div>
              <div className="col-md-4">
                <SelectForm
                  status={false}
                  value={selectedDocumentType}
                  title="Tipo Documento"
                  items={handleDocumentType}
                  onChange={handleStateDocumentType}
                  classNameLabel={"form-label text-light"}
                  classNameSelect={
                    "form-select bg-dark text-light border-secondary"
                  }
                />
              </div>
              <Input
                title="Documento"
                place=""
                classNameLabel={"form-label text-light"}
                classNameDiv="col-md-4"
                style="form-control bg-dark text-light border-secondary"
                onChange={(value) => {
                  handleInputChange("documento", value);
                }}
                value={formClient.documento}
                disabled={true}
              ></Input>
              <Input
                title="Fecha de nacimiento"
                place=""
                classNameLabel={"form-label text-light"}
                classNameDiv="col-md-4"
                style="form-control bg-dark text-light border-secondary"
                onChange={(value) => {
                  handleInputChange("fechaNacimiento", value);
                }}
                value={formClient.fechaNacimiento}
                disabled={true}
              ></Input>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card bg-dark border-info">
          <div className="card-header bg-transparent border-info">
            <h5 className="card-title text-info mb-0 d-flex align-items-center">
              <Shield className="me-2" size={20} />
              Privacidad y Seguridad
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <Input
                title="Email"
                place=""
                classNameLabel={"form-label text-light"}
                classNameDiv="col-md-4"
                style="form-control bg-dark text-light border-secondary"
                value={formClient.correo}
                disabled={true}
              ></Input>
              <Input
                title="Telefono"
                place=""
                classNameLabel={"form-label text-light"}
                classNameDiv="col-md-4"
                style="form-control bg-dark text-light border-secondary"
                onChange={(value) => {
                  handleInputChange("telefono", value);
                }}
                value={formClient.telefono}
                disabled={disabled}
              ></Input>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card bg-dark border-info">
          <div className="card-header bg-transparent border-info">
            <h5 className="card-title text-info mb-0 d-flex align-items-center">
              <MapPin className="me-2" size={20} />
              Ubicación
            </h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <SelectForm
                  status={!disabled}
                  value={selectedProvince}
                  classNameLabel={"form-label text-light"}
                  classNameSelect={
                    "form-select bg-dark text-light border-secondary"
                  }
                  title="Provincia"
                  items={handleProvinces}
                  onChange={handleStateProvinces}
                  error={errors.provincia}
                  onBlur={() =>
                    validateField(
                      "provincia",
                      formClient.localidad?.provincia?.descripcion || ""
                    )
                  }
                />
              </div>
              <div className="col-md-4">
                <SelectForm
                  status={locality}
                  value={selectedLocality}
                  title="Localidad"
                  classNameLabel={"form-label text-light"}
                  classNameSelect={
                    "form-select bg-dark text-light border-secondary"
                  }
                  items={handleLocality}
                  onChange={handleStateLocality}
                  error={errors.localidad}
                  onBlur={() =>
                    validateField(
                      "localidad",
                      formClient.localidad?.descripcion || ""
                    )
                  }
                />
              </div>
              <Input
                title="Domicilio"
                place=""
                classNameLabel={"form-label text-light"}
                classNameDiv="col-md-4"
                style="form-control bg-dark text-light border-secondary"
                onChange={(value) => {
                  handleInputChange("domicilio", value);
                }}
                value={formClient.domicilio}
                disabled={disabled}
              ></Input>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 text-end">
        <button
          className="btn btn-info btn-lg px-4"
          onClick={handleStateDisabled}
        >
          {disabled ? "Modificar" : "Guardar"}
        </button>
      </div>
    </div>
  );
};

export default AccountDataInputs;
