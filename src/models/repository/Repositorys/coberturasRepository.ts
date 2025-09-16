import type ICoberturasRepository from "../Irepositorys/ICoberturasRepository";
import { BaseRepository } from "./BaseRepository";

export class CoberturasRepository extends BaseRepository<Cobertura> implements ICoberturasRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getCoberturas(): Promise<Cobertura[]> {
    return this.fetchData();
  }
}
