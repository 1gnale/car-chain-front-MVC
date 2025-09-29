interface CheckFormProps {
  text: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const DarkCheckForm = ({ text, checked, onChange }: CheckFormProps) => {
  return (
    <div
      className="col"
      style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            marginRight: "8px",
            width: "18px",
            height: "18px",
            accentColor: "#06b6d4",
          }}
        />
        {text}
      </label>
    </div>
  );
};

export default DarkCheckForm;
