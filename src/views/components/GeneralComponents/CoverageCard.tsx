interface CoberturaCardProps {
  titulo: string;
  precio: string;
  itemsApply?: aplica[];
  onContratar: () => void;
}

interface aplica {
  name?: string;
  apply?: boolean;
  description?: string;
}

const CoverageCard = ({
  titulo,
  precio,
  itemsApply,
  onContratar,
}: CoberturaCardProps) => {
  return (
    <div
      style={{
        backgroundColor: "#374151",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 12px rgba(36, 35, 35, 0.3).3)",
        border: "1px solid #4b5563",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#2c313aff",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "600",
            margin: 0,
          }}
        >
          {titulo}
        </h3>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Price */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              color: "#06b6d4",
              fontSize: "32px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            {precio}
          </h2>
        </div>

        {/* Features List */}
        <div style={{ flex: 1, marginBottom: "1.5rem" }}>
          {itemsApply?.map((itemApply, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 0",
                borderBottom:
                  index < itemsApply.length - 1 ? "1px solid #4b5563" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div
                  title={itemApply.description || "Sin descripción"}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#4b5563",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "0.75rem",
                    cursor: "pointer",
                    fontSize: "12px",
                    color: "#9ca3af",
                    fontWeight: "bold",
                  }}
                >
                  i
                </div>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#e5e7eb",
                    fontWeight: "400",
                  }}
                >
                  {itemApply.name}
                </span>
              </div>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {itemApply.apply ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "#10b981" }}
                  >
                    <path
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: "#ef4444" }}
                  >
                    <path
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={onContratar}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.2s ease",
            backgroundColor: "#06b6d4",
            color: "#ffffff",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0891b2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#06b6d4";
          }}
        >
          Contratar
        </button>
      </div>
    </div>
  );
};

export default CoverageCard;
