import GrayButton from "../GeneralComponents/Button";
import IconButton from "../GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";
import Table from "../GeneralComponents/Table";
import Input from "../GeneralComponents/Input";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/reduxTypedHooks";
import { Square, CheckSquare } from "react-bootstrap-icons";
import useFormValidationCoverages from "../../../controllers/controllerHooks/Validations/useCoverageValidation";

function CrearCobertura({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) {
  const detalles: Detalle[] = useAppSelector((state) => state.detalles.detalle);
  const { errors, validateField, validateForm } = useFormValidationCoverages();

  const [formCoverageDetail, setFormCoverageDetail] = useState<Detalle[]>([]);
  const [search, setSearch] = useState("");
  const [formCoverage, setFormCoverage] = useState<Cobertura>({
    id: 1,
    nombre: "",
    descripcion: "",
    recargoPorAtraso: 0,
  });

  useEffect(() => {
    //(formCoverageDetail);
  }, [formCoverageDetail]);

  const handleInputChange = (field: string, value: string) => {
    setFormCoverage((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  const filteredDetalles = detalles.filter((detalle) => {
    const matchesSearch = detalle.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return detalle.activo && matchesSearch;
  });

  const handleCancel = (): void => {
    handleCurrentView(false);
  };

  const handleCreateCoverageDetail = (detalle: any) => {
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
          onAction: handleCreateCoverageDetail,
          isActive: (detalle: Cobertura_Detalle) =>
            formCoverageDetail.some((d) => d.id === detalle.id),
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

export default CrearCobertura;
