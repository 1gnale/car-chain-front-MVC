export default interface ILineaCotizacionRepository {
  getLineaCotizacion(): Promise<Linea_Cotizacion[]>;
  getLineaCotizacionById(id: string): Promise<Linea_Cotizacion | null>;
}
