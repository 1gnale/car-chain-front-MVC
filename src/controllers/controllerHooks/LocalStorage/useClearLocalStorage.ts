const useClearLocalStorage = () => {
  const clearVehicleData = () => {
    localStorage.removeItem("VehicleData");
  };

  const clearPolicyData = () => {
    localStorage.removeItem("PolicyData");
  };

  const clearClientData = () => {
    localStorage.removeItem("ClientData");
  };

  const clearAllData = () => {
    clearVehicleData();
    clearPolicyData();
    clearClientData();
    // Agregar aquí otros items del localStorage que quieras limpiar
  };

  return {
    clearVehicleData,
    clearPolicyData,
    clearClientData,
    clearAllData
  };
};

export default useClearLocalStorage;