import type IConfigLocalidadRepository from "../repository/Irepositorys/IConfigLocalidadRepository";

const fetchConfigLocalidades = async (
  ConfigLocalidadesRepo: IConfigLocalidadRepository
): Promise<ConfigLocalidad> => {
  try {
    return await ConfigLocalidadesRepo.getConfigLocalidades();
  } catch (error) {
    console.error("Error fetching config localidades:", error);
    return {};
  }
};

export default fetchConfigLocalidades;
