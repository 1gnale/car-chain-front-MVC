import type IAllConfigsRepository from "./repositories/IAllConfigsRepository";
import type { allConfigs } from "./types";

const configsVoid: allConfigs = {};

const fetchAllConfigs = async (
  allConfigsRepo: IAllConfigsRepository
): Promise<allConfigs> => {
  try {
    return await allConfigsRepo.getAllConfigs();
  } catch (error) {
    console.error("Error fetching configs:", error);
    return configsVoid;
  }
};

export default fetchAllConfigs;
