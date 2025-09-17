interface CotizacionPayload {
  fechaCreacion?: string;
  fechaVencimiento?: string;
  vehiculo_id?: number;
  configuracionLocalidad_id?: number;
  configuracionEdad_id?: number;
  configuracionAntiguedad_id?: number;
}

export default interface ICotizacionRepository {
  createCotizacion(cotizacion: CotizacionPayload, authToken?: string): Promise<Cotizacion>;
}