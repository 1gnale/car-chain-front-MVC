import type IDetallesRepository from "../Irepositorys/IDetallesRepository";
import { BaseRepository } from "./BaseRepository";

export class DetallesRepository
  extends BaseRepository<Detalle>
  implements IDetallesRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getDetalles(): Promise<Detalle[]> {
    return this.fetchData();
  }

  async getDetalleById(id: string): Promise<Detalle> {
    return this.fetchDataById("/", id);
  }

  async createDetail(DetalleData: Detalle): Promise<Detalle> {
    const body = {
      nombre: DetalleData.nombre,
      descripcion: DetalleData.descripcion,
      porcentaje_miles: DetalleData.porcentaje_miles,
      monto_fijo: DetalleData.monto_fijo,
    };

    const newDetail = await this.postData("/", body);
    this.data.push(newDetail);
    return newDetail;
  }

  async updateDetail(DetalleData: Detalle): Promise<Detalle> {
    const body = {
      nombre: DetalleData.nombre,
      descripcion: DetalleData.descripcion,
      porcentaje_miles: DetalleData.porcentaje_miles,
      monto_fijo: DetalleData.monto_fijo,
      activo: DetalleData.activo,
    };
    const updatedDetail = await this.putData(`/update/${DetalleData.id}`, body);
    this.data = this.data.map((Detail) =>
      DetalleData.id === updatedDetail.id ? updatedDetail : Detail
    );
    return updatedDetail;
  }

  async updateStateDetalle(id: number): Promise<Usuario> {
    const updatedDetail = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((Detail) =>
      Detail.id === updatedDetail.id ? updatedDetail : Detail
    );
    return updatedDetail;
  }
}
