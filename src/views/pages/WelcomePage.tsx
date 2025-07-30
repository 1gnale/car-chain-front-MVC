import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TitleSection from "../components/GeneralComponents/TitleSection";
import GrayButton from "../components/GeneralComponents/Button";

const WelcomePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Redirigir a la página principal o a completar perfil
    navigate("/solicitar-cotizacion");
  };

  const handleGoToProfile = () => {
    navigate("/perfil");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar isAuth={isAuthenticated} />
      <TitleSection title="¡Bienvenido a Car-Chain!" />
      
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <div className="mb-4">
                  <img
                    src={user?.picture}
                    alt="Perfil"
                    className="rounded-circle mb-3"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <h1 className="h3 mb-3">
                    ¡Hola {user?.given_name || user?.name}!
                  </h1>
                  <p className="lead text-muted">
                    Te damos la bienvenida a Car-Chain, tu plataforma de confianza 
                    para cotizar y contratar seguros de vehículos.
                  </p>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-4">
                    <div className="text-center">
                      <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: "60px", height: "60px" }}>
                        <i className="fas fa-car" style={{ fontSize: "24px" }}></i>
                      </div>
                      <h5>Cotiza tu seguro</h5>
                      <p className="text-muted small">
                        Obtén cotizaciones personalizadas para tu vehículo
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="text-center">
                      <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: "60px", height: "60px" }}>
                        <i className="fas fa-shield-alt" style={{ fontSize: "24px" }}></i>
                      </div>
                      <h5>Múltiples coberturas</h5>
                      <p className="text-muted small">
                        Elige entre diferentes opciones de cobertura
                      </p>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="text-center">
                      <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: "60px", height: "60px" }}>
                        <i className="fas fa-user-cog" style={{ fontSize: "24px" }}></i>
                      </div>
                      <h5>Gestiona tu perfil</h5>
                      <p className="text-muted small">
                        Administra tus datos y pólizas desde tu perfil
                      </p>
                    </div>
                  </div>
                </div>

                <div className="alert alert-info" role="alert">
                  <strong>¿Qué quieres hacer primero?</strong>
                  <br />
                  Puedes comenzar cotizando un seguro o completar tu información personal.
                </div>

                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                  <div style={{ minWidth: "200px" }}>
                    <GrayButton 
                      text="Comenzar Cotización" 
                      onClick={handleGetStarted}
                    />
                  </div>
                  <div style={{ minWidth: "200px" }}>
                    <GrayButton 
                      text="Completar Perfil" 
                      onClick={handleGoToProfile}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <small className="text-muted">
                    ¿Necesitas ayuda? Contacta nuestro soporte o revisa nuestras preguntas frecuentes.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
