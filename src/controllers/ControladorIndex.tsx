import HomePage from "../views/pages/HomePage";
import { useAuth0 } from "@auth0/auth0-react";

const ControladorIndex = () => {
  // TODO - Implementar autenticación y pasar el estado isAuth a HomePage
  const { isAuthenticated } = useAuth0();
  // Por ahora, se pasa isAuth como false para simular un usuario no autenticado

  return (
    <div>
      <HomePage isAuth={isAuthenticated} />
    </div>
  );
};

export default ControladorIndex;
