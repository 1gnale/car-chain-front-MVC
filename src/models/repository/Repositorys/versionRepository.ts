import type IVersionRepository from "../Irepositorys/IVersionRepository";
import { BaseRepository } from "./BaseRepository";

export class VersionRepository
  extends BaseRepository<Version>
  implements IVersionRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getVersiones(): Promise<Version[]> {
    return this.fetchData();
  }

  async getVersionById(id: string): Promise<Version> {
    return this.fetchDataById("/", id);
  }

  async createVersions(VersionData: Version): Promise<Version> {
    const body = {
      nombre: VersionData.nombre,
      descripcion: VersionData.descripcion,
      precio_mercado: VersionData.precio_mercado,
      precio_mercado_gnc: VersionData.precio_mercado_gnc,
      modelo: VersionData.modelo,
    };

    const newVersions = await this.postData("/", body);
    this.data.push(newVersions);
    return newVersions;
  }

  async updateVersions(VersionData: Version): Promise<Version> {
    const body = {
      nombre: VersionData.nombre,
      descripcion: VersionData.descripcion,
      precio_mercado: VersionData.precio_mercado,
      precio_mercado_gnc: VersionData.precio_mercado_gnc,
      modelo: VersionData.modelo,
      activo: VersionData.activo,
    };
    console.log(body);
    const updatedVersions = await this.putData(
      `/update/${VersionData.id}`,
      body
    );
    this.data = this.data.map((Versions) =>
      VersionData.id === updatedVersions.id ? updatedVersions : Versions
    );
    return updatedVersions;
  }

  async updateStateVersion(id: number): Promise<Usuario> {
    const updatedVersions = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((Versions) =>
      Versions.id === updatedVersions.id ? updatedVersions : Versions
    );
    return updatedVersions;
  }
}
