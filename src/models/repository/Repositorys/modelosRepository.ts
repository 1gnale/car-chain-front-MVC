import type IModelosRepository from "../Irepositorys/IModelosRepository";
import { BaseRepository } from "./BaseRepository";

export class ModeloRepository extends BaseRepository<Modelo> implements IModelosRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getModelos(): Promise<Modelo[]> {
    return this.fetchData();
  }
}
