import CarChainLogo from "../../assets/Carchain.png";
import UserPicture from "./UserPicture";
import AuthUser from "./AuthUser";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ isAuth }: { isAuth: boolean }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div
          className="navbar-brand me-2"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={CarChainLogo}
            height="30"
            alt="Car-Chain"
            loading="lazy"
            style={{ marginTop: "-1px" }}
          />
        </div>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            <a href="#" className="nav-item nav-link active">
              ¿Quienes somos?
            </a>
            <a href="#/quienesSomos" className="nav-item nav-link active">
              Contactanos
            </a>
            <a href="#" className="nav-item nav-link active" tabIndex={-1}>
              Ayuda
            </a>
          </div>
          {isAuthenticated ? <UserPicture /> : <AuthUser />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
