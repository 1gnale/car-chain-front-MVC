import type IPeriodosPagoRepository from "../Irepositorys/IPeriodosPagoRepository";

export class PeriodosPagoRepository implements IPeriodosPagoRepository {
  private data: PeriodoPago[] = [];

  constructor(data: PeriodoPago[]) {
    this.data = data;
  }

  getPeriodoPagos(): Promise<PeriodoPago[]> {
    return Promise.resolve(this.data);
  }
}
