interface InputProps {
  title: string;
  place: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  onBlur?: () => void;
  disabled?: boolean;
  type?: string;
}

const DarkInput = ({
  title,
  place,
  value,
  onChange,
  error,
  onBlur,
  disabled,
  type = "text",
}: InputProps) => {
  return (
    <div className="col" style={{ marginBottom: "1rem" }}>
      <label
        style={{
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "8px",
          display: "block",
        }}
      >
        {title}
      </label>
      <input
        type={type}
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: "#2a3441",
          border: error ? "1px solid #ef4444" : "1px solid #374151",
          borderRadius: "8px",
          color: "#ffffff",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
        placeholder={place}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        onFocus={(e) => {
          if (!error) {
            e.target.style.borderColor = "#06b6d4";
          }
        }}
        onBlurCapture={(e) => {
          if (!error) {
            e.target.style.borderColor = "#374151";
          }
        }}
      />
      {error && (
        <div
          style={{
            color: "#ef4444",
            fontSize: "12px",
            marginTop: "4px",
            minHeight: "16px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default DarkInput;
