import type ICoberturasDetalleRepository from "../Irepositorys/ICoberturaDetalleRepository";
import { BaseRepository } from "./BaseRepository";

export class CoberturasDetalleRepository extends BaseRepository<Cobertura_Detalle> implements ICoberturasDetalleRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getCoberturasDetalles(): Promise<Cobertura_Detalle[]> {
    return this.fetchData();
  }
}
