import GrayButton from "../components/GeneralComponents/Button";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormValidation";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import SelectForm from "../components/GeneralComponents/SelectForm";
import { useLocalStorage } from "../../controllers/controllerHooks/LocalStorage/useLocalStorage";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import type { Mode } from "fs";
import CheckForm from "../components/GeneralComponents/CheckForm.tsx";
function ModificarModelo({ modelo }: { modelo: Modelo }) {
  const [checkbox, setCheckbox] = useState<boolean>(modelo.activo!);
  const [nombre, setNombre] = useState<string>(modelo.nombre!);
  const [descripcion, setDescripcion] = useState<string>(modelo.descripcion!);

  // Redux selectors para traer las marcas
  const brands: Marca[] = useAppSelector((state) => state.marcas.marca);
  const [selectedBrand, setSelectedBrand] = useState<number>(modelo.marca.id);

  // Convertimos las marcas en un formato que entienda el SelectForm
  const handleBrand = useMemo(() => {
    return brands.map((brand) => ({
      id: brand.id,
      name: brand.nombre ?? "",
    }));
  }, [brands]);

  // Cuando seleccionamos una marca nueva
  const handleStateBrand = (id: number) => {
    setSelectedBrand(id);
  };

  return (
    <div className="container-fluid w-75">
      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="d-flex align-items-start mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Descripción
        </label>
        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="d-flex align-items-center mb-3">
        <label className="me-3 pt-2" style={{ width: "100px" }}>
          Marca
        </label>
        <div style={{ width: "300px" }}>
          <SelectForm
            status={true}
            value={selectedBrand}
            title=""
            items={handleBrand}
            onChange={handleStateBrand}
          />
        </div>
      </div>

      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <CheckForm
          title="Modelo Activo"
          text=""
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />

        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
            paddingBottom: "20px",
          }}
        >
          <GrayButton text="Cancelar" onClick={() => {}} />
        </div>
        <div
          style={{
            transform: "scale(1.4)",
            transformOrigin: "left",
            width: "100px",
          }}
        >
          <GrayButton text="Confirmar" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default ModificarModelo;