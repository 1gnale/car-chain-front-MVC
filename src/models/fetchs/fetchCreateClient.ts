const getHeaders = (
  includeAuth = false,
  authToken = ""
): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth && authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};

const handleFetchError = async (response: any) => {
  if (!response.ok) {
    const error = await response.json(); // si tu backend devuelve JSON de error
    console.error("Error del backend:", error);
  }
  return response.json();
};

export const createClient = async (clientData: any, authToken = "") => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASEURL}/api/clientes/create-cliente`,
      {
        method: "POST",
        headers: getHeaders(!!authToken, authToken),
        credentials: "include",
        body: JSON.stringify(clientData),
      }
    );

    return await handleFetchError(response);
  } catch (err: any) {
    if (err.response && err.response.data.errors) {
      // Acá tenés tus validaciones del backend
      err.response.data.errors.forEach((val: any) => {
        //(`Campo: ${val.field} → ${val.message}`);
      });
    } else {
      console.error("Error inesperado", err);
    }
  }
};
