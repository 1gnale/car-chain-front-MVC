import ImgInput from "../GeneralComponents/ImgInput";
import { useState, useEffect } from "react";
import useFormValidation from "../../../controllers/controllerHooks/Validations/useFormDocumetsValidation";
import useCheckFirstLogin from "../../../controllers/controllerHooks/Fetchs/useCheckFirstLogin";

const FormDocumentation = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: boolean) => void;
}) => {
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
      reader.onerror = error => reject(error);
    });
  };

  // Función para convertir Base64 a File
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
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
            //("🖼️ URLs de imágenes cargadas:", documentationData.imageData);
            
            // Recrear objetos File desde Base64 si existen
            if (documentationData.filePaths) {
              const { imageData, filePaths } = documentationData;
              //("📁 Recreando archivos desde localStorage...");
              
              // Actualizar nombres de archivos guardados
              setStoredFileNames(filePaths);
              
              if (imageData.fotoFrontal && filePaths.fotoFrontal) {
                const file = base64ToFile(imageData.fotoFrontal, filePaths.fotoFrontal);
                setFileFrontal(file);
                //("✅ Foto frontal recreada:", file.name);
              }
              
              if (imageData.fotoTrasera && filePaths.fotoTrasera) {
                const file = base64ToFile(imageData.fotoTrasera, filePaths.fotoTrasera);
                setFileTrasera(file);
              }
              
              if (imageData.fotoLateral1 && filePaths.fotoLateral1) {
                const file = base64ToFile(imageData.fotoLateral1, filePaths.fotoLateral1);
                setFileLateral1(file);
              }
              
              if (imageData.fotoLateral2 && filePaths.fotoLateral2) {
                const file = base64ToFile(imageData.fotoLateral2, filePaths.fotoLateral2);
                setFileLateral2(file);
              }
              
              if (imageData.fotoTecho && filePaths.fotoTecho) {
                const file = base64ToFile(imageData.fotoTecho, filePaths.fotoTecho);
                setFileTecho(file);
              }
              
              if (imageData.cedulaVerde && filePaths.cedulaVerde) {
                const file = base64ToFile(imageData.cedulaVerde, filePaths.cedulaVerde);
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
      setImageUrls(prev => ({
        ...prev,
        [type]: base64Data
      }));

      // Guardar en localStorage inmediatamente
      const existingData = JSON.parse(localStorage.getItem("Documentation") || "{}");
      const updatedData = {
        ...existingData,
        imageData: {
          ...existingData.imageData,
          [type]: base64Data
        },
        filePaths: {
          ...existingData.filePaths,
          [type]: file.name
        }
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
      } catch (err) {
      }
    } else {
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11">
            {/* Header moderno */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-info rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{ width: '48px', height: '48px' }}>
                  <i className="fas fa-camera text-white"></i>
                </div>
                <div>
                  <h2 className="text-white mb-1">Documentación del Vehículo</h2>
                  <p className="text-info-emphasis mb-0">Sube las fotos requeridas para completar tu cotización</p>
                </div>
              </div>
            </div>

            {isLoadingImages && (
              <div className="alert alert-info border-0 mb-4" style={{ backgroundColor: 'rgba(13, 202, 240, 0.1)', borderRadius: '12px' }}>
                <div className="d-flex align-items-center">
                  <div className="spinner-border spinner-border-sm text-info me-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <span className="text-info">Cargando imágenes almacenadas...</span>
                </div>
              </div>
            )}

            {/* Cards de imágenes con diseño moderno */}
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <div className="card bg-dark border-info h-100" style={{ borderRadius: '16px', border: '1px solid rgba(13, 202, 240, 0.3)' }}>
                  <div className="card-header bg-transparent border-info border-bottom">
                    <h5 className="card-title text-info mb-0 d-flex align-items-center">
                      <i className="fas fa-car me-2"></i>
                      Fotos del Vehículo
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="row g-3">
                      <div className="col-12">
                        <ImgInput
                          title="Foto Frontal"
                          srcUrl={imageUrls.fotoFrontal}
                          onCharge={(file: File) => {
                            handleFileFrontalChange(file);
                          }}
                          error={errors.fotoFrontal}
                          onBlur={() =>
                            validateField(
                              "fotoFrontal" as keyof typeof errors,
                              fileFotoFrontal
                            )
                          }
                          fileName={storedFileNames.fotoFrontal}
                          isLoadedFromStorage={!!storedFileNames.fotoFrontal}
                        />
                      </div>
                      <div className="col-12">
                        <ImgInput
                          title="Foto Trasera"
                          onCharge={(file: File) => {
                            handleFileTraseraChange(file);
                          }}
                          srcUrl={imageUrls.fotoTrasera}
                          error={errors.fotoTrasera}
                          onBlur={() =>
                            validateField(
                              "fotoTrasera" as keyof typeof errors,
                              fileFotoTrasera
                            )
                          }
                          fileName={storedFileNames.fotoTrasera}
                          isLoadedFromStorage={!!storedFileNames.fotoTrasera}
                        />
                      </div>
                      <div className="col-12">
                        <ImgInput
                          title="Foto Lateral 1"
                          onCharge={(file: File) => {
                            handleFileLateral1Change(file);
                          }}
                          srcUrl={imageUrls.fotoLateral1}
                          error={errors.fotoLateral1}
                          onBlur={() =>
                            validateField(
                              "fotoLateral1" as keyof typeof errors,
                              fileFotoLateral1
                            )
                          }
                          fileName={storedFileNames.fotoLateral1}
                          isLoadedFromStorage={!!storedFileNames.fotoLateral1}
                        />
                      </div>
                      <div className="col-12">
                        <ImgInput
                          title="Foto Lateral 2"
                          onCharge={(file: File) => {
                            handleFileLateral2Change(file);
                          }}
                          srcUrl={imageUrls.fotoLateral2}
                          error={errors.fotoLateral2}
                          onBlur={() =>
                            validateField(
                              "fotoLateral2" as keyof typeof errors,
                              fileFotoLateral2
                            )
                          }
                          fileName={storedFileNames.fotoLateral2}
                          isLoadedFromStorage={!!storedFileNames.fotoLateral2}
                        />
                      </div>
                      <div className="col-12">
                        <ImgInput
                          title="Foto Techo"
                          onCharge={(file: File) => {
                            handleFileTechoChange(file);
                          }}
                          error={errors.fotoTecho}
                          srcUrl={imageUrls.fotoTecho}
                          onBlur={() =>
                            validateField(
                              "fotoTecho" as keyof typeof errors,
                              fileFotoTecho
                            )
                          }
                          fileName={storedFileNames.fotoTecho}
                          isLoadedFromStorage={!!storedFileNames.fotoTecho}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className="card bg-dark border-info h-100" style={{ borderRadius: '16px', border: '1px solid rgba(13, 202, 240, 0.3)' }}>
                  <div className="card-header bg-transparent border-info border-bottom">
                    <h5 className="card-title text-info mb-0 d-flex align-items-center">
                      <i className="fas fa-id-card me-2"></i>
                      Documentación Legal
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="col-12">
                      <ImgInput
                        title="Cedula Verde"
                        onCharge={(file: File) => {
                          handleFileCedulaVerdeChange(file);
                        }}
                        error={errors.cedulaVerde}
                        srcUrl={imageUrls.cedulaVerde}
                        onBlur={() =>
                          validateField(
                            "cedulaVerde" as keyof typeof errors,
                            fileCedulaVerde
                          )
                        }
                        fileName={storedFileNames.cedulaVerde}
                        isLoadedFromStorage={!!storedFileNames.cedulaVerde}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="d-flex justify-content-between align-items-center mt-5 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              
              <div className="d-flex gap-3">
                <button 
                  type="button" 
                  className="btn btn-outline-light px-4"
                  style={{ borderRadius: '10px' }}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-info px-5"
                  style={{ borderRadius: '10px' }}
                  onClick={handleSubmit}
                >
                  <i className="fas fa-arrow-right me-2"></i>
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDocumentation;