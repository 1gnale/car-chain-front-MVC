interface exampleInputEmail1 {
  title: string | "";
  srcUrl?: string;
  onCharge: (file: File) => void;
  onBlur?: () => void;
  error?: string;
  fileName?: string; // Nombre del archivo cargado desde localStorage
  isLoadedFromStorage?: boolean; // Indica si se cargó desde localStorage
}

export default function ImgInput(props: exampleInputEmail1) {
  const {
    title,
    srcUrl,
    onCharge,
    onBlur,
    error,
    fileName,
    isLoadedFromStorage,
  } = props;

  const inputId = `file-input-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="mb-4">
      <div className="mb-3">
        <h6 className="text-info fw-bold mb-2">
          <i className="fas fa-image me-2"></i>
          {title}
        </h6>
      </div>

      <div className="position-relative">
        {/* Input file oculto */}
        <input
          type="file"
          accept="image/*"
          className="d-none"
          onBlur={onBlur}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onCharge(file);
          }}
          id={inputId}
          lang="es"
        />

        {/* Botón personalizado que activa el input file */}
        <label
          htmlFor={inputId}
          className={`btn w-100 d-flex align-items-center justify-content-center position-relative ${
            error ? "border-danger" : ""
          }`}
          style={{
            borderRadius: "12px",
            padding: "20px",
            fontSize: "14px",
            border: error
              ? "2px solid #dc3545"
              : "2px dashed rgba(13, 202, 240, 0.5)",
            backgroundColor: srcUrl
              ? "rgba(13, 202, 240, 0.1)"
              : "rgba(13, 202, 240, 0.05)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            minHeight: "100px",
          }}
          onMouseEnter={(e) => {
            if (!error) {
              e.currentTarget.style.backgroundColor = srcUrl
                ? "rgba(13, 202, 240, 0.15)"
                : "rgba(13, 202, 240, 0.1)";
              e.currentTarget.style.borderColor = "rgba(13, 202, 240, 0.7)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(13, 202, 240, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = srcUrl
              ? "rgba(13, 202, 240, 0.1)"
              : "rgba(13, 202, 240, 0.05)";
            e.currentTarget.style.borderColor = "rgba(13, 202, 240, 0.5)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {srcUrl ? (
            <div className="d-flex flex-column align-items-center">
              <i
                className="fas fa-check-circle text-success mb-2"
                style={{ fontSize: "28px" }}
              ></i>
              <span className="text-success fw-semibold">
                Imagen cargada exitosamente
              </span>
              <small className="text-info mt-1">
                <i className="fas fa-edit me-1"></i>
                Clic para cambiar imagen
              </small>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <i
                className="fas fa-cloud-upload-alt text-info mb-2"
                style={{ fontSize: "28px" }}
              ></i>
              <span className="text-info fw-semibold">Subir imagen</span>
              <small className="text-muted mt-1">
                <i className="fas fa-mouse-pointer me-1"></i>
                Clic aquí o arrastra tu archivo
              </small>
            </div>
          )}
        </label>

        {/* Indicador de archivo cargado desde localStorage */}
        {isLoadedFromStorage && fileName && (
          <div className="mt-3">
            <div
              className="d-flex align-items-center p-3 rounded"
              style={{
                backgroundColor: "rgba(25, 135, 84, 0.1)",
                border: "1px solid rgba(25, 135, 84, 0.3)",
                borderRadius: "10px",
              }}
            >
              <div className="flex-shrink-0">
                <i
                  className="fas fa-database text-success"
                  style={{ fontSize: "18px" }}
                ></i>
              </div>
              <div className="ms-3">
                <div className="text-success fw-medium mb-1">
                  Archivo restaurado automáticamente
                </div>
                <small className="text-muted">
                  <i className="fas fa-file-image me-1"></i>
                  <span className="fw-bold text-success">{fileName}</span>
                </small>
              </div>
            </div>
          </div>
        )}

        {/* Previsualización mejorada */}
        {srcUrl && (
          <div className="mt-4">
            <div className="position-relative">
              <div
                className="text-center p-3 rounded"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >
                <div className="mb-2">
                  <small className="text-info fw-medium">
                    <i className="fas fa-eye me-1"></i>
                    Vista previa
                  </small>
                </div>
                <img
                  src={srcUrl}
                  alt="preview"
                  className="rounded shadow"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "280px",
                    border: "3px solid rgba(13, 202, 240, 0.4)",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="position-absolute"
                  style={{ top: "10px", right: "10px" }}
                >
                  <span className="badge bg-success rounded-pill p-2 shadow">
                    <i
                      className="fas fa-check"
                      style={{ fontSize: "12px" }}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-3">
            <div
              className="alert alert-danger d-flex align-items-center py-3"
              role="alert"
              style={{
                borderRadius: "10px",
                backgroundColor: "rgba(220, 53, 69, 0.1)",
                border: "1px solid rgba(220, 53, 69, 0.3)",
              }}
            >
              <i
                className="fas fa-exclamation-triangle text-danger me-2"
                style={{ fontSize: "18px" }}
              ></i>
              <div>
                <strong className="text-danger">Error:</strong>
                <div className="mt-1">{error}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
