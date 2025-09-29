import type IConfigEdadRepository from "../Irepositorys/IConfigEdadRepository";
import { BaseRepository } from "./BaseRepository";

export class ConfigEdadRepository
  extends BaseRepository<ConfigEdad>
  implements IConfigEdadRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getConfigEdad(): Promise<ConfigEdad> {
    const data = await this.fetchData();
    return data[0] || {};
  }

  async getConfigEdadById(id: string): Promise<ConfigEdad> {
    return this.fetchDataById("/", id);
  }

  async createConfigAge(ConfigEdadData: ConfigEdad): Promise<ConfigEdad> {
    const body = {
      nombre: ConfigEdadData.nombre,
      minima: ConfigEdadData.minima,
      maxima: ConfigEdadData.maxima,
      descuento: ConfigEdadData.descuento,
      ganancia: ConfigEdadData.ganancia,
      recargo: ConfigEdadData.recargo,
    };

    const newConfigAge = await this.postData("/", body);
    this.data.push(newConfigAge);
    return newConfigAge;
  }

  async updateConfigAge(ConfigEdadData: ConfigEdad): Promise<ConfigEdad> {
    const body = {
      nombre: ConfigEdadData.nombre,
      minima: ConfigEdadData.minima,
      maxima: ConfigEdadData.maxima,
      descuento: ConfigEdadData.descuento,
      ganancia: ConfigEdadData.ganancia,
      recargo: ConfigEdadData.recargo,
      activo: ConfigEdadData.activo,
    };
    console.log("body");

    console.log(body);
    const updatedConfigAge = await this.putData(
      `/update/${ConfigEdadData.id}`,
      body
    );
    this.data = this.data.map((ConfigAge) =>
      ConfigEdadData.id === updatedConfigAge.id ? updatedConfigAge : ConfigAge
    );
    return updatedConfigAge;
  }

  async updateStateConfigEdad(id: number): Promise<Usuario> {
    const updatedConfigAge = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((ConfigAge) =>
      ConfigAge.id === updatedConfigAge.id ? updatedConfigAge : ConfigAge
    );
    return updatedConfigAge;
  }
}
