import type IPolizasRepository from "../Irepositorys/IPolizasRepository";
import { BaseRepository } from "./BaseRepository";

export class PolizasRepository extends BaseRepository<Poliza> implements IPolizasRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getPolizas(): Promise<Poliza[]> {
    return this.fetchData();
  }
}
