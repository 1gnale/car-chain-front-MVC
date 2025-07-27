import type ICoberturaDetalleRepository from "./repository/Irepositorys/ICoberturaDetalleRepository";

const fetchCoberturasDetalles = async (
  ConfigCoberturasDetalleRepo: ICoberturaDetalleRepository
): Promise<Cobertura_Detalle[]> => {
  try {
    return await ConfigCoberturasDetalleRepo.getCoberturasDetalles();
  } catch (error) {
    console.error("Error fetching config coberturas_detalle:", error);
    return [];
  }
};

export default fetchCoberturasDetalles;
