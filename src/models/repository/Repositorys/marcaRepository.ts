import type IMarcaRepository from "../Irepositorys/IMarcaRepository";
import { BaseRepository } from "./BaseRepository";

export class MarcaRepository
  extends BaseRepository<Marca>
  implements IMarcaRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getMarcas(): Promise<Marca[]> {
    return this.fetchData();
  }

  async getMarcaById(id: string): Promise<Marca> {
    return this.fetchDataById("/", id);
  }

  async createBrands(MarcaData: Marca): Promise<Marca> {
    const body = {
      nombre: MarcaData.nombre,
      descripcion: MarcaData.descripcion,
    };

    const newBrands = await this.postData("/", body);
    this.data.push(newBrands);
    return newBrands;
  }

  async updateBrands(MarcaData: Marca): Promise<Marca> {
    const body = {
      nombre: MarcaData.nombre,
      descripcion: MarcaData.descripcion,
      activo: MarcaData.activo,
    };
    console.log(body);
    const updatedBrands = await this.putData(`/update/${MarcaData.id}`, body);
    this.data = this.data.map((Brands) =>
      MarcaData.id === updatedBrands.id ? updatedBrands : Brands
    );
    return updatedBrands;
  }

  async updateStateMarca(id: number): Promise<Usuario> {
    const updatedBrands = await this.logicalDeleteData(`/delete/${id}`);
    this.data = this.data.map((Brands) =>
      Brands.id === updatedBrands.id ? updatedBrands : Brands
    );
    return updatedBrands;
  }
}
