import { useState, useEffect } from 'react';

interface UseGenericFetchResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGenericFetch<T>(apiUrl?: string): UseGenericFetchResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    if (!apiUrl) {
      setError("API URL is not defined");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const result = await response.json();
      setData(result.data ||[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Ejemplo de uso:
// const { data: marcas, loading, error } = useGenericFetch<Marca>(apiUrl);