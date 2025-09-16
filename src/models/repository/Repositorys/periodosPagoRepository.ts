import type IPeriodosPagoRepository from "../Irepositorys/IPeriodosPagoRepository";
import { BaseRepository } from "./BaseRepository";

export class PeriodosPagoRepository extends BaseRepository<PeriodoPago> implements IPeriodosPagoRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getPeriodoPagos(): Promise<PeriodoPago[]> {
    return this.fetchData();
  }
}
