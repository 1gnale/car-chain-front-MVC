import Table from "../components/GeneralComponents/Table";
import Input from "../components/GeneralComponents/Input";
import GrayButton from "../components/GeneralComponents/Button";
import LabelNinfo from "../components/GeneralComponents/LabelNinfo";
import IconButton from "../components/GeneralComponents/IconButton";
import { Search, PlusSquare } from "react-bootstrap-icons";
import CheckForm from "../components/GeneralComponents/CheckForm";
import { useAppSelector } from "../../redux/reduxTypedHooks";
import {  Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import { useState } from "react";


const PageCasoEstudio02 =
  ({
  handleCurrentView, setCurrentBrand
}: {
  handleCurrentView: (pass: boolean) => void,
  setCurrentBrand: (marca: Marca ) => void,
}) => {
  const marcas: Marca[] = useAppSelector((state) => state.marcas.marca);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // Filtrado por búsqueda y por estado (activo/inactivo)
  const filteredMarcas = marcas.filter((marca) => {
    const matchesSearch = marca.nombre
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return marca && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return marca.activo && matchesSearch;
  });
  const handleUpdateBrand = (marca: any): void => {
    setCurrentBrand(marca)
    handleCurrentView(false)
    console.log(marca)
  }
  const handleTable = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [{
        customIcons: Pencil, onAction: handleUpdateBrand
      }, {
        customIcons: Trash
      }],
      
      titles: ["ID", "Nombre", "Descripcion", "Estado"],
      tableBody: filteredMarcas.map(marca  => ({
        key: marca.id,
        value: marca,
        rowContent: [
          String(marca.id) ?? "",
          marca.nombre ?? "",
          marca.descripcion ?? "",

          (() =>  {
            if (marca.activo) {
              return "Activo";
            }
            else {
              return "Inactivo";
            }
          })(),
        ],
      })),
    };
  };

  const { titles, tableBody, customIcons, showButtom } = handleTable();

  return (
    <>
      <style>{`  .controls {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
         `}</style>
    <div className="container-fluid">
        <div className="controls">
          <div className="d-flex align-items-center gap-2 w-100">
            <span className="form-label mb-0">Búsqueda:</span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              style={{ maxWidth: "75%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton icon={PlusSquare}  />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todas las marcas"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </div>

      <div className="d-flex my-4" style={{ width: "-20px" }}>
        <Table
          titles={titles}
          tableBody={tableBody}
          customIcons={customIcons}
          showButtom={showButtom}
        />
      </div>
    </div>
    </>
  );
}

export default PageCasoEstudio02;
