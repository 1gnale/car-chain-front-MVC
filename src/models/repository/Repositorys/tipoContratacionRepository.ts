import type ITipoContratacionRepository from "../Irepositorys/ITipoContratacionRepository";
import { BaseRepository } from "./BaseRepository";

export class TipoContratacionRepository extends BaseRepository<TipoContratacion> implements ITipoContratacionRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getTiposContratacion(): Promise<TipoContratacion[]> {
    return this.fetchData();
  }
}
