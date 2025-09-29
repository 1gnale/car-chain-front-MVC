import type React from "react";
import { useState, useEffect } from "react";

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
  labelClassName?: string;
  inputClassName?: string;
  type?: "date" | "time";
}

const DateInputDark: React.FC<DateInputProps> = ({
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
  type = "date",
}) => {
  // --- estados solo para edición de hora ---
  const [rawHours, setRawHours] = useState("");
  const [rawMinutes, setRawMinutes] = useState("");
  const [rawAmPm, setRawAmPm] = useState("AM");

  // sincroniza solo si cambia externamente el value
  useEffect(() => {
    if (type === "time" && value) {
      const [hours, minutes] = value.split(":");
      if (hours && minutes) {
        const hour24 = parseInt(hours, 10);
        const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
        const ampm = hour24 >= 12 ? "PM" : "AM";

        if (rawHours !== hour12.toString())
          setRawHours(hour12.toString().padStart(2, "0"));
        if (rawMinutes !== minutes) setRawMinutes(minutes);
        if (rawAmPm !== ampm) setRawAmPm(ampm);
      }
    }
  }, [value, type]); // no dependas de rawHours/rawMinutes para evitar loops

  const convertTo24Hour = (h: string, m: string, ap: string) => {
    let hour24 = parseInt(h || "0", 10);
    if (ap === "AM" && hour24 === 12) hour24 = 0;
    if (ap === "PM" && hour24 !== 12) hour24 += 12;
    return `${hour24.toString().padStart(2, "0")}:${m.padStart(2, "0")}`;
  };

  const commitTime = () => {
    if (rawHours && rawMinutes) {
      const time24 = convertTo24Hour(rawHours, rawMinutes, rawAmPm);
      onChange(time24);
    }
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    if (type === "time") return dateStr;
    if (dateStr.includes("-")) return dateStr;
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return dateStr;
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    if (type === "time") return dateStr;
    if (dateStr.includes("/")) return dateStr;
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${month}/${day}/${year}`;
    }
    return dateStr;
  };

  const getDefaultMax = () =>
    type === "time"
      ? max || "23:59"
      : max || new Date().toISOString().split("T")[0];
  const getDefaultMin = () => (type === "time" ? min || "00:00" : min);
  const getPlaceholder = () =>
    type === "time" && placeholder === "Seleccione una fecha"
      ? "Seleccione una hora"
      : placeholder;
  const getIcon = () => (type === "time" ? "fas fa-clock" : "fas fa-calendar");
  const getFormatText = () =>
    type === "time"
      ? `Formato: HH:MM AM/PM ${value && `(${value})`}`
      : `Formato: MM/DD/YYYY ${value && `(${value})`}`;

  // --- RENDER DE TIME ---
  if (type === "time") {
    return (
      <div className={`mb-3 ${className}`}>
        <label
          className={`form-label text-light fw-medium mb-2 ${labelClassName}`}
          style={{ color: "#ffffff" }}
        >
          <i className={`${getIcon()} me-2`} style={{ color: "#00bcd4" }}></i>
          {title}
          {required && <span style={{ color: "#dc3545" }}> *</span>}
        </label>

        <div className="d-flex align-items-center gap-2">
          {/* Hours */}
          <input
            type="number"
            className={`form-control text-center ${
              error ? "is-invalid" : ""
            } ${inputClassName}`}
            style={{
              backgroundColor: "#2a2d3a",
              borderColor: error ? "#dc3545" : "rgba(0, 188, 212, 0.3)",
              color: "#ffffff",
              borderRadius: "10px",
              padding: "12px 8px",
              border: "1px solid",
              width: "70px",
            }}
            value={rawHours}
            onChange={(e) => {
              const val = e.target.value;
              if (
                val === "" ||
                (parseInt(val, 10) >= 1 && parseInt(val, 10) <= 12)
              ) {
                setRawHours(val);
              }
            }}
            onBlur={commitTime}
            min="1"
            max="12"
            disabled={disabled}
            placeholder="HH"
          />

          <span
            style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            :
          </span>

          {/* Minutes */}
          <input
            type="number"
            className={`form-control text-center ${
              error ? "is-invalid" : ""
            } ${inputClassName}`}
            style={{
              backgroundColor: "#2a2d3a",
              borderColor: error ? "#dc3545" : "rgba(0, 188, 212, 0.3)",
              color: "#ffffff",
              borderRadius: "10px",
              padding: "12px 8px",
              border: "1px solid",
              width: "70px",
            }}
            value={rawMinutes}
            onChange={(e) => {
              const val = e.target.value;
              if (
                val === "" ||
                (parseInt(val, 10) >= 0 && parseInt(val, 10) <= 59)
              ) {
                setRawMinutes(val);
              }
            }}
            onBlur={commitTime}
            min="0"
            max="59"
            disabled={disabled}
            placeholder="MM"
          />

          {/* AM/PM */}
          <select
            className={`form-select ${
              error ? "is-invalid" : ""
            } ${inputClassName}`}
            style={{
              backgroundColor: "#2a2d3a",
              borderColor: error ? "#dc3545" : "rgba(0, 188, 212, 0.3)",
              color: "#ffffff",
              borderRadius: "10px",
              padding: "12px 16px",
              border: "1px solid",
              width: "80px",
            }}
            value={rawAmPm}
            onChange={(e) => {
              setRawAmPm(e.target.value);
              commitTime();
            }}
            disabled={disabled}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        {error && (
          <div className="text-danger mt-1 small">
            <i className="fas fa-exclamation-triangle me-1"></i>
            {error}
          </div>
        )}

        {showFormat && (
          <div
            className="mt-1"
            style={{ color: "#6c757d", fontSize: "0.875rem" }}
          >
            {getFormatText()}
          </div>
        )}
      </div>
    );
  }

  // --- RENDER DE DATE ---
  return (
    <div className={`mb-3 ${className}`}>
      <label
        className={`form-label text-light fw-medium mb-2 ${labelClassName}`}
        style={{ color: "#ffffff" }}
      >
        <i className={`${getIcon()} me-2`} style={{ color: "#00bcd4" }}></i>
        {title}
        {required && <span style={{ color: "#dc3545" }}> *</span>}
      </label>

      <input
        type={type}
        className={`form-control ${
          error ? "is-invalid" : ""
        } ${inputClassName}`}
        style={{
          backgroundColor: "#2a2d3a",
          borderColor: error ? "#dc3545" : "rgba(0, 188, 212, 0.3)",
          color: "#ffffff",
          borderRadius: "10px",
          padding: "12px 16px",
          border: "1px solid",
        }}
        value={formatDateForInput(value)}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (!inputValue) onChange("");
          else onChange(formatDateForDisplay(inputValue));
        }}
        onBlur={(e) => onBlur?.(e.target.value)}
        min={getDefaultMin()}
        max={getDefaultMax()}
        disabled={disabled}
        placeholder={getPlaceholder()}
      />

      {error && (
        <div className="text-danger mt-1 small">
          <i className="fas fa-exclamation-triangle me-1"></i>
          {error}
        </div>
      )}

      {showFormat && (
        <div
          className="mt-1"
          style={{ color: "#6c757d", fontSize: "0.875rem" }}
        >
          {getFormatText()}
        </div>
      )}
    </div>
  );
};

export default DateInputDark;
