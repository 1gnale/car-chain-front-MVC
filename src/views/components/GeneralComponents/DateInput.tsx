import React from "react";

interface DateInputProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onBlur?: (value: string) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  showFormat?: boolean;
  labelClassName?: string; // 🔹 NUEVO: para el label
  inputClassName?: string; // 🔹 NUEVO: para el input
}

const DateInput: React.FC<DateInputProps> = ({
  title,
  value,
  onChange,
  error,
  onBlur,
  min = "1900-01-01",
  max,
  placeholder = "Seleccione una fecha",
  disabled = false,
  required = false,
  className = "",
  showFormat = true,
  labelClassName = "",
  inputClassName = "",
}) => {
  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) return dateStr;

    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateStr;
  };

  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return "";
    if (dateStr.includes("/")) return dateStr;

    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${month}/${day}/${year}`;
    }
    return dateStr;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoValue = e.target.value;
    if (!isoValue) {
      onChange('');
      return;
    }
    const displayValue = formatDateForDisplay(isoValue);
    onChange(displayValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e.target.value);
    }
  };

  const defaultMax = max || new Date().toISOString().split("T")[0];

  return (
    <div className={`mb-3 ${className}`}>
      <label className={labelClassName}>
        {title}
        {required && <span className="text-danger"> *</span>}
      </label>
      <input
        type="date"
        className={`form-control ${
          error ? "is-invalid" : ""
        } ${inputClassName}`}
        value={formatDateForInput(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={defaultMax}
        disabled={disabled}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {showFormat && (
        <div className="form-text">
          Formato: MM/DD/YYYY {value && `(${value})`}
        </div>
      )}
    </div>
  );
};

export default DateInput;
