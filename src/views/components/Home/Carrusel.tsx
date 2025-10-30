"use client";

import type React from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import slice1 from "../../assets/Carrusel D1.png";
import slice2 from "../../assets/Carrusel D2.png";
import slice3 from "../../assets/Carrusel D3.png";
import GrayButton from "../GeneralComponents/Button";

const Carrusel = () => {
  const slides = [slice1, slice2, slice3];
  const navigate = useNavigate();

  const imgStyle: React.CSSProperties = {
    objectFit: "cover",
    height: "94vh",
    width: "100%",
    minHeight: "400px",
  };

  const captionStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: "0.5rem",
    padding: "1rem",
  };

  const goToSolicitarCotizacion = () => {
    navigate("/solicitar-cotizacion");
  };

  useEffect(() => {
    const el = document.querySelector("#carruselCarChain");
    if (el) {
      new Carousel(el, {
        interval: 4000,
        ride: "carousel",
        pause: false,
      });
    }
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          #carruselCarChain .carousel-item img {
            height: 60vh !important;
            min-height: 300px !important;
          }
          #carruselCarChain .carousel-caption {
            padding: 0.5rem !important;
            bottom: 0.5rem !important;
          }
          #carruselCarChain .carousel-caption h1 {
            font-size: 1.5rem !important;
          }
          #carruselCarChain .carousel-caption p {
            font-size: 0.875rem !important;
            margin-bottom: 0.5rem !important;
          }
        }
        @media (max-width: 576px) {
          #carruselCarChain .carousel-item img {
            height: 50vh !important;
            min-height: 250px !important;
          }
          #carruselCarChain .carousel-caption h1 {
            font-size: 1.25rem !important;
          }
          #carruselCarChain .carousel-caption p {
            font-size: 0.75rem !important;
          }
        }
      `}</style>

      <div
        id="carruselCarChain"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="4000"
        data-bs-pause="false"
        style={{ backgroundColor: "#1a2332", margin: 0, padding: 0 }}
      >
        <div className="carousel-inner">
          {slides.map((img, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={img || "/placeholder.svg"}
                style={imgStyle}
                alt={`Slide ${index}`}
              />
              <div className="carousel-caption d-block" style={captionStyle}>
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
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carruselCarChain"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </>
  );
};

export default Carrusel;
