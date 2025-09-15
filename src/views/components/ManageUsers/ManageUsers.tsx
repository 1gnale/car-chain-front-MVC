import TableButton from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";

function ManageUsers({
  handleCurrentView,
  setCurrentUsuario,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentUsuario: (usuario: Usuario) => void;
}) {
  // const usuario: Usuario[] = useAppSelector(
  // (state) => state.usuario.usuario
  //);
  const usuarios = [
    {
      id: 1,
      legajo: 1001,
      nombres: "Juan",
      apellido: "Pérez",
      fechaNacimiento: "1990-05-14",
      tipoDocumento: "DNI",
      documento: "30123456",
      domicilio: "Av. Siempre Viva 123",
      correo: "juan.perez@example.com",
      telefono: "1122334455",
      sexo: "Masculino",
      contraseña: "hashed_password_1",
      tipoUsuario: "Administrador",
      activo: true,
      localidad: {
        id: 1,
        descripcion: "La Plata",
        codigoPostal: "1900",
        provincia: {
          id: 1,
          descripcion: "Buenos Aires",
        },
      },
    },
    {
      id: 2,
      legajo: 1002,
      nombres: "María",
      apellido: "Gómez",
      fechaNacimiento: "1985-09-22",
      tipoDocumento: "DNI",
      documento: "28999888",
      domicilio: "Calle Falsa 456",
      correo: "maria.gomez@example.com",
      telefono: "1133445566",
      sexo: "Femenino",
      contraseña: "hashed_password_2",
      tipoUsuario: "Perito",
      activo: true,
    },
    {
      id: 3,
      legajo: 1003,
      nombres: "Carlos",
      apellido: "López",
      fechaNacimiento: "1995-01-10",
      tipoDocumento: "DNI",
      documento: "40111222",
      domicilio: "Boulevard Central 789",
      correo: "carlos.lopez@example.com",
      telefono: "1144556677",
      sexo: "M",
      contraseña: "hashed_password_3",
      tipoUsuario: "usuario",
      activo: false,
    },
    {
      id: 4,
      legajo: 1004,
      nombres: "Lucía",
      apellido: "Martínez",
      fechaNacimiento: "2000-07-03",
      tipoDocumento: "DNI",
      documento: "45566777",
      domicilio: "Pasaje Norte 321",
      correo: "lucia.martinez@example.com",
      telefono: "1155667788",
      sexo: "F",
      contraseña: "hashed_password_4",
      tipoUsuario: "moderador",
      activo: true,
    },
  ];

  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  const filteredPeriodosPago = usuarios.filter((usuario) => {
    const matchesSearch = usuario.nombres
      ?.toLowerCase()
      .includes(search.toLowerCase());

    // Si checkbox está activado => mostrar solo inactivas
    if (checkbox) {
      return usuario && matchesSearch;
    }

    // Si checkbox no está activado => mostrar solo activas
    return usuario.activo && matchesSearch;
  });

  const handleUpdateUser = (usuario: any): void => {
    setCurrentUsuario(usuario);
    handleCurrentView(false);
  };

  const handleCreateUser = (): void => {
    handleCurrentView(true);
  };
  const handleTableButton = (): tableContent => {
    return {
      showButtom: true,
      customIcons: [
        {
          customIcons: Pencil,
          onAction: handleUpdateUser,
        },
        {
          customIcons: Trash,
        },
      ],
      titles: ["ID", "Nombres", "Correo", "Documento", "Estado"],
      tableBody: filteredPeriodosPago.map((usuario) => ({
        key: usuario.id,
        value: usuario,
        rowContent: [
          String(usuario.id) ?? "",
          String(usuario.nombres + " " + usuario.apellido) ?? "",
          usuario.correo ?? "",
          usuario.documento ?? "",
          (() => {
            if (usuario.activo) {
              return "Activo";
            } else {
              return "Inactivo";
            }
          })(),
        ],
      })),
    };
  };

  const { titles, tableBody, customIcons, showButtom } = handleTableButton();

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
            <IconButton icon={PlusSquare} onClick={handleCreateUser} />
          </div>

          {/* Checkbox controlado */}
          <CheckForm
            text="Mostrar todos los periodos de pago"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </div>
        <div className="d-flex my-4" style={{ width: "-20px" }}>
          <TableButton
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
export default ManageUsers;
