import type IModelosRepository from "../Irepositorys/IModelosRepository";

export class ModeloRepository implements IModelosRepository {
  private data: Modelo[] = [];

  constructor(data: Modelo[]) {
    this.data = data;
  }

  getModelos(): Promise<Modelo[]> {
    return Promise.resolve(this.data);
  }
}
