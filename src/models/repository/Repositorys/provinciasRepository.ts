import type IProvinciasRepository from "../Irepositorys/IProvinciasRepository";

export class ProvinciaRepository implements IProvinciasRepository {
  private data: Provincia[] = [];

  constructor(data: Provincia[]) {
    this.data = data;
  }

  getProvincias(): Promise<Provincia[]> {
    return Promise.resolve(this.data);
  }
}
