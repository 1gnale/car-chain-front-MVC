export interface LineaCotizacionPayload {
  monto: number;
  cotizacion_id: number;
  cobertura_id: number;
}

export default interface ILineaCotizacionRepository {
  getLineaCotizacion(): Promise<Linea_Cotizacion[]>;
  getLineaCotizacionByCotizacionId(id: string): Promise<Linea_Cotizacion[]>;
  createLineaCotizacion(data: LineaCotizacionPayload, authToken?: string): Promise<any>;
}
