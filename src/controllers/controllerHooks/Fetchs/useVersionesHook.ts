import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMarcas } from "../../../redux/marcaSlice";
import jsonVersion from "../../../models/mock/versionesMock.json";
import { VersionRepository } from "../../../models/repository/Repositorys/versionRepository";
import fetchVersiones from "../../../models/fetchVersiones";

const useVersionesHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const versionRepo = new VersionRepository(jsonVersion);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchVersiones(versionRepo)
      .then((fetchedMarcass) => {
        dispatch(setMarcas(fetchedMarcass));
      })
      .catch((err) => {
        console.error("Error fetching modelos:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, versionRepo]);

  return { loading, error };
};

export default useVersionesHook;
