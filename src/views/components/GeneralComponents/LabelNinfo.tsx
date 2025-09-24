interface InfoLabel {
  title: string;
  text?: string | React.ReactNode;
  labelClassName?: string; // clases extra para el label
  textClassName?: string; // clases extra para el texto
  containerClassName?: string; // opcional: clases extra para el contenedor principal
}

function LabelNinfo(props: InfoLabel) {
  const {
    title,
    text,
    labelClassName = "form-label text-info fw-bold small",
    textClassName = "text-light fw-normal",
    containerClassName = "mb-3",
  } = props;

  return (
    <div className={containerClassName}>
      <label className={labelClassName}>{title}</label>
      <div className={textClassName}>{text || "No especificado"}</div>
    </div>
  );
}

export default LabelNinfo;
