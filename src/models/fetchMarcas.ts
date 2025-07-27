import type IMarcaRepository from "./repository/Irepositorys/IMarcaRepository.ts";

const fetchMarcas = async (marcaRepo: IMarcaRepository): Promise<Marca[]> => {
  try {
    return await marcaRepo.getMarcas();
  } catch (error) {
    console.error("Error fetching marcas:", error);
    return [];
  }
};

export default fetchMarcas;
