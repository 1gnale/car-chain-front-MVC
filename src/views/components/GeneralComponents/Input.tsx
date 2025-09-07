interface InputProps {
  title: string;
  place: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onBlur?: () => void;
  disabled?: boolean;
  style?: string;
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
          <label htmlFor="exampleInputEmail1" style={labelStyle || {}}>
            {title}
          </label>
        )}
      </div>

      <div className="w-100">
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

        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
