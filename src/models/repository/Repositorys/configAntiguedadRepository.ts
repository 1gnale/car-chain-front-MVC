import type IConfigAntiguedadRepository from "../Irepositorys/IConfigAntiguedadRepository";
import { BaseRepository } from "./BaseRepository";

export class ConfigAntiguedadRepository
  extends BaseRepository<ConfigAntiguedad>
  implements IConfigAntiguedadRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getConfigAntiguedad(): Promise<ConfigAntiguedad> {
    const data = await this.fetchData();
    return data[0] || {};
  }

  async getConfigAntiguedadById(id: string): Promise<ConfigAntiguedad> {
    return this.fetchDataById("/", id);
  }

  async createConfigAntiquity(
    ConfigAntiguedadData: ConfigAntiguedad
  ): Promise<ConfigAntiguedad> {
    const body = {
      nombre: ConfigAntiguedadData.nombre,
      minima: ConfigAntiguedadData.minima,
      maxima: ConfigAntiguedadData.maxima,
      descuento: ConfigAntiguedadData.descuento,
      ganancia: ConfigAntiguedadData.ganancia,
      recargo: ConfigAntiguedadData.recargo,
    };

    const newConfigAntiquity = await this.postData("/", body);
    this.data.push(newConfigAntiquity);
    return newConfigAntiquity;
  }

  async updateConfigAntiquity(
    ConfigAntiguedadData: ConfigAntiguedad
  ): Promise<ConfigAntiguedad> {
    const body = {
      nombre: ConfigAntiguedadData.nombre,
      minima: ConfigAntiguedadData.minima,
      maxima: ConfigAntiguedadData.maxima,
      descuento: ConfigAntiguedadData.descuento,
      ganancia: ConfigAntiguedadData.ganancia,
      recargo: ConfigAntiguedadData.recargo,
      activo: ConfigAntiguedadData.activo,
    };
    const updatedConfigAntiquity = await this.putData(
      `/update/${ConfigAntiguedadData.id}`,
      body
    );
    this.data = this.data.map((ConfigAntiquity) =>
      ConfigAntiguedadData.id === updatedConfigAntiquity.id
        ? updatedConfigAntiquity
        : ConfigAntiquity
    );
    return updatedConfigAntiquity;
  }

  async updateStateConfigAntiguedad(id: number): Promise<Usuario> {
    const updatedConfigAntiquity = await this.logicalDeleteData(
      `/delete/${id}`
    );
    this.data = this.data.map((ConfigAntiquity) =>
      ConfigAntiquity.id === updatedConfigAntiquity.id
        ? updatedConfigAntiquity
        : ConfigAntiquity
    );
    return updatedConfigAntiquity;
  }
}
