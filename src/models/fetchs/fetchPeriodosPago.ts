import type IPeriodosPagoRepository from "../repository/Irepositorys/IPeriodosPagoRepository";

const fetchPeriodosPago = async (
  periodoPagoRepo: IPeriodosPagoRepository
): Promise<PeriodoPago[]> => {
  try {
    return await periodoPagoRepo.getPeriodoPagos();
  } catch (error) {
    console.error("Error fetching periodos pago:", error);
    return [];
  }
};

export default fetchPeriodosPago;
