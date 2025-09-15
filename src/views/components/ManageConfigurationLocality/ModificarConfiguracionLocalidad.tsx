import { useMemo, useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import SelectForm from "../GeneralComponents/SelectForm";

export default function ModificarConfiguracionLocalidad({
  configLocalidad,
  handleCurrentView,
}: {
  configLocalidad: ConfigLocalidad;
  handleCurrentView: (pass: boolean) => void;
}) {
  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );
  const [locality, setLocality] = useState<boolean>(false);

  const [selectedProvince, setSelectedProvinces] = useState(
    configLocalidad.localidad?.provincia?.id
  );
  const [selectedLocality, setSelectedLocality] = useState(
    configLocalidad.localidad?.id
  );

  //const { errors, validateField, validateForm } = useFormValidationConfigLocality();
  const [opcionConfig, setOpcionConfig] = useState<
    "ganancia" | "descuento" | "recargo"
  >("ganancia");
  const [formConfigLocality, setFormConfigLocality] = useState<ConfigLocalidad>(
    {
      id: configLocalidad.id,
      nombre: configLocalidad.nombre,
      localidad: configLocalidad.localidad,
      descuento: configLocalidad.descuento,
      ganancia: configLocalidad.ganancia,
      recargo: configLocalidad.recargo,
      activo: configLocalidad.activo,
    }
  );

  const handleCancel = (): void => {
    handleCurrentView(true);
  };
  const handleProvinces = useMemo(() => {
    const result = provinces.map((provinces) => {
      return { id: provinces.id, name: provinces.descripcion! };
    });
    return result;
  }, [provinces]);

  const handleStateProvinces = (id: number) => {
    setSelectedProvinces(id);
    setLocality(true);
    setSelectedLocality(0);

    // Encontrar el nombre de la provincia seleccionado
    const selectedProvinceName =
      provinces.find((province) => province.id === id)?.descripcion || "";
    setFormConfigLocality((prev) => ({
      ...prev,
      provincia: selectedProvinceName,
    }));
    setFormConfigLocality((prev) => ({ ...prev, provinciaId: id }));
    // setFormConfigLocality("provincia", selectedProvinceName);
  };
  const handleStateLocality = (id: number) => {
    setSelectedLocality(id);

    const selectedLocalityName =
      localities?.find((localidad) => localidad.id === id)?.descripcion || "";
    //   setFormConfigLocality((prev) => ({ ...prev, localidad: selectedLocalityName }));
    //  validateField("localidad", selectedLocalityName);
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

  const handleGananciaCheckBox = (): void => {
    setOpcionConfig("ganancia");
    setFormConfigLocality((prev) => ({ ...prev, recargo: 0 }));
    setFormConfigLocality((prev) => ({ ...prev, descuento: 0 }));
    //   validateField("porcentaje_miles" as keyof typeof errors, "0");
  };
  const handleDescuentoCheckBox = (): void => {
    setOpcionConfig("descuento");
    setFormConfigLocality((prev) => ({ ...prev, recargo: 0 }));
    setFormConfigLocality((prev) => ({ ...prev, ganancia: 0 }));
    // validateField("monto_fijo" as keyof typeof errors, "0");
  };

  const handleRecargoCheckBox = (): void => {
    setOpcionConfig("recargo");
    setFormConfigLocality((prev) => ({ ...prev, ganancia: 0 }));
    setFormConfigLocality((prev) => ({ ...prev, descuento: 0 }));
    // validateField("monto_fijo" as keyof typeof errors, "0");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormConfigLocality((prev) => ({ ...prev, [field]: value }));
    // validateField(field as keyof typeof errors, value);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={formConfigLocality.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
      />

      <div className="row h-100">
        {/* Mitad izquierda */}
        <div className="col-6 d-flex flex-column ">
          <SelectForm
            status={true}
            value={selectedProvince!}
            classNameLabel={"form-label w-25"}
            classNameDiv="d-flex align-items-start mb-3"
            title="Provincia"
            items={handleProvinces}
            onChange={handleStateProvinces}
          />
          <SelectForm
            status={locality}
            value={selectedLocality!}
            classNameLabel={"form-label w-25"}
            classNameDiv="d-flex align-items-start mb-3"
            title="Localidad"
            items={handleLocality}
            onChange={handleStateLocality}
          />
          <CheckForm
            text="Configuracion Localidad Activa"
            checked={formConfigLocality.activo}
            onChange={() =>
              setFormConfigLocality((prev) => ({
                ...prev,
                ["activo"]: !formConfigLocality.activo,
              }))
            }
          />
        </div>

        {/* Mitad derecha */}
        <div className="col-6">
          {/* Ganancia */}
          <div className="row align-items-center mb-3">
            <div className="col-4 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="radio"
                name="montoRadio"
                id="radioGanancia"
                checked={opcionConfig === "ganancia"}
                onChange={handleGananciaCheckBox}
              />
              <label htmlFor="radioGanancia" className="form-check-label mb-0">
                Ganancia
              </label>
            </div>
            <div className="col-8">
              <Input
                title=""
                place=""
                asLabel="none"
                inputStyle={{ width: "100%" }}
                value={String(formConfigLocality.ganancia)}
                disabled={opcionConfig !== "ganancia"}
                onChange={(value) => handleInputChange("ganancia", value)}
              />
            </div>
          </div>

          {/* Descuento */}
          <div className="row align-items-center mb-3">
            <div className="col-4 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="radio"
                name="montoRadio"
                id="radioDescuento"
                checked={opcionConfig === "descuento"}
                onChange={handleDescuentoCheckBox}
              />
              <label htmlFor="radioDescuento" className="form-check-label mb-0">
                Descuento
              </label>
            </div>
            <div className="col-8">
              <Input
                title=""
                place=""
                asLabel="none"
                inputStyle={{ width: "100%" }}
                value={String(formConfigLocality.descuento)}
                disabled={opcionConfig !== "descuento"}
                onChange={(value) => handleInputChange("descuento", value)}
              />
            </div>
          </div>

          {/* Recargo */}
          <div className="row align-items-center mb-3">
            <div className="col-4 d-flex align-items-center">
              <input
                className="form-check-input me-2"
                type="radio"
                name="montoRadio"
                id="radioRecargo"
                checked={opcionConfig === "recargo"}
                onChange={handleRecargoCheckBox}
              />
              <label htmlFor="radioRecargo" className="form-check-label mb-0">
                Recargo
              </label>
            </div>
            <div className="col-8">
              <Input
                title=""
                place=""
                asLabel="none"
                inputStyle={{ width: "100%" }}
                value={String(formConfigLocality.recargo)}
                disabled={opcionConfig !== "recargo"}
                onChange={(value) => handleInputChange("recargo", value)}
              />
            </div>
          </div>
          {/* Botones */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
