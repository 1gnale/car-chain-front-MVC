import type IVersionRepository from "../Irepositorys/IVersionRepository";

export class VersionRepository implements IVersionRepository {
  private data: Version[] = [];

  constructor(data: Version[]) {
    this.data = data;
  }

  getVersiones(): Promise<Version[]> {
    return Promise.resolve(this.data);
  }
}
