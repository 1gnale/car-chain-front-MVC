import type ICoberturasRepository from "../Irepositorys/ICoberturasRepository";

export class CoberturasRepository implements ICoberturasRepository {
  private data: Cobertura[] = [];

  constructor(data: Cobertura[]) {
    this.data = data;
  }

  getCoberturas(): Promise<Cobertura[]> {
    return Promise.resolve(this.data);
  }
}
