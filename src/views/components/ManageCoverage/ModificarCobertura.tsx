import GrayButton from "../GeneralComponents/Button";
import IconButton from "../GeneralComponents/IconButton";
import { Search, PlusSquare, Square, CheckSquare } from "react-bootstrap-icons";
import Table from "../GeneralComponents/Table";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import useFormValidationCoverages from "../../../controllers/controllerHooks/Validations/useCoverageValidation";
import Modal from "../GeneralComponents/Modal";
import { CoberturasRepository } from "../../../models/repository/Repositorys/coberturasRepository";
import { CoberturasDetalleRepository } from "../../../models/repository/Repositorys/coberturasDetalleRepository";
import { updateCobertura } from "../../../redux/coberturaSlice";
import { updateCoberturaDetalle } from "../../../redux/coberturaDetalleSlice";

const obtenerDetallesAplicados = (
  detalles: Cobertura_Detalle[],
  cobertura: Cobertura
): Cobertura_Detalle[] => {
  return detalles.filter((c) => c.cobertura.id === cobertura.id);
};

function ModificarCobertura({
  cobertura,
  handleCurrentView,
}: {
  cobertura: Cobertura;
  handleCurrentView: (pass: boolean) => void;
}) {
  // states de los checkbox
  const [checkbox, setCheckbox] = useState<boolean>(false);

  // Repositorio para los ENDPOINTS
  const coberturaRepo = new CoberturasRepository(
    `${import.meta.env.VITE_BASEURL}/api/cobertura`
  );
  const coberturaDetalleRepo = new CoberturasDetalleRepository(
    `${import.meta.env.VITE_BASEURL}/api/coberturaDetalle`
  );
  const dispatch = useAppDispatch();

  // Traer del redux los repositorios para la tabla
  const coberturaDetalles: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );
  const detalles: Detalle[] = useAppSelector((state) => state.detalles.detalle);

  // Validaciones
  const { errors, validateField, validateForm } = useFormValidationCoverages();

  // States con los coberturas detalles
  const [formCoverageDetail, setFormCoverageDetail] = useState<
    Cobertura_Detalle[]
  >(obtenerDetallesAplicados(coberturaDetalles, cobertura));

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // formulario
  const [formCoverage, setFormCoverage] = useState<Cobertura>({
    id: cobertura.id,
    nombre: cobertura.nombre,
    descripcion: cobertura.descripcion,
    recargoPorAtraso: cobertura.recargoPorAtraso,
    activo: cobertura.activo,
  });

  // Handle para cargar el formulario
  const handleInputChange = (field: string, value: string) => {
    setFormCoverage((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // buscador
  const [search, setSearch] = useState("");
  const filteredDetalles = detalles.filter((detalle) => {
    const matchesSearch = detalle.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return detalle && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return detalle.activo && matchesSearch;

    return matchesSearch;
  });

  // handle botones
  const handleCancel = (): void => {
    handleCurrentView(true);
  };

  async function modificarCobertura() {
    const coverage = {
      nombre: formCoverage.nombre,
      descripcion: formCoverage.descripcion,
      recargoPorAtraso: String(formCoverage.recargoPorAtraso || 0),
    };
    console.log(coverage);
    if (validateForm(coverage)) {
      try {
        const responseCoverage = await coberturaRepo.updateCoverage(
          formCoverage
        );
        // Formateamos el usuario para Redux
        const coberturaParaRedux: Cobertura = {
          ...responseCoverage,
          nombre: responseCoverage.nombre,
          descripcion: responseCoverage.descripcion,
          recargoPorAtraso: responseCoverage.recargoPorAtraso,
        };
        // Despachamos al store
        dispatch(updateCobertura(coberturaParaRedux));
        console.log(
          "✅ Coberturas detalles modificada en Redux:",
          coberturaParaRedux
        );

        console.log("✅ cobertura modificada:", responseCoverage);
        console.log(formCoverageDetail);

        await Promise.all(
          formCoverageDetail.map((detail_coverage: Cobertura_Detalle) =>
            coberturaDetalleRepo
              .updateCoverageDetail({
                id: detail_coverage.id ? detail_coverage.id : 0,
                detalle: detail_coverage.detalle,
                cobertura: responseCoverage,
                aplica: detail_coverage.aplica,
              })
              .then((res) => {
                const coberturaDetalleParaRedux: Cobertura_Detalle = {
                  ...responseCoverage,
                  id: res.id,
                  cobertura: responseCoverage,
                  detalle: detail_coverage.detalle,
                  aplica: detail_coverage.aplica,
                };

                dispatch(updateCoberturaDetalle(coberturaDetalleParaRedux));
              })
          )
        );

        setShowError(true);
        setTitleModalMessage("Cobertura modificada");
        setModalMessage(
          "Cobertura modificada con exito: " + responseCoverage.nombre
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

  // Handle de la tabla
  const handleCreateCoverageDetail = (detalle: Detalle): void => {
    setFormCoverageDetail((prev) => {
      const existing = prev.find((d) => d.detalle.id === detalle.id);

      if (existing) {
        // Alternar aplica
        return prev.map((d) =>
          d.detalle.id === detalle.id ? { ...d, aplica: !d.aplica } : d
        );
      } else {
        // Crear nuevo Cobertura_Detalle válido
        const nuevo: Cobertura_Detalle = {
          cobertura,
          detalle,
          aplica: true,
        };
        return [...prev, nuevo];
      }
    });
  };

  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Square,
          alternateIcon: CheckSquare,
          isActive: (detalle: Detalle) => {
            const found = formCoverageDetail.find(
              (d) => d.detalle.id === detalle.id
            );
            return found ? found.aplica : false;
          },
          onAction: (detalle: Detalle) => handleCreateCoverageDetail(detalle),
        },
      ],
      titles: [
        "ID",
        "Nombre",
        "Descripcion",
        "Porcentaje En Miles",
        "Monto Fijo",
        "Estado",
      ],
      tableBody: filteredDetalles.map((detail) => ({
        key: detail.id,
        value: detail,
        rowContent: [
          String(detail.id) ?? "",
          detail.nombre ?? "",
          detail.descripcion ?? "",
          String(detail.porcentaje_miles) ?? "",
          String(detail.monto_fijo) ?? "",
          (() => {
            if (detail.activo) {
              return "Activo";
            } else {
              return "Inactivo";
            }
          })(),
        ],
      })),
    };
  };

  const { titles, tableBody, customIcons, showButtom } = handleTable();

  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={formCoverage.nombre}
        onChange={(value) => handleInputChange("nombre", value)}
        error={errors.nombre}
        onBlur={() => validateField("nombre", String(formCoverage.nombre!))}
      />

      <Input
        title="Descripcion"
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        as="textarea"
        rows={5}
        place=""
        value={formCoverage.descripcion}
        onChange={(value) => handleInputChange("descripcion", value)}
        error={errors.descripcion}
        onBlur={() =>
          validateField("descripcion", String(formCoverage.descripcion!))
        }
      />
      <Input
        title="Recargo Por Atraso:"
        labelStyle={{ width: "100px" }}
        inputStyle={{ width: "200px" }}
        classNameDiv="d-flex align-items-start mb-3"
        place=""
        value={String(formCoverage.recargoPorAtraso)}
        onChange={(value) => handleInputChange("recargoPorAtraso", value)}
        error={errors.recargoPorAtraso}
        onBlur={() =>
          validateField(
            "recargoPorAtraso",
            String(formCoverage.recargoPorAtraso!)
          )
        }
      />
      <CheckForm
        text="Cobertura activa"
        checked={formCoverage.activo}
        onChange={() =>
          setFormCoverage((prev) => ({
            ...prev,
            ["activo"]: !formCoverage.activo,
          }))
        }
      />
      <div className="pt-3">
        <div className="d-flex align-items-center w-100 gap-2 p-3">
          <span className="form-label mb-0">Búsqueda:</span>

          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            style={{ maxWidth: "75%" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Checkbox controlado */}
        <CheckForm
          text="Mostrar todos los detalles"
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
      </div>
      <div className="d-flex  my-4" style={{ width: "-20px" }}>
        <Table
          titles={titles}
          tableBody={tableBody}
          customIcons={customIcons}
          showButtom={showButtom}
        />
      </div>
      <div className="d-flex justify-content-end gap-3 mt-4">
        <GrayButton text="Cancelar" onClick={handleCancel} />
        <GrayButton text="Confirmar" onClick={modificarCobertura} />
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

export default ModificarCobertura;
