import type ICoverageAllDataRepository from "./repositories/ICoverageAllDataRepository";
import type { Cobertura_AllData } from "./types";

const fetchCoverageAllData = async (
  coverageAllDataRepo: ICoverageAllDataRepository
): Promise<Cobertura_AllData[]> => {
  try {
    return await coverageAllDataRepo.getAllCoveragesData();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export default fetchCoverageAllData;
