import type IConfigEdadRepository from "../Irepositorys/IConfigEdadRepository";

export class ConfigEdadRepository implements IConfigEdadRepository {
  private data: ConfigEdad[] = [];

  constructor(data: ConfigEdad[]) {
    this.data = data;
  }

  getConfigEdad(): Promise<ConfigEdad[]> {
    return Promise.resolve(this.data);
  }
}
