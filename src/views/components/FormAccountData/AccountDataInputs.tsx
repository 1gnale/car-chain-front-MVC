import { useEffect, useState, useMemo } from "react";
import Input from "./../GeneralComponents/Input";
import TitleForm from "./../GeneralComponents/TitleForm";
import GrayButton from "../GeneralComponents/Button";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import useFormClientValidation from "../../../controllers/controllerHooks/Validations/useFormClientValidation";
import useLocalStorageItem from "../../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook";
import SelectForm from "../GeneralComponents/SelectForm";

const AccountDataInputs = ({ user }: { user: Cliente }) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  const [formClient, setFormClient] = useState<Cliente>({
    idClient: 0,
    id: 0,
    nombres: "",
    apellido: "",
    fechaNacimiento: "",
    tipoDocumento: "",
    documento: "",
    domicilio: "",
    correo: "",
    telefono: "",
    sexo: "",
    contraseña: "",
    localidad: {
      id: 0,
      descripcion: "",
      codigoPostal: "",
      provincia: {
        id: 0,
        descripcion: "",
      },
    },
  });

  useMemo(() => {
    setFormClient(user);
  }, []);

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

  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );
  const { errors, validateField, validateForm } = useFormClientValidation();

  const [selectedSex, setSelectedSex] = useState(0);
  const [locality, setLocality] = useState<boolean>(false);
  const [selectedLocality, setSelectedLocality] = useState(0);
  const [selectedDocumentType, setSelectedDocumentType] = useState(0);
  const [selectedProvince, setSelectedProvinces] = useState(0);

  console.log(documentTypes);
  console.log(formClient.tipoDocumento);

  useEffect(() => {
    // localStorage.removeItem("ClientData");
    const clientStorage = useLocalStorageItem<Cliente>("ClientData");

    const sexoFiltrado = listSex.find(
      (sex) => sex.name === clientStorage?.sexo
    );
    const tipoDocFiltrado: number | undefined = documentTypes.findIndex(
      (doc) => doc === clientStorage?.tipoDocumento
    );
    if (
      clientStorage != null &&
      sexoFiltrado !== undefined &&
      tipoDocFiltrado !== undefined
    ) {
      setLocality(true);
      setSelectedLocality(clientStorage.localidad?.id || 0);
      setSelectedSex(sexoFiltrado.id);
      setSelectedProvinces(clientStorage.localidad?.provincia?.id || 0);
    }
  }, []);

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
    setLocality(false)
  }

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
    <div className="col-xl-9">
      <TitleForm title="Informacion Personal" />
      <div className="row g-3">
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("nombres", value);
            }}
            value={formClient.nombres}
            title="Nombre/s"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("apellidos", value);
            }}
            value={formClient.apellido}
            title="Apellido/s"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <SelectForm
            status={!disabled}
            value={selectedSex}
            title="Sexo"
            items={listSex}
            onChange={handleStateSexo}
          />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("tipoDocumento", value);
            }}
            value={formClient.tipoDocumento}
            title="Tipo de Documento"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("documento", value);
            }}
            value={formClient.documento}
            title="Documento"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("fechaNacimiento", value);
            }}
            value={formClient.fechaNacimiento}
            title="Fecha de nacimiento"
            place=""
            disabled={disabled}
          />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <TitleForm title="Privacidad y Seguridad" />
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("correo", value);
            }}
            value={formClient.correo}
            title="Email"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("contraseña", value);
            }}
            value={formClient.contraseña}
            title="Contraseña"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("telefono", value);
            }}
            value={formClient.telefono}
            title="Telefono"
            place=""
            disabled={disabled}
          />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <TitleForm title="Ubicacion" />
        <div className="col-md-4">
          <SelectForm
            status={!disabled}
            value={selectedProvince}
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
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("domicilio", value);
            }}
            value={formClient.domicilio}
            title="Domicilio"
            place=""
            disabled={disabled}
          />
          <div className="text-end mt-2">
            <GrayButton
              onClick={handleStateDisabled}
              text={disabled ? "Modificar" : "Guardar"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDataInputs;
