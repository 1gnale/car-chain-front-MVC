export default interface IMarcaRepository {
  getMarcas(): Promise<Marca[]>;
}
