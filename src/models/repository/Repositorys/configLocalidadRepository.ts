import type IConfigLocalidadRepository from "../Irepositorys/IConfigLocalidadRepository";

export class ConfigLocalidadesRepository implements IConfigLocalidadRepository {
  private data: ConfigLocalidad[] = [];

  constructor(data: ConfigLocalidad[]) {
    this.data = data;
  }

  getConfigLocalidades(): Promise<ConfigLocalidad[]> {
    return Promise.resolve(this.data);
  }
}
