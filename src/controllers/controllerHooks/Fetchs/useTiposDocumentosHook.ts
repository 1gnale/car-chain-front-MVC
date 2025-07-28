import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTipoDocumento } from "../../../redux/tiposDocumentosSlice";
import jsonDocType from "../../../models/mock/tiposDeDocumentoMock.json";
import { tiposDocumentoRepository } from "../../../models/repository/Repositorys/tiposDocumentoRepository";
import fetchTiposDocumento from "../../../models/fetchTiposDocumento";

const useTiposDocumentos = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();
  const documentTypeRepo = new tiposDocumentoRepository(jsonDocType);

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetchTiposDocumento(documentTypeRepo)
      .then((fetchedTipoDocumento) => {
        dispatch(setTipoDocumento(fetchedTipoDocumento));
      })
      .catch((err) => {
        console.error("Error fetching tipo documentos:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, documentTypeRepo]);

  return { loading, error };
};

export default useTiposDocumentos;
