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

export default fetchLineasCotizacion;
