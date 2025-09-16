import type IDetallesRepository from "../Irepositorys/IDetallesRepository";
import { BaseRepository } from "./BaseRepository";

export class DetallesRepository extends BaseRepository<Detalle> implements IDetallesRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getDetalles(): Promise<Detalle[]> {
    return this.fetchData();
  }
}
