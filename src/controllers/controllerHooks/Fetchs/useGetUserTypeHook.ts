import { useEffect, useState } from "react";

const useGetUserType = (email: string | null) => {
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASEURL}/api/usuarios/getUserType/${email}`
        );
        if (!res.ok) {
          throw new Error(`Error en la respuesta del servidor: ${res.status}`);
        }
        const data = await res.json();
        setTipoUsuario(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return { tipoUsuario, loading, error };
};

export default useGetUserType;
