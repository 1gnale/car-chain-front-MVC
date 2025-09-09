export default interface IPeriodosPagoRepository {
  getPeriodoPagos(): Promise<PeriodoPago[]>;
}
