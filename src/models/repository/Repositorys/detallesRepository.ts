import type IDetallesRepository from "../Irepositorys/IDetallesRepository";

export class DetallesRepository implements IDetallesRepository {
  private data: Detalle[] = [];

  constructor(data: Detalle[]) {
    this.data = data;
  }

  getDetalles(): Promise<Detalle[]> {
    return Promise.resolve(this.data);
  }
}
