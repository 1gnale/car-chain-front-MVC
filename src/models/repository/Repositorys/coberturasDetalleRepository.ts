import type ICoberturasDetalleRepository from "../Irepositorys/ICoberturaDetalleRepository";
import { BaseRepository } from "./BaseRepository";

export class CoberturasDetalleRepository
  extends BaseRepository<Cobertura_Detalle>
  implements ICoberturasDetalleRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getCoberturasDetalles(): Promise<Cobertura_Detalle[]> {
    return this.fetchData();
  }

  async getCoberturaDetalleById(id: string): Promise<Cobertura_Detalle> {
    return this.fetchDataById("/", id);
  }

  async createCoverageDetail(
    CoberturaDetalleData: Cobertura_Detalle
  ): Promise<Cobertura_Detalle> {
    const body = {
      cobertura_id: CoberturaDetalleData.cobertura.id,
      detalle_id: CoberturaDetalleData.detalle.id,
      aplica: CoberturaDetalleData.aplica,
    };
    console.log("body");
    console.log(body);
    const newCoverageDetail = await this.postData("/", body);
    this.data.push(newCoverageDetail);
    return newCoverageDetail;
  }

  async updateCoverageDetail(
    CoberturaDetalleData: Cobertura_Detalle
  ): Promise<Cobertura_Detalle> {
    const body = {
      cobertura_id: CoberturaDetalleData.cobertura.id,
      detalle_id: CoberturaDetalleData.detalle.id,
      aplica: CoberturaDetalleData.aplica,
    };
    const updatedCoverageDetail = await this.putData(
      `/update/${CoberturaDetalleData.id}`,
      body
    );
    this.data = this.data.map((Coverage) =>
      CoberturaDetalleData.id === updatedCoverageDetail.id
        ? updatedCoverageDetail
        : Coverage
    );
    return updatedCoverageDetail;
  }
}
