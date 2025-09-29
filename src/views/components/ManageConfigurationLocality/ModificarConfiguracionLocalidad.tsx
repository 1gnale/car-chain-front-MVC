import { useMemo, useState } from "react";
import GrayButton from "../GeneralComponents/Button";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import SelectForm from "../GeneralComponents/SelectForm";
import { ConfigLocalidadesRepository } from "../../../models/repository/Repositorys/configLocalidadRepository";
import useFormValidationConfigLocalidad from "../../../controllers/controllerHooks/Validations/useConfigLocalityValidation";
import Modal from "../GeneralComponents/Modal";
import { updateConfigLocalidad } from "../../../redux/configLocalidadSlice";

export default function ModificarConfiguracionLocalidad({
  configLocalidad,
  handleCurrentView,
}: {
  configLocalidad: ConfigLocalidad;
  handleCurrentView: (pass: boolean) => void;
}) {
  // Repositorio para los ENDPOINTS
  const configLocalidadRepo = new ConfigLocalidadesRepository(
    `${import.meta.env.VITE_BASEURL}/api/configuracionLocalidad`
  );

  // Redux datos y dispatch
  const provinces: Provincia[] = useAppSelector(
    (state) => state.provincias.provincia
  );
  const localities: Localidad[] = useAppSelector(
    (state) => state.localidades.localidad
  );
  const dispatch = useAppDispatch();

  // Use states para los selects
  const [locality, setLocality] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvinces] = useState(
    configLocalidad.localidad?.provincia?.id
  );
  const [selectedLocality, setSelectedLocality] = useState(
    configLocalidad.localidad?.id
  );

  // validaciones
  const { errors, validateField, validateForm } =
    useFormValidationConfigLocalidad();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // state de los checkbox
  const [opcionConfig, setOpcionConfig] = useState<
    "ganancia" | "descuento" | "recargo"
  >(
    configLocalidad.ganancia != 0
      ? "ganancia"
      : configLocalidad.recargo != 0
      ? "recargo"
      : "descuento"
  );

  // formulario
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

  // botones
  async function ModificarConfigLocalidad() {
    const ConfigAge = {
      nombre: formConfigLocality.nombre,
      localidad: String(formConfigLocality.localidad?.descripcion),
      provincia: String(formConfigLocality.localidad?.provincia?.descripcion),
      descuento: String(formConfigLocality.descuento),
      ganancia: String(formConfigLocality.ganancia),
      recargo: String(formConfigLocality.recargo),
    };
    console.log(ConfigAge);
    if (validateForm(ConfigAge)) {
      try {
        const response = await configLocalidadRepo.updateConfigLocality(
          formConfigLocality
        );

        console.log("✅ Configuracion Localidad modificado:", response);

        // Formateamos el usuario para Redux
        const ConfigLocalidadParaRedux: ConfigLocalidad = {
          ...response,
          id: response.id,
          nombre: response.nombre,
          localidad: formConfigLocality.localidad,
          descuento: response.descuento,
          ganancia: response.ganancia,
          recargo: response.recargo,
        };
        console.log("ConfigLocalidadParaRedux");

        console.log(ConfigLocalidadParaRedux);
        // Despachamos al store
        dispatch(updateConfigLocalidad(ConfigLocalidadParaRedux));
        console.log(
          "✅ Configuracion Localidad modificado en Redux:",
          ConfigLocalidadParaRedux
        );
        setShowError(true);
        setTitleModalMessage("Configuracion Localidad modificado");
        setModalMessage(
          "Configuracion Localidad modificado con exito: " + response.nombre
        );
        setMessageType("success");
      } catch (error: any) {
        setTitleModalMessage("ERROR");
        setShowError(true);
        setModalMessage(error.message || "Error desconocido");
        setMessageType("error");
      }
    } else {
    }
  }

  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  // handles para rellenar los selectes
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

  // handle state para los selects seleccionados
  const handleStateProvinces = (id: number) => {
    setSelectedProvinces(id);
    setLocality(true);
    setSelectedLocality(0);

    // Encontrar la provincia seleccionado
    const selectedProvince = provinces.find((province) => province.id === id);

    const localidad = formConfigLocality.localidad;
    if (localidad) {
      localidad.provincia = selectedProvince;
    }

    setFormConfigLocality((prev) => ({
      ...prev,
      localidad: localidad,
    }));

    setFormConfigLocality((prev) => ({ ...prev, provinciaId: id }));
    validateField(
      "provincia",
      formConfigLocality.localidad?.provincia?.descripcion || ""
    );
  };
  const handleStateLocality = (id: number) => {
    setSelectedLocality(id);

    const selectedLocality = localities?.find(
      (localidad) => localidad.id === id
    );

    setFormConfigLocality((prev) => ({ ...prev, localidad: selectedLocality }));

    validateField("localidad", selectedLocality?.descripcion || "");
  };
  // Handle de los checkbox
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

  // handle que rellena formularios
  const handleInputChange = (field: string, value: string) => {
    setFormConfigLocality((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
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
        error={errors.nombre}
        onBlur={() =>
          validateField("nombre", String(formConfigLocality.nombre!))
        }
      />

      <div className="row h-100">
        {/* Mitad izquierda */}
        <div className="col-6 d-flex flex-column ">
          <SelectForm
            status={true}
            value={selectedProvince!}
            classNameLabel={"form-label w-25"}
            classNameDiv="d-flex mb-3"
            title="Provincia"
            items={handleProvinces}
            onChange={handleStateProvinces}
            error={errors.provincia}
            onBlur={() =>
              validateField(
                "provincia",
                String(formConfigLocality.localidad?.provincia?.descripcion!)
              )
            }
          />
          <SelectForm
            status={locality}
            value={selectedLocality!}
            classNameLabel={"form-label w-25"}
            classNameDiv="d-flex mb-3"
            title="Localidad"
            items={handleLocality}
            onChange={handleStateLocality}
            error={errors.localidad}
            onBlur={() =>
              validateField(
                "localidad",
                String(formConfigLocality.localidad?.descripcion!)
              )
            }
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
                error={errors.ganancia}
                onBlur={() =>
                  validateField(
                    "ganancia",
                    String(formConfigLocality.ganancia!)
                  )
                }
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
                error={errors.descuento}
                onBlur={() =>
                  validateField(
                    "descuento",
                    String(formConfigLocality.descuento!)
                  )
                }
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
                error={errors.recargo}
                onBlur={() =>
                  validateField("recargo", String(formConfigLocality.recargo!))
                }
              />
            </div>
          </div>
          {/* Botones */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <GrayButton text="Cancelar" onClick={handleCancel} />
            <GrayButton text="Confirmar" onClick={ModificarConfigLocalidad} />
          </div>
        </div>
      </div>
      <Modal
        show={showError}
        onClose={
          messageType == "success"
            ? () => {
                setShowError(false);
                handleCurrentView(true);
              }
            : () => {
                setShowError(false);
              }
        }
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
}
