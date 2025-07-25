import type ICoverageAllDataRepository from "./ICoverageAllDataRepository.ts";

export class CoverageAllDataRepository implements ICoverageAllDataRepository {
  private data: Cobertura_AllData[] = [];

  constructor(data: Cobertura_AllData[]) {
    this.data = data;
  }

  getAllCoveragesData(): Promise<Cobertura_AllData[]> {
    return Promise.resolve(this.data);
  }
}
