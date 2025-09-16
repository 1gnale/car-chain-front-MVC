import type IConfigEdadRepository from "../Irepositorys/IConfigEdadRepository";
import { BaseRepository } from "./BaseRepository";

export class ConfigEdadRepository extends BaseRepository<ConfigEdad> implements IConfigEdadRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getConfigEdad(): Promise<ConfigEdad> {
    const data = await this.fetchData();
    return data[0] || {};
  }
}
