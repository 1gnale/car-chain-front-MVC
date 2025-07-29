import type ITiposDocumentoRepository from "../repository/Irepositorys/ITiposDocumentoRepository";

const fetchTiposDocumento = async (
  tiposDocRepo: ITiposDocumentoRepository
): Promise<string[]> => {
  try {
    return await tiposDocRepo.getTiposDocumento();
  } catch (error) {
    console.error("Error fetching Documents Types:", error);
    return [];
  }
};

export default fetchTiposDocumento;
