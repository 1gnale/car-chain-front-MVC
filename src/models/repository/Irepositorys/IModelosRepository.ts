export default interface IModelosRepository {
  getModelos(): Promise<Modelo[]>;
}
