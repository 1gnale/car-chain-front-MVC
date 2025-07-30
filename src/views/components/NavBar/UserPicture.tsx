import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const UserPicture = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/perfil");
  };

  return (
    <div className="navbar-nav ms-lg-auto">
      <button 
        className="nav-link d-flex align-items-center border-0 bg-transparent"
        onClick={handleProfileClick}
        style={{ cursor: "pointer" }}
      >
        <b className="me-2">Perfil</b>
        <img
          src={user?.picture}
          className="rounded-circle"
          alt="Perfil"
          height="30"
          width="30"
        />
      </button>
    </div>
  );
};

export default UserPicture;
