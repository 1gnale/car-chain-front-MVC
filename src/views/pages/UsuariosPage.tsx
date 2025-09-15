import { useState } from "react";
import ManageUsers from "../components/ManageUsers/ManageUsers";
import HeaderSection from "../components/GeneralComponents/HeaderSection";
import ModificarUsuario from "../components/ManageUsers/ModificarUsuario";
import CrearUsuario from "../components/ManageUsers/CrearUsuario";
const UsuariosPage = ({ isAuth }: { isAuth: boolean }) => {
  const [currentView, setCurrentView] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<Usuario>({
    id: 0,
    legajo: 0,
  });
  const handleCurrentView = (pass: boolean) => {
    setCurrentView((prev) => {
      if (pass && prev < views.length - 1) {
        return prev + 1;
      } else if (!pass && prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  const views = [
    <ModificarUsuario
      handleCurrentView={handleCurrentView}
      usuario={currentUser}
    />,
    <ManageUsers
      handleCurrentView={handleCurrentView}
      setCurrentUsuario={setCurrentUser}
    />,
    <CrearUsuario handleCurrentView={handleCurrentView} />,
  ];

  return (
    <>
      {" "}
      <HeaderSection
        title="Gestión de Usuarios"
        text="Administra los usuarios disponibles en el sistema"
      ></HeaderSection>
      {views[currentView]}
    </>
  );
};

export default UsuariosPage;
