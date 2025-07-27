export default interface IVersionRepository {
  getVersiones(): Promise<Version[]>;
}
