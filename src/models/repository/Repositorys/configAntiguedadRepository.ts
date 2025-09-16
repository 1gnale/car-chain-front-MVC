import type IConfigAntiguedadRepository from "../Irepositorys/IConfigAntiguedadRepository";
import { BaseRepository } from "./BaseRepository";

export class ConfigAntiguedadRepository extends BaseRepository<ConfigAntiguedad> implements IConfigAntiguedadRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getConfigAntiguedad(): Promise<ConfigAntiguedad> {
    const data = await this.fetchData();
    return data[0] || {};
  }
}
