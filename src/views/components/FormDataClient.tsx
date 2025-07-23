import "../../models/types.d.ts";
import { useState } from "react";
import useFormClientValidation from "../../controllers/controllerHooks/useFormClientValidation";
import Input from "./GeneralComponents/Input";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import SelectForm from "./GeneralComponents/SelectForm.tsx";

const FormDataClient = ({ handleCurrentView }: { handleCurrentView: () => void; }) => {
  const listSex = [
    { id: 1, name: "Femenino" },
    { id: 2, name: "Masculino" },
  ];
  const documentTypes: string[] = useAppSelector((state) => state.documentTypes.documentType);

  console.log("documentTypes", documentTypes)

  const [selectedSex, setSelectedSex] = useState(0);
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

  const handleStateDocumentType = (id: number) => {
    setSelectedDocumentType(id);

    // Encontrar el nombre de la marca seleccionada
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

  const handleInputChange = (field: string, value: string) => {
    setFormClient((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  const handleDocumentType = () => {
    const result = documentTypes.map((documentTypes, idx) => {
      return { id: idx, name: documentTypes };
    });

    return result;
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
                items={handleDocumentType()}
                onChange={handleStateDocumentType}
                error={errors.sexo}
                onBlur={() => validateField("tipoDocumento", formClient.sexo)}
              />
            </div>
            <div className="col">
              <SelectForm
                status={true}
                value={selectedSex}
                title="Provincia"
                items={listSex}
                onChange={handleStateSexo}
                error={errors.sexo}
                onBlur={() => validateField("sexo", formClient.sexo)}
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
                status={true}
                value={selectedSex}
                title="Localidad"
                items={listSex}
                onChange={handleStateSexo}
                error={errors.sexo}
                onBlur={() => validateField("sexo", formClient.sexo)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <label htmlFor="exampleInputEmail1">Fecha de Nacimiento</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="DD/MM/YYYY"
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
              <button className="btn btn-secondary me-md-2" type="button">
                Cancelar
              </button>
              <button className="btn btn-secondary" type="button">
                Siguiente
              </button>
            </div>
          </div>

          <div className="col-xl-1"></div>
        </div>
      </div>
    </div>
  );
};

export default FormDataClient;
