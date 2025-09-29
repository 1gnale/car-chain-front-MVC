import type IPeriodosPagoRepository from "../Irepositorys/IPeriodosPagoRepository";
import { BaseRepository } from "./BaseRepository";

export class PeriodosPagoRepository
  extends BaseRepository<PeriodoPago>
  implements IPeriodosPagoRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getPeriodoPagos(): Promise<PeriodoPago[]> {
    return this.fetchData();
  }

  async getPeriodoPagoById(id: string): Promise<PeriodoPago> {
    return this.fetchDataById("/", id);
  }

  async createPaymentPeriod(
    PeriodoPagoData: PeriodoPago
  ): Promise<PeriodoPago> {
    const body = {
      nombre: PeriodoPagoData.nombre,
      cantidadMeses: PeriodoPagoData.cantidadMeses,
      descuento: PeriodoPagoData.descuento,
    };

    const newPaymentPeriod = await this.postData("/", body);
    this.data.push(newPaymentPeriod);
    return newPaymentPeriod;
  }

  async updatePaymentPeriod(
    PeriodoPagoData: PeriodoPago
  ): Promise<PeriodoPago> {
    const body = {
      nombre: PeriodoPagoData.nombre,
      cantidadMeses: PeriodoPagoData.cantidadMeses,
      descuento: PeriodoPagoData.descuento,
      activo: PeriodoPagoData.activo,
    };
    const updatedPaymentPeriod = await this.putData(
      `/update/${PeriodoPagoData.id}`,
      body
    );
    this.data = this.data.map((PaymentPeriod) =>
      PeriodoPagoData.id === updatedPaymentPeriod.id
        ? updatedPaymentPeriod
        : PaymentPeriod
    );
    return updatedPaymentPeriod;
  }

  async updateStatePeriodoPago(id: number): Promise<Usuario> {
    const updatedPaymentPeriod = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((PaymentPeriod) =>
      PaymentPeriod.id === updatedPaymentPeriod.id
        ? updatedPaymentPeriod
        : PaymentPeriod
    );
    return updatedPaymentPeriod;
  }
}
