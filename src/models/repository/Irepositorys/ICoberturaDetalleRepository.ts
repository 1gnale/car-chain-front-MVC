export default interface ICoberturasDetalleRepository {
  getCoberturasDetalles(): Promise<Cobertura_Detalle[]>;
}
