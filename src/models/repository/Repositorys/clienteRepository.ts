import type IClienteRepository from "../Irepositorys/IClienteRepository";
import { BaseRepository } from "./BaseRepository";

export class ClienteRepository extends BaseRepository<Cliente> implements IClienteRepository {
  constructor(apiUrl?: string) {
    super(apiUrl);
  }

  async getClientByMail(): Promise<Cliente | null> {
    const clientes = await this.fetchData();
    return Object(clientes);
  }
}
