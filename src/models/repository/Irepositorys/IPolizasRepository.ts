export default interface IPolizasRepository {
  getPolizas(): Promise<Poliza[]>;
}
