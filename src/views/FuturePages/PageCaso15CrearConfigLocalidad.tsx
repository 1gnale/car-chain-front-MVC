import "../../models/types.d.ts";
import { useState, useEffect, useMemo } from "react";
import useFormClientValidation from "../../controllers/controllerHooks/Validations/useFormClientValidation.ts";
import Input from "../components/GeneralComponents/Input";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import SelectForm from "../components/GeneralComponents/SelectForm.tsx";
import GrayButton from "../components/GeneralComponents/Button.tsx";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import TitleForm from "../components/GeneralComponents/TitleForm.tsx";

export default function CrearConfiguracionLocalidad() {
  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );

  const { errors, validateField, validateForm } = useFormClientValidation();
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
    <div className="container mt-4">
      {/* Formulario */}
      <form
        className="border rounded p-4 shadow-sm"
        style={{ backgroundColor: "#f4f6f9" }}
      >
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Nombre</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Provincia</label>
          <div className="col-sm-4">
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

          <div className="col-sm-2 d-flex align-items-center">
            <input
              type="radio"
              name="tipo"
              id="ganancia"
              className="form-check-input me-2"
            />
            <label htmlFor="ganancia" className="form-check-label">
              Ganancia
            </label>
          </div>

          <div className="col-sm-4">
            <input type="number" className="form-control" />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Localidad</label>
          <div className="col-sm-4">
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

          <div className="col-sm-2 d-flex align-items-center">
            <input
              type="radio"
              name="tipo"
              id="descuento"
              className="form-check-input me-2"
            />
            <label htmlFor="descuento" className="form-check-label">
              Descuento
            </label>
          </div>

          <div className="col-sm-4">
            <input type="number" className="form-control" />
          </div>
        </div>

        {/* Recargo en su propia fila */}
        <div className="row mb-5">
          <label className="col-sm-6 col-form-label"></label>
          <div className="col-sm-2 d-flex align-items-center">
            <input
              type="radio"
              name="tipo"
              id="recargo"
              className="form-check-input me-2"
            />
            <label htmlFor="recargo" className="form-check-label">
              Recargo
            </label>
          </div>
          <div className="col-sm-4">
            <input type="number" className="form-control" />
          </div>
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-end gap-2">
          <GrayButton text="Cancelar" />
          <GrayButton text="Confirmar" />
        </div>
      </form>
    </div>
  );
}
