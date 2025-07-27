export default interface ITiposDocumentoRepository {
  getTiposDocumento(): Promise<string[]>;
}
