import type ICoberturasRepository from "../Irepositorys/ICoberturasRepository";
import { BaseRepository } from "./BaseRepository";

export class CoberturasRepository
  extends BaseRepository<Cobertura>
  implements ICoberturasRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getCoberturas(): Promise<Cobertura[]> {
    return this.fetchData();
  }

  async getCoberturaById(id: string): Promise<Cobertura> {
    return this.fetchDataById("/", id);
  }

  async createCoverage(CoberturaData: Cobertura): Promise<Cobertura> {
    const body = {
      id: CoberturaData.id,
      nombre: CoberturaData.nombre,
      descripcion: CoberturaData.descripcion,
      recargoPorAtraso: CoberturaData.recargoPorAtraso,
    };

    const newCoverage = await this.postData("/", body);
    this.data.push(newCoverage);
    return newCoverage;
  }

  async updateCoverage(CoberturaData: Cobertura): Promise<Cobertura> {
    const body = {
      id: CoberturaData.id,
      nombre: CoberturaData.nombre,
      descripcion: CoberturaData.descripcion,
      recargoPorAtraso: CoberturaData.recargoPorAtraso,
      activo: CoberturaData.activo,
    };
    const updatedCoverage = await this.putData(
      `/update/${CoberturaData.id}`,
      body
    );
    this.data = this.data.map((Coverage) =>
      CoberturaData.id === updatedCoverage.id ? updatedCoverage : Coverage
    );
    return updatedCoverage;
  }

  async updateStateCobertura(id: number): Promise<Usuario> {
    const updatedCoverage = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((Coverage) =>
      Coverage.id === updatedCoverage.id ? updatedCoverage : Coverage
    );
    return updatedCoverage;
  }
}
