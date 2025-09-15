import type ITipoContratacionRepository from "../Irepositorys/ITipoContratacionRepository";

export class TipoContratacionRepository implements ITipoContratacionRepository {
  private data: TipoContratacion[] = [];

  constructor(data: TipoContratacion[]) {
    this.data = data;
  }

  getTiposContratacion(): Promise<TipoContratacion[]> {
    return Promise.resolve(this.data);
  }
}
