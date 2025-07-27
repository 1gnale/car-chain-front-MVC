import type IModelosRepository from "./repository/Irepositorys/IModelosRepository";

const fetchModelos = async (
  modeloRepo: IModelosRepository
): Promise<Modelo[]> => {
  try {
    return await modeloRepo.getModelos();
  } catch (error) {
    console.error("Error fetching modelos:", error);
    return [];
  }
};

export default fetchModelos;
