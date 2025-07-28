import type ICoberturasDetalleRepository from "../Irepositorys/ICoberturaDetalleRepository";

export class CoberturasDetalleRepository
  implements ICoberturasDetalleRepository
{
  private data: Cobertura_Detalle[] = [];

  constructor(data: Cobertura_Detalle[]) {
    this.data = data;
  }

  getCoberturasDetalles(): Promise<Cobertura_Detalle[]> {
    return Promise.resolve(this.data);
  }
}
