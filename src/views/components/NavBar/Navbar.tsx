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
            src={CarChainLogo || "/placeholder.svg"}
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
          <div className="navbar-nav flex-column flex-lg-row">
            <a
              href="#"
              className="nav-item nav-link active"
              onClick={() => navigate("/quienesSomos")}
            >
              ¿Quienes somos?
            </a>
            <a
              href="#"
              className="nav-item nav-link active"
              onClick={() => navigate("/contactanos")}
            >
              Contactanos
            </a>
            <a
              href="#"
              className="nav-item nav-link active"
              tabIndex={-1}
              onClick={() => navigate("/ayuda")}
            >
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
