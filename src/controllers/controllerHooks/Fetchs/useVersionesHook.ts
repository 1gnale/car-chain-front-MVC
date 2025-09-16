import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setVersion } from "../../../redux/versionSlice";
import { useGenericFetch } from "./useGenericFetch";

const useVersionesHook = () => {
  const dispatch = useDispatch();
  const apiUrl = `${import.meta.env.VITE_BASEURL}/api/versiones`;
  
  const { data: versiones, loading, error, refetch } = useGenericFetch<Version>(apiUrl);

  useEffect(() => {
    if (versiones.length > 0) {
      dispatch(setVersion(versiones));
    }
  }, [versiones, dispatch]);

  return { 
    loading, 
    error: !!error, 
    refetch 
  };
};

export default useVersionesHook;
