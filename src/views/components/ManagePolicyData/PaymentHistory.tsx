import { useAppSelector } from "../../../redux/reduxTypedHooks";
import ProfileCard from "../GeneralComponents/ProfileCard";
import { ViewList } from "react-bootstrap-icons";

const PaymentHistoryData = ({
  handleCurrentView,
}: {
  handleCurrentView: (pass: ViewName) => void;
}) => {
  const historyPayment: Pago[] = useAppSelector((state) => state.pago.pago);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1e1e1eff",
        minHeight: "100vh",
      }}
    >
      {/* Botón volver */}
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary px-4 mb-3"
          style={{ borderRadius: "10px" }}
          onClick={() => handleCurrentView("PolicyProfile")}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Volver
        </button>
      </div>
      <div
        className="card bg-dark border-info h-100"
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(13, 202, 240, 0.3)",
        }}
      >
        <div className="card-body p-4">
          <div className="card-header bg-transparent border-info">
            <h3 className="card-title text-info mb-0 d-flex align-items-center">
              <ViewList className="me-2" size={20} />
              Historial de pagos
            </h3>
          </div>
          <div className="card-body">
            {historyPayment.map((pago) => (
              <ProfileCard
                title="Pagos"
                text="Fecha de pago"
                number={pago.id}
                fecha={pago.fecha || "N/A"}
                secondaryText={"Total pagado: " + pago.total}
                estado={"APROBADA"}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
export default PaymentHistoryData;
