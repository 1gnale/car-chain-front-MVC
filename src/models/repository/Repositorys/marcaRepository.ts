import type IMarcaRepository from "../Irepositorys/IMarcaRepository";
import { BaseRepository } from "./BaseRepository";

export class MarcaRepository extends BaseRepository<Marca> implements IMarcaRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getMarcas(): Promise<Marca[]> {
    return this.fetchData();
  }
}
