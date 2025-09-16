import type ITiposDocumentoRepository from "../Irepositorys/ITiposDocumentoRepository.ts";
import { BaseRepository } from "./BaseRepository";

export class tiposDocumentoRepository extends BaseRepository<string> implements ITiposDocumentoRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  getTiposDocumento(): Promise<string[]> {
    return this.fetchData();
  }
}
