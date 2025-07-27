import type IMarcaRepository from "../Irepositorys/IMarcaRepository";

export class MarcaRepository implements IMarcaRepository {
  private data: Marca[] = [];

  constructor(data: Marca[]) {
    this.data = data;
  }

  getMarcas(): Promise<Marca[]> {
    return Promise.resolve(this.data);
  }
}
