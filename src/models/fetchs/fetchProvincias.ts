import type IProvinciaRepository from "../repository/Irepositorys/IProvinciasRepository";

const fetchProvincias = async (
  provincesRepo: IProvinciaRepository
): Promise<Provincia[]> => {
  try {
    return await provincesRepo.getProvincias();
  } catch (error) {
    console.error("Error fetching provincias:", error);
    return [];
  }
};

export default fetchProvincias;
