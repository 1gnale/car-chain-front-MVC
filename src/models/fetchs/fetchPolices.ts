import type IPolizasRepository from "../repository/Irepositorys/IPolizasRepository";

const fetchPolices = async (
  modeloRepo: IPolizasRepository
): Promise<Poliza[]> => {
  try {
    return await modeloRepo.getPolizas();
  } catch (error) {
    console.error("Error fetching polizas:", error);
    return [];
  }
};

export default fetchPolices;
