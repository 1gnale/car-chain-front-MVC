import type IBrandRepository from "./repositories/IBrandRepository";
import type { Brand } from "./types";

const fetchBrands = async (brandRepo: IBrandRepository): Promise<Brand[]> => {
  try {
    return await brandRepo.getBrands();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export default fetchBrands;
