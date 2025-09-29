import { useGenericFetch } from "./useGenericFetch";

const useDashboardStatusHook = () => {
  const apiUrl = `${
    import.meta.env.VITE_BASEURL
  }/api/dashboard/dashboard/status`;

  const {
    data: status,
    loading,
    error,
    refetch,
  } = useGenericFetch<any>(apiUrl);

  console.log(status);
  return {
    loading,
    status,
    error: !!error,
    refetch,
  };
};

export default useDashboardStatusHook;
