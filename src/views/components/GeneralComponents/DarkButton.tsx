const DarkButton = ({ text, onClick, variant = "secondary" }: ButtonProps) => {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "none",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s ease",
        backgroundColor: isPrimary ? "#06b6d4" : "#6b7280",
        color: "#ffffff",
        marginLeft: "8px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isPrimary
          ? "#0891b2"
          : "#4b5563";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isPrimary
          ? "#06b6d4"
          : "#6b7280";
      }}
    >
      {text}
    </button>
  );
};

export default DarkButton;
