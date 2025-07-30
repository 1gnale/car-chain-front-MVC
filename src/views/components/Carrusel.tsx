import slice1 from "../assets/Carrusel D1.png";
import slice2 from "../assets/Carrusel D2.png";
import slice3 from "../assets/Carrusel D3.png";
import { useNavigate } from "react-router-dom";
import GrayButton from "./GeneralComponents/Button";

const Carrusel = () => {
  const slides = [slice2, slice1, slice3];

  const imgStyle: React.CSSProperties = {
    objectFit: "cover" as React.CSSProperties["objectFit"],
    height: "100vh",
    width: "100%",
  };

  const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: "0.5rem",
    padding: "1rem",
  };

  const navigate = useNavigate();

  const goToSolicitarCotizacion = () => {
    navigate("/solicitar-cotizacion");
  };

  return (
    <div
      id="carruselCarChain"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {slides.map((img, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <img src={img} style={imgStyle} alt={`Slide ${index}`} />
            <div
              className="carousel-caption d-none d-md-block"
              style={captionStyle}
            >
              <h1 className="text-capitalize">¡Bienvenido a Car-Chain!</h1>
              <p className="text-center">
                Con tan solo seguir unos cuantos pasos, podremos decirle el
                valor exacto que tiene su vehículo en el mercado y las
                coberturas que podemos ofrecerle en base a este.
              </p>
              <GrayButton
                href="/solicitar-cotizacion"
                style="btn-lg"
                text="Solicitar cotización"
                onClick={goToSolicitarCotizacion}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carruselCarChain"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carruselCarChain"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carrusel;
