import type IBrandRepository from "../repositories/IBrandRepository";

const fetchBrands = async (brandRepo: IBrandRepository): Promise<Marca[]> => {
  try {
    return await brandRepo.getBrands();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

const fetchBrandById = async (
  brandRepo: IBrandRepository,
  id: number
): Promise<Marca | null> => {
  try {
    return await brandRepo.getBrandById(id);
  } catch (error) {
    console.error(`Error fetching brand with id ${id}:`, error);
    return null;
  }
}

export default fetchBrands;
