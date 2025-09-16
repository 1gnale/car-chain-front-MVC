import type IVersionRepository from "../Irepositorys/IVersionRepository";
import { BaseRepository } from "./BaseRepository";

export class VersionRepository extends BaseRepository<Version> implements IVersionRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getVersiones(): Promise<Version[]> {
    return this.fetchData();
  }

  updateVersion(id: number, version: Partial<Version>): Promise<Version> {
    return this.putData(`${id}/`, version);
  }

  createVersion(version: Omit<Version, 'id'>): Promise<Version> {
    return this.postData('', version);
  }

  deleteVersion(id: number): Promise<void> {
    return this.logicalDeleteData(`${id}/`);
  }
}
