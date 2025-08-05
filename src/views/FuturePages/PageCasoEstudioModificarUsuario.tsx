import "../../models/types.d.ts";
import { useState, useEffect, useMemo } from "react";
import useFormClientValidation from "../../controllers/controllerHooks/Validations/useFormClientValidation.ts";
import Input from "../components/GeneralComponents/Input";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import SelectForm from "../components/GeneralComponents/SelectForm.tsx";
import GrayButton from "../components/GeneralComponents/Button.tsx";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import TitleForm from "../components/GeneralComponents/TitleForm.tsx";

function ModificarUsuario() {
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
  const { errors, validateField, validateForm } = useFormClientValidation();
  const [selectedSex, setSelectedSex] = useState(0);
  const [locality, setLocality] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvinces] = useState(0);
  const [selectedLocality, setSelectedLocality] = useState(0);
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
      setSelectedProvinces(clientStorage.localidad?.provincia?.id || 0);
      setSelectedLocality(clientStorage.localidad?.id || 0);
      setSelectedSex(sexoFiltrado.id);
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
      localities?.find((localidad) => localidad.id === id)?.descripcion || "";
    setFormClient((prev) => ({ ...prev, localidad: selectedLocalityName }));
    validateField("localidad", selectedLocalityName);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-9">
          <div className="row " style={{ padding: "2px" }}>
            <div className="row " style={{ padding: "2px" }}></div>
            <div className="col">
              {" "}
              <Input title="Email" place="" value={""} />
            </div>
            <div className="col">
              <Input title="Telefono" place="" value={""} />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input title="Contraseña" place="" value={""} />
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
              <Input title="Confirmar Contraseña" place="" value={""} />
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
              <Input title="Nombre/s" place="" value={""} />
            </div>
            <div className="col">
              <SelectForm
                status={locality}
                value={selectedLocality}
                title="Localidad"
                items={handleLocality}
                onChange={handleStateLocality}
                error={errors.localidad}
                onBlur={() => validateField("localidad", formClient.localidad)}
              />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input title="Apellido/s" place="" value={""} />
            </div>
            <div className="col">
              <Input title="Domicilio" place="" value={""} />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input title="Tipo de Documento" place="" value={"DNI"} />
            </div>
            <div className="col">
              <Input title="Rol" place="" value={""} />
            </div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input title="Documento" place="" value={""} />
            </div>
            <div className="col"></div>
          </div>
          <div className="row " style={{ padding: "2px" }}>
            <div className="col">
              <Input title="Fecha De" place="" value={""} />
            </div>
            <div className="col"></div>
          </div>
          <div className="row " style={{ padding: " 2px" }}>
            <div className="col"></div>

            <div
              className="d-grid d-md-flex justify-content-md-end"
              style={{ padding: "10px", gap: "2rem" }}
            >
              <div
                style={{
                  transform: "scale(1.6)",
                  transformOrigin: "left",
                  width: "160px",
                  paddingBottom: "20px"
                }}
              >
                <GrayButton text="Cancelar" onClick={() => {}} />
              </div>
              <div
                style={{
                  transform: "scale(1.6)",
                  transformOrigin: "left",
                  width: "190px",
                }}
              >
                <GrayButton text="Confirmar" onClick={() => {}} />
              </div>
            </div>
          </div>

          <div className="col-xl-1"></div>
        </div>
      </div>
    </div>
  );
}

export default ModificarUsuario;