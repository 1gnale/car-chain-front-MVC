import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import jsonVersion from "../../../models/mock/versionesMock.json";
import { VersionRepository } from "../../../models/repository/Repositorys/versionRepository";
import fetchVersiones from "../../../models/fetchs/fetchVersiones";
import { setVersion } from "../../../redux/versionSlice";

const useVersionesHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const versionRepo = new VersionRepository(jsonVersion);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchVersiones(versionRepo)
      .then((fetchedVersiones) => {
        dispatch(setVersion(fetchedVersiones));
      })
      .catch((err) => {
        console.error("Error fetching versiones:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, versionRepo]);

  return { loading, error };
};

export default useVersionesHook;
