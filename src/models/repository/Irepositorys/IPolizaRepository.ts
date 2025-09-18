export interface PolizaPayload {
  documentacion_id: number;
  lineaCotizacion_id: number;
}

export default interface IPolizaRepository {
  createPoliza(data: PolizaPayload, authToken?: string): Promise<any>;
}