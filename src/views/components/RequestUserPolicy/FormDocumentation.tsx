import ImgInput from "../GeneralComponents/ImgInput";
import { useState, useEffect } from "react";
import useFormValidation from "../../../controllers/controllerHooks/Validations/useFormDocumetsValidation";
import useCheckFirstLogin from "../../../controllers/controllerHooks/Fetchs/useCheckFirstLogin";
import { useNavigate } from "react-router-dom";
const FormDocumentation = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
  const navigate = useNavigate();

  const [fileFotoFrontal, setFileFrontal] = useState<File>();
  const [fileFotoTrasera, setFileTrasera] = useState<File>();
  const [fileFotoLateral1, setFileLateral1] = useState<File>();
  const [fileFotoLateral2, setFileLateral2] = useState<File>();
  const [fileFotoTecho, setFileTecho] = useState<File>();
  const [fileCedulaVerde, setFileCedulaVerde] = useState<File>();

  // Estados para las URLs de las imágenes (base64)
  const [imageUrls, setImageUrls] = useState({
    fotoFrontal: "",
    fotoTrasera: "",
    fotoLateral1: "",
    fotoLateral2: "",
    fotoTecho: "",
    cedulaVerde: "",
  });

  // Estados para los nombres de archivos cargados desde localStorage
  const [storedFileNames, setStoredFileNames] = useState({
    fotoFrontal: "",
    fotoTrasera: "",
    fotoLateral1: "",
    fotoLateral2: "",
    fotoTecho: "",
    cedulaVerde: "",
  });

  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useCheckFirstLogin();

  const { errors, validateField, validateForm } = useFormValidation();

  // Función para convertir File a Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Función para convertir Base64 a File
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Función para cargar imágenes desde localStorage al inicializar
  useEffect(() => {
    const loadStoredImages = async () => {
      try {
        const storedDocumentation = localStorage.getItem("Documentation");
        if (storedDocumentation) {
          const documentationData = JSON.parse(storedDocumentation);
          //("📱 Datos cargados desde localStorage:", documentationData);

          // Cargar las URLs de imágenes si existen
          if (documentationData.imageData) {
            setImageUrls(documentationData.imageData);
            // Recrear objetos File desde Base64 si existen
            if (documentationData.filePaths) {
              const { imageData, filePaths } = documentationData;
              // Actualizar nombres de archivos guardados
              setStoredFileNames(filePaths);

              if (imageData.fotoFrontal && filePaths.fotoFrontal) {
                const file = base64ToFile(
                  imageData.fotoFrontal,
                  filePaths.fotoFrontal
                );
                setFileFrontal(file);
              }

              if (imageData.fotoTrasera && filePaths.fotoTrasera) {
                const file = base64ToFile(
                  imageData.fotoTrasera,
                  filePaths.fotoTrasera
                );
                setFileTrasera(file);
              }

              if (imageData.fotoLateral1 && filePaths.fotoLateral1) {
                const file = base64ToFile(
                  imageData.fotoLateral1,
                  filePaths.fotoLateral1
                );
                setFileLateral1(file);
              }

              if (imageData.fotoLateral2 && filePaths.fotoLateral2) {
                const file = base64ToFile(
                  imageData.fotoLateral2,
                  filePaths.fotoLateral2
                );
                setFileLateral2(file);
              }

              if (imageData.fotoTecho && filePaths.fotoTecho) {
                const file = base64ToFile(
                  imageData.fotoTecho,
                  filePaths.fotoTecho
                );
                setFileTecho(file);
              }

              if (imageData.cedulaVerde && filePaths.cedulaVerde) {
                const file = base64ToFile(
                  imageData.cedulaVerde,
                  filePaths.cedulaVerde
                );
                setFileCedulaVerde(file);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error cargando imágenes almacenadas:", error);
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadStoredImages();
  }, []);

  // Función para manejar cambio de archivo y guardar en localStorage
  const handleFileChange = async (file: File, type: keyof typeof imageUrls) => {
    try {
      // Convertir archivo a Base64
      const base64Data = await fileToBase64(file);

      // Actualizar estado local
      setImageUrls((prev) => ({
        ...prev,
        [type]: base64Data,
      }));

      // Guardar en localStorage inmediatamente
      const existingData = JSON.parse(
        localStorage.getItem("Documentation") || "{}"
      );
      const updatedData = {
        ...existingData,
        imageData: {
          ...existingData.imageData,
          [type]: base64Data,
        },
        filePaths: {
          ...existingData.filePaths,
          [type]: file.name,
        },
      };

      localStorage.setItem("Documentation", JSON.stringify(updatedData));
      //(`Imagen ${type} guardada en localStorage`);
    } catch (error) {
      console.error(`Error guardando imagen ${type}:`, error);
    }
  };

  const handleFileFrontalChange = async (file: File) => {
    setFileFrontal(file);
    await handleFileChange(file, "fotoFrontal");
    validateField("fotoFrontal", file);
  };

  const handleFileTraseraChange = async (file: File) => {
    setFileTrasera(file);
    await handleFileChange(file, "fotoTrasera");
    validateField("fotoTrasera", file);
  };

  const handleFileLateral1Change = async (file: File) => {
    setFileLateral1(file);
    await handleFileChange(file, "fotoLateral1");
    validateField("fotoLateral1", file);
  };

  const handleFileLateral2Change = async (file: File) => {
    setFileLateral2(file);
    await handleFileChange(file, "fotoLateral2");
    validateField("fotoLateral2", file);
  };

  const handleFileTechoChange = async (file: File) => {
    setFileTecho(file);
    await handleFileChange(file, "fotoTecho");
    validateField("fotoTecho", file);
  };

  const handleFileCedulaVerdeChange = async (file: File) => {
    setFileCedulaVerde(file);
    await handleFileChange(file, "cedulaVerde");
    validateField("cedulaVerde", file);
  };
  const handleCancel = () => {
    if (window.confirm("¿Estás seguro de que querés cancelar la solicitud?")) {
      localStorage.clear();
      navigate(`/`);
    }
  };

  const handleSubmit = () => {
    const documentation: Documentacion = {
      fotoFrontal: fileFotoFrontal,
      fotoTrasera: fileFotoTrasera,
      fotoLateral1: fileFotoLateral1,
      fotoLateral2: fileFotoLateral2,
      fotoTecho: fileFotoTecho,
      cedulaVerde: fileCedulaVerde,
    };

    if (validateForm(documentation)) {
      try {
        handleCurrentView(true);
      } catch (err) {}
    } else {
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1e1e1eff",
        minHeight: "100vh",
      }}
    >
      <div
        className="card bg-dark border-info h-100"
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(13, 202, 240, 0.3)",
        }}
      >
        <div className="card-header bg-transparent border-info border-bottom">
          <h5 className="card-title text-info mb-0 d-flex align-items-center">
            <i className="fas fa-car me-2"></i>
            Fotos y Documentación
          </h5>
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <ImgInput
                title="Foto Frontal"
                srcUrl={imageUrls.fotoFrontal}
                onCharge={(file: File) => handleFileFrontalChange(file)}
                error={errors.fotoFrontal}
                onBlur={() => validateField("fotoFrontal", fileFotoFrontal)}
                fileName={storedFileNames.fotoFrontal}
                isLoadedFromStorage={!!storedFileNames.fotoFrontal}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <ImgInput
                title="Foto Trasera"
                srcUrl={imageUrls.fotoTrasera}
                onCharge={(file: File) => handleFileTraseraChange(file)}
                error={errors.fotoTrasera}
                onBlur={() => validateField("fotoTrasera", fileFotoTrasera)}
                fileName={storedFileNames.fotoTrasera}
                isLoadedFromStorage={!!storedFileNames.fotoTrasera}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <ImgInput
                title="Foto Lateral 1"
                srcUrl={imageUrls.fotoLateral1}
                onCharge={(file: File) => handleFileLateral1Change(file)}
                error={errors.fotoLateral1}
                onBlur={() => validateField("fotoLateral1", fileFotoLateral1)}
                fileName={storedFileNames.fotoLateral1}
                isLoadedFromStorage={!!storedFileNames.fotoLateral1}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <ImgInput
                title="Foto Lateral 2"
                srcUrl={imageUrls.fotoLateral2}
                onCharge={(file: File) => handleFileLateral2Change(file)}
                error={errors.fotoLateral2}
                onBlur={() => validateField("fotoLateral2", fileFotoLateral2)}
                fileName={storedFileNames.fotoLateral2}
                isLoadedFromStorage={!!storedFileNames.fotoLateral2}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <ImgInput
                title="Foto Techo"
                srcUrl={imageUrls.fotoTecho}
                onCharge={(file: File) => handleFileTechoChange(file)}
                error={errors.fotoTecho}
                onBlur={() => validateField("fotoTecho", fileFotoTecho)}
                fileName={storedFileNames.fotoTecho}
                isLoadedFromStorage={!!storedFileNames.fotoTecho}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <ImgInput
                title="Cédula Verde"
                srcUrl={imageUrls.cedulaVerde}
                onCharge={(file: File) => handleFileCedulaVerdeChange(file)}
                error={errors.cedulaVerde}
                onBlur={() => validateField("cedulaVerde", fileCedulaVerde)}
                fileName={storedFileNames.cedulaVerde}
                isLoadedFromStorage={!!storedFileNames.cedulaVerde}
              />
            </div>
          </div>
          {/* Botones de acción */}
          <div
            className="d-flex justify-content-between align-items-center mt-5 pt-4"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                style={{ borderRadius: "10px" }}
                onClick={() => handleCurrentView(false)}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Volver
              </button>
              <button
                type="button"
                className="btn btn-outline-light px-4"
                style={{ borderRadius: "10px" }}
                onClick={handleCancel}
              >
                <i className="fas fa-times me-2"></i>
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-info px-5"
                style={{ borderRadius: "10px" }}
                onClick={handleSubmit}
              >
                <i className="fas fa-arrow-right me-2"></i>
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default FormDocumentation;
