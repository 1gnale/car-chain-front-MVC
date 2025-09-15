import GrayButton from "../GeneralComponents/Button";
import IconButton from "../GeneralComponents/IconButton";
import { Search, PlusSquare, Square, CheckSquare } from "react-bootstrap-icons";
import Table from "../GeneralComponents/Table";
import Input from "../GeneralComponents/Input";
import CheckForm from "../GeneralComponents/CheckForm";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import useFormValidationCoverages from "../../../controllers/controllerHooks/Validations/useCoverageValidation";

const obtenerDetallesAplicados = (detalles: Cobertura_Detalle[]): Detalle[] => {
  return detalles
    .filter((c) => c.aplica) // me quedo solo con los que aplica = true
    .map((c) => c.detalle); // devuelvo el detalle de esos
};

function ModificarCobertura({
  cobertura,
  handleCurrentView,
}: {
  cobertura: Cobertura;
  handleCurrentView: (pass: boolean) => void;
}) {
  const coberturaDetalles: Cobertura_Detalle[] = useAppSelector(
    (state) => state.coberturasDetalles.coberturaDetalle
  );

  const detalles: Detalle[] = useAppSelector((state) => state.detalles.detalle);

  const { errors, validateField, validateForm } = useFormValidationCoverages();

  const [search, setSearch] = useState("");

  const [formCoverageDetail, setFormCoverageDetail] = useState<Detalle[]>(
    obtenerDetallesAplicados(coberturaDetalles)
  );

  const [formCoverage, setFormCoverage] = useState<Cobertura>({
    id: cobertura.id,
    nombre: cobertura.nombre,
    descripcion: cobertura.descripcion,
    recargoPorAtraso: cobertura.recargoPorAtraso,
    activo: cobertura.activo,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormCoverage((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };
  const handleCancel = (): void => {
    handleCurrentView(true);
  };
  const filteredDetalles = detalles.filter((detalle) => {
    const matchesSearch = detalle.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return detalle.activo && matchesSearch;
  });

  const handleCreateCoverageDetail = (detalle: any): void => {
    setFormCoverageDetail((prev) => {
      const exists = prev.some((d) => d.id === detalle.id);
      return exists
        ? prev.filter((d) => d.id !== detalle.id)
        : [...prev, detalle];
    });
  };

  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Square,
          alternateIcon: CheckSquare,
          isActive: (detalle: Cobertura_Detalle) =>
            formCoverageDetail.some((d) => d.id === detalle.id),
          onAction: handleCreateCoverageDetail,
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
        error={errors.recargoPorAtras}
        onBlur={() =>
          validateField(
            "recargoPorAtras",
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
        <GrayButton text="Confirmar" onClick={() => {}} />
      </div>
    </div>
  );
}

export default ModificarCobertura;
