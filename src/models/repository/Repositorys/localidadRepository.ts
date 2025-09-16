import type ILocalidadRepository from "../Irepositorys/ILocalidadRepository";
import { BaseRepository } from "./BaseRepository";

export class LocalidadRepository extends BaseRepository<Localidad> implements ILocalidadRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getLocalidades(): Promise<Localidad[]> {
    return this.fetchData();
  }
}
