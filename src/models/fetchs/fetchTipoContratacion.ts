import type ITipoContratacionRepository from "../repository/Irepositorys/ITipoContratacionRepository";

const fetchTipoContratacion = async (
  provincesRepo: ITipoContratacionRepository
): Promise<TipoContratacion[]> => {
  try {
    return await provincesRepo.getTiposContratacion();
  } catch (error) {
    console.error("Error fetching provincias:", error);
    return [];
  }
};

export default fetchTipoContratacion;
