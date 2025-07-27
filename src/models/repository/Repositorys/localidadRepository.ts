import type ILocalidadRepository from "../Irepositorys/ILocalidadRepository";

export class LocalidadRepository implements ILocalidadRepository {
  private data: Localidad[] = [];

  constructor(data: Localidad[]) {
    this.data = data;
  }

  getLocalidades(): Promise<Localidad[]> {
    return Promise.resolve(this.data);
  }
}
