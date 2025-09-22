import { useEffect, useState } from "react";
import { useGenericFetch } from "./useGenericFetch";

const usePoliceByIdHook = (idPoliza: string) => {
  const [policy, setPolicy] = useState<Poliza | null>(null);
  const apiUrl = `${
    import.meta.env.VITE_BASEURL
  }/api/poliza/getPolizaById/${idPoliza}`;

  const {
    data: poliza,
    loading,
    error,
    refetch,
  } = useGenericFetch<Poliza>(apiUrl);

  useEffect(() => {
    if (poliza) {
      setPolicy(poliza);
    }
  }, [poliza, idPoliza]);

  return {
    loading,
    error: !!error,
    policy,
    refetch,
  };
};

export default usePoliceByIdHook;
