interface SelectFormProps {
  title: string;
  items?: { id: number; name: string }[];
  onChange: (id: number) => void;
  status: boolean;
  value: number;
  error?: string;
  onBlur?: () => void;
}

const DarkSelectForm = ({
  title,
  items,
  onChange,
  status,
  value,
  error,
  onBlur,
}: SelectFormProps) => {
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
      <select
        style={{
          width: "100%",
          padding: "12px 16px",
          backgroundColor: "#2a3441",
          border: error ? "1px solid #ef4444" : "1px solid #374151",
          borderRadius: "8px",
          color: "#ffffff",
          fontSize: "14px",
          outline: "none",
          cursor: status ? "pointer" : "not-allowed",
          opacity: status ? 1 : 0.6,
        }}
        disabled={!status}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onBlur={onBlur}
        onFocus={(e) => {
          if (!error && status) {
            e.target.style.borderColor = "#06b6d4";
          }
        }}
        onBlurCapture={(e) => {
          if (!error) {
            e.target.style.borderColor = "#374151";
          }
        }}
      >
        <option
          value={0}
          disabled
          style={{ backgroundColor: "#2a3441", color: "#9ca3af" }}
        >
          Elige una opción...
        </option>
        {items?.map((v) => (
          <option
            key={v.id}
            value={v.id}
            style={{ backgroundColor: "#2a3441", color: "#ffffff" }}
          >
            {v.name}
          </option>
        ))}
      </select>
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

export default DarkSelectForm;
