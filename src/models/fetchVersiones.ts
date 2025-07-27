import type IVersionRepository from "./repository/Irepositorys/IVersionRepository";

const fetchVersiones = async (
  versionRepo: IVersionRepository
): Promise<Version[]> => {
  try {
    return await versionRepo.getVersiones();
  } catch (error) {
    console.error("Error fetching versiones:", error);
    return [];
  }
};

export default fetchVersiones;
