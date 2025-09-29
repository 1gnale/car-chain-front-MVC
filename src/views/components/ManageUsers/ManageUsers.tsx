import TableButton from "../GeneralComponents/Table";
import IconButton from "../GeneralComponents/IconButton";
import { PlusSquare, Pencil, Trash } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import CheckForm from "../GeneralComponents/CheckForm";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxTypedHooks";
import { updateUsuarioState } from "../../../redux/usuariosSlice";
import Modal from "../GeneralComponents/Modal";
import { UsuarioRepository } from "../../../models/repository/Repositorys/UsuariosRepository";

function ManageUsers({
  handleCurrentView,
  setCurrentUsuario,
}: {
  handleCurrentView: (pass: boolean) => void;
  setCurrentUsuario: (usuario: Usuario) => void;
}) {
  // Repositorio para los ENDPOINTS
  const usuarioRepo = new UsuarioRepository(
    `${import.meta.env.VITE_BASEURL}/api/usuarios`
  );

  // States para la busqueda y filtro
  const [isTableLoaded, setIsTableLoaded] = useState(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // Traer del redux los repositorios para la tabla
  const users = useAppSelector((state) => state.usuarios.usuario);
  const dispatch = useAppDispatch();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // Buscador
  const filterUsers = () => {
    if (!users) return [];

    return users.filter((usuario) => {
      if (!usuario) return false;

      const matchesSearch = (usuario.nombres || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      // Si checkbox está activado => mostrar todos los usuarios
      if (checkbox) {
        return matchesSearch;
      }

      // Si checkbox no está activado => mostrar solo activos
      return usuario.activo && matchesSearch;
    });
  };
  const filteredUsuarios = filterUsers();

  // UseEffect que recarga la tabla al actualizar los datos
  useEffect(() => {
    if (users && users.length > 0) {
      setIsTableLoaded(true);
    }
  }, [users]);

  // Handles (Botones alta baja y modificacion)
  const handleUpdateUser = (usuario: any): void => {
    setCurrentUsuario(usuario);
    handleCurrentView(false);
  };

  const handleCreateUser = (): void => {
    handleCurrentView(true);
  };

  async function handleDeleteUser(usuario: any) {
    if (window.confirm("¿Estás seguro de que querés eliminar al usuario?")) {
      try {
        const response = await usuarioRepo.updateStateUser(usuario.legajo);

        //  Actualizo Redux en frontend sin volver a pedir la lista
        dispatch(updateUsuarioState({ legajo: usuario.legajo }));
        setShowError(true);
        setModalMessage(
          "Estado del usuario " + usuario.legajo + " actualizado"
        );
        setMessageType("info");
        setTitleModalMessage("Usuario eliminado");
      } catch (error: any) {
        setShowError(true);
        setModalMessage("Error en la petición" + error.message);
        setMessageType("error");
        setTitleModalMessage("ERROR");
      }
    }
  }

  // Handle que carga la tabla
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
          onAction: handleDeleteUser,
        },
      ],
      titles: ["ID", "Nombres", "Correo", "Documento", "Estado"],
      tableBody: filteredUsuarios.map((usuario) => ({
        key: usuario.legajo ? usuario.legajo : 0,
        value: usuario,
        rowContent: [
          String(usuario.legajo || ""),
          `${usuario.nombres || ""} ${usuario.apellido || ""}`.trim(),
          usuario.correo || "",
          usuario.documento || "",
          usuario.activo ? "Activo" : "Inactivo",
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
            text="Mostrar todos los usuarios"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </div>
        <div className="d-flex my-4" style={{ width: "100%" }}>
          {!users || users.length === 0 ? (
            <div className="w-100 text-center">
              No hay usuarios para mostrar
            </div>
          ) : !isTableLoaded ? (
            <div className="w-100 text-center">Cargando...</div>
          ) : (
            <TableButton
              titles={titles}
              tableBody={tableBody}
              customIcons={customIcons}
              showButtom={showButtom}
            />
          )}
        </div>
        <Modal
          show={showError}
          onClose={() => setShowError(false)}
          type={messageType}
          title={messageTitle}
          message={errorMessage || "Error inesperado intente mas tarde"}
        />
      </div>
    </>
  );
}
export default ManageUsers;
