interface imgconfirmationprop {
  src?: string | File;
  alt?: string;
  text: string;
}

function ImgConfirmation({ src, alt = "Imagen", text }: imgconfirmationprop) {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-between"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "auto",
        minWidth: "100px",
        height: "120px",
        padding: "6px",
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={src instanceof File ? URL.createObjectURL(src) : src}
        alt={alt}
        style={{
          width: "100%",
          height: "70px",
          objectFit: "contain",
        }}
      />
      <div
        style={{
          fontSize: "0.8rem",
          textAlign: "center",
          marginTop: "6px",
          fontWeight: "bold",
          border: "2px solid #999",
          borderRadius: "4px",
          padding: "2px 6px",
          whiteSpace: "nowrap",
          backgroundColor: "#a5a29eff",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default ImgConfirmation;
