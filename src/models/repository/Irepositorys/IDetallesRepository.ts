export default interface IDetallesRepository {
  getDetalles(): Promise<Detalle[]>;
}
