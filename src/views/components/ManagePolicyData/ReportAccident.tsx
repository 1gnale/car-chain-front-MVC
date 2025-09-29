"use client";

import ImgInput from "../GeneralComponents/ImgInput";
import { useState } from "react";
import DateInputDark from "../GeneralComponents/DateInputDark";
import useFormValidationSiniestro from "../../../controllers/controllerHooks/Validations/useSiniestroValidation";
import { SiniestroRepository } from "../../../models/repository/Repositorys/SiniestroRepository";
import { useAppDispatch } from "../../../redux/reduxTypedHooks";
import Modal from "../GeneralComponents/Modal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import { createSiniestro } from "../../../redux/historySlice";

const ReportAccident = ({
  handleCurrentView,
  idPolicy,
}: {
  idPolicy: number;
  handleCurrentView: (pass: ViewName) => void;
}) => {
  // Repositorio para los ENDPOINTS
  const siniestoRepo = new SiniestroRepository(
    `${import.meta.env.VITE_BASEURL}/api/poliza`
  );

  // Validaciones
  const { errors, validateField, validateForm } = useFormValidationSiniestro();

  // States del modal
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setModalMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<ModalType>();
  const [messageTitle, setTitleModalMessage] = useState<string>();

  // states para los files
  const [fileFotoDenuncia, setFotoDenuncia] = useState<File>();
  const [fileFotoVehiculo, setFileVehiculo] = useState<File>();

  // Redux datos y dispatch
  const dispatch = useAppDispatch();

  // Formulario
  const [formAccident, setformAccident] = useState<Siniestro>({
    id: 0,
    fechaSiniestro: "",
    horaSiniestro: "",
    fotoDenuncia: fileFotoDenuncia,
    fotoVehiculo: fileFotoVehiculo,
  });

  // Estados para las URLs de las imágenes (base64)
  const [imageUrls, setImageUrls] = useState({
    fotoDenuncia: "",
    fotoVehiculo: "",
  });

  // Estados para los nombres de archivos cargados desde localStorage
  const [storedFileNames, setStoredFileNames] = useState({
    fotoDenuncia: "",
    fotoVehiculo: "",
  });

  // Función para convertir File a Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handles para rellenar el formulario
  const handleFotoDenunciaChange = async (file: File) => {
    setFotoDenuncia(file);
    const base64Data = await fileToBase64(file);

    // Actualizar estado local
    setImageUrls((prev) => ({
      ...prev,
      ["fotoDenuncia"]: base64Data,
    }));

    validateField("fotoDenuncia", file);
  };

  const handleFileVehiculoChange = async (file: File) => {
    setFileVehiculo(file);
    const base64Data = await fileToBase64(file);

    // Actualizar estado local
    setImageUrls((prev) => ({
      ...prev,
      ["fotoVehiculo"]: base64Data,
    }));
    validateField("fotoVehiculo", file);
  };

  const handleInputChange = (field: string, value: string) => {
    setformAccident((prev) => ({ ...prev, [field]: value }));
    validateField(field as keyof typeof errors, value);
  };

  // botones solicitar y cancelar
  async function handleSubmit() {
    const accidentVal: Siniestro = {
      id: 0,
      fechaSiniestro: formAccident.fechaSiniestro,
      horaSiniestro: formAccident.horaSiniestro,
      fotoDenuncia: fileFotoDenuncia,
      fotoVehiculo: fileFotoVehiculo,
    };
    if (validateForm(accidentVal)) {
      try {
        const accident = {
          id: 0,
          fechaSiniestro: formAccident.fechaSiniestro,
          horaSiniestro: formAccident.horaSiniestro,
          fotoDenuncia: await fileToBase64(fileFotoDenuncia!),
          fotoVehiculo: await fileToBase64(fileFotoVehiculo!),
        };
        const response = await siniestoRepo.createSiniestro(accident, idPolicy);

        console.log("✅ Siniestro creado:", response);

        // Formateamos el siniestro para Redux
        const SiniestroParaRedux: Siniestro = {
          ...response,
          id: response.id,
          fechaSiniestro: response.fechaSiniestro,
          horaSiniestro: response.horaSiniestro,
          estado: response.estado,
        };

        // Despachamos al store
        dispatch(createSiniestro(SiniestroParaRedux));
        console.log("✅ Siniestro creado en Redux:", SiniestroParaRedux);
        setShowError(true);
        setTitleModalMessage("Siniestro solicitado");
        setModalMessage(
          "Siniestro solicitado, espere a que un tecnico lo evalue"
        );
        setMessageType("success");

        /* setformModel({ id: 0, marca: { id: 0 } });
        setSelectedBrand(0);*/
      } catch (error: any) {
        setTitleModalMessage("ERROR");
        setShowError(true);
        setModalMessage(error.message || "Error desconocido");
        setMessageType("error");
      }
    }
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1d23", // Updated to match CAR-CHAIN theme
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#2a2d3a", // Updated card background
          borderRadius: "16px",
          border: "1px solid rgba(0, 188, 212, 0.3)", // Updated border color to cyan
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "transparent",
            borderBottom: "1px solid rgba(0, 188, 212, 0.3)", // Updated border
            padding: "20px 24px",
          }}
        >
          <h5
            style={{
              color: "#00bcd4",
              margin: 0,
              display: "flex",
              alignItems: "center",
              fontSize: "1.25rem",
              fontWeight: "600",
            }}
          >
            <i className="fas fa-car" style={{ marginRight: "8px" }}></i>
            Datos del siniestro
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-icono">
                  Este reporte es de carácter jurídico y cualquier intento de
                  fraude o falsificación de los datos tendrá graves
                  consecuencias legales
                </Tooltip>
              }
            >
              <span style={{ cursor: "pointer", marginLeft: "12px" }}>
                <ExclamationCircleFill size={22} />
              </span>
            </OverlayTrigger>
          </h5>
        </div>

        <div style={{ padding: "24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <DateInputDark
              title="Fecha del siniestro"
              value={formAccident.fechaSiniestro || ""}
              onChange={(value) => handleInputChange("fechaSiniestro", value)}
              error={errors.fechaSiniestro}
              onBlur={() =>
                validateField(
                  "fechaSiniestro",
                  String(formAccident.fechaSiniestro)
                )
              }
              showFormat={true}
              type="date"
            />
            <DateInputDark
              title="Hora del siniestro"
              value={formAccident.horaSiniestro || ""}
              onChange={(value) => handleInputChange("horaSiniestro", value)}
              error={errors.horaSiniestro}
              onBlur={() =>
                validateField(
                  "horaSiniestro",
                  String(formAccident.horaSiniestro)
                )
              }
              showFormat={true}
              type="time"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            <ImgInput
              title="Foto Denuncia"
              srcUrl={imageUrls.fotoDenuncia}
              onCharge={(file: File) => handleFotoDenunciaChange(file)}
              error={errors.fotoDenuncia}
              onBlur={() => validateField("fotoDenuncia", fileFotoDenuncia)}
              fileName={storedFileNames.fotoDenuncia}
            />

            <ImgInput
              title="Foto Vehiculo"
              srcUrl={imageUrls.fotoVehiculo}
              onCharge={(file: File) => handleFileVehiculoChange(file)}
              error={errors.fotoVehiculo}
              onBlur={() => validateField("fotoVehiculo", fileFotoVehiculo)}
              fileName={storedFileNames.fotoVehiculo}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                style={{
                  backgroundColor: "#4b5563",
                  color: "#e5e7eb",
                  padding: "12px 24px",
                  border: "1px solid #6b7280",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={() => handleCurrentView("PolicyProfile")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00bcd4";
                  e.currentTarget.style.color = "#00bcd4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.3)";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                <i
                  className="fas fa-arrow-left"
                  style={{ marginRight: "8px" }}
                ></i>
                Volver
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: "#00bcd4",
                  border: "1px solid #00bcd4",
                  color: "#ffffff",
                  padding: "12px 32px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontWeight: "500",
                }}
                onClick={handleSubmit}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#00acc1";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#00bcd4";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <i
                  className="fas fa-arrow-right"
                  style={{ marginRight: "8px" }}
                ></i>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showError}
        onClose={
          messageType == "success"
            ? () => {
                setShowError(false);
                handleCurrentView("PolicyProfile");
              }
            : () => {
                setShowError(false);
              }
        }
        type={messageType}
        title={messageTitle}
        message={errorMessage || "Error inesperado intente mas tarde"}
      />
    </div>
  );
};

export default ReportAccident;
