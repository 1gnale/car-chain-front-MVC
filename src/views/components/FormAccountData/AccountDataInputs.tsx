import { useState, useMemo } from "react";
import Input from "./../GeneralComponents/Input";
import TitleForm from "./../GeneralComponents/TitleForm";
import GrayButton from "../GeneralComponents/Button";

const AccountDataInputs = ({ user }: { user: Cliente }) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  //TO DO_: SELECTS EN LOS DATOS PROV Y LOCALIDAD

  const [form, setForm] = useState<Cliente>({
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
    setForm(user);
  }, []);

  const handleInputChange = (path: string, value: string) => {
    const keys = path.split(".");
    setForm((prev) => {
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
            value={form.nombres}
            title="Nombre/s"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("apellido", value);
            }}
            value={form.apellido}
            title="Apellido/s"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("sexo", value);
            }}
            value={form.sexo}
            title="Sexo"
            place=""
            disabled={disabled}
          />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("tipoDocumento", value);
            }}
            value={form.tipoDocumento}
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
            value={form.documento}
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
            value={form.fechaNacimiento}
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
            value={form.correo}
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
            value={form.contraseña}
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
            value={form.telefono}
            title="Telefono"
            place=""
            disabled={disabled}
          />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <TitleForm title="Ubicacion" />
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("localidad.provincia.descripcion", value);
            }}
            value={form.localidad?.provincia?.descripcion}
            title="Provincia"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("localidad.descripcion", value);
            }}
            value={form.localidad?.descripcion}
            title="Localidad"
            place=""
            disabled={disabled}
          />
        </div>
        <div className="col-md-4">
          <Input
            onChange={(value) => {
              handleInputChange("domicilio", value);
            }}
            value={form.domicilio}
            title="Domicilio"
            place=""
            disabled={disabled}
          />
          <div className="text-end mt-2">
            <GrayButton
              onClick={() => setDisabled(!disabled)}
              text={disabled ? "Modificar" : "Guardar"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDataInputs;
