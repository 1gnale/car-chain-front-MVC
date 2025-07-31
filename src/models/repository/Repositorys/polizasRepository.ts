import type IPolizasRepository from "../Irepositorys/IPolizasRepository";

export class PolizasRepository implements IPolizasRepository {
  private data: Poliza[] = [];

  constructor(data: Poliza[]) {
    this.data = data;
  }

  getPolizas(): Promise<Poliza[]> {
    return Promise.resolve(this.data);
  }
}
