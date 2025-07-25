import "../../models/types.d.ts";
import { useMemo } from "react";
import { useState } from "react";
import useFormClientValidation from "../../controllers/controllerHooks/Validations/useFormClientValidation.ts";
import Input from "./GeneralComponents/Input";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import SelectForm from "./GeneralComponents/SelectForm.tsx";
import GrayButton from "./GeneralComponents/Button.tsx";

const FormDataClient = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  const listSex = [
    { id: 1, name: "Femenino" },
    { id: 2, name: "Masculino" },
  ];
  const documentTypes: string[] = useAppSelector(
    (state) => state.documentTypes.documentType
  );

  const provinces: Provincias[] = useAppSelector(
    (state) => state.provinces.province
  );

  const [locality, setLocality] = useState<boolean>(false);

  const [selectedSex, setSelectedSex] = useState(0);
  const [selectedProvince, setSelectedProvinces] = useState(0);
  const [selectedLocality, setSelectedLocality] = useState(0);
  const [selectedDocumentType, setSelectedDocumentType] = useState(0);
  const { errors, validateField, validateForm } = useFormClientValidation();

  const [formClient, setFormClient] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    fechaNacimiento: "",
    telefono: "",
    sexo: "",
    provincia: "",
    localidad: "",
    domicilio: "",
  });

  // HANDLE STATE
  const handleStateDocumentType = (id: number) => {
    setSelectedDocumentType(id);
    // Encontrar el nombre del tipo documento
    //  seleccionada
    const selectedDocumentType = documentTypes[id] || "";
    setFormClient((prev) => ({ ...prev, tipoDocumento: selectedDocumentType }));
    validateField("tipoDocumento", selectedDocumentType);
  };

  const handleStateSexo = (id: number) => {
    setSelectedSex(id);

    // Encontrar el nombre del sexo seleccionada
    const selectedSexName = listSex.find((sex) => sex.id === id)?.name || "";
    setFormClient((prev) => ({ ...prev, sexo: selectedSexName }));
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
    validateField("provincia", selectedProvinceName);
  };

  const handleStateLocality = (id: number) => {
    setSelectedLocality(id);

    // Encontrar el nombre de la localidad seleccionada
    const province = provinces.find((p) => p.id === selectedProvince);

    const selectedLocalityName =
      province?.localidades.find((localidad) => localidad.id === id)
        ?.descripcion || "";
    setFormClient((prev) => ({ ...prev, localidad: selectedLocalityName }));
    validateField("localidad", selectedLocalityName);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormClient((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // HANDLEs
  const handleSubmit = () => {
    if (validateForm(formClient)) {
      console.log("Formulario válido:", formClient);
      handleCurrentView(true);
    } else {
      console.log("Formulario inválido:", errors);
    }
  };
  const handleBack = () => {
    handleCurrentView(false);
  };

  const handleDocumentType = useMemo(() => {
    const result = documentTypes.map((documentTypes, idx) => {
      return { id: idx, name: documentTypes };
    });

    return result;
  }, [documentTypes]);

  const handleProvinces = useMemo(() => {
    const result = provinces.map((provinces) => {
      return { id: provinces.id, name: provinces.descripcion };
    });
    return result;
  }, [provinces]);

  const handleLocality = () => {
    if (selectedProvince === null) return [];
    const province = provinces.find((p) => p.id === selectedProvince);
    if (!province) return [];

    return province.localidades.map((localidad) => ({
      id: localidad.id,
      name: localidad.descripcion,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-9">
          <div className="row " style={{ padding: "2px" }}>
            <div className="row " style={{ padding: "2px" }}>
              <h5>
                <strong>Informacóin del cliente</strong>
              </h5>
            </div>
            <div className="col">
              {" "}
              <Input
                title="Nombre"
                place=""
                value={formClient.nombre}
                onChange={(value) => handleInputChange("nombre", value)}
                error={errors.nombre}
                onBlur={() => validateField("nombre", formClient.nombre)}
              />
            </div>
            <div className="col">
              <Input
                title="Telefono"
                place=""
                value={formClient.telefono}
                onChange={(value) => handleInputChange("telefono", value)}
                error={errors.telefono}
                onBlur={() => validateField("telefono", formClient.telefono)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input
                title="Apellido"
                place=""
                value={formClient.apellido}
                onChange={(value) => handleInputChange("apellido", value)}
                error={errors.apellido}
                onBlur={() => validateField("apellido", formClient.apellido)}
              />
            </div>
            <div className="col">
              <SelectForm
                status={true}
                value={selectedSex}
                title="Sexo"
                items={listSex}
                onChange={handleStateSexo}
                error={errors.sexo}
                onBlur={() => validateField("sexo", formClient.sexo)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <SelectForm
                status={true}
                value={selectedDocumentType}
                title="Tipo Documento"
                items={handleDocumentType}
                onChange={handleStateDocumentType}
                error={errors.tipoDocumento}
                onBlur={() =>
                  validateField("tipoDocumento", formClient.tipoDocumento)
                }
              />
            </div>
            <div className="col">
              <SelectForm
                status={true}
                value={selectedProvince}
                title="Provincia"
                items={handleProvinces}
                onChange={handleStateProvinces}
                error={errors.provincia}
                onBlur={() => validateField("provincia", formClient.provincia)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input
                title="Documento"
                place=""
                value={formClient.documento}
                onChange={(value) => handleInputChange("documento", value)}
                error={errors.documento}
                onBlur={() => validateField("documento", formClient.documento)}
              />
            </div>
            <div className="col">
              <SelectForm
                status={locality}
                value={selectedLocality}
                title="Localidad"
                items={handleLocality()}
                onChange={handleStateLocality}
                error={errors.localidad}
                onBlur={() => validateField("localidad", formClient.localidad)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input
                title="Fecha de nacimiento"
                place="MM/DD/AAAA"
                value={formClient.fechaNacimiento}
                onChange={(value) =>
                  handleInputChange("fechaNacimiento", value)
                }
                error={errors.fechaNacimiento}
                onBlur={() =>
                  validateField("fechaNacimiento", formClient.fechaNacimiento)
                }
              />
            </div>
            <div className="col">
              <Input
                title="Domicilio"
                place=""
                value={formClient.domicilio}
                onChange={(value) => handleInputChange("domicilio", value)}
                error={errors.domicilio}
                onBlur={() => validateField("domicilio", formClient.domicilio)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: " 2px" }}>
            <div className="col"></div>

            <div
              className="d-grid gap-2 d-md-flex justify-content-md-end"
              style={{ padding: "10px" }}
            >
              <GrayButton text="Cancelar" onClick={() => {}} />
              <GrayButton text="Anterior" onClick={handleBack} />
              <GrayButton text="Siguiente" onClick={handleSubmit} />
            </div>
          </div>

          <div className="col-xl-1"></div>
        </div>
      </div>
    </div>
  );
};

export default FormDataClient;
