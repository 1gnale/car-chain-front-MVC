export default interface ICoberturasRepository {
  getCoberturas(): Promise<Cobertura[]>;
}
