import type ITiposDocumentoRepository from "../Irepositorys/ITiposDocumentoRepository.ts";

export class tiposDocumentoRepository implements ITiposDocumentoRepository {
  private data: string[] = [];

  constructor(data: string[]) {
    this.data = data;
  }

  getTiposDocumento(): Promise<string[]> {
    return Promise.resolve(this.data);
  }
}
