import type React from "react";

interface InputProps {
  title: string;
  place: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onBlur?: () => void;
  disabled?: boolean;
  style?: string;
  classNameLabel?: string;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  divStyle?: React.CSSProperties;
  classNameDiv?: string;
  as?: "input" | "textarea";
  rows?: number;
  asLabel?: "label" | "none";
}

const Input = ({
  title,
  place,
  value,
  onChange,
  error,
  onBlur,
  disabled,
  style,
  inputStyle,
  labelStyle,
  divStyle,
  classNameDiv,
  classNameLabel,
  as = "input",
  rows = 3,
  asLabel = "label",
}: InputProps) => {
  return (
    <div
      className={classNameDiv ? classNameDiv : "col"}
      style={divStyle ? divStyle : {}}
    >
      <div>
        {asLabel === "none" ? null : (
          <label
            className={classNameLabel}
            htmlFor="exampleInputEmail1"
            style={labelStyle || {}}
          >
            {title}
          </label>
        )}
      </div>

      <div className="w-100 form-group">
        {as === "textarea" ? (
          <textarea
            className={`form-control ${error ? "is-invalid" : ""} ${style}`}
            placeholder={place}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            style={inputStyle || {}}
            rows={rows}
          />
        ) : (
          <input
            className={`form-control ${error ? "is-invalid" : ""} ${style}`}
            placeholder={place}
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            style={inputStyle || {}}
          />
        )}

        {/* Siempre ocupa espacio, aunque no haya error */}
        <div className="invalid-feedback">{error || ""}</div>
      </div>
    </div>
  );
};

export default Input;
