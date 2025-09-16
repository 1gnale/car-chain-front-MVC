import type IConfigLocalidadRepository from "../Irepositorys/IConfigLocalidadRepository";
import { BaseRepository } from "./BaseRepository";

export class ConfigLocalidadesRepository extends BaseRepository<ConfigLocalidad> implements IConfigLocalidadRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getConfigLocalidades(): Promise<ConfigLocalidad> {
    const data = await this.fetchData();
    return data[0] || {};
  }
}
