import { useGenericFetch } from "./useGenericFetch";

const useDashboardCountsHook = () => {
  const apiUrl = `${
    import.meta.env.VITE_BASEURL
  }/api/dashboard/dashboard/counts`;

  const {
    data: counts,
    loading,
    error,
    refetch,
  } = useGenericFetch<any>(apiUrl);

  console.log(error);
  return {
    loading,
    counts,
    error: !!error,
    refetch,
  };
};

export default useDashboardCountsHook;
