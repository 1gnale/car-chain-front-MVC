import type React from "react";
interface InfoLabel {
  title: string;
  text?: string | React.ReactNode;
  labelClassName?: string; // clases extra para el label
  textClassName?: string; // clases extra para el texto
  containerClassName?: string; // opcional: clases extra para el contenedor principal
  dark?: boolean; // nueva prop para alternar entre tema claro y oscuro
}

function LabelInfo(props: InfoLabel) {
  const {
    title,
    text,
    labelClassName,
    textClassName,
    containerClassName = "mb-3",
    dark = false, // por defecto usa tema claro
  } = props;

  const defaultLabelClassName = dark
    ? "form-label text-dark fw-bold small"
    : "form-label text-info fw-bold small";

  const defaultTextClassName = dark
    ? "text-dark fw-normal"
    : "text-light fw-normal";

  return (
    <div className={containerClassName}>
      <label className={labelClassName || defaultLabelClassName}>{title}</label>
      <div className={textClassName || defaultTextClassName}>
        {text || "No especificado"}
      </div>
    </div>
  );
}

export default LabelInfo;
