import type ILineaCotizacionRepository from "../repository/Irepositorys/ILineaCotizacionRepository";

const fetchLineasCotizacion = async (
  LineaCotizacionRepo: ILineaCotizacionRepository
): Promise<Linea_Cotizacion[]> => {
  try {
    return await LineaCotizacionRepo.getLineaCotizacion();
  } catch (error) {
    console.error("Error fetching lineas cotizacion:", error);
    return [];
  }
};

export const fetchLineaCotizacionById = async (
  LineaCotizacionRepo: ILineaCotizacionRepository,
  id: string
): Promise<Linea_Cotizacion | null> => {
  try {
    return await LineaCotizacionRepo.getLineaCotizacionById(id);
  } catch (error) {
    console.error("Error fetching linea cotizacion by id:", error);
    return null;
  }
};

export default fetchLineasCotizacion;
