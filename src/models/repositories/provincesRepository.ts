import type IProvincesRepository from "./IProvincesRepository.ts";

export class ProvincesRepository implements IProvincesRepository {
  private data: Provincias[] = [];

  constructor(data: Provincias[]) {
    this.data = data;
  }

  getProvinces(): Promise<Provincias[]> {
    return Promise.resolve(this.data);
  }
}
