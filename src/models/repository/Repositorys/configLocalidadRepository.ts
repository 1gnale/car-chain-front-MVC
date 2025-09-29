import type IConfigLocalidadRepository from "../Irepositorys/IConfigLocalidadRepository";
import { BaseRepository } from "./BaseRepository";

export class ConfigLocalidadesRepository
  extends BaseRepository<ConfigLocalidad>
  implements IConfigLocalidadRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getConfigLocalidades(): Promise<ConfigLocalidad> {
    const data = await this.fetchData();
    return data[0] || {};
  }

  async getConfigLocalidadById(id: string): Promise<ConfigLocalidad> {
    return this.fetchDataById("/", id);
  }

  async createConfigLocality(
    ConfigLocalidadData: ConfigLocalidad
  ): Promise<ConfigLocalidad> {
    const body = {
      nombre: ConfigLocalidadData.nombre,
      descuento: ConfigLocalidadData.descuento,
      ganancia: ConfigLocalidadData.ganancia,
      recargo: ConfigLocalidadData.recargo,
      localidad: ConfigLocalidadData.localidad,
    };

    const newConfigLocality = await this.postData("/", body);
    this.data.push(newConfigLocality);
    return newConfigLocality;
  }

  async updateConfigLocality(
    ConfigLocalidadData: ConfigLocalidad
  ): Promise<ConfigLocalidad> {
    const body = {
      nombre: ConfigLocalidadData.nombre,
      descuento: ConfigLocalidadData.descuento,
      ganancia: ConfigLocalidadData.ganancia,
      recargo: ConfigLocalidadData.recargo,
      localidad: ConfigLocalidadData.localidad,
      activo: ConfigLocalidadData.activo,
    };
    const updatedConfigLocality = await this.putData(
      `/update/${ConfigLocalidadData.id}`,
      body
    );
    this.data = this.data.map((ConfigLocality) =>
      ConfigLocalidadData.id === updatedConfigLocality.id
        ? updatedConfigLocality
        : ConfigLocality
    );
    return updatedConfigLocality;
  }

  async updateStateConfigLocalidad(id: number): Promise<Usuario> {
    const updatedConfigLocality = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((ConfigLocality) =>
      ConfigLocality.id === updatedConfigLocality.id
        ? updatedConfigLocality
        : ConfigLocality
    );
    return updatedConfigLocality;
  }
}
