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

  const clearDocumentacionData = () => {
    localStorage.removeItem("DocumentacionData");
  };

  const clearAllData = () => {
    clearVehicleData();
    clearPolicyData();
    clearClientData();
    clearDocumentacionData();
    // Agregar aquí otros items del localStorage que quieras limpiar
  };

  return {
    clearVehicleData,
    clearPolicyData,
    clearClientData,
    clearDocumentacionData,
    clearAllData
  };
};

export default useClearLocalStorage;