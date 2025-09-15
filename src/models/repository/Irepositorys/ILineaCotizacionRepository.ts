export default interface ILineaCotizacionRepository {
  getLineaCotizacion(): Promise<Linea_Cotizacion[]>;
  getLineaCotizacionByCotizacionId(id: string): Promise<Linea_Cotizacion[]>;
}
