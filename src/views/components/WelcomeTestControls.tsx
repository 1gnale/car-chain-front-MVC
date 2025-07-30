import { useAuth0 } from "@auth0/auth0-react";

const WelcomeTestControls = () => {
  const { user } = useAuth0();

  const clearWelcomeStatus = () => {
    if (user?.sub) {
      localStorage.removeItem(`user_welcomed_${user.sub}`);
      localStorage.removeItem("auth_action");
      alert("Estado de bienvenida limpiado. El próximo login mostrará la página de bienvenida.");
    }
  };

  const checkWelcomeStatus = () => {
    if (user?.sub) {
      const userKey = `user_welcomed_${user.sub}`;
      const hasBeenWelcomed = localStorage.getItem(userKey);
      const authAction = localStorage.getItem("auth_action");
      
      alert(`Usuario: ${user.sub}\nBienvenido antes: ${hasBeenWelcomed ? "Sí" : "No"}\nÚltima acción: ${authAction || "Ninguna"}`);
    }
  };

  return (
    <div style={{ 
      position: "fixed", 
      bottom: "20px", 
      right: "20px", 
      background: "#f8f9fa", 
      padding: "10px", 
      border: "1px solid #dee2e6",
      borderRadius: "5px",
      fontSize: "12px"
    }}>
      <h6>Testing Controls</h6>
      <button 
        className="btn btn-sm btn-warning me-2" 
        onClick={clearWelcomeStatus}
      >
        Simular Usuario Nuevo
      </button>
      <button 
        className="btn btn-sm btn-info" 
        onClick={checkWelcomeStatus}
      >
        Ver Estado
      </button>
    </div>
  );
};

export default WelcomeTestControls;
