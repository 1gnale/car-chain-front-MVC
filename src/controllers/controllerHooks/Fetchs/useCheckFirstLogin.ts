import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const useCheckFirstLogin = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const checkFirstLogin = async () => {
    if (isLoading || !user || !isAuthenticated) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASEURL}/api/clientes/get-client-existence/${
          user.email
        }`
      );

      const data = await response.json();

      if (!data.data) {
        navigate("/registrar");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkFirstLogin();
  }, [user, isLoading]);

  return { isLoading };
};

export default useCheckFirstLogin;
