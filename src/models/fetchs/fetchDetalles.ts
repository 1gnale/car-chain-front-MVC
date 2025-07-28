import type IDetallesRepository from "../repository/Irepositorys/IDetallesRepository";

const fetchDetalles = async (
  detalleRepo: IDetallesRepository
): Promise<Detalle[]> => {
  try {
    return await detalleRepo.getDetalles();
  } catch (error) {
    console.error("Error fetching detalle:", error);
    return [];
  }
};

export default fetchDetalles;
