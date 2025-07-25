import type IProvincesRepository from "./repositories/IProvincesRepository.ts";

const fetchProvinces = async (
  provincesRepo: IProvincesRepository
): Promise<Provincias[]> => {
  try {
    return await provincesRepo.getProvinces();
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};

export default fetchProvinces;
