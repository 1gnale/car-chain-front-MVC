import type IDocumentTypeRepository from "./IDocumentTypeRepository.ts";

export class DocumentTypeRepository implements IDocumentTypeRepository {
  private data: string[] = [];

  constructor(data: string[]) {
    this.data = data;
  }

  getDocumentTypes(): Promise<string[]> {
    return Promise.resolve(this.data);
  }
}
