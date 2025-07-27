import type IConfigEdadRepository from "./repository/Irepositorys/IConfigEdadRepository";

const fetchConfigEdades = async (
  ConfigEdadRepo: IConfigEdadRepository
): Promise<ConfigEdad[]> => {
  try {
    return await ConfigEdadRepo.getConfigEdad();
  } catch (error) {
    console.error("Error fetching config edad:", error);
    return [];
  }
};

export default fetchConfigEdades;
