import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const useCheckFirstLogin = () => {
    const { user, isLoading } = useAuth0();
    const navigate = useNavigate();

    const checkFirstLogin = async () => {
        if (isLoading || !user) return;

        try {
            const response = await fetch(`http://localhost:3000/api/clientes/get-client-existence/${user.email}`);
            const data = await response.json();
            if (!data.exists) {
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
