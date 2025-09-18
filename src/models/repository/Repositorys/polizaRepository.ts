import type IPolizaRepository from "../Irepositorys/IPolizaRepository";
import type { PolizaPayload } from "../Irepositorys/IPolizaRepository";
import { BaseRepository } from "./BaseRepository";

export class PolizaRepository extends BaseRepository<any> implements IPolizaRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async createPoliza(data: PolizaPayload, authToken?: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/createPoliza`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear póliza: ${response.statusText}`);
    }

    return response.json();
  }
}