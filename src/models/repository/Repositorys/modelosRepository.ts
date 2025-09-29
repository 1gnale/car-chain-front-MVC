import type IModelosRepository from "../Irepositorys/IModelosRepository";
import { BaseRepository } from "./BaseRepository";

export class ModeloRepository
  extends BaseRepository<Modelo>
  implements IModelosRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getModelos(): Promise<Modelo[]> {
    return this.fetchData();
  }

  async getModeloById(id: string): Promise<Modelo> {
    return this.fetchDataById("/", id);
  }

  async createModels(ModeloData: Modelo): Promise<Modelo> {
    const body = {
      nombre: ModeloData.nombre,
      descripcion: ModeloData.descripcion,
      marca: ModeloData.marca,
    };

    const newModels = await this.postData("/", body);
    this.data.push(newModels);
    return newModels;
  }

  async updateModels(ModeloData: Modelo): Promise<Modelo> {
    const body = {
      nombre: ModeloData.nombre,
      descripcion: ModeloData.descripcion,
      marca: ModeloData.marca,
      activo: ModeloData.activo,
    };
    console.log(body);
    const updatedModels = await this.putData(`/update/${ModeloData.id}`, body);
    this.data = this.data.map((Models) =>
      ModeloData.id === updatedModels.id ? updatedModels : Models
    );
    return updatedModels;
  }

  async updateStateModelo(id: number): Promise<Usuario> {
    const updatedModels = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((Models) =>
      Models.id === updatedModels.id ? updatedModels : Models
    );
    return updatedModels;
  }
}
