import type IDocumentacionRepository from "../Irepositorys/IDocumentacionRepository";
import type { DocumentacionPayload } from "../Irepositorys/IDocumentacionRepository";
import { BaseRepository } from "./BaseRepository";

export class DocumentacionRepository
  extends BaseRepository<any>
  implements IDocumentacionRepository
{
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async createDocumentacion(
    data: DocumentacionPayload,
    authToken?: string
  ): Promise<any> {
    const response = await fetch(`${this.apiUrl}/createDocumentacion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear documentación: ${response.statusText}`);
    }

    return response.json();
  }
}
