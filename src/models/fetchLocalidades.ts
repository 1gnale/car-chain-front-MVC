import type ILocalidadRepository from "./repository/Irepositorys/ILocalidadRepository";

const fetchLocalidades = async (
  localidadesRepo: ILocalidadRepository
): Promise<Localidad[]> => {
  try {
    return await localidadesRepo.getLocalidades();
  } catch (error) {
    console.error("Error fetching localidades:", error);
    return [];
  }
};

export default fetchLocalidades;
