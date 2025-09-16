export default interface IVersionRepository {
  getVersiones(): Promise<Version[]>;
  updateVersion(id: number, version: Partial<Version>): Promise<Version>;
  createVersion(version: Omit<Version, 'id'>): Promise<Version>;
  deleteVersion(id: number): Promise<void>;
}
