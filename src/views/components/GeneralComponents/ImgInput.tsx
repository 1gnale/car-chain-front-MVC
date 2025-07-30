interface exampleInputEmail1 {
  title: string | "";
  srcUrl?: string;
  onCharge: (file: File) => void;
  onBlur?: () => void;
  error?: string;
}

export default function ImgInput(props: exampleInputEmail1) {
  const { title, srcUrl, onCharge, onBlur, error } = props;
  return (
    <div className="col mb-2">
      <div className="mb-1">
        <strong>
          <label>{title}</label>
        </strong>
      </div>

      <div className="custom-file">
        <input
          type="file"
          src={srcUrl}
          className={`form-control ${error ? "is-invalid" : ""}`}
          onBlur={onBlur}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onCharge(file);
          }}
          id="inputGroupFile01"
          lang="es"
        />
        {/* Previsualización */}
        {srcUrl && (
          <div className="mb-2 mt-1">
            <img
              src={srcUrl}
              alt="preview"
              style={{ maxWidth: "500%", maxHeight: 100 }}
            />
          </div>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
