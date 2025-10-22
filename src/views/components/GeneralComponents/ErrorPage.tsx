import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#1a2332" }}
      className="d-flex align-items-center justify-content-center p-4"
    >
      <div style={{ maxWidth: "28rem" }} className="w-100 text-center">
        {/* Error Icon */}
        <div className="d-flex justify-content-center mb-5">
          <div
            style={{
              width: "6rem",
              height: "6rem",
              backgroundColor: "#2d3b4e",
            }}
            className="rounded-circle d-flex align-items-center justify-content-center"
          >
            <svg
              style={{ width: "3rem", height: "3rem", color: "#22d3ee" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-5">
          <h1 className="display-5 fw-bold text-white mb-3">
            Error Inesperado
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "1.125rem" }}>
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>
        </div>

        {/* Button */}
        <div className="pt-3">
          <a
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#22d3ee",
              color: "#1a2332",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            className="btn btn-lg fw-semibold px-5 py-3"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#06b6d4")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#22d3ee")
            }
          >
            Volver a la Página Principal
          </a>
        </div>
      </div>
    </div>
  );
}
