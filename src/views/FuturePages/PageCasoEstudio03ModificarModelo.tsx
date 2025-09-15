import GrayButton from "../components/GeneralComponents/Button.tsx";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import useFormValidation from "../../controllers/controllerHooks/Validations/useFormValidation";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import SelectForm from "../components/GeneralComponents/SelectForm.tsx";
import { useLocalStorage } from "../../controllers/controllerHooks/LocalStorage/useLocalStorage";
import useLocalStorageItem from "../../controllers/controllerHooks/LocalStorage/getFromLocalStorageHook.ts";
import type { Mode } from "fs";
import CheckForm from "../components/GeneralComponents/CheckForm.tsx";
import Input from "../components/GeneralComponents/Input.tsx";

function ModificarModelo({
  modelo,
  handleCurrentView,
}: {
  modelo: Modelo;
  handleCurrentView: (pass: boolean) => void;
}) {
  const [checkbox, setCheckbox] = useState<boolean>(modelo.activo!);

  // Redux selectors para traer las marcas
  const brands: Marca[] = useAppSelector((state) => state.marcas.marca);
  const [selectedBrand, setSelectedBrand] = useState<number>(modelo.marca.id);

  const [formModel, setFormModel] = useState<Modelo>({
    id: modelo.id,
    nombre: modelo.nombre,
    descripcion: modelo.descripcion,
    marca: modelo.marca,
    activo: modelo.activo,
  });

  const handleCancel = (): void => {
    handleCurrentView(true);
  };
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
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <Input
        title="Nombre"
        place=""
        labelStyle={{ width: "100px" }}
        classNameDiv="d-flex align-items-start mb-3"
        value={formModel.nombre}
      />

      <Input
        title="Descripcion"
        place=""
        labelStyle={{ width: "100px" }}
        as="textarea"
        classNameDiv="d-flex align-items-start mb-3"
        value={formModel.descripcion}
      />

      <div className="col-md-4 ">
        <SelectForm
          status={true}
          value={selectedBrand}
          title="Marca"
          items={handleBrand}
          onChange={handleStateBrand}
          classNameDiv="d-flex align-items-start mb-3 gap-5"
          classNameSelect="ms-1"
          classNameLabel="ms-1"
        />
      </div>
      <div className="ms-1">
        <CheckForm
          text="Modelo Activo"
          checked={checkbox}
          onChange={() => setCheckbox(!checkbox)}
        />
      </div>
      <div
        className="d-grid d-md-flex justify-content-md-end"
        style={{ padding: "10px", gap: "2rem" }}
      >
        <div className="d-flex justify-content-end gap-3 mt-4">
          <GrayButton text="Cancelar" onClick={handleCancel} />
          <GrayButton text="Confirmar" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default ModificarModelo;
