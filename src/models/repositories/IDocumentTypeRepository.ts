export default interface IDocumentTypeRepository {
  getDocumentTypes(): Promise<string[]>;
}
