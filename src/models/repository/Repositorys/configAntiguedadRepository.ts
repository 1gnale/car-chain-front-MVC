import type IConfigAntiguedadRepository from "../Irepositorys/IConfigAntiguedadRepository";

export class ConfigAntiguedadRepository implements IConfigAntiguedadRepository {
  private data: ConfigAntiguedad[] = [];

  constructor(data: ConfigAntiguedad[]) {
    this.data = data;
  }

  getConfigAntiguedad(): Promise<ConfigAntiguedad[]> {
    return Promise.resolve(this.data);
  }
}
