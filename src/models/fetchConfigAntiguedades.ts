import type IConfigAntiguedadRepository from "./repository/Irepositorys/IConfigAntiguedadRepository";

const fetchConfigAntiguedades = async (
  ConfigAntiguedadRepo: IConfigAntiguedadRepository
): Promise<ConfigAntiguedad[]> => {
  try {
    return await ConfigAntiguedadRepo.getConfigAntiguedad();
  } catch (error) {
    console.error("Error fetching config antiguedades:", error);
    return [];
  }
};

export default fetchConfigAntiguedades;
