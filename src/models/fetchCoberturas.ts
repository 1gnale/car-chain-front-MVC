import type ICoberturasRepository from "./repository/Irepositorys/ICoberturasRepository";

const fetchCoberturas = async (
  ConfigCoberturasRepo: ICoberturasRepository
): Promise<Cobertura[]> => {
  try {
    return await ConfigCoberturasRepo.getCoberturas();
  } catch (error) {
    console.error("Error fetching config coberturas:", error);
    return [];
  }
};

export default fetchCoberturas;
