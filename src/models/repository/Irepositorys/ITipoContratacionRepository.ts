export default interface ITipoContratacionRepository {
  getTiposContratacion(): Promise<TipoContratacion[]>;
}
