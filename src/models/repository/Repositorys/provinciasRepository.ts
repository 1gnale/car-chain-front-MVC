import type IProvinciasRepository from "../Irepositorys/IProvinciasRepository";
import { BaseRepository } from "./BaseRepository";

export class ProvinciaRepository extends BaseRepository<Provincia> implements IProvinciasRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getProvincias(): Promise<Provincia[]> {
    return this.fetchData();
  }
}
