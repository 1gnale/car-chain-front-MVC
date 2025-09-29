import type ITipoContratacionRepository from "../Irepositorys/ITipoContratacionRepository";
import { BaseRepository } from "./BaseRepository";

export class TipoContratacionRepository
  extends BaseRepository<TipoContratacion>
  implements ITipoContratacionRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getTiposContratacion(): Promise<TipoContratacion[]> {
    return this.fetchData();
  }
  async createHiringType(
    TipoContratacionData: TipoContratacion
  ): Promise<TipoContratacion> {
    const body = {
      nombre: TipoContratacionData.nombre,
      cantidadMeses: TipoContratacionData.cantidadMeses,
    };

    const newHiringType = await this.postData("/", body);
    this.data.push(newHiringType);
    return newHiringType;
  }

  async updateHiringType(
    TipoContratacionData: TipoContratacion
  ): Promise<TipoContratacion> {
    const body = {
      nombre: TipoContratacionData.nombre,
      cantidadMeses: TipoContratacionData.cantidadMeses,
      activo: TipoContratacionData.activo,
    };
    const updatedHiringType = await this.putData(
      `/update/${TipoContratacionData.id}`,
      body
    );
    this.data = this.data.map((HiringType) =>
      TipoContratacionData.id === updatedHiringType.id
        ? updatedHiringType
        : HiringType
    );
    return updatedHiringType;
  }

  async updateStateTipoContratacion(id: number): Promise<Usuario> {
    const updatedHiringType = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((HiringType) =>
      HiringType.id === updatedHiringType.id ? updatedHiringType : HiringType
    );
    return updatedHiringType;
  }
}
