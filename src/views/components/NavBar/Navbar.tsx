import CarChainLogo from "../../assets/Carchain.png";
import UserPicture from "./UserPicture";
import AuthUser from "./AuthUser";

const Navbar = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand me-2" href="/">
          <img
            src={CarChainLogo}
            height="30"
            alt="Car-Chain"
            loading="lazy"
            style={{ marginTop: "-1px" }}
          />
        </a>
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
          {isAuth ? <UserPicture /> : <AuthUser />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
