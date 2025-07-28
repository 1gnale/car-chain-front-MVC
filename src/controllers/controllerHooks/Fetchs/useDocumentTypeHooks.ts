import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchDocumentType from "../../../models/fetchs/fetchDocumentType";
import { setDocumentTypes } from "../../../redux/documentTypeSlice";
import jsonDocType from "../../../models/mock/DocumentTypeInfoMock.json";
import { DocumentTypeRepository } from "../../../models/repositories/documentTypeRepository";

const useDocumentTypes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const documentTypeRepo = new DocumentTypeRepository(jsonDocType);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchDocumentType(documentTypeRepo)
      .then((fetchedBrands) => {
        dispatch(setDocumentTypes(fetchedBrands));
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, documentTypeRepo]);

  return { loading, error };
};

export default useDocumentTypes;
