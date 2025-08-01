export default interface ILineaCotizacionRepository {
  getLocalidades(): Promise<Linea_Cotizacion[]>;
}
